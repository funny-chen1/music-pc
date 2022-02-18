<template>
  <div>
    <Menu></Menu>
    <div class="container songlist" data-aos="fade-up" data-aos-easing="ease" data-aos-duration="800" data-aos-delay="100">
      <div class="top-banner">
        <h3>全部歌单</h3>
        <Dropdown trigger="click"
                  style="margin-left: 20px"
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
      <div class="song-detail">
        <ul>
          <li v-for="item,index in currentList.playlists"
              :key="index"
              @click="getSongDetail(item)">
            <img :src="item.coverImgUrl"
                 alt="">
            <h4>{{ item.name }}</h4>
            <span>by:{{ item.creator.nickname }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/Menu'
import AOS from 'aos'

export default {
  components: {
    Menu
  },
  data() {
    return {
      allCat: {},
      allList: [],
      currentList: []
    }
  },
  methods: {
    selectCat(obj) {
      this.$axios.get(this.api.allPlayList + '?cat=' + obj.name).then((res) => {
        this.currentList = res.data;
      }).catch((err) => { });
    },
    getSongDetail(obj) {
      this.$router.push({ path: `/songdetail/${obj.id}` });
    }
  },
  created() {
    this.$axios.get(this.api.allCatlist).then((res) => {
      this.allCat = res.data.categories;
      let list = res.data.sub;
      this.allList = this._.groupBy(list, function (o) {
        return o.category;
      })
      console.log(str);
    }).catch((err) => { });

    this.$axios.get(this.api.allPlayList).then((res) => { this.currentList = res.data; }).catch((err) => { });
  },
  mounted() {
    AOS.init();
  }
}
</script>

<style lang="scss" scoped>
.songlist {
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
  .song-detail {
    padding: 20px 30px;
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
        }
        span {
          font-size: 12px;
          color: #ccc;
        }
      }
    }
  }
}
</style>