<template>
  <div>
    <!-- 全局组件直接引入 -->
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
    <Rank/>
    <Like/>
    <!-- 传给子 一个 floor -->
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"/>
    <Brand/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 普通组件引入
import ListContainer from '@/views/Home/ListContainer'
import TodayRecommend from '@/views/Home/TodayRecommend'
import Rank from '@/views/Home/Rank'
import Like from '@/views/Home/Like'
import Floor from '@/views/Home/Floor'
import Brand from '@/views/Home/Brand'

// 引入vuex 提供的 map 辅助函数

export default {
// 在父元素中创建，遍历两个 floor
  created() {
    // 获取
    this.$store.dispatch('getFloorList')
    // 获取用户信息
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList
    })
  },
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand
  }

}
</script>

<style></style>
