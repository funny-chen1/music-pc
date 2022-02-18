<template>
  <div>
    <Menu></Menu>
    <div class="container singerlist" data-aos="fade-up" data-aos-easing="ease" data-aos-duration="800" data-aos-delay="100">
      <div class="top-banner">
        <h3>全部歌手</h3>
        <Dropdown trigger="click"
                  style="margin-left: 20px"
                  v-for="item,index in category"
                  :key="index">
          <a href="javascript:void(0)">
            {{item.title}}
            <Icon type="arrow-down-b"></Icon>
          </a>
          <Dropdown-menu slot="list">
            <Dropdown-item v-for="i,k in code" :key="k" @click.native="selectCat(item, i)"><span>{{ i }}</span></Dropdown-item>
          </Dropdown-menu>
        </Dropdown>
      </div>
      <div class="singer-detail">
        <ul>
          <li v-for="item,index in currentList"
              :key="index"
              @click="getArtistDetail(item)">
            <img :src="item.picUrl"
                 alt="">
            <span>{{ item.name }}</span>
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
      async selectCat(item, i) {
          let url = this.api.artistsList + '?type=' + item.type + '&area=' + item.area + '&initial=' + i;
          let res = await this.$axios.get(url);
          this.currentList = res.data.artists;
      },
      async getArtistDetail(obj) {
          this.$router.push({ path: `/singerdetail/${obj.id}` });
      }
  },
  created() {
    this.$axios.get(this.api.singerList).then((res) => {
      this.currentList = res.data.artists;
    }).catch((err) => { });
  },
  mounted() {
    AOS.init();
  }
}
</script>

<style lang="scss" scoped>
.singerlist {
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
  .singer-detail {
    padding: 20px 30px;
    ul {
      display: flex;
      flex-wrap: wrap;
      cursor: pointer;
      justify-content: center;
      li {
        width: 170px;
        padding: 0 20px;
        margin-bottom: 20px;
        img {
          width: 130px;
          height: 130px;
          margin-bottom: 10px;
        }
        span {
          font-size: 14px;
          float: left;
        }
      }
    }
  }
}
</style>