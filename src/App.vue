<template>
  <div>
    <Header></Header>
    <!-- 路由模块 -->
    <router-view></router-view>
    <!-- 再home、search中显示 原始方式，太繁琐-->
    <!-- <Footer v-show="$route.path==='/home' || $route.path==='/search'"></Footer> -->
    <!-- 再home、search中显示 设置路由元方式 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
// 引入模块
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
// 注册组件
export default {
  // 出大问题,哪个模块要渲染数据,就把请求写在对应模块
  // 数据加载完成,请求三级联动的数据
  // 出大问题，单词写错了，导致传参错误
  created() {
    // 通知 vuex 发送请求,获取数据,存储于仓库中
    this.$store.dispatch('categoryList')
    // console.log(this)
  },
  components: {
    Header,
    Footer
  }
}
</script>

<style>

</style>
