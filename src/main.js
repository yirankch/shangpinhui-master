import Vue from 'vue'
import App from './App.vue'
// 1.引入路由
import router from '@/router'
// 2.引入 vuex
import store from './store'
// 引入mock 执行一次，mock就像css文件一样直接引用
import '@/mock/mockserve.js'
// 引入swiper样式
import 'swiper/css/swiper.css'
// 注册全局组件
import Carousel from './components/Carousel'
//  注册三级联动为全局组件
import TypeNav from './components/TypeNav'
// 注册分页为全局组件
import Patination from './components/Pagination'
//  第一个组参数:全局组件的名字 第二个参数: 哪个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Patination.name, Patination)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 2.在 router 下创建 index.js 之后 一定要注册
  // 挂载全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router,
  store
}).$mount('#app')
