export const setUser = ({commit}, user) => {
    commit("userStatus", user)
}

export const setUrl = ({commit}, url) => {
    commit("playStatus", url)
}

export const setMusicInfo = ({commit}, info) => {
    commit("musicInfoStatus", info)
}