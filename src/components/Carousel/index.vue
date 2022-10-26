<template>
  <div class="swiper-container" ref="car">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="carousel in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'

export default {
  name: 'Carousel',
  props: ['list'],
  watch: {
    list: {
      // 开始的时候监听一次 不执行，list里面的数据没有变化
      immediate: true,
      handler() {
        // console.log('我在监听Floor组件中的list数据')
        this.$nextTick(() => {
          // 数据在父组件已经获取，直接可以使用swiper
          // eslint-disable-next-line no-unused-vars
          let mySwiper = new Swiper(this.$refs.car, {
            direction: 'horizontal', // 垂直切换选项
            loop: true, // 循环模式选项
            speed: 300,
            autoplay: {
              delay: 3000
            },
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }
          })
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-slide{
  img {
    width: 100%;
  }
}
</style>
