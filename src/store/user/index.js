/* eslint-disable no-unused-expressions */
import { reqGetcode, reqUserRegister, reqUserLogin, reqUserInfo, reqLoginOut } from '@/api'
import { getItem, setItem, removeItem } from '@/utils/token'
// 登录与注册模块
const state = {
  code: '',
  // 一开始就获取本地存储,但是只要一刷新就没了
  token: getItem(),
  userinfo: {}
}
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  USERINFO(state, userinfo) {
    state.userinfo = userinfo
  },
  // 清空所有token
  LOGINOUT(state) {
    // eslint-disable-next-line no-sequences
    state.token = '',
    state.userinfo = {},
    removeItem()
  }
}
const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    // 定义的时候 有这个参数,使用方法的时候一定要有
    const result = await reqGetcode(phone)
    // bug 222 忘记加 code 。。。。
    if (result.code === 200) {
      commit('GETCODE', result.data)
      // 返回成功的 回调
      return 'ok'
    } else {
      return Promise.reject(new Error('获取验证码失败！'))
    }
  },
  // 注册
  async userRigester({ commit }, user) {
    const result = await reqUserRegister(user)
    // console.log(result)
    if (result.code === 200) {
      return 'ok'
    } else {
      // 返回的 错误 是 file 需要 vue 调用 Error
      return Promise.reject(new Error('注册失败！'))
    }
  },
  // 用户登录
  async userLogin({ commit }, data) {
    const result = await reqUserLogin(data)
    if (result.code === 200) {
      // 登录成功获取 token
      // token
      commit('USERLOGIN', result.data.token)
      setItem(result.data.token)

      return 'ok'
    } else {
      return Promise.reject(new Error('登录失败！'))
    }
  },
  // 获取用户信息  home 里调用
  async getUserInfo({ commit }) {
    const result = await reqUserInfo()
    // console.log(result)
    if (result.code === 200) {
      commit('USERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('fild'))
    }
  },
  // 用户退出登录 header里面
  // action 里只能获取数据,不能操作数据
  async  loginOut({ commit }) {
    const result = await reqLoginOut()
    // console.log(result)
    if (result.code === 200) {
      commit('LOGINOUT')
      return 'ok'
    } else {
      return Promise.reject(new Error('fild'))
    }
  }
}
// 不理解 为什么获取不到数据,获取不到的原因是: 一开始没有数据,注册之后才有数据,所以获取不到
const getters = {
  // state 是当前组件的state
  userinfo(state) {
    // console.log(1)
    // console.log(state.user.userinfo + 1)
    return state
  }

}
export default {
  state,
  mutations,
  actions,
  getters
}
