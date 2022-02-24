<template>
  <div class="footer">
      <h3>站点链接</h3>
      <ul>
          <li v-for="item, index in menuItem" :key="index" @click="toPage(item.index)">
              {{ item.title }}
          </li>
      </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  methods: {
    toPage(index) {
      this.$router.push(index);
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
    width: 100%;
    background-color: #000;
    color: #fff;
    padding: 10px 0;
    ul {
      li {
        margin: 10px;
      }
    }
    h3 {
      margin-top: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid #fff;
    }
}
</style>