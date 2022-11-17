<template>
  <div>
    <Menu></Menu>
    <Carousel data-aos="fade-left"
              data-aos-easing="ease"
              data-aos-duration="700"
              data-aos-delay="100"></Carousel>
    <!-- 等级签到模块 -->
    <div class="lev-box"
         v-if="isLogin">
      <div class="top">
        <img :src="this.$store.state.userInfo.profile.avatarUrl"
             alt="" loading="lazy">
        <h4>{{ this.$store.state.userInfo.profile.nickname }}</h4>
      </div>
      <button class="btn"
              @click="sign()">签到</button>
      <div class="down">
        <span>Lv.{{ levelData }}</span>
        <span>{{ this.$store.state.userInfo.profile.follows }} 关注</span>
        <span>{{ this.$store.state.userInfo.profile.followeds }} 粉丝</span>
      </div>
    </div>
    <!-- 等级签到模块结束 -->
    <div class="content container">

      <!-- 热门推荐 -->
      <div class="group1"
           data-aos="fade-up"
           data-aos-easing="ease"
           data-aos-duration="1000"
           data-aos-delay="100">
        <div class="group-top">
          <h3 class="">热门推荐</h3>
          <ul class="">
            <li v-for="item,index in hotPlayListCate"
                :key="index"
                @click="goPage(item)">{{ item.name }}</li>
          </ul>
          <span class="more"
                @click="goMore('/songlist')">更多 >></span>
        </div>
        <div class="group-detail">
          <ul>
            <li v-for="item,index in hotPlayList"
                :key="index"
                @click="getSongDetail(item)">
              <img :src="item.picUrl"
                   alt="" loading="lazy">
              <h4>{{ item.name }}</h4>
            </li>
          </ul>
        </div>
      </div>
      <!-- 热门推荐结束 -->

      <!-- 新碟上架 -->
      <div class="group1"
           data-aos="fade-up"
           data-aos-easing="ease"
           data-aos-duration="1000"
           data-aos-delay="100">
        <div class="group-top">
          <h3 class="">新碟上架</h3>
          <span class="more"
                @click="goMore('/album')">更多 >></span>
        </div>
        <div class="group-detail">
          <Tabs value="name1">
            <Tab-pane label="最新"
                      name="name1">
              <ul>
                <li v-for="item,index in newest"
                    :key="index"
                    @click="getAlbumDetail(item)"
                    class="small">
                  <img :src="item.picUrl" loading="lazy">
                  <h4>{{ item.name }}</h4>
                  <h4>{{ item.artist.name }}</h4>
                </li>
              </ul>
            </Tab-pane>
            <Tab-pane label="热门"
                      name="name2">
              <ul>
                <li v-for="item,index in newest"
                    :key="index"
                    @click="getAlbumDetail(item)"
                    class="small">
                  <img :src="item.picUrl" loading="lazy">
                  <h4>{{ item.name }}</h4>
                  <h4>{{ item.artist.name }}</h4>
                </li>
              </ul>
            </Tab-pane>
          </Tabs>
        </div>
      </div>
      <!-- 新碟上架结束 -->

      <!-- 榜单 -->
      <div class="group1"
           data-aos="flip-left"
           data-aos-easing="ease"
           data-aos-duration="1000"
           data-aos-delay="100">
        <div class="group-top">
          <h3>榜单</h3>
          <span class="more">更多 >></span>
        </div>
        <div class="group-detail">
          <Row style="background:#eee;padding:20px;text-align:left;">
            <Col span="7">
            <Card shadow>
              <p slot="title">飙升榜</p>
              <p slot="extra">查看全部</p>
              <p v-for="item,index in soarList"
                 :key="index"
                 @click="goPage(item)">{{index+1}}&nbsp;&nbsp;{{ item.name }}</p>
            </Card>
            </Col>
            <Col span="7"
                 offset="1">
            <Card shadow>
              <p slot="title">新歌榜</p>
              <p slot="extra">查看全部</p>
              <p v-for="item,index in newList"
                 :key="index"
                 @click="goPage(item)">{{index+1}}&nbsp;&nbsp;{{ item.name }}</p>
            </Card>
            </Col>
            <Col span="7"
                 offset="1">
            <Card shadow>
              <p slot="title">新歌榜</p>
              <p slot="extra">查看全部</p>
              <p v-for="item,index in originalList"
                 :key="index"
                 @click="goPage(item)">{{index+1}}&nbsp;&nbsp;{{ item.name }}</p>
            </Card>
            </Col>
          </Row>
        </div>
      </div>
      <!-- 榜单结束 -->

      <!-- 热门歌手 -->
      <div class="group1"
           data-aos="flip-right"
           data-aos-easing="ease"
           data-aos-duration="1000"
           data-aos-delay="100">
        <div class="group-top">
          <h3>热门歌手</h3>
          <span class="more"
                @click="goMore('/singerlist')">更多 >></span>
        </div>
        <div class="group-detail2">
          <ul>
            <li v-for="item,index in singerList"
                :key="index"
                @click="getSingerDetail(item)">
              <img :src="item.picUrl" loading="lazy">
              <p>{{ item.name }}</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 热门歌手结束 -->
    </div>
  </div>
</template>

<script>
import Menu from '@/components/Menu'
import Carousel from '@/components/Carousel'
import AOS from "aos"
import { signIn } from '@/api/getData'

export default {

  components: {
    Menu, Carousel
  },
  data() {
    return {
      hotPlayListCate: [],
      hotPlayList: [],
      newest: [],
      soarList: [],
      newList: [],
      originalList: [],
      singerList: [],
      cookie: '',
      levelData: ''
    }
  },
  computed: {
    isLogin: {
      get() {
        let info = localStorage.getItem('userInfo');
        let token = localStorage.getItem('token');
        if (info && token) {
          this.$store.commit('userStatus', JSON.parse(info));
        } else {
          this.$store.commit('userStatus', null);
        }
        return this.$store.getters.isLogin;
      },
      set(v) {
        return this.$store.state.isLogin;
      }
    }
  },
  methods: {
    goMore(data) {
      this.$router.push(data);
    },
    goPage(data) {
      console.log(data.id);
    },
    getSongDetail(obj) {
      this.$router.push({ path: `/songdetail/${obj.id}` });
    },
    getSingerDetail(obj) {
      this.$router.push({ path: `/singerdetail/${obj.id}` });
    },
    getAlbumDetail(obj) {
      this.$router.push({ path: `/albumdetail/${obj.id}` });
    },
    async getUserLevel() {
      const res = await this.$axios.post(this.api.level, { cookie: this.cookie });
      this.levelData = res.data.data.level;
    },
    async sign() {
      if (this.cookie) {
        const res = await signIn({cookie: this.cookie});
        if (res.code === 200) {
          this.$Message.success('签到成功！获得'+ res.point + '点经验。')
        }
      } else {
        this.$Message.error('未登录！')
      }

    }
  },
  created() {
    this.$axios.get(this.api.hotPlayListCate).then((res) => { this.hotPlayListCate = res.data.tags }).catch((err) => { });
    this.$axios.get(this.api.personalized).then((res) => { this.hotPlayList = res.data.result; }).catch((err) => { });
    this.$axios.get(this.api.newest).then((res) => { this.newest = res.data.albums }).catch((err) => { });
    this.$axios.get(this.api.soarList).then((res) => { this.soarList = res.data.songs }).catch((err) => { });
    this.$axios.get(this.api.newList).then((res) => { this.newList = res.data.songs }).catch((err) => { });
    this.$axios.get(this.api.originalList).then((res) => { this.originalList = res.data.songs }).catch((err) => { });
    this.$axios.get(this.api.singerList).then((res) => { this.singerList = res.data.artists }).catch((err) => { });
    if (localStorage.getItem('cookie')) {
      this.cookie = localStorage.getItem('cookie');
      this.getUserLevel();
    }
  },
  mounted() {
    AOS.init();
  }
}
</script>

<style lang="scss" scoped>
.content {
  border: 1px solid #ccc;
  min-height: 700px;
  width: 1080px;
  padding: 30px 40px;
  .group1 {
    margin-bottom: 50px;
    height: auto;
    .group-top {
      width: 100%;
      border-bottom: 2px solid #000;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h3 {
        margin-top: 10px;
      }
      ul {
        margin: 0;
        display: flex;
        li {
          cursor: pointer;
          display: inline-block;
          padding: 0 15px;
          border-right: 1px solid rgba(114, 114, 114, 0.842);
          &:hover {
            border-bottom: 1px solid rgba(114, 114, 114, 0.842);
          }
        }
      }
      .more {
        cursor: pointer;
      }
    }
    .group-detail {
      padding-top: 20px;
      .small {
        width: 150px;
        box-shadow: 5px 5px 3px #adadad;
        img {
          width: 150px;
          height: 150px;
          border-radius: 50%;
        }
      }
      p {
        cursor: pointer;
      }
      ul {
        margin: 0;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li {
          width: 200px;
          margin-bottom: 25px;
          cursor: pointer;
          transition: transform 0.5s ease;
          -webkit-transition: -webkit-transform 0.5s ease;
          &:hover {
            box-shadow: 5px 5px 3px #adadad;
            transform: translateY(-8px);
            transition: transform 0.5s ease;
            -webkit-transition: -webkit-transform 0.5s ease;
          }
          img {
            width: 200px;
            height: 200px;
          }
          h4 {
            font-size: 16px;
          }
        }
      }
    }
    .group-detail2 {
      padding-top: 20px;
      ul {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        margin: 0;
        li {
          width: 170px;
          display: flex;
          align-items: center;
          margin: 10px 0;
          background-color: #fafafa;
          border: 1px solid #ccc;
          cursor: pointer;
          img {
            width: 70px;
            height: 65px;
            margin-right: 10px;
          }
        }
      }
    }
  }
}
.lev-box {
  box-shadow: 0 5px 5px #ccc;
  background-color: #fff;
  width: 200px;
  position: fixed;
  right: 1%;
  top: 50%;
  z-index: 999;
  .top {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0;
    img {
      width: 70px;
      height: 70px;
      margin-right: 10px;
    }
  }
  .btn {
    margin: 10px 0;
    background-color: #000;
    color: #fff;
    width: 80px;
    outline: none;
  }
  .down {
    display: flex;
    justify-content: space-around;
    color: #999;
    margin-bottom: 10px;
  }
}
</style>