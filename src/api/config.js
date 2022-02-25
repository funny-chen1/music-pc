const api = 'http://120.77.11.179:3000';

//this.api.XXX

export const login = api + '/login/cellphone';     //登录接口
export const check = api + '/cellphone/existence/check';    //验证手机号是否注册接口
export const register = api + '/register/cellphone';   //注册接口   
export const banner = api + '/banner'   //轮播图
export const logout = api + '/logout';  //登出
export const personalized = api + '/personalized?limit=8';  //推荐歌单
export const hotPlayListCate = api + '/playlist/hot'    //热门 歌单分类
export const newest = api + '/album/newest';    //最新专辑
export const soarList = api + '/playlist/track/all?id=19723756&limit=10'     //音乐飙升榜单
export const newList = api + '/playlist/track/all?id=3779629&limit=10'     //新歌榜
export const originalList = api + '/playlist/track/all?id=2884035&limit=10'     //原创榜单
export const singerList = api + '/top/artists'
export const allCatlist = api + '/playlist/catlist'
export const allPlayList = api + '/top/playlist'    //全部歌单
export const songDetail = api + '/playlist/detail'  //歌单详情
export const allSong = api + '/playlist/track/all'    //获取歌单所有歌曲
export const musicUrl = api + '/song/url'   //获取音乐url
export const artistsList = api + '/artist/list'     //歌手分类列表
export const artistDetail = api +'/artists'      //歌手全部单曲
export const artistDesc = api + '/artist/desc'  //歌手介绍
export const singerDetail = api + '/artist/detail'  //歌手详情
export const albumList = api + '/artist/album'      //歌手专辑
export const mvList = api + '/artist/mv'        //歌手mv
export const collectSinger = api + '/artist/sub'       //收藏/取消收藏歌手
export const collectMv = api + '/mv/sub'        //收藏/取消收藏mv
export const collectAlbum = api + '/album/sub'      //收藏/取消收藏专辑
export const collectPlaylist = api + '/playlist/subscribe'      //收藏/取消收藏歌单
export const mv = api + '/mv/detail'       //获取mv数据
export const mvUrl = api + '/mv/url'        //获取mv地址
export const mvLikeCount = api + '/mv/detail/info'      //获取mv点赞
export const mvComment = api + '/comment/mv'        //获取mv评论
export const playListComment = api + '/comment/playlist'        //获取歌单评论
export const albumComment = api + '/comment/album'      //获取专辑评论
export const comment = api + '/comment'     //发表评论接口
export const like = api + '/resource/like'      //资源点赞(mv、电台、视频)
export const allAlbum = api + '/top/album'      //全部专辑
export const albumDetail = api + '/album'   //专辑内容


//获取用户相关信息
export const refreshLogin = api + '/login/refresh'   //刷新登录
export const update = api + '/user/update'      //更新用户信息
export const collectedSinger = api + '/artist/sublist'   //用户收藏歌手列表
export const collectedMv = api + '/mv/sublist'      //用户收藏mv列表
export const collectedAlbum = api + '/album/sublist'       //用户收藏专辑
export const collectedPlaylist = api + '/user/playlist'     //获取用户歌单