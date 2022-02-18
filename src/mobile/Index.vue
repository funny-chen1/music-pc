<template>
  <div>
    <!-- 导航栏 -->
    <Header></Header>
    <!-- 导航栏结束 -->
    <!-- 轮播图 -->
    <Carousel data-aos="fade-right"
              data-aos-easing="ease"
              data-aos-duration="800"
              data-aos-delay="100"></Carousel>
    <!-- 轮播图结束 -->

    <div class="group"
         data-aos="fade-up"
         data-aos-easing="ease"
         data-aos-duration="1000"
         data-aos-delay="100">
      <div class="group-top">
        <h3>热门推荐</h3>
        <span>更多</span>
      </div>
      <div class="group-content">
        <ul>
          <li v-for="item, index in hotPlaylist"
              :key="index">
            <img :src="item.picUrl"
                 alt="">
            <h4>{{ item.name }}</h4>
          </li>
        </ul>
      </div>
    </div>

    <div class="group"
         data-aos="fade-up"
         data-aos-easing="ease"
         data-aos-duration="1000"
         data-aos-delay="100">
      <div class="group-top">
        <h3>新碟上架</h3>
        <span>更多</span>
      </div>
      <div class="group-content">
        <ul>
          <li v-for="item, index in newest"
              :key="index">
            <img :src="item.picUrl"
                 alt="">
            <h4>{{ item.name }}</h4>
            <span>{{item.artist.name }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="group"
         data-aos="flip-left"
         data-aos-easing="ease"
         data-aos-duration="1000"
         data-aos-delay="100">
      <div class="group-top">
        <h3>热门歌手</h3>
        <span>更多</span>
      </div>
      <div class="group-content1">
        <ul>
          <li v-for="item, index in artistList"
              :key="index">
            <img :src="item.picUrl"
                 alt="">
            <h4>{{ item.name }}</h4>
          </li>
        </ul>
      </div>
    </div>

    <div class="group"
         data-aos="flip-right"
         data-aos-easing="ease"
         data-aos-duration="1000"
         data-aos-delay="100">
      <div class="group-top">
        <h3>榜单</h3>
        <span>更多</span>
      </div>
    </div>

  </div>
</template>

<script>
import Header from '@/components/Header'
import Carousel from '@/components/Carousel'
import AOS from 'aos'

export default {
  components: {
    Header, Carousel
  },
  data() {
    return {
      hotPlaylist: [],
      newest: [],
      artistList: []
    }
  },
  methods: {
    async getData() {
      const hotPlaylist = await this.$axios.get(this.api.personalized);
      this.hotPlaylist = hotPlaylist.data.result;
      const newest = await this.$axios.get(this.api.newest);
      this.newest = newest.data.albums
      const artist = await this.$axios.get(this.api.singerList);
      this.artistList = artist.data.artists;
    }
  },
  mounted() {
    this.getData();
    AOS.init();
  }
}
</script>

<style lang="scss" scoped>
.group {
  border: 1px solid #ccc;
  margin: 20px 10px;
  padding: 10px;
  .group-top {
    border-bottom: 2px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h3 {
      margin-top: 10px;
    }
  }
  .group-content {
    ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      li {
        width: 100px;
        margin: 10px;
        img {
          width: 100px;
          height: 100px;
        }
        h4 {
          font-size: 14px;
        }
        span {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
  .group-content1 {
    ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      li {
        width: 120px;
        margin: 10px;
        display: flex;
        align-items: center;
        border: 1px solid #ccc;
        img {
          width: 50px;
          height: 50px;
          margin-right: 10px;
        }
        h4 {
          font-size: 14px;
        }
      }
    }
  }
}
</style>