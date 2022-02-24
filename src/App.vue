<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
      <router-view v-if="isRouterAlive" />
    

    <Audio :url="this.$store.state.currentUrl" :info="this.$store.state.musicInfo"></Audio>
  </div>
</template>

<script>
import Audio from '@/components/Audio'

export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  components: {
    Audio
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  mounted() {
    this.$router.afterEach((to, from, next) => {
        window.scrollTo(0, 0)
    })
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      })
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #f5f5f5;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
ul li {
  margin: 0;
  padding: 0;
  list-style: none;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
</style>
