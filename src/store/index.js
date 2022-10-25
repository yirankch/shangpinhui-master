import Vue from 'vue'
import Vuex from 'vuex'
// 只有组件用大写
import home from '@/store/home'
import search from '@/store/search'
// 使用插件
Vue.use(Vuex)

// 向外暴露 Vuex 实例配置项目
export default new Vuex.Store({
  // 实现Vuex仓库模式开发存储数据
  modules: {
    home,
    search
  }
})
