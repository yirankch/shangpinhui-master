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
  components: {
    Header,
    Footer
  }
}
</script>

<style>

</style>
