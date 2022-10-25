import { getCategoryList } from '@/api/'
// vuex home 小模块
const state = {
  categroyList: []
}

const mutations = {
  // 得到返回的数据 处理数据
  CATEGROYLIST(state, categroyList) {
    state.categroyList = categroyList
  }
}

const actions = {
  // 发起 axios 请求获取 三级联动数据
  async  categroyList({ commit }) {
    const result = await getCategoryList()
    // 将获取的数据提交给mutations
    // console.log(result)
    // 一定要判断之后再跳转, 纪录一下
    if (result.code === 200) { commit('CATEGROYLIST', result.data) }
  }
}

const getters = {

}
export default {
  state,
  mutations,
  actions,
  getters
}
