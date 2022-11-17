<template>
  <div class="menu"
       :class="{active: isActive}"
       data-aos="fade-down"
       data-aos-easing="ease"
       data-aos-duration="800"
       data-aos-delay="100">
    <div v-if="!showBack"
         @click="showList = !showList">
      <img src="../assets/menu.png"
           alt=""
           class="menu-icon">
    </div>
    <div v-if="showBack"
         @click="goBack()">
      <img src="../assets/返回.png"
           alt="">
    </div>
    <h3>首页</h3>
    <div v-if="isLogin"
         class="login-btn">
      <img :src="this.$store.state.userInfo.profile.avatarUrl"
           @click="toPage('/profile')">
      <!-- <Button type="success"
              @click="logout">退出</Button> -->
    </div>
    <div v-else
         class="login-btn">
      <Button type="success"
              @click="modal = true"
              style="margin-right: 20px;">注册</Button>
      <Button type="success"
              @click="loginModal = true">登录</Button>
    </div>

    <transition name="fade">
      <div class="menu-list"
           v-if="showList">
        <ul>
          <li v-for="item, index in menuItem"
              :key="index"
              @click="toPage(item.index)">
            {{ item.title }}
          </li>
        </ul>
      </div>
    </transition>

    <!-- 注册弹窗 -->
    <Modal v-model="modal"
           width="360"
           :mask-closable="false">
      <p slot="header"
         style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>注册</span>
      </p>
      <div style="text-align:center">
        <Input v-model="newUser.nickname"
               placeholder="昵称"
               class="mg"></Input>
        <Input v-model="newUser.password"
               placeholder="密码"
               class="mg"
               type="password"></Input>
        <Input v-model="newUser.phone"
               placeholder="手机号"
               class="mg"></Input>
        <Button v-if="showBtn"
                type="error"
                size="large"
                @click="getCode">获取验证码</Button>
        <Button v-else
                type="error"
                size="large"
                style="width: 120px">{{count}}</Button>
        <Input v-model="newUser.captcha"
               placeholder="验证码"
               class="mg"></Input>
      </div>
      <div slot="footer">
        <Button type="error"
                size="large"
                long
                :loading="modal_loading"
                @click="register">注册</Button>
      </div>
    </Modal>
    <!-- 注册弹窗结束 -->

    <!-- 登录弹窗 -->
    <Modal v-model="loginModal"
           width="360"
           :mask-closable="false">
      <p slot="header"
         style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>登录</span>
      </p>
      <div style="text-align:center">
        <Input v-model="loginInfo.phone"
               placeholder="手机号"
               class="mg"></Input>
        <Input v-model="loginInfo.password"
               placeholder="密码"
               class="mg"
               type="password"></Input>
      </div>
      <div slot="footer">
        <Button type="error"
                size="large"
                long
                :loading="modal_loading"
                @click="login">登录</Button>
      </div>
    </Modal>
    <!-- 登录弹窗结束 -->

  </div>
</template>

<script>
import AOS from 'aos'
export default {
  data() {
    return {
      menuItem: [
        { title: '发现音乐', index: '/index' },
        { title: '我的音乐', index: '/my' },
        { title: '歌单', index: '/songlist' },
        { title: '歌手', index: '/singerlist' },
        { title: '音乐人', index: '/musician' },
        { title: '下载客户端', index: '/xia' }
      ],
      userInfo: {},
      showList: false,
      modal: false,
      loginModal: false,
      modal_loading: false,
      showBtn: true,
      count: '',
      timer: '',
      isActive: false,
      newUser: {
        nickname: '',
        password: '',
        phone: '',
        captcha: ''
      },
      loginInfo: {
        phone: '',
        password: ''
      }
    }
  },
  computed: {
    isLogin: {
      get() {
        let info = localStorage.getItem('userInfo');
        let token = localStorage.getItem('token');
        if (info && token) {
          this.$store.commit('userStatus', JSON.parse(info))
        } else {
          this.$store.commit('userStatus', null)
        }
        return this.$store.getters.isLogin;
      },
      set(v) {
        return this.$store.state.isLogin;
      }
    },
    showBack() {
      let count = 0;
      let path = this.$route.path.split('');
      path.forEach((v, k) => {
        if (v === '/') {
          count++;
        }
      });
      if (count >= 2) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    register() {
      if (this.checkName(this.newUser.nickname) && this.checkPhone(this.newUser.phone) && this.checkPassword(this.newUser.password) && this.checkCode(this.newUser.captcha)) {
        this.$axios.post(this.api.check, { phone: this.newUser.phone })
          .then((response) => {
            if (response.data.exist == -1) {
              this.modal_loading = true;
              this.$axios.post(this.api.register, this.newUser)
                .then((res) => {
                  if (res.data.code == 200) {
                    setTimeout(() => {
                      this.modal_loading = false;
                      this.modal = false;
                      this.$Message.success('注册成功');
                    }, 1500);
                  } else {
                    this.modal_loading = false;
                    this.modal = false;
                    this.$Message.error(res.msg);
                  }
                }).catch((error) => {
                  this.modal_loading = false;
                  this.modal = false;
                  this.$Message.error('注册失败');
                })
            } else {
              this.$Message.warning('该手机号已经注册过,换一个手机号试试');
            }
          })
      } else {
        this.$Message.error('请核对信息');
      }
    },
    getCode() {
      const url = 'http://172.22.4.7:8082/captcha/sent?phone=' + this.newUser.phone;
      if (this.checkPhone(this.newUser.phone)) {
        this.$axios.get(url)
          .then((response) => {
            this.count = 60;
            this.showBtn = false;
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= 60) {
                this.count--;
              } else {
                this.showBtn = true;
                clearInterval(this.timer);
                this.timer = null;
              }
            }, 1000)
          }).catch((err) => {
          });
      } else {
        this.$Message.error('请校验手机号!');
      }
    },
    login() {
      if (this.checkPhone(this.loginInfo.phone) && this.checkPassword(this.loginInfo.password)) {
        this.$axios.post(this.api.login, this.loginInfo)
          .then((response) => {
            console.log(response);
            if (response.data.code === 200) {
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('userInfo', JSON.stringify(response.data));
              localStorage.setItem('cookie', response.data.cookie);
              //将信息放入Vuex
              this.$store.dispatch('setUser', JSON.stringify(response.data));

              this.loginModal = false;
              this.isLogin = true;
              this.$Message.success('登录成功');
            } else {
              this.$Message.error(response.data.msg);
            }
          })
      } else {
        this.$Message.error('手机号或者密码错误');
      }
    },
    logout() {
      this.$axios.get(this.api.logout)
        .then((res) => {
          localStorage.removeItem('cookie');
          this.$store.dispatch('setUser', null);
          if (this.$route.path != '/index') {
            this.$router.push('/index');
          }
          // this.$router.go();
        })
    },
    checkPhone(data) {
      const rule = /^1(3[0-9]|4[0-9]|5[0-9]|7[0-9]|8[0-9])\d{8}$/;
      if (rule.test(data)) {
        return true;
      } return false;
    },
    checkName(data) {
      if (data == null) {
        return false;
      } return true;
    },
    checkCode(data) {
      if (data.length != 4) {
        return false;
      } return true;
    },
    checkPassword(data) {
      if (data == '' || data.length > 20) {
        return false;
      } return true;
    },
    toPage(index) {
      this.$router.push(index);
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  mounted() {
    AOS.init();
    document.addEventListener('click', (e) => {
      if (e.target.className != 'menu-icon') {
        this.showList = false;
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.menu {
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #000;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  position: sticky;
  top: 0;
  z-index: 10;
  .menu-list {
    width: 100%;
    background-color: #000;
    position: absolute;
    top: 60px;
    left: 0;
    border-top: 1px solid #fff;
    color: #fff;
    z-index: 2;
  }
  img {
    width: 40px;
    height: 40px;
  }
  h3 {
    color: #fff;
  }
  .login-btn img {
    border-radius: 50%;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateY(50px);
}
</style>