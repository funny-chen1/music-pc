<template>
  <div>
    <Header></Header>
    <div class="pic">
      <img :src="artistsInfo.artist.cover"
           alt="">
    </div>

    <div class="main">
      <div class="artist-name">
        <h3>{{ artistsInfo.artist.name }}</h3>
        <span>666万 粉丝</span>
        <span>{{ artistsInfo.identify.imageDesc }}</span>
        <span class="sub-btn">关注</span>
      </div>
      <div class="tab-bar">
        <ul>
          <li v-for="item, index in tabbarList"
              :key="index"
              @click="selectBar(item)"
              :class="{'tabbar-active': currentBar == item}">{{ item }}</li>
        </ul>
      </div>

      <div class="card"
           v-show="currentBar == '主页'">
        <h4 class="title">艺人百科</h4>
        <ul>
          <li><span>艺人名： {{ artistsInfo.artist.name }}</span></li>
          <li><span>译名： {{ artistsInfo.artist.transNames[0] }}</span></li>
          <li><span>身份： {{ artistsInfo.identify.imageDesc }}</span></li>
        </ul>
        <p>{{ artistsInfo.artist.briefDesc }}</p>
      </div>

      <div class="card"
           v-show="currentBar == '歌曲'">
        <h4 class="title">热门播放</h4>
        <div class="song-list">
          <ul>
            <li v-for="item,index in hotSongs"
                :key="index">
              <div class="item-name">
                <span style="margin-right: 20px;font-size: 16px;">{{ index+1 }}</span>
                <div>
                  <h4>{{ item.name }}</h4>
                  <span class="name">{{ item.ar[0].name }}</span>
                </div>
              </div>
              <img src="../../assets/more.png"
                   alt=""
                   class="icon"
                   @click="showMore(item)">
            </li>
          </ul>
        </div>
      </div>

      <div class="card"
           v-show="currentBar == '专辑'">
        <h4 class="title">专辑</h4>
        <div class="album-list">
          <ul>
            <li v-for="item, index in hotAlbums"
                :key="index">
              <img :src="item.picUrl"
                   alt="">
              <div>
                <h4>{{ item.name }}</h4>
                <span>{{ item.publishTime | formatTime }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="card"
           v-show="currentBar == '视频'">
        <h4 class="title">视频</h4>
        <div class="mv-list">
          <ul>
            <li v-for="item,index in mvs"
                :key="index"
                @click="getMvDetail(item)">
              <img :src="item.imgurl"
                   alt="">
              <div style="margin-left: 20px;">
                <span class="mv-name">{{ item.name }}</span>
                <span>{{ item.publishTime }}</span>
                <span>{{ item.playCount }} 次播放</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 下方弹出层 -->
    <Popup :show="show" :title="title"></Popup>

  </div>
</template>

<script>
import Header from '@/components/Header'
import Popup from '@/components/Popup'
export default {
  components: {
    Header, Popup
  },
  data() {
    return {
      introList: [],
      hotSongs: [],
      hotAlbums: [],
      mvs: [],
      artistsInfo: {
        artist: {
          transNames: []
        },
        identify: {}
      },
      currentBar: '主页',
      tabbarList: ['主页', '歌曲', '专辑', '视频'],
      title: {},
      show: false
    }
  },
  methods: {
    async initData() {
      //   const res1 = await this.$axios.get(this.api.artistDesc + '?id=' + this.$route.params.id);
      // 歌手信息
      const res2 = await this.$axios.get(this.api.singerDetail + '?id=' + this.$route.params.id);
      this.artistsInfo = res2.data.data;
      //歌手单曲
      const res3 = await this.$axios.get(this.api.artistDetail + '?id=' + this.$route.params.id);
      this.hotSongs = res3.data.hotSongs;
      //歌手专辑
      const res4 = await this.$axios.get(this.api.albumList + '?id=' + this.$route.params.id);
      this.hotAlbums = res4.data.hotAlbums;
      //歌手mv
      const res5 = await this.$axios.get(this.api.mvList + '?id=' + this.$route.params.id);
      this.mvs = res5.data.mvs;
    },
    async selectBar(val) {
      this.currentBar = val;
    },
    async showMore(obj) {
        this.show = true;
        this.title = obj;
    },
    async getMvDetail(obj) {
        this.$router.push({ path: `/mv/${obj.id}` });
    }
  },
  created() {
    this.initData();
  },
  mounted() {
      document.addEventListener('click', (e) => {
          if (e.target.className != 'icon') {
              this.show = false;
          }
      })
  }
}
</script>

<style lang="scss" scoped>
.pic {
  img {
    width: 100%;
  }
}
.main {
  height: auto;
  position: relative;
  padding-top: 180px;
  background-color: rgb(228, 228, 228);
  .artist-name {
    text-align: center;
    position: absolute;
    top: -20px;
    left: 50%;
    margin-left: -45%;
    padding-bottom: 20px;
    width: 90%;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 5px 5px 5px #adadad;
    display: flex;
    flex-direction: column;
    span {
      color: #999;
      margin: 5px;
    }
    .sub-btn {
      padding: 5px 10px;
      color: #999;
      border: 1px solid #999;
      border-radius: 5px;
      margin: 5px 30%;
    }
  }
  .card {
    width: 90%;
    border-radius: 10px;
    background-color: #fff;
    margin: 0 auto;
    padding: 10px 20px;
    text-align: left;
    h4 {
      font-weight: bold;
    }
    span {
      color: rgb(136, 136, 136);
      margin: 5px 0;
      display: block;
    }
  }
  .tab-bar {
    padding: 10px 25px;
    color: rgb(133, 133, 133);
    font-size: 18px;
    ul {
      display: flex;
      align-items: center;
      justify-content: space-between;
      li {
      }
    }
  }
}
.tabbar-active {
  border-bottom: 3px solid red;
  color: #000;
}
.song-list {
  ul {
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #ccc;
      img {
        width: 20px;
        height: 20px;
      }
      .item-name {
        display: flex;
        align-items: center;
        text-align: left;
        h4 {
          font-size: 16px;
          margin: 0;
          font-weight: 400;
        }
        .name {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
.album-list {
  ul {
    li {
      display: flex;
      align-items: center;
      padding: 10px;
      img {
        width: 60px;
        height: 60px;
        margin-right: 20px;
      }
      h4 {
        font-size: 16px;
        font-weight: normal;
      }
    }
  }
}
.mv-list {
  ul {
    li {
      display: flex;
      align-items: center;
      padding: 20px 10px;
      border-bottom: 1px solid #ccc;
      img {
        width: 120px;
        height: 80px;
      }
      .mv-name {
        width: 150px;
        font-size: 16px;
        color: #000;
        white-space: nowrap;
        word-break: keep-all;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>