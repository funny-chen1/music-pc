<template>
  <div class="banner">
    <Carousel v-model="value">
      <Carousel-item v-for="item,index in bannerList"
                     :key="index">
        <div class="demo-carousel">
          <img :src="item.imageUrl" alt="">
        </div>
      </Carousel-item>
    </Carousel>
  </div>

</template>

<script>
export default {
  data() {
    return {
      value: 0,
      bannerList: {}
    }
  },
  created() {
    this.$axios.get(this.api.banner)
      .then((result) => {
        this.bannerList = result.data.banners;
      }).catch((err) => {
        console.log(err);
      });
  }
}
</script>

<style lang="scss" scoped>
.banner {
    height: 400px;
    background-color: #c4c4c4;
}
</style>