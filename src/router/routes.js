import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Search from '@/views/Search'
import Detail from '@/views/Detail'
// 向外暴露数组
export default [
  // ?表示 params参数 可传可不传
  { name: 'detail', path: '/detail/:skuid?', component: Detail, meta: { show: true } },
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
