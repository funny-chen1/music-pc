<template>
  <div>
    <Header></Header>
    <div class="songlist">
      <div class="top-banner">
        <Dropdown trigger="click"
                  style="margin-left: 20px">
          <a href="javascript:void(0)"
             @click="selectCat()">
            全部
          </a>
        </Dropdown>
        <Dropdown trigger="click"
                  style="margin-left: 20px;"
                  v-for="item,index in allCat"
                  :key="index">
          <a href="javascript:void(0)">
            {{ item }}
            <Icon type="arrow-down-b"></Icon>
          </a>
          <Dropdown-menu slot="list">
            <Dropdown-item v-for="item,key in allList[index]"
                           :key="key"
                           @click.native="selectCat(item)"><span>{{item.name}}</span></Dropdown-item>
          </Dropdown-menu>
        </Dropdown>
      </div>
      <div class="main">
        <ul>
            <li v-for="item,index in currentList.playlists" :key="index">
                <img :src="item.coverImgUrl" alt="" @click="goSongDetail(item)">
                <h4>{{ item.name }}</h4>
                <span>by:{{ item.creator.nickname }}</span>
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
      allCat: {},
      allList: {},
      currentList: []
    }
  },
  methods: {
    async initData() {
      const res = await this.$axios.get(this.api.allCatlist);
      this.allCat = res.data.categories;
      let list = res.data.sub;
      this.allList = this._.groupBy(list, function (o) {
        return o.category;
      })

      const res1 = await this.$axios.get(this.api.allPlayList);
      this.currentList = res1.data;
    },
    async selectCat(obj) {
        let url = this.api.allPlayList + '?cat=' + obj.name;
        const res = await this.$axios.get(url);
        this.currentList = res.data;
    },
    async goSongDetail(obj) {
        this.$router.push({path: `/songdetail/${obj.id}`});
    }
  },
  created() {
    this.initData();
  }
}
</script>

<style lang="scss" scoped>
.songlist {
  padding: 20px 0;
  color: #000;
  .top-banner {
    text-align: left;
    padding: 0 10px;
  }
  .main {
    padding: 10px;
    ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        li {
            width: 100px;
            margin: 10px;
            img {
                width: 100px;
                height: 100px;
                border-radius: 10px;
            }
            h4 {
                font-size: 14px;
                overflow: hidden;
                white-space: nowrap;
                word-break: keep-all;
                text-overflow: ellipsis;
            }
            span {
                font-size: 12px;
                color: #999;
            }
        }
    }
  }
}
</style>