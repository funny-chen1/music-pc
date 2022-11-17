<template>
  <div class="popup"
       :title="title"
       v-show="show">
    <div class="header">
      <img v-if="title.al"
           :src="title.al.picUrl"
           alt="">
      <span v-if="title.ar">{{ title.name }} - {{ title.ar[0].name }}</span>
    </div>
    <div class="item-list">
      <ul>
        <li @click="playMusic(title)"><img src="../assets/play.png"
               alt="">播放</li>
        <li><img src="../assets/folder-add.png"
               alt="">收藏</li>
        <li><img src="../assets/comments.png"
               alt="">评论</li>
        <li><img src="../assets/share.png"
               alt="">分享</li>
        <li v-if="title.al">专辑：{{ title.al.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: Object,
      default: () => { }
    },
    show: false
  },
  data() {
    return {

    }
  },
  methods: {
    async playMusic(obj) {
      const res = await this.$axios.get(this.api.musicUrl + '?id=' + obj.id);
      this.$store.commit('playStatus', res.data.data[0].url);
      this.$store.commit('musicInfoStatus', obj);
    }
  }
}
</script>

<style lang="scss" scoped>
.popup {
  width: 100%;
  height: 400px;
  position: sticky;
  bottom: 0;
  border-radius: 10px 10px 0 0;
  background-color: #fff;
  .header {
    padding: 10px 20px;
    text-align: left;
    border-bottom: 1px solid #ccc;
    img {
      width: 50px;
      height: 50px;
    }
  }
  .item-list {
    text-align: left;
    font-size: 18px;
    color: #8a8a8a;
    ul {
      li {
        margin: 20px 30px;
        display: flex;
        align-items: center;
        img {
          width: 25px;
          height: 25px;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>