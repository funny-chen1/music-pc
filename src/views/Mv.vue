<template>
  <div>
    <Menu></Menu>
    <div class="container mv-detail">
      <Row style="width: 100%;">
        <Col span="18">
        <div class="mv-box">
          <h3>{{ mvInfo.name }}</h3>
          <span>{{ mvInfo.artistName }}</span>
          <iframe :src="mvUrl"
                  frameborder="0"
                  height="420"
                  width="100%"
                  allowfullscreen="true"></iframe>
          <div class="btn-group">
            <Button>点赞({{ mvCount.likedCount }})</Button>
            <Button @click="collect('1')"
                    v-if="!collected">收藏({{ mvInfo.subCount }})</Button>
            <Button @click="collect('0')"
                    v-if="collected">取消收藏({{ mvInfo.subCount }})</Button>
            <Button>分享({{ mvCount.shareCount }})</Button>
          </div>
        </div>
        <div class="comment-box">
          <div class="header">
            <h3>评论</h3>
            <span>共{{ mvInfo.commentCount }}条评论</span>
            <Button size="small"
                    @click="modal = true">发表评论</Button>
          </div>
          <div class="comment-content"
               v-for="item, index in commentList"
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
        </div>
        </Col>
        <Col span="6"
             class="right">
        <span class="title">MV简介</span>
        <p>发布时间：{{ mvInfo.publishTime }}</p>
        <p>播放次数：{{ mvInfo.playCount }}</p>
        </Col>
      </Row>
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
  components: {
    Menu
  },
  inject: ['reload'],
  data() {
    return {
      mvInfo: {},
      mvUrl: '',
      mvCount: {},
      commentList: [],
      modal: false,
      commentContent: '',
      collected: false
    }
  },
  created() {
    this.$axios.get(this.api.mv + '?mvid=' + this.$route.params.id).then((res) => {
      this.mvInfo = res.data.data;
    }).catch((err) => { console.log(err); });

    this.$axios.get(this.api.mvUrl + '?id=' + this.$route.params.id).then((res) => {
      this.mvUrl = res.data.data.url;
    }).catch((err) => { console.log(err); });

    this.$axios.get(this.api.mvLikeCount + '?mvid=' + this.$route.params.id).then((res) => {
      this.mvCount = res.data;
      console.log(res.data);
    }).catch((err) => { console.log(err); });

    this.$axios.get(this.api.mvComment + '?id=' + this.$route.params.id).then((res) => {
      this.commentList = res.data.comments;
    }).catch((err) => { console.log(err); });

    this.$axios.post(this.api.collectedMv, { cookie: localStorage.getItem('cookie') }).then((res) => {
      res.data.data.forEach((v, k) => {
        if (v.vid == this.$route.params.id) {
          this.collected = true;
        }
      })
    }).catch((err) => { });
  },
  methods: {
    async comment() {
      let data = {
        t: 1,
        type: 1,
        id: this.$route.params.id,
        content: this.commentContent,
        cookie: localStorage.getItem('cookie')
      }
      const res = await this.$axios.post(this.api.comment, data);
      console.log(res.data);
      if (res.data.code == 200) {
        this.$Message.success('发表成功！');
        this.reload();
      } else {
        this.$Message.error('发表失败！');
      }
    },
    async collect(t) {
      let data = {
        t: t,
        mvid: this.$route.params.id,
        cookie: localStorage.getItem('cookie')
      }
      const res = await this.$axios.post(this.api.collectMv, data);
      console.log(res.data);
      if (res.data.code == 200 && t == 1) {
        this.$Message.success('收藏成功！');
        this.reload();
      } else if (res.data.code == 200 && t == 0) {
        this.$Message.success('取消收藏成功！');
        this.reload();
      } else{
        this.$Message.error('收藏失败！');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mv-detail {
  border: 1px solid #ccc;
  background-color: #fff;
  min-height: 700px;
  width: 1080px;
  padding: 30px 20px;
  display: flex;
  .right {
    border-left: 1px solid #ccc;
    padding: 0 20px;
    .title {
      font-size: 12px;
      font-weight: bold;
      border-bottom: 1px solid #ccc;
      width: 100%;
      text-align: left;
      display: block;
      margin-bottom: 20px;
      padding: 5px 0;
    }
    p {
      font-size: 12px;
      color: #999;
      text-align: left;
    }
  }
  .mv-box {
    text-align: left;
    padding: 0 20px;
    h3 {
      margin-top: 5px;
    }
    span {
      margin-bottom: 10px;
      display: block;
      color: #0c73c2;
    }
    .btn-group {
      margin: 20px 0;
    }
  }
  .comment-box {
    margin: 50px 0;
    padding: 0 20px;
    .header {
      width: 100%;
      border-bottom: 2px solid #000;
      display: flex;
      align-items: center;
      padding: 0 10px;
      h3 {
        margin-top: 10px;
        margin-right: 30px;
      }
      span {
        margin-right: 30px;
      }
    }
    .comment-content {
      border-bottom: 1px dashed #999;
      padding: 20px 0;
      display: flex;
      font-size: 12px;
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
}
</style>