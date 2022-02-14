<template>
  <div class="audio" v-show="show">
    <div class="name">
        <h3>{{info.name}}</h3>
        <span>{{info.singer}}</span>
    </div>
    <audio :src="url" controls autoplay></audio>
  </div>
</template>

<script>
export default {
    props: {
        url: {
            default: ''
        },
        info: {
            default: ''
        }
    },
    data() {
        return {
            show: false
        }
    },
    updated() {
        if (this.url != '') {
            this.show = true;      
        }
    }
}
</script>

<style lang="scss" scoped>
.audio {
    min-width: 1080px;
    width: 100%;
    height: 60px;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #000;
    z-index: 10;
    display: flex;
    audio {
        width: 30%;
        height: 60px;
    }
    .name {
        color: #fff;
        padding: 0 50px;
        display: flex;align-items: center;
        h3 {
            margin-top: 10px;
            margin-right: 20px;
        }
    }
}
</style>