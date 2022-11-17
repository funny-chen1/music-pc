<template>
  <div>
    <Menu></Menu>

    <div class="container"
         data-aos="fade-up"
         data-aos-easing="ease"
         data-aos-duration="800"
         data-aos-delay="100">
      <div class="search-box">
        <input type="text"
               v-model="keywords"
               placeholder="输入搜索的内容...">
        <button @click="submit()">搜索</button>
      </div>
      <div class="result-main"
           v-if="result.songs">
        <span class="tip">共找到 <i>{{ result.songCount }}</i> 首单曲</span>
        <ul>
          <li v-for="item, index in result.songs"
              :key="index"
              :class="{'bg': index%2 != 0}"
              @click="playMusic(item)">
            <h3>{{ item.name }}</h3>
            <span>{{ item.artists[0].name }}</span>
            <span>{{ item.album.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/Menu'
import { search } from '@/api/getData'
export default {
  components: {
    Menu
  },
  data() {
    return {
      keywords: '',
      result: {}
    }
  },
  methods: {
    async submit() {
      const res = await search({ keywords: this.keywords });
      this.result = res.result;
    },
    async playMusic(data) {
      const res = await this.$axios.get(this.api.musicUrl + '?id=' + data.id);
      this.$store.commit('playStatus', res.data.data[0].url);
      this.$store.commit('musicInfoStatus', data);
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: #fff;
  width: 1080px;
  padding: 50px 20px;
  box-shadow: 0 5px 10px #ccc;
  .search-box {
    input {
      width: 350px;
      height: 40px;
      padding: 0 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 0 0 5px #ccc;
      outline: none;
    }
    button {
      height: 40px;
      width: 80px;
      border: none;
      border-radius: 5px;
      box-shadow: 0 0 3px #999;
      outline: none;
    }
  }
  .result-main {
    padding: 30px;
    text-align: left;
    .tip {
      color: #999;
      i {
        color: red;
      }
    }
    ul {
      margin: 20px 0;
      li {
        height: 40px;
        display: flex;
        align-items: center;
        cursor: pointer;
        &:hover {
          background-color: #ccc;
        }
        h3 {
          font-size: 14px;
          margin: 0;
          width: 60%;
        }
        span {
          width: 20%;
          color: #999;
        }
      }
      .bg {
        background-color: #f7f7f7;
      }
    }
  }
}
</style>