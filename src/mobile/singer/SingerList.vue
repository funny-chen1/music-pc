<template>
  <div>
    <Header></Header>
    <div class="singerlist">

      <div class="top-banner">
        <Dropdown trigger="click"
                  style="margin-left: 20px">
          <a href="javascript:void(0)">
            全部
          </a>
        </Dropdown>
        <Dropdown trigger="click"
                  style="margin-left: 20px;"
                  v-for="item,index in category"
                  :key="index">
          <a href="javascript:void(0)">
            {{ item.title }}
            <Icon type="arrow-down-b"></Icon>
          </a>
          <Dropdown-menu slot="list">
            <Dropdown-item v-for="i,key in code"
                           :key="key"
                           @click.native="selectCat(item, i)"><span>{{i}}</span></Dropdown-item>
          </Dropdown-menu>
        </Dropdown>
      </div>

      <div class="main">
        <ul>
          <li v-for="item, index in currentList"
              :key="index"
              @click="getSingerDetail(item)">
            <div class="pic">
              <img :src="item.picUrl"
                   alt="">
              <h4>{{ item.name }}</h4>
            </div>
            <div class="sub-btn">
              + 关注
            </div>

          </li>
        </ul>
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
      currentList: [],
      category: [
        { title: '华语男歌手', type: 1, area: 7 },
        { title: '华语女歌手', type: 2, area: 7 },
        { title: '欧美男歌手', type: 1, area: 96 },
        { title: '欧美女歌手', type: 2, area: 96 },
        { title: '韩国男歌手', type: 1, area: 16 },
        { title: '韩国女歌手', type: 2, area: 16 }
      ],
      code: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    }
  },
  methods: {
    async initData() {
      const res = await this.$axios.get(this.api.singerList);
      console.log(res);
      this.currentList = res.data.artists;
    },
    async selectCat(obj, i) {
      let url = this.api.artistsList + '?type=' + obj.type + '&area=' + obj.area + '&initial=' + i;
      let res = await this.$axios.get(url);
      this.currentList = res.data.artists;
    },
    async getSingerDetail(obj) {
      this.$router.push({path: `/singerdetail/${obj.id}`});
    }
  },
  created() {
    this.initData();
  }
}
</script>

<style lang="scss" scoped>
.singerlist {
  padding: 20px 0;
  color: #000;
  .top-banner {
    text-align: left;
    padding: 0 10px;
  }
  .main {
    margin: 20px;
    padding: 5px 20px;
    border-radius: 10px;
    background-color: #fff;
    ul {
      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 20px 0;
        .pic {
          display: flex;
          align-items: center;
        }
        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin-right: 15px;
        }
        .sub-btn {
          padding: 5px 10px;
          border: 1px solid red;
          border-radius: 20px;
          color: red;
        }
      }
    }
  }
}
</style>