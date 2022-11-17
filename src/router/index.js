import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

var routes = [];

//pc端路由
const routesWeb = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',   //首页
    name: 'Index',
    meta: { title: '首页' },
    component:  resolve => (require(['@/views/Index'], resolve))
  },
  {
    path: '/my',  //我的音乐
    name: 'My',
    meta: { title: '我的音乐' },
    component: resolve => (require(['@/views/My'], resolve))
  },
  {
    path: '/songlist',
    name: 'SongList',
    meta: { title: '全部歌单' },
    component: resolve => (require(['@/views/SongList'], resolve))
  },
  {
    path: '/songdetail/:id',
    name: 'SongDetail',
    meta: { title: '歌单详情' },
    component: resolve => (require(['@/views/SongDetail'], resolve))
  },
  {
    path: '/singerlist',
    name: 'SingerList',
    meta: { title: '全部歌手' },
    component: resolve => (require(['@/views/singer/SingerList'], resolve))
  },
  {
    path: '/singerdetail/:id',
    name: 'SingerDetail',
    meta: { title: '歌手详情' },
    component: resolve => (require(['@/views/singer/SingerDetail'], resolve))
  },
  {
    path: '/mv/:id',
    name: 'Mv',
    meta: {title: 'MV'},
    component: resolve => (require(['@/views/Mv'], resolve))
  },
  {
    path: '/musician',
    name: 'Musician',
    meta: {title: '音乐人'},
    component: resolve => (require(['@/views/Musician'], resolve))
  },
  {
    path: '/album',
    name: 'Album',
    meta: {title: '专辑'},
    component: resolve => (require(['@/views/album/AlbumList'], resolve))
  },
  {
    path: '/albumdetail/:id',
    name: 'AlbumDetail',
    meta: {title: '专辑详情'},
    component: resolve => (require(['@/views/album/AlbumDetail'], resolve))
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {title: '个人设置'},
    component: resolve => (require(['@/views/Profile'], resolve))
  },
  {
    path: '/search',
    name: 'Search',
    meta: {title: '搜索'},
    component: resolve => (require(['@/views/Search'], resolve))
  }
];

//移动端路由
const routesMobile = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',   //首页
    name: 'Index',
    meta: {title: '首页'},
    component: resolve => (require(['@/mobile/Index'], resolve))
  },
  {
    path: '/songlist',
    name: 'SongList',
    meta: {title: '全部歌单'},
    component: resolve => (require(['@/mobile/SongList'], resolve))
  },
  {
    path: '/songdetail/:id',
    name: 'SongDetail',
    meta: { title: '歌单详情' },
    component: resolve => (require(['@/mobile/SongDetail'], resolve))
  },
  {
    path: '/my',
    component: resolve => (require(['@/mobile/my/My'], resolve)),
    children: [
      {
        path: '',
        meta: {title: '我的音乐'},
        component: resolve => (require(['@/mobile/my/children/Item'], resolve))
      },
      {
        path: 'artists',
        name: 'Artists',
        meta: {title: '我的歌手'},
        component: resolve => (require(['@/mobile/my/children/Artists'], resolve))
      },
      {
        path: 'mvs',
        name: 'Mv',
        meta: {title: '我的歌手'},
        component: resolve => (require(['@/mobile/my/children/Mv'], resolve))
      },
      {
        path: 'albums',
        name: 'Album',
        meta: {title: '收藏专辑'},
        component: resolve => (require(['@/mobile/my/children/Album'], resolve))
      }
    ]
  },
  {
    path: '/singerlist',
    name: 'SingerList',
    meta: {title: '歌手'},
    component: resolve => (require(['@/mobile/singer/SingerList'], resolve))
  },
  {
    path: '/singerdetail/:id',
    name: 'SingerDetail',
    meta: {title: '歌手详情'},
    component: resolve => (require(['@/mobile/singer/SingerDetail'], resolve))
  },
  {
    path: '/musician',
    name: 'Musician',
    meta: {title: '音乐人'},
    component: resolve => (require(['@/mobile/Musician'], resolve))
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {title: '设置'},
    component: resolve => (require(['@/mobile/Profile'], resolve))
  },
  {
    path: '/mv/:id',
    name: 'Mv',
    meta: {title: 'MV'},
    component: resolve => (require(['@/mobile/Mv'], resolve))
  },
  {
    path: '/albumlist',
    name: "AlbumList",
    meta: {title: '专辑'},
    component: resolve => (require(['@/mobile/album/AlbumList'], resolve))
  },
  {
    path: '/albumdetail/:id',
    name: 'AlbumDetail',
    meta: {title: '专辑详情'},
    component: resolve => (require(['@/mobile/album/AlbumDetail'], resolve))
  }
]

//判断设备类型，显示对应路由
if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
  routes = routesMobile
} else {
  routes = routesWeb
}

const router = new Router({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
})
export default router;

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
