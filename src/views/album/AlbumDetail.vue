<template>
  <div>
    <Menu></Menu>
    <div class="container album-detail">
      <div class="main-info">
        <img :src="albumDetailList.picUrl"
             alt="">
        <div class="text-info">
          <h2>{{ albumDetailList.name }}</h2>
          <div class="creator">
            <span>歌手：{{ albumDetailList.artist.name }}</span>
            <span>发行时间：{{ albumDetailList.pushlishTime | formatTime }}</span>
            <span>发行公司：{{ albumDetailList.company}}</span>
          </div>
          <div class="operation">
            <Button type="primary"
                    shape="circle">
              <Icon type="ios-play"></Icon> 播放
            </Button>
            <Button type="primary"
                    shape="circle"
                    @click="collect('1')">
              <Icon type="plus-round"></Icon>收藏
            </Button>
            <Button type="primary"
                    shape="circle">转发({{ albumDetailList.info.shareCount }})</Button>
            <Button type="primary"
                    shape="circle">下载</Button>
            <Button type="primary"
                    shape="circle">评论({{ albumDetailList.info.commentCount }})</Button>
          </div>
        </div>
      </div>

      <div class="desc">
        <h3>专辑介绍：</h3>
        <p>{{ albumDetailList.description }}</p>
      </div>

      <!-- 歌曲列表 -->
      <div class="song-list">
        <div class="header">
          <h3>包含歌曲列表</h3>
          <span>{{ songs.length }}首歌</span>
        </div>
        <Table :columns="columns"
               :data="allList"></Table>

        <!-- 歌曲列表结束 -->

        <!-- 专辑评论 -->
        <div class="header"
             style="margin-top: 50px;">
          <h3>评论</h3>
          <span>共{{ commentList.length }}条评论</span>
          <Button size="small"
                  @click="modal = true">发表评论</Button>
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
        <!-- 专辑评论结束 -->

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
      albumDetailList: {
        artist: {},
        info: {}
      },
      songs: [],
      modal: false,
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
      commentContent: ''
    }
  },
  methods: {
    async getDetail() {
      const res = await this.$axios.get(this.api.albumDetail + '?id=' + this.$route.params.id);
      this.albumDetailList = res.data.album;
      this.songs = res.data.songs;

      let list = [];
      this.songs.forEach(function (value, key) {
        let str = {
          id: value.id,
          index: key + 1,
          name: value.name,
          singer: value.ar[0].name,
          al: value.al.name
        };
        list.push(str);
      });
      this.allList = list;
    },
    //播放音乐
    async playMusic(data) {
      const res = await this.$axios.get(this.api.musicUrl + '?id=' + data.id);
      this.$store.commit('playStatus', res.data.data[0].url);
      this.$store.commit('musicInfoStatus', data);
    },
    //获取评论
    async getComment() {
      const res = await this.$axios.get(this.api.albumComment + '?id=' + this.$route.params.id);
      this.commentList = res.data.comments;
    },
    //发表评论
    async comment() {
      let data = {
        t: 1,
        type: 3,
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
    //收藏专辑
    async collect(type) {
      let data = {
        t: type,
        id: this.$route.params.id,
        cookie: localStorage.getItem('cookie')
      };
      if (data.cookie) {
        const res = await this.$axios.post(this.api.collectAlbum, data);
        if (res.data.code == 200) {
          this.$Message.success('收藏成功！');
          this.reload();
        } else {
          this.$Message.success('收藏失败！');
        }
      } else {
        this.$Message.success('请先登录！');
      }
      
    }
  },
  created() {
    this.getDetail();
    this.getComment();
  }
}
</script>

<style lang="scss" scoped>
.album-detail {
  border: 1px solid #ccc;
  background-color: #fff;
  min-height: 700px;
  width: 1080px;
  padding: 30px 20px;
  .main-info {
    padding: 0 50px;
    display: flex;
    img {
      width: 180px;
      height: 180px;
    }
    .text-info {
      text-align: left;
      width: 100%;
      // border: 1px solid #ccc;
      padding: 0 50px;
      h2 {
        font-size: 22px;
        color: #333;
      }
      .creator {
        display: flex;
        flex-direction: column;
        span {
          font-size: 12px;
          color: #666;
          cursor: pointer;
          margin: 2px 0;
        }
      }
      .operation {
        width: 68%;
        display: flex;
        justify-content: space-between;
        margin: 15px 0;
      }
    }
  }
  .desc {
    padding: 0 50px;
    text-align: left;
    h3 {
      font-size: 16px;
      font-weight: bold;
    }
    p {
      color: #5f5f5f;
      font-size: 14px;
      width: 300px;
      line-height: 25px;
    }
  }
  .song-list {
    padding: 20px 50px;
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