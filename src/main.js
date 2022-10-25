import Vue from 'vue'
import App from './App.vue'
// 1.引入路由
import router from '@/router'
// 2.引入 vuex
import store from './store'
//  注册三级联动为全局组件
import TypeNav from './components/TypeNav'
//  第一个组参数:全局组件的名字 第二个参数: 哪个组件
Vue.component(TypeNav.name, TypeNav)
// 测试

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 2.在 router 下创建 index.js 之后 一定要注册
  router,
  store
}).$mount('#app')
