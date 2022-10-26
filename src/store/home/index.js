import { getCategoryList, getBannerList, reqFloorList } from '@/api'
// vuex home 小模块
const state = {
  // 三级联动的数据
  categroyList: [],
  // 轮播图的数据
  bannerList: [],
  // floor的数据
  floorList: []
}

const mutations = {
  // 得到返回的数据 处理数据
  CATEGROYLIST(state, categroyList) {
    state.categroyList = categroyList
  },
  // 获取 action 返回的 BANNERLIST 数据
  BANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  // 获取 action 返回的 FLOORLIST 数据
  FLOORLIST(state, floorList) {
    state.floorList = floorList
  }
}

const actions = {
  // 发起 axios 请求获取 三级联动数据
  async  categroyList({ commit }) {
    const result = await getCategoryList()
    // 将获取的数据提交给mutations
    // console.log(result)
    // 一定要判断之后再跳转, 纪录一下
    if (result.code === 200) {
      // console.log('数据发送改变')
      commit('CATEGROYLIST', result.data)
    }
  },
  // 定义方法 发起 mockajax 请求获取 bannerList的数据
  async getBannerList({ commit }) {
    // 先获取到数据 再if判断 再提交
    const result = await getBannerList()
    if (result.code === 200) {
      // 每次请求数据必须先打印一下，验证是数据是否请求成功
      // console.log(result)
      commit('BANNERLIST', result.data)
    }
  },
  // 定义方法 发起 mockajax 请求获取 floor 的数据
  async getFloorList({ commit }) {
    const result = await reqFloorList()
    // console.log(result)
    if (result.code === 200) {
      commit('FLOORLIST', result.data)
    }
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
