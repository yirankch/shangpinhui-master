// 配置 路由
import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入路由组件 bug1 eslint 语法规范要求 import 在最前面
import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Search from '@/views/Search'
// 使用插件
Vue.use(VueRouter)
// 重写 push replace 方法
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function(location, resolve, reject) {
  // this 是 vueRouter 实例
  // 第一个参数,告诉原来push方法,你往哪里跳转
  // 第二个参数,成功回调
  // 第三个参数,失败的回调
  // call || apply 区别
  // 相同点, 都可以调用函数一次,都可以篡改函数的上下文 this
  // 不同点,call与apply传递参数:call 传递参数用,隔开,apply方法执行,传递数组
  // console.log(this)
  // 如果有 回调函数
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => {}, () => {})
  }
}

VueRouter.prototype.replace = function(location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => {}, () => {})
  }
}

// 创建并且暴露一个路由器
export default new VueRouter({
  // 配置路由
  routes: [
    { path: '/home', component: Home, meta: { show: true } },
    { path: '/login', component: Login, meta: { show: false } },
    { path: '/register', component: Register, meta: { show: false } },
    // 给路由设置name 方便params 传参
    {
      name: 'search',
      path: '/search',
      component: Search,
      meta: { show: true }
      // props: ($route) => {
      //   return { Search: $route.params.Search, k: $route.query.k }
      // }
    },
    // 重定向 redirect 之后跟的是 path
    { path: '*', redirect: 'home' }
  ]
})
