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
      <div class="card">
          <h4 class="title">艺人百科</h4>
          <ul>
              <li><span>艺人名： {{ artistsInfo.artist.name }}</span></li>
              <li><span>译名： {{ artistsInfo.artist.transNames[0] }}</span></li>
              <li><span>身份： {{ artistsInfo.identify.imageDesc }}</span></li>
          </ul>
          <p>{{ artistsInfo.artist.briefDesc }}</p>
      </div>
    </div>

  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  components: {
    Header
  },
  data() {
    return {
      introList: [],
      artistsInfo: {
        artist: {},
        identify: {}
      }
    }
  },
  methods: {
    async initData() {
      const res1 = await this.$axios.get(this.api.artistDesc + '?id=' + this.$route.params.id);
      console.log(res1.data);
      const res2 = await this.$axios.get(this.api.singerDetail + '?id=' + this.$route.params.id);
      this.artistsInfo = res2.data.data;
      console.log(this.artistsInfo);
    }
  },
  created() {
    this.initData();
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
    margin: 20px auto;
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
}
</style>