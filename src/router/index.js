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
const router = new VueRouter({
  // 配置路由
  routes: [
    { path: '/home', component: Home, meta: { show: true } },
    { path: '/login', component: Login, meta: { show: false } },
    { path: '/register', component: Register, meta: { show: false } },
    // 给路由设置name 方便params 传参
    {
      name: 'search',
      // bug 如果没有加上？ 那么传参的时候会导致直接传入query少了search路径 路径报错
      path: '/search/:keyword?',
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

// 全局守卫: 前置守卫
router.beforeEach(async(to, from, next) => {
  // to: 可以获取到你要跳转到哪个路由
  // from: 可以获取到你现在的路由
  // next：放行函数 next() 放行 next(path)放行到指定路径 next(false)
  next()
  // 根据 token 来判断路由跳转
  // 如果有 token 那么是登录的，如果没有一定是没有登录
  let token = store.state.user.token
  let name = store.state.user.userinfo.name
  console.log(token)
  // 如果有有token
  if (token) {
    // 如果登录了去login，直接打回到home
    if (to.path === 'login') {
      next('/')
    } else {
      // 跳转除了login之外的路由
      // 如果用户名已经有了
      if (name) {
        next()
      } else {
        // 如果没有用户名，那么指派aciton去获取
        try {
          await store.dispatch('getUserInfo')
        } catch (error) {
          // 为什么会出错，唯一解释就是 token 过期了
          // 注意： 这里要先清除本地的token
          // 只要去修改了 token，获取用户信息的时候，服务器发现，token不对，那么直接清除token，跳转到login
          await store.dispatch('loginOut')
          next('/login')
        }
      }
    }
  } else {
    next()
  }
})
export default router
