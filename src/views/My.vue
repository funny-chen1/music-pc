<template>
  <div>
    <Header></Header>
    <div class="container my-main">
      <Row>
        <Col span="6">
        <Menu active-name="myartist"
              @on-select="open">
          <Menu-item name="myartist">我的歌手({{ artistList.length }})</Menu-item>
          <Menu-item name="mymv">我的视频({{ mvList.length }})</Menu-item>
          <Menu-item name="myalbum">收藏的专辑({{ albumList.length }})</Menu-item>
          <Submenu name="1">
            <template slot="title">
              歌单
            </template>
            <Menu-item name="1-1">创建的歌单</Menu-item>
            <Menu-item name="1-2">收藏的歌单</Menu-item>
          </Submenu>
        </Menu>
        </Col>
        <Col span="18">

        <!-- 我的歌手板块 -->
        <div class="content-main"
             v-show="currentItem == 'myartist'">
          <div class="header">
            <h3>我的歌手({{ artistList.length }})</h3>
          </div>
          <div class="main"
               v-for="item, index in artistList"
               :key="index">
            <img :src="item.picUrl"
                 alt=""
                 @click="getArtistDetail(item)">
            <div>
              <div class="name">
                <h5>{{ item.name }}</h5>
                <span>{{ item.trans }}</span>
              </div>

              <div class="count">
                <span>{{ item.albumSize }}个专辑</span>
                <span>{{ item.mvSize }}个MV</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 我的歌手板块结束 -->

        <!-- 我的视频板块 -->
        <div class="content-main"
             v-show="currentItem == 'mymv'">
          <div class="header">
            <h3>我的视频({{ mvList.length }})</h3>
          </div>
          <div class="mv-main">
            <ul>
              <li v-for="item,index in mvList"
                  :key="index"
                  @click="getMvDetail(item)">
                <img :src="item.coverUrl"
                     alt="">
                <h3>{{ item.title }}</h3>
                <span>{{ item.creator[0].userName }}</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 我的歌手板块结束 -->

        <!-- 收藏的专辑 -->
        <div class="content-main"
             v-show="currentItem == 'myalbum'">
          <div class="header">
            <h3>收藏的专辑({{ albumList.length }})</h3>
          </div>
          <div class="album-main">
            <ul>
              <li v-for="item, index in albumList"
                  :key="index"
                  @click="getAlbumDetail(item)">
                <img :src="item.picUrl"
                     alt="">
                <h3>{{ item.name }}</h3>
                <span>{{ item.artists[0].name }}</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 收藏的专辑结束 -->
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Menu'

export default {
  components: {
    Header
  },
  data() {
    return {
      artistList: [],
      mvList: [],
      albumList: [],
      currentItem: 'myartist'
    }
  },
  methods: {
    open(name) {
      this.currentItem = name;
    },
    getArtistDetail(obj) {
      this.$router.push({ path: `/singerdetail/${obj.id}` });
    },
    getMvDetail(obj) {
      this.$router.push({ path: `/mv/${obj.vid}` });
    },
    getAlbumDetail(obj) {
      this.$router.push({ path: `/albumdetail/${obj.id}` });
    },
    //获取用户歌单
    async getPlaylist() {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const res = await this.$axios.get(this.api.collectedPlaylist + '?uid=' + userInfo.account.id);
    }
  },
  created() {

    this.$axios.post(this.api.collectedSinger, { cookie: localStorage.getItem('cookie') }).then((res) => {
      this.artistList = res.data.data;
    }).catch((err) => { });

    this.$axios.post(this.api.collectedMv, { cookie: localStorage.getItem('cookie') }).then((res) => {
      this.mvList = res.data.data;
    }).catch((err) => { });

    this.$axios.post(this.api.collectedAlbum, { cookie: localStorage.getItem('cookie') }).then((res) => {
      this.albumList = res.data.data;
    }).catch((err) => { });

    this.getPlaylist();
  }

}
</script>

<style lang="scss" scoped>
.my-main {
  background-color: #fff;
  border: 1px solid #ccc;
  min-height: 800px;
  width: 1080px;
  padding: 30px 0;
  .content-main {
    padding-right: 50px;
    .header {
      width: 100%;
      border-bottom: 2px solid #999;
      h3 {
        margin-top: 10px;
        text-align: left;
      }
    }
    .album-main {
      padding: 10px 0;
      text-align: center;
      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        li {
          width: 150px;
          padding: 10px;
          cursor: pointer;
          margin:10px 15px;
          background-color: #ccc;
          transition: transform 0.5s ease;
          -webkit-transition: -webkit-transform 0.5s ease;
          &:hover {
            box-shadow: 5px 5px 3px #adadad;
            transform: translateY(-8px);
            transition: transform 0.5s ease;
            -webkit-transition: -webkit-transform 0.5s ease;
          }
          img {
            width: 130px;
            height: 130px;
            border-radius: 50%;
          }
          h3 {
            font-size: 16px;
            font-weight: bold;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 0;
          }
          span {
            margin-top: 10px;
            display: block;
          }
        }
      }
    }
    .mv-main {
      padding: 10px 0;
      text-align: left;
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          width: 180px;
          padding: 0 10px;
          cursor: pointer;
          margin-bottom: 10px;
          img {
            width: 160px;
            height: 110px;
          }
          h3 {
            font-size: 16px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 0;
          }
          span {
            color: #999;
          }
        }
      }
    }
    .main {
      display: flex;
      border-bottom: 1px solid #ccc;
      padding: 10px 0;
      img {
        width: 80px;
        height: 80px;
        margin-right: 20px;
        cursor: pointer;
      }
      .name {
        display: flex;
        align-items: center;
        margin-top: 5px;
        h5 {
          font-size: 18px;
          font-weight: bold;
          margin-right: 10px;
        }
        span {
          color: #999;
        }
      }
      .count {
        display: flex;
        color: #999;
        span:first-child {
          margin-right: 30px;
        }
      }
    }
  }
}
</style>