<template>
  <div>
    <!-- 全局组件直接引入 -->
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
    <Rank/>
    <Like/>
    <Floor/>
    <Brand/>
  </div>
</template>

<script>
// 普通组件引入
import ListContainer from '@/views/Home/ListContainer'
import TodayRecommend from '@/views/Home/TodayRecommend'
import Rank from '@/views/Home/Rank'
import Like from '@/views/Home/Like'
import Floor from '@/views/Home/Floor'
import Brand from '@/views/Home/Brand'

// 引入vuex 提供的 map 辅助函数

export default {

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
