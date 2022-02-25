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
    component: () => import('@/views/Index')
  },
  {
    path: '/my',  //我的音乐
    name: 'My',
    meta: { title: '我的音乐' },
    component: () => import('@/views/My')
  },
  // {
  //   path: '/playlist',  //歌单列表页
  //   name: 'PlayList',
  //   component: () => import('@/views/playList/PlayList'),
  //   children: [
  //     {
  //       path: ':id',
  //       name: 'PlayListDetail',
  //       component: () => import('@/views/playList/children/PlayListDetail')
  //     }
  //   ]
  // },
  {
    path: '/songlist',
    name: 'SongList',
    meta: { title: '全部歌单' },
    component: () => import('@/views/SongList')
  },
  {
    path: '/songdetail/:id',
    name: 'SongDetail',
    meta: { title: '歌单详情' },
    component: () => import('@/views/SongDetail')
  },
  {
    path: '/singerlist',
    name: 'SingerList',
    meta: { title: '全部歌手' },
    component: () => import('@/views/singer/SingerList')
  },
  {
    path: '/singerdetail/:id',
    name: 'SingerDetail',
    meta: { title: '歌手详情' },
    component: () => import('@/views/singer/SingerDetail')
  },
  {
    path: '/mv/:id',
    name: 'Mv',
    meta: {title: 'MV'},
    component: () => import('@/views/Mv')
  },
  {
    path: '/musician',
    name: 'Musician',
    meta: {title: '音乐人'},
    component: () => import('@/views/Musician')
  },
  {
    path: '/album',
    name: 'Album',
    meta: {title: '专辑'},
    component: () => import('@/views/album/AlbumList')
  },
  {
    path: '/albumdetail/:id',
    name: 'AlbumDetail',
    meta: {title: '专辑详情'},
    component: () => import('@/views/album/AlbumDetail')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {title: '个人设置'},
    component: () => import('@/views/Profile')
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
    component: () => import('@/mobile/Index')
  },
  {
    path: '/songlist',
    name: 'SongList',
    meta: {title: '全部歌单'},
    component: () => import('@/mobile/SongList')
  },
  {
    path: '/songdetail/:id',
    name: 'SongDetail',
    meta: { title: '歌单详情' },
    component: () => import('@/mobile/SongDetail')
  },
  {
    path: '/my',
    name: 'My',
    meta: {title: '我的音乐'},
    component: () => import('@/mobile/My')
  },
  {
    path: '/singerlist',
    name: 'SingerList',
    meta: {title: '歌手'},
    component: () => import('@/mobile/singer/SingerList')
  },
  {
    path: '/singerdetail/:id',
    name: 'SingerDetail',
    meta: {title: '歌手详情'},
    component: () => import('@/mobile/singer/SingerDetail')
  },
  {
    path: '/musician',
    name: 'Musician',
    meta: {title: '音乐人'},
    component: () => import('@/mobile/Musician')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {title: '设置'},
    component: () => import('@/mobile/Profile')
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
