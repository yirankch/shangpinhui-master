// 当前这个模块，API进行统一管理
import requests from './request'
import mockRequest from './mockRequest'
// 三级联动接口
// 对外暴露一个函数 = functoin (){}  只有一句话 可以直接写 requests 就是axios
// 发起 axios 请求 getBaseCategoryList 是一个 promise 包含数据
// 返回的一定是一个函数,供其它模块调用 bug 知识点遗漏记录
export const getCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })
// 获取banner数据
export const getBannerList = () => mockRequest.get('/banner')
// 写获取floor数据的api
export const reqFloorList = () => mockRequest.get('/floor')
