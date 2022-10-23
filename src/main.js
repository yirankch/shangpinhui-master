import Vue from 'vue'
import App from './App.vue'
// 1.引入路由
import router from '@/router'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 2.在 router 下创建 index.js 之后 一定要注册
  router
}).$mount('#app')
