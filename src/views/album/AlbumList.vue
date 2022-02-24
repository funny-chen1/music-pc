<template>
  <div>
    <Menu></Menu>
    <div class="container albumlist">
      <!-- 热门新碟 -->
      <div class="top-banner">
        <h3>热门新碟</h3>
      </div>
      <div class="album-detail">
        <ul>
          <li v-for="item,index in hotAlbumList"
              :key="index"
              @click="getAlbumDetail(item)">
            <img :src="item.picUrl"
                 alt="">
            <h4>{{ item.name }}</h4>
            <span>{{ item.artist.name }}</span>
          </li>
        </ul>
      </div>

      <!-- 全部专辑 -->
      <div class="top-banner">
        <h3>全部新碟</h3>
        <Dropdown trigger="click"
                  style="margin-left: 20px"
                  v-for="item,index in category"
                  :key="index">
          <a href="javascript:void(0)"
             @click="selectItem(item)">
            {{ item.name }}
          </a>
        </Dropdown>
      </div>
      <div class="album-detail"
           style="height: 930px;">
        <Spin size="large" fix v-if="spinShow && currentAlbum"></Spin>
        <ul v-else>
          <li v-for="item,index in currentAlbum"
              :key="index"
              @click="getAlbumDetail(item)">
            <img :src="item.picUrl"
                 alt="">
            <h4>{{ item.name }}</h4>
            <span>{{ item.artist.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/Menu'
export default {
  components: {
    Menu
  },
  data() {
    return {
      hotAlbumList: [],
      currentAlbum: [],
      spinShow: false,
      category: [
        { name: '全部', code: 'ALL' },
        { name: '华语', code: 'ZH' },
        { name: '欧美', code: 'EA' },
        { name: '韩国', code: 'KR' },
        { name: '日本', code: 'JP' }
      ]
    }
  },
  methods: {
    async getHotAlbum() {
      const res = await this.$axios.get(this.api.newest);
      this.hotAlbumList = res.data.albums.slice(0, 10);
    },
    async getAllAlbum() {
      const res = await this.$axios.get(this.api.allAlbum);
      this.currentAlbum = res.data.weekData;
    },
    async selectItem(obj) {
      this.spinShow = true;
      const res = await this.$axios.get(this.api.allAlbum + '?area=' + obj.code);
      this.currentAlbum = res.data.monthData;
      setTimeout(() => {
        this.spinShow = false;
      }, 1000);
    },
    async getAlbumDetail(obj) {
      this.$router.push({ path: `/albumdetail/${obj.id}` });
    }
  },
  created() {
    this.getHotAlbum();
    this.getAllAlbum();
  }
}
</script>

<style lang="scss" scoped>
.albumlist {
  border: 1px solid #ccc;
  background-color: #fff;
  min-height: 700px;
  width: 1080px;
  padding: 30px 20px;
  .top-banner {
    width: 100%;
    border-bottom: 2px solid #000;
    display: flex;
    align-items: center;
    h3 {
      margin-left: 10px;
      margin-top: 10px;
    }
  }
  .album-detail {
    padding: 50px 30px;
    text-align: left;
    overflow: auto;
    margin-bottom: 50px;
    position: relative;
    ul {
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 180px;
        margin-bottom: 25px;
        cursor: pointer;
        padding: 0 30px;
        transition: transform 0.5s ease;
        -webkit-transition: -webkit-transform 0.5s ease;
        &:hover {
          box-shadow: 5px 5px 3px #adadad;
          transform: translateY(-8px);
          transition: transform 0.5s ease;
          -webkit-transition: -webkit-transform 0.5s ease;
        }
        img {
          width: 140px;
          height: 140px;
        }
        h4 {
          font-size: 14px;
          width: 100%;
          word-break: keep-all;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        span {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .demo-spin-col {
    height: 100px;
    position: relative;
    border: 1px solid #eee;
  }
}
</style>