<template>
  <div>
      <Header></Header>

      <div class="top-bg">
          <img v-if="detailInfo.backgroundCoverUrl" :src="detailInfo.backgroundCoverUrl" alt="" data-aos="fade-up" data-aos-easing="ease" data-aos-duration="600" data-aos-delay="100">
          <img v-else :src="detailInfo.coverImgUrl" alt="" data-aos="fade-up" data-aos-easing="ease" data-aos-duration="600" data-aos-delay="100">
          <div class="text-group" data-aos="fade-up" data-aos-easing="ease" data-aos-duration="800" data-aos-delay="100">
              <h4>{{ detailInfo.name }}</h4>
              <h5>-{{ detailInfo.updateFrequency }}-</h5>
              <span>{{ detailInfo.description }}</span>
          </div>
          <div class="btn-group" data-aos="fade-up" data-aos-easing="ease" data-aos-duration="800" data-aos-delay="100">
              <ul>
                  <li>收藏（{{ detailInfo.subscribedCount }}）</li>
                  <li>评论（{{ detailInfo.commentCount }}）</li>
                  <li>转发（{{ detailInfo.shareCount }}）</li>
              </ul>
          </div>
      </div>

      <div class="list">
          <ul>
              <li v-for="item,index in allSong" :key="index">
                  <div class="item-name">
                      <span style="margin-right: 20px;font-size: 16px;">{{ index+1 }}</span>
                      <div>
                          <h4>{{ item.name }}</h4>
                          <span class="name">{{ item.ar[0].name }}</span>
                      </div>
                  </div>
                  <img src="../assets/more.png" alt="" @click="openForm(item)" class="menu-icon">
              </li>
          </ul>
      </div>

      <div class="hide-box" v-if="modal">
          <div class="header">
            <img :src="currentInfo.al.picUrl" alt="">
            <span>{{ currentInfo.name }} - {{ currentInfo.ar[0].name }}</span>
          </div>
          <div class="item-list">
              <ul>
                  <li><img src="../assets/play.png" alt="">播放</li>
                  <li><img src="../assets/folder-add.png" alt="">收藏</li>
                  <li><img src="../assets/comments.png" alt="">评论</li>
                  <li><img src="../assets/share.png" alt="">分享</li>
                  <li>专辑：{{ currentInfo.al.name }}</li>
              </ul>
          </div>
      </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import AOS from 'aos'
export default {
    components: {
        Header
    },
    data() {
        return {
            detailInfo: {
                creator: {}
            },
            allSong: [],
            commentList: [],
            modal: false,
            currentInfo: {}
        }
    },methods: {
        async initData() {
            const res1 = await this.$axios.get(this.api.songDetail + '?id=' + this.$route.params.id);
            this.detailInfo = res1.data.playlist;

            const res2 = await this.$axios.get(this.api.allSong + '?id=' + this.$route.params.id);
            this.allSong = res2.data.songs;

            const res3 = await this.$axios.get(this.api.playListComment + '?id=' + this.$route.params.id);
            this.commentList = res3.data.comments;
        },
        async openForm(obj) {
            this.modal = true;
            this.currentInfo = obj;
        }
    },
    created() {
        this.initData();
    },
    mounted() {
        AOS.init();
        document.addEventListener('click', (e) => {
            if (e.target.className != 'menu-icon') {
                this.modal = false;
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.top-bg {
    position: relative;
    img {
        width: 100%;
    }
    .text-group {
        position: absolute;
        bottom: 20px;
        padding: 10px 50px;
        color: #fff;
        h4 {
            font-weight: bold;
            font-size: 18px;
        }
        h5 {
            font-size: 12px;
        }
        span {
            font-size: 12px;
        }
    }
    .btn-group {
        position: absolute;
        bottom: -20px;
        left: 50%;
        margin-left: -160px;
        width: 320px;
        height: 40px;
        border-radius: 20px;
        background-color: #fff;
        color: #000;
        ul {
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            li {
                text-align: center;
                font-size: 12px;
                width: 33.3%;
                &:nth-of-type(1) {
                    border-right: 1px solid #ccc;
                }
                &:nth-of-type(2) {
                    border-right: 1px solid #ccc;
                }
            }
        }
    }
}
.list {
    padding: 30px 20px;
    ul {
        li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid #ccc;
            img {
                width: 20px;
                height: 20px;
            }
            .item-name {
                display: flex;
                align-items: center;
                text-align: left;
                h4 {
                    font-size: 16px;
                    margin: 0;
                }
                .name {
                    font-size: 12px;
                    color: #999;
                }
            }
        }
    }
}
.hide-box {
    width: 100%;
    height: 400px;
    background-color: #fff;
    position: sticky;
    bottom: 0;
    border-radius: 20px;
    .header {
        padding: 10px 20px;
        text-align: left;
        border-bottom: 1px solid #ccc;
        img {
            width: 50px;
            height: 50px;
        }
    }
    .item-list {
        text-align: left;
        font-size: 18px;
        color: #8a8a8a;
        ul {
            li {
                margin: 20px 30px;
                display: flex;
                align-items: center;
                img {
                    width: 25px;
                    height: 25px;
                    margin-right: 10px;
                }
            }
        }
    }
}
</style>