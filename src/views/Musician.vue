<template>
  <div>
    <Menu></Menu>
    <div class="banner-bg">
      <div class="container"
           style="width: 1080px;">
        <div class="pic1">
          <img src="../assets/banner1.png"
               alt=""
               width="375px"
               height="175px">
        </div>
        <div>
          <img src="../assets/banner2.png"
               alt="">
        </div>
        <div class="btn-group">
          <span>立即入驻</span>
          <span>校园入驻</span>
        </div>
      </div>
    </div>
    <div class="scroll-box">
      <h1 class="big-title">30w+音乐人已加入</h1>
      <div class="content">
        <div class="item-list" id="item-list">
          <ul>
            <li v-for="item,index in artistList"
                :key="index">
              <img :src="item.picUrl"
                   alt="">
              <span>{{ item.name }}</span>
            </li>
          </ul>
          <ul>
            <li v-for="item,index in artistList"
                :key="index">
              <img :src="item.picUrl"
                   alt="">
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </div>
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
      artistList: [],
      left: 0
    }
  },
  methods: {
    async getSinger() {
      let res = await this.$axios.get(this.api.singerList);
      this.artistList = res.data.artists;
    }
  },
  mounted() {
    this.getSinger();
    let that = this;
    let item = document.getElementById('item-list');
    setInterval(function () {
      that.left --;
      item.style.left = that.left + 'px';
      if (that.left < -4500) {
          that.left = 0;
      }
    }, 10);
  }
}
</script>

<style lang="scss" scoped>
.banner-bg {
  background: transparent -webkit-linear-gradient(-90deg, #fafafa 83%, #f3cecc) 0%
    0% no-repeat padding-box;
  height: 653px;
  width: 100%;
  position: relative;
  .pic1 {
    margin-top: 50px;
  }
  .btn-group {
    width: 915px;
    height: 96px;
    background-color: #fff;
    border-radius: 42px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 55px auto;
    span {
      color: #000;
      font-size: 28px;
      width: 100%;
      &:first-child {
        border-right: 1px solid #999;
      }
    }
  }
}
.scroll-box {
  width: 100%;
  min-height: 800px;
  padding: 100px 0;
  .big-title {
    color: #1d1d1f;
    font-size: 52px;
    font-weight: 500;
    font-family: FZLTZHK--GBK1-0;
    margin: 50px auto;
  }
  .content {
    width: 1440px;
    height: 520px;
    // border: 1px solid #999;
    background-color: #fff;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    .item-list {
      position: absolute;
      left: 0;
      top: 50px;
      width: 9000px;
      max-height: 520px;
      display: flex;
      flex-wrap: nowrap;
      ul {
        display: flex;
        flex-wrap: wrap;
        max-height: 450px !important;
        width: 4500px;
        li {
          width: 160px;
          margin: 10px;
          img {
            width: 160px;
            height: 160px;
            border-radius: 50%;
            margin-bottom: 10px;
          }
        }
      }
    }
  }
}
</style>