import { reqSearchList } from '@/api'

// home 小仓库
const state = {
  searchList: {}
}
const mutations = {
  SEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
}
const actions = {
  // 获取search模块数据 没有传 data:{}  bug 记录，耗时两天
  async getSearchList({ commit }, params = {}) {
    // params 是api中需要查询的数据
    const result = await reqSearchList(params)
    // console.log(params)
    if (result.code === 200) {
      commit('SEARCHLIST', result.data)
    }
  }
}
// 1.先用 state ，getters再进行加工，如果当前state = {} 那么getters 里获取到的数据为 undefined
// 当state中的数据需要经过加工后再使用时，可以使用getters加工。
const getters = {
  // state 是当前组件的state
  attrsList(state) {
    // 防止网络因素，没有加载到 attrsList 默认个一个数组
    return state.searchList.attrsList || []
  },
  goodsList(state) {
    return state.searchList.goodsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList || []
  }

}

// 向外暴露一个对象
export default {
  state,
  mutations,
  actions,
  getters
}
