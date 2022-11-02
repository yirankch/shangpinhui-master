// 当前这个模块，API进行统一管理
import requests from './request'
import mockRequest from './mockRequest'
// 三级联动接口
// 对外暴露一个函数 = functoin (){}  只有一句话 可以直接写 requests 就是axios
// 发起 axios 请求 getBaseCategoryList 是一个 promise 包含数据
// 返回的一定是一个函数,供其它模块调用 bug 知识点遗漏记录
export const getCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'GET' })
// 获取banner数据
export const getBannerList = () => mockRequest.get('/banner')
// 写获取floor数据的api
export const reqFloorList = () => mockRequest.get('/floor')
// Search: 获取数据
export const reqSearchList = (params) => requests({ url: '/list', method: 'POST', data: params })
// Search: mock
// export const reqSearchList = (params) => mockRequest({ url: '/searchlist', method: 'POST', data: params })
// 最初写方法  functoin reqFloorList = fcuntcion(参数) {}
// es6        req = (参数) => {}
// Register 获取验证码
// URL /api/user/passport/sendCode/{phone}   注意接口的问题
export const reqGetcode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'GET' })
// Register 注册用户
// URL /api/user/passport/register
export const reqUserRegister = (data) => requests({ url: '/user/passport/register', data, method: 'POST' })
// Login 用户登录
// URL /user/passport/login
export const reqUserLogin = (data) => requests({ url: '/user/passport/login', data, method: 'POST' })
// Home 获取用户信息
// URL /user/passport/auth/getUserInfo
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'GET' })
// Header 退出登录
export const reqLoginOut = () => requests({ url: '/user/passport/logout', method: 'GET' })
