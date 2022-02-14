<template>
  <div>
    <Menu></Menu>
    <div class="container singer-detail">
      <div class="singer-name">
        <h2>{{ singerInfo.name }}</h2>
        <h3 v-if="singerInfo.alias">{{ singerInfo.alias[0] }}</h3>
      </div>
      <div class="singer-bg">
        <img :src="singerInfo.picUrl"
             alt="">
        <button @click="collect('0')"
                v-if="collected">已收藏</button>
        <button @click="collect('1')"
                v-else>收藏</button>
      </div>
      <div class="main">
        <Tabs value="name1">
          <Tab-pane label="热门作品"
                    name="name1">
            <Table height="810"
                   :columns="columns"
                   :data="allSongs"></Table>
          </Tab-pane>
          <Tab-pane label="所有专辑"
                    name="name2">
            <ul class="album">
              <li v-for="item,index in allAlbums"
                  :key="index">
                <img :src="item.picUrl"
                     alt="">
                <h4>{{ item.name }}</h4>
                <span>{{ item.publishTime | formatTime }}</span>
              </li>
            </ul>
          </Tab-pane>
          <Tab-pane label="相关MV"
                    name="name3">
            <ul class="mvlist">
              <li v-for="item,index in mvList"
                  :key="index"
                  @click="getMvDetail(item)">
                <img :src="item.imgurl"
                     alt="">
                <span>{{ item.name }}</span>
              </li>
            </ul>
          </Tab-pane>
          <Tab-pane label="艺人介绍"
                    name="name4">
            <p>{{singerInfo.briefDesc}}</p>
            <p class="introduction"
               v-for="item,index in introList"
               :key="index">
              <span class="title">{{ item.ti }}</span>
              {{ item.txt }}
            </p>
          </Tab-pane>
        </Tabs>
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
  inject: ['reload'],
  data() {
    return {
      singerInfo: {},
      allSongs: [],
      allAlbums: [],
      mvList: [],
      introList: [],
      artistList: [],
      collected: false,
      columns: [
        {
          title: ' ',
          key: 'index',
          width: 100
        },
        {
          title: '歌曲标题',
          key: 'name',
          width: 320
        },
        {
          title: '歌手',
          key: 'singer',
          width: 150
        },
        {
          title: '专辑',
          key: 'al'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 180,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  shape: 'circle',
                  icon: 'ios-play-outline',
                },
                style: {
                  'justify-content': 'center',
                  'margin-right': '10px',
                },
                on: {
                  click: () => {
                    this.playMusic(params.row);
                  }
                }
              }),
              h('Button', {
                props: {
                  type: 'primary',
                  shape: 'circle',
                },
                style: {
                  'justify-content': 'center',
                },
                on: {
                  click: () => {

                  }
                }
              }, '收藏')
            ])
          }
        }
      ]
    }
  },
  computed: {
  },
  created() {
    //歌手单曲
    this.$axios.get(this.api.artistDetail + '?id=' + this.$route.params.id).then((res) => {
      this.singerInfo = res.data.artist;
      res.data.hotSongs.forEach((value, key) => {
        let str = {
          id: value.id,
          index: key + 1,
          name: value.name,
          singer: value.ar[0].name,
          al: value.al.name
        };
        this.allSongs.push(str);
      });
    }).catch((err) => { console.log(err) });

    //歌手专辑
    this.$axios.get(this.api.albumList + '?id=' + this.$route.params.id).then((res) => {
      this.allAlbums = res.data.hotAlbums;
    }).catch((err) => { console.log(err) });

    //歌手mv
    this.$axios.get(this.api.mvList + '?id=' + this.$route.params.id).then((res) => {
      this.mvList = res.data.mvs;
    }).catch((err) => { console.log(err) });

    //歌手介绍详情
    this.$axios.get(this.api.artistDesc + '?id=' + this.$route.params.id).then((res) => {
      this.introList = res.data.introduction;
    }).catch((err) => { });

    //歌手是否已经收藏
    this.$axios.post(this.api.collectedSinger, { cookie: localStorage.getItem('cookie') }).then((res) => {
      res.data.data.forEach((v,k) => {
        if (v.id == this.$route.params.id) {
          this.collected = true;
        }
      })
    }).catch((err) => { });

  },
  methods: {
    async playMusic(obj) {
      const res = await this.$axios.get(this.api.musicUrl + '?id=' + obj.id);
      this.$store.commit('playStatus', res.data.data[0].url);
      this.$store.commit('musicInfoStatus', obj);
    },
    getMvDetail(obj) {
      this.$router.push({ path: `/mv/${obj.id}` });
    },
    async collect(type) {
      let data = {
        t: type,
        id: this.$route.params.id,
        cookie: this.$store.state.userInfo.cookie,
        timestamp: new Date().getTime()
      };
      const res = await this.$axios.post(this.api.collectSinger, data);
      this.reload();
      if (res.data.code == 200) {
        this.$Message.success('收藏成功！');
      } else {
        this.$Message.error('收藏失败！');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.singer-detail {
  border: 1px solid #ccc;
  background-color: #fff;
  min-height: 700px;
  width: 1080px;
  padding: 30px 20px;
  .singer-name {
    display: flex;
    padding: 0 50px;
    h2 {
      color: #333;
      font-size: 24px;
      margin: 0 10px;
    }
    h3 {
      color: #999;
      font-size: 14px;
      margin-bottom: 0;
      margin-top: 10px;
    }
  }
  .singer-bg {
    padding: 0 50px;
    overflow: hidden;
    width: 100%;
    height: 400px;
    position: relative;
    img {
      width: 100%;
      margin-top: -170px;
    }
    button {
      width: 76px;
      height: 32px;
      position: absolute;
      bottom: 20px;
      right: 80px;
      background-color: #333;
      color: #fff;
      &:hover {
        background-color: #999;
      }
    }
  }
  .main {
    padding: 10px 50px;
    p {
      text-align: left;
      line-height: 24px;
      padding: 10px 20px;
    }
    .album {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 120px;
        margin: 15px 30px;
        cursor: pointer;
        img {
          width: 120px;
          height: 120px;
        }
        h4 {
          font-size: 14px;
          color: #000;
        }
        span {
          font-size: 12px;
          color: #666;
        }
      }
    }
    .mvlist {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        width: 137px;
        margin: 10px;
        cursor: pointer;
        img {
          width: 137px;
          height: 103px;
          margin-bottom: 10px;
        }
        span {
          display: block;
          overflow: hidden;
          white-space: nowrap;
          word-break: keep-all;
          text-overflow: ellipsis;
        }
      }
    }
    .introduction {
      .title {
        font-size: 16px;
        font-weight: bold;
        color: #333;
        display: block;
        margin: 10px 0;
      }
    }
  }
}
</style>