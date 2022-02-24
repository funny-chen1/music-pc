export const userStatus = (state, user) => {
    if(user) {
        state.userInfo = user
        state.isLogin = true
    } else if (user == null) {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        state.userInfo = null;
        state.isLogin = false;
        state.token = "";
    }
}

export const playStatus = (state, url) => {
    state.currentUrl = url;
}

export const musicInfoStatus = (state, info) => {
    state.musicInfo = info;
}