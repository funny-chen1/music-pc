// 一些公共方法可以写在这里
import router from '../router'


export default {
    getSongDetail(obj) {
        // this.$router.push({path: `/songdetail/${obj.id}`});
        console.log(obj.id);
    }
}