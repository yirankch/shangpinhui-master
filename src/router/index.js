// 配置 路由
import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入路由组件 bug1 eslint 语法规范要求 import 在最前面
import routes from './routes'
// 引入 store
import store from '@/store'
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
  // history: createWebHashHistory(),
  // 配置路由
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  }

})

// 全局守卫: 前置守卫
router.beforeEach(async(to, from, next) => {
  // to: 可以获取到你要跳转到哪个路由
  // from: 可以获取到你现在的路由
  // next：放行函数 next() 放行 next(path)放行到指定路径 next(false)
  // next()
  // 根据 token 来判断路由跳转
  // 如果有 token 那么是登录的，如果没有一定是没有登录
  const token = store.state.user.token
  const name = store.state.user.userinfo.name
  // 如果用户登录了
  if (token) {
    // 如果要去login，直接打回到 /
    if (to.path === '/login') {
      next('/')
    } else {
      // 去其它的 页面，需要派发 action 获取userinfo的数据
      // 通过有没有name判断
      if (name) {
        next()
      } else {
        // 获取到用户信息
        try {
          // 派发action
          await store.dispatch('getUserInfo')
          // 放行
          next()
        } catch (error) {
          // 只有token 失效了才会报错
          await store.dispatch('loginOut')
          next('/login')
        }
      }
    }
  } else {
    // 没有 token 是游客，放行
    // next()
    console.log(to.path)
    let toPath = to.path
    // 如果游客访问一下路径 则把路径存储到路由上
    if (toPath.indexOf('/trade') !== -1 || toPath.indexOf('/pay') !== -1 || toPath.indexOf('/search') !== -1) {
      // 用户未登录访问 以上三个页面 存到路径
      next('/login?redirect=' + toPath)
    } else {
      next()
    }
  }
})
export default router
