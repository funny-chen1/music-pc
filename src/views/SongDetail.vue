<template>
  <div>
    <Menu></Menu>
    <div class="container song-detail">

      <!-- 歌单标题详情 -->
      <div class="main-info">
        <img :src="detailInfo.coverImgUrl"
             alt="">
        <div class="text-info">
          <h2>{{ detailInfo.name }}</h2>
          <div class="creator">
            <img :src="detailInfo.creator.avatarUrl"
                 alt="">
            <span>{{ detailInfo.creator.nickname }}</span>
          </div>
          <div class="operation">
            <Button type="primary"
                    shape="circle">
              <Icon type="ios-play"></Icon> 播放
            </Button>
            <Button type="primary"
                    shape="circle"
                    @click="collect">
              <Icon type="plus-round"></Icon>收藏
            </Button>
            <Button type="primary"
                    shape="circle">转发({{ detailInfo.shareCount }})</Button>
            <Button type="primary"
                    shape="circle">下载</Button>
            <Button type="primary"
                    shape="circle">评论({{ detailInfo.commentCount }})</Button>
          </div>
          <div class="tags">
            <span>标签：</span>
            <Tag v-for="v,k in detailInfo.tags"
                 :key="k">{{v}}</Tag>
          </div>
          <p>介绍：{{detailInfo.description}}</p>
        </div>
      </div>
      <!-- 歌单标题详情结束 -->

      <div class="song-list">

        <!-- 歌单列表 -->
        <div class="header">
          <h3>歌曲列表</h3>
          <span>{{detailInfo.trackCount}}首歌</span>
          <span>播放量：<i>{{detailInfo.playCount}}</i></span>
        </div>
        <Table height="810"
               :columns="columns"
               :data="allList"></Table>

        <!-- 歌单列表结束 -->

        <!-- 评论列表 -->
        <div class="header"
             style="margin-top: 50px;">
          <h3>评论</h3>
          <span>共{{ detailInfo.commentCount }}条评论</span>
          <Button size="small" @click="modal = true">发表评论</Button>
        </div>
        <div class="comment-content"
             v-for="item,index in commentList"
             :key="index">
          <img :src="item.user.avatarUrl"
               alt="">
          <div class="content">
            <p><span class="name">{{ item.user.nickname }}：</span>{{ item.content }}</p>
            <div class="time">
              <span>{{ item.timeStr }}</span>
              <Button size="small">点赞({{ item.likedCount }})</Button>
            </div>
          </div>
        </div>
        <!-- 评论列表结束 -->
      </div>
    </div>

    <!-- 评论弹窗 -->
    <Modal v-model="modal"
           title="评论"
           :mask-closable="false"
           @on-ok="comment"
           @on-cancel="modal = false">
      <textarea name=""
                id=""
                cols="50"
                rows="4"
                style="padding: 10px;"
                v-model="commentContent"></textarea>
    </Modal>
  </div>
</template>

<script>
import Menu from '@/components/Menu'

export default {
  inject: ['reload'],
  components: {
    Menu
  },
  data() {
    return {
      detailInfo: {
        creator: {}
      },
      allSong: [],
      columns: [
        {
          title: ' ',
          key: 'index',
          width: 100
        },
        {
          title: '歌曲标题',
          key: 'name',
          width: 350
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
          width: 150,
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
      ],
      allList: [],
      commentList: [],
      modal: false,
      commentContent: ''
    }
  },
  methods: {
    async playMusic(data) {
      const res = await this.$axios.get(this.api.musicUrl + '?id=' + data.id);
      this.$store.commit('playStatus', res.data.data[0].url);
      this.$store.commit('musicInfoStatus', data);
    },
    async comment() {
      let data = {
        t: 1,
        type: 2,
        id: this.$route.params.id,
        content: this.commentContent,
        cookie: localStorage.getItem('cookie')
      };
      if (data.cookie) {
        const res = await this.$axios.post(this.api.comment, data);
        if (res.data.code == 200) {
          this.$Message.success('发表成功！');
          this.reload();
        } else {
          this.$Message.error('发表失败！');
        }
      } else {
        this.$Message.error('请先登录！');
      }
      this.commentContent = '';
    },
    async collect(type) {
      // let data = {
      //   t: type,
      //   id: this.$route.params.id,
      //   cookie: localStorage.getItem('cookie')
      // };
      // if (data.cookie) {
      //   const res = await this.$axios.post(this.api.collectPlaylist, data);
      //   if (res.data.code == 200) {
      //     this.$Message.success('收藏成功！');
      //   } else {
      //     this.$Message.success('收藏失败！');
      //   }
      // } else {
      //   this.$Message.error('请先登录！');
      // }
    }
  },
  created() {
    let url = this.api.songDetail + '?id=' + this.$route.params.id;
    let url2 = this.api.allSong + '?id=' + this.$route.params.id;
    //歌单详情
    this.$axios.get(url).then((res) => {
      this.detailInfo = res.data.playlist;
    }).catch((err) => {
      console.log(err);
    });

    //歌单所有歌曲
    this.$axios.get(url2).then((res) => {
      this.allSong = res.data.songs;
      let list = [];

      this.allSong.forEach(function (value, key) {
        let str = {
          id: value.id,
          index: key + 1,
          name: value.name,
          singer: value.ar[0].name,
          al: value.al.name
        };
        list.push(str);
      })
      this.allList = list;
    }).catch((err) => {
      console.log(err);
    });

    //歌单评论
    this.$axios.get(this.api.playListComment + '?id=' + this.$route.params.id).then((res) => {
      this.commentList = res.data.comments;
    }).catch((err) => { console.log(err); });
  }
}
</script>

<style lang="scss" scoped>
.song-detail {
  border: 1px solid #ccc;
  background-color: #fff;
  min-height: 700px;
  width: 1080px;
  padding: 30px 20px;
  .main-info {
    padding: 0 50px;
    display: flex;
    img {
      width: 208px;
      height: 208px;
    }
    .text-info {
      text-align: left;
      width: 100%;
      // border: 1px solid #ccc;
      padding: 0 50px;
      h2 {
        font-size: 22px;
      }
      .creator {
        img {
          width: 30px;
          height: 30px;
          margin-right: 5px;
        }
        span {
          font-size: 14px;
          cursor: pointer;
        }
      }
      .operation {
        width: 68%;
        display: flex;
        justify-content: space-between;
        margin: 15px 0;
      }
      .tags {
        color: #5f5f5f;
        margin-bottom: 5px;
      }
      p {
        color: #5f5f5f;
      }
    }
  }
  .song-list {
    padding: 20px 0;
    .header {
      width: 100%;
      border-bottom: 2px solid #000;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      h3 {
        margin-top: 10px;
      }
      i {
        color: #31708f;
      }
    }
  }
  .comment-content {
    border-bottom: 1px dashed #999;
    padding: 20px 0;
    display: flex;
    img {
      width: 50px;
      height: 50px;
    }
    .content {
      width: 100%;
      p {
        text-align: left;
        padding: 0 20px;
        .name {
          color: #0c73c2;
        }
      }
      .time {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
      }
    }
  }
}
</style>