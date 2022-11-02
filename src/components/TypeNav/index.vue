<template>
  <div class="type-nav">
    <!-- 测试 state -->
    <div class="container">
      <div @mouseleave="outClass()" @mouseenter="searchShow">
        <h2 class="all" @click="$router.push('/home')">全部商品分类</h2>
        <!-- 三级联动 -->
        <transition name="sort">
          <div class="sort" v-show="show">
          <!-- 利用编程式导航+事件委派 -->
          <!--  @click="goSearch" 没+()表示第一个参数是 事件对象，加了()得使用$event  -->
          <div class="all-sort-list2" @click="goSearch($event)">
            <!-- 循环 item 要什么就循环什么 循环多个重名的item -->
            <!-- 动态添加 class -->
            <div
              class="item bo"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              :class="{ bfa: currentIndex == index }"
              @mouseenter="changeClass(index)"
            >
             <!-- 一级分类 -->
              <h3>
                <!-- <router-link to="/search">{{ c1.categoryName }}</router-link> -->
                <!-- 去掉a标签的 herf 属性，利用事件委派进行跳转 -->
                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
              </h3>
              <!-- 二，三级分类 -->
              <div class="item-list clearfix" v-show="currentIndex == index">
                <div
                  class="subitem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <!-- <router-link to="/search">{{ c2.categoryName }}</router-link> -->
                      <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <!-- <router-link to="/search">{{ c3.categoryName }}</router-link> -->
                        <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        </transition>

      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import throttle from 'lodash/throttle'

export default {
  name: 'TypeNav',
  data() {
    return {
      currentIndex: -1,
      show: true
    }
  },

  // 组件挂载完毕  跳转每个页面都会挂载一次
  mounted() {
    // route 判断
    if (this.$route.path !== '/home') { this.show = false }
    // this.$store.dispatch('categoryList')
  },
  computed: {
    // mapState 是vuex中的一个方法 mapState()
    // 对象形式,右侧需要的是一个函数,当使用这个计算属性的时候,右侧函数会立即执行一次
    // 注入一个参数state,其实即为大仓库中的数据
    ...mapState({
      // 将大仓库里获取到的数据 赋值给 categoryList
      categoryList: (state) => state.home.categoryList.slice(0, 15)
    })
  },
  methods: {
    // changeClass(index) {
    //   console.log(index + '滑动')
    //   this.currentIndex = index
    // },
    // 使用 es5 写法 使用节流
    changeClass: throttle(function(index) {
      this.currentIndex = index
    }, 50),
    outClass() {
      this.currentIndex = -1
      if (this.$route.path !== '/home') { this.show = false }
    },
    // 利用编程时导航+事件委派
    goSearch(event) {
      // 跳转时候如何知道a标签？  给a标签添加自定义属性
      // 跳转时候如何知道a的id是哪个？ 再次给a标签添加自定义属性
      // 因为event是事件对象,使用event.target,它可以获取当前触发事件的节点
      // event.target
      const element = event.target
      // console.log(element.dataset)
      const { categoryname, category1id, category2id, category3id } = element.dataset
      // 节点有一个dataset属性，可以获取节点的自定义属性与属性值
      // console.log(event.target)
      // console.log(categoryname)
      // 获取到 a 标签自定义属性的 name
      // 整理路由跳转的参数
      // 判断 是 一级 二级 三级id
      if (categoryname) {
        const location = { name: 'search' }
        const query = { categoryName: categoryname }
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        // 先在header跳转了，传入parmas参数，再点击typenav的时候需要判断有无params参数，有则添加跳转，否则跳转会丢失路径
        if (this.$route.params) {
          location.params = this.$route.params
          // 给 location 动态添加参数
          location.query = query
          this.$router.push(location)
        }
      }
    },
    // search 鼠标滑动的时候 展示
    searchShow() {
      this.show = true
    }
  }

  // 渲染页面
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .bfa {
          background: #bfa;
        }
      }
    }

    .sort-enter {
      height: 0;
    }
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: all .5s;
    }

    // .sort-leave {
    //   height: 461px;
    // }
    // .sort-leave-to {
    //   height: 0;
    // }
    // .sort-leave-active {
    //   // 没有动画效果，忘记加 s
    //   transition: all .5s;
    // }
  }
}
</style>
