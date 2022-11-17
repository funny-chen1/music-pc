<template>
  <div>
    <div class="header" data-aos="fade-down" data-aos-easing="ease" data-aos-duration="1000" data-aos-delay="100">
      <div class="logo">
        <h3>LOGO</h3>
      </div>
      <div class="menu">
        <ul>
          <li v-for="item,index in menuItem"
              :key="index"
              :class="{'selectedMenu': currentItem.indexOf(item.index) != -1}"
              @click="toPage(item.index)">{{ item.title }}</li>
        </ul>
      </div>
      <div class="search" @click="toPage('/search')"><img src="../assets/search.png" alt=""></div>
      <div v-if="isLogin"
           class="login-btn">
        <img :src="this.$store.state.userInfo.profile.avatarUrl" @click="toPage('/profile')">
        <span>{{ this.$store.state.userInfo.profile.nickname }}</span>
        <Button type="success"
                @click="logout">退出</Button>
      </div>
      <div v-else
           class="login-btn">
        <Button type="success"
                @click="modal = true" style="margin-right: 20px;">注册</Button>
        <Button type="success"
                @click="loginModal = true">登录</Button>
      </div>
    </div>

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
      modal: false,
      loginModal: false,
      modal_loading: false,
      showBtn: true,
      count: '',
      timer: '',
      currentItem: '',
      //   isLogin: false,
      userInfo: {},
      newUser: {
        nickname: '',
        password: '',
        phone: '',
        captcha: ''
      },
      loginInfo: {
        phone: '',
        password: ''
      },
      menuItem: [
        { title: '发现音乐', index: '/index' },
        { title: '我的音乐', index: '/my' },
        { title: '歌单', index: '/songlist' },
        { title: '歌手', index: '/singerlist' },
        { title: '音乐人', index: '/musician' },
        { title: '下载客户端', index: '/xia' }
      ]
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
    }
  },
  created() {
    this.currentItem = this.$route.path;
    // console.log(JSON.parse(localStorage.getItem('userInfo')));
    //  let token = localStorage.getItem('token');
    //  this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    //  if (token) {
    //      this.isLogin = true;
    //  } else {
    //      this.isLogin = false;
    //  }
  },
  mounted() {
    AOS.init();
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  min-width: 1080px;
  height: 80px;
  background-color: #000;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .logo {
    text-align: center;
    width: 200px;
    height: 80px;
    color: #fff;
    h3 {
      margin-top: 0;
      line-height: 80px;
    }
  }
  .menu {
    ul {
      margin: 0 auto;
      li {
        display: inline-block;
        font-size: 20px;
        color: #fff;
        height: 80px;
        line-height: 80px;
        padding: 0 20px;
        cursor: pointer;
      }
      li:hover {
        background-color: rgba(87, 87, 87, 0.842);
      }
    }
  }
  .login-btn {
    height: 80px;
    white-space: nowrap;
    display: flex;
    align-items: center;
    span {
      color: #fff;
      font-size: 16px;
      padding-right: 10px;
    }
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
      cursor: pointer;
    }
  }
  .search {
    cursor: pointer;
    img {
      width: 30px;
      height: 30px;
    }
  }
}
.mg {
  margin: 10px 0;
  width: 80%;
}
.selectedMenu {
  background-color: rgba(87, 87, 87, 0.842);
}
</style>