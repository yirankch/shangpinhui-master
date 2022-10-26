import banner from '@/mock/banner.json'
import floor from '@/mock/floor.json'
import Mock from 'mockjs'

// mock数据: 第一个参数请求地址，第二个参数: 请求数据
Mock.mock('/mock/banner', { code: 200, data: banner })
Mock.mock('/mock/floor', { code: 200, data: floor })
