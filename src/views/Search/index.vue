<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <!-- 面包屑 -->
          <ul class="fl sui-tag">
           <!-- 注意整理是 搜索的词条，不是goodsList里面的字段 -->
           <!-- 根据选项展示，如果没有选择则不显示 -->
            <li class="with-x" v-if="searchParmas.categoryName">{{searchParmas.categoryName}}<i @click="removeCategory">×</i></li>
            <li class="with-x" v-if="searchParmas.keyword">{{searchParmas.keyword}}<i @click="removeKeyword">×</i></li>
            <li class="with-x" v-if="searchParmas.trademark">{{searchParmas.trademark.split(':')[1]}}<i @click="removeTrademark">×</i></li>
            <li class="with-x" v-for="(attr,index) in searchParmas.props" :key="index">{{attr.split(':')[1]}}<i @click="removeAttrprop(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <!-- 父组件接收数据 -->
        <SearchSelector @showcTrademark="sentTrademark" @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <!-- 价格结构 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- isOne 是方法可以直接调用 -->
                <li :class="{'active': isOne}"  @click="changeOrder('1')">
                  <a href="#">综合<span v-show="isOne" class="one" :class="{'isDown':isDesc,'isUp':isAsc}"></span></a>
                </li>
                <li :class="{'active': isTwo}" @click="changeOrder('2')">
                  <a href="#">销量<span v-show="isTwo" class="two" :class="{'isDown':isDesc,'isUp':isAsc}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 点击图片跳转 这里是可变的所有用:-->
                    <!-- 注意这里要用差值表达式 -->
                    <router-link :to="`/detail/${good.id}`">
                      <img :src="good.defaultImg"/>
                    </router-link>

                  </div>
                  <div class="price">
                    <strong>
                      <em>¥&nbsp;</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页 totel 需要从仓库中取出   父亲在组件中定义方法的时候,不需要接收参数,直接在方法定义中使用即可-->
          <Pagination :pageSize="this.searchParmas.pageSize" :pageNo="this.searchParmas.pageNo" :total="total" :continues="5" @pageNo='pageNo'/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick } from 'vue'
// import { nextTick } from 'vue'
import { mapGetters, mapState } from 'vuex'

import SearchSelector from './SearchSelector/SearchSelector'
export default {
  name: 'Search',

  data() {
    return {
      searchParmas: {
        category1Id: '',
        category2Id: '',
        category3Id: '',
        categoryName: '',
        keyword: '',
        order: '1:asc',
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: ''
      },
      up: '↑',
      down: '↓'
    }
  },
  // 当组件挂载完成之前，执行一次，修改搜索的数据
  beforeMount() {
    this.category1Id = undefined
    this.category2Id = undefined
    this.category3Id = undefined
    // 发送请求之前整理参数
    Object.assign(this.searchParmas, this.$route.query, this.$route.params)
    // console.log(this.searchParmas)
  },
  // 发请求 vuex 指派action发请求
  // 只能发一次请求，再次搜索不会触发,所以把请求封装成一个方法,可以多次调用
  mounted() {
    this.getSearchParmas()
  },
  methods: {
    // 获取用户筛选的指定数据
    getSearchParmas() {
      // 发送请求
      // console.log(this.searchParmas)
      this.$store.dispatch('getSearchList', this.searchParmas)
      // 异步请求，需要等加载完成再修改图标
      nextTick(() => {
        this.isOrder()
      })

      // console.log(1)
    },
    // 删除query参数跟面包屑
    removeCategory() {
      // 清空name 跟 id
      this.searchParmas.category1Id = undefined
      this.searchParmas.category2Id = undefined
      this.searchParmas.category3Id = undefined
      this.searchParmas.categoryName = undefined
      // 再次发送请求数据
      this.getSearchParmas()
      // route 是路由实例，每个组件都有包含路径和参数
      if (this.$route.params) {
        // 这里的params是第一次搜索保存在路由里面的 params
        this.$router.push({ name: 'search', params: this.$route.params })
      }
    },
    // 删除params参数跟面包屑 keyword
    removeKeyword() {
      // 清空 keyword
      if (this.searchParmas.keyword === this.searchParmas.trademark) {
        return
      }
      this.searchParmas.keyword = undefined
      // 再次发请求
      this.getSearchParmas()
      // 使用老套路判断 有无query参数
      if (this.$route.query) {
        this.$router.push({ name: 'search', query: this.$route.query })
      }
      // 清空 hearder里面的 keyword 使用 $bus
      this.$bus.$emit('clear')
    },
    // 返回品牌展示的内容
    sentTrademark(trademark) {
      // console.log(trademark.tmName)
      if (trademark.tmName === this.searchParmas.keyword) {
        return
      }
      // 整理品牌的的字段 id:品牌名称
      this.searchParmas.trademark = `${trademark.tmId}:${trademark.tmName}`
      this.getSearchParmas()
    },
    // 删除品牌
    removeTrademark() {
      this.searchParmas.trademark = undefined
      this.getSearchParmas()
    },
    // 返回展示商品属性
    attrInfo(attrs, attrValue) {
      // 整理参数
      const props = `${attrs.attrId}:${attrValue}:${attrs.attrName}`
      if (this.searchParmas.props.indexOf(props) === -1) {
        this.searchParmas.props.push(props)
        this.getSearchParmas()
      }
    },
    // 根据id删除商品属性
    removeAttrprop(index) {
      this.searchParmas.props.splice(index)
      this.getSearchParmas()
    },
    // 根据 class 展示不同的箭头
    isOrder() {
      // 根据 active 设置箭头
      if (document.querySelector('.active .isDown')) {
        // console.log(1)
        console.log(document.querySelector('.active .isDown'))
        document.querySelector('.active .isDown').innerHTML = this.down
      } else {
        // console.log(2)
        document.querySelector('.active .isUp').innerHTML = this.up
        // console.log(3)
      }
    },
    // 根据点击的按钮 动态排序
    changeOrder(flag) {
      let oldOrder = this.searchParmas.order
      let oldFlag = oldOrder.split(':')[0]
      let oldSlot = oldOrder.split(':')[1]
      // console.log(oldFlag, oldSlot)
      let newOrder = ''
      // 如果点击的是当前默认选中的，判断它是否是 降序，重新赋值
      if (flag === oldFlag) {
        newOrder = `${oldFlag}:${oldSlot === 'desc' ? 'asc' : 'desc'}`
      } else {
        newOrder = `${flag}:${'desc'}`
      }
      console.log(newOrder)
      // 将新得到的值赋值
      this.searchParmas.order = newOrder
      this.getSearchParmas()
    },
    // 分页器跳转
    pageNo(page) {
      // console.log(page)
      this.searchParmas.pageNo = page
      this.getSearchParmas()
    }

  },
  computed: {
    ...mapGetters(['goodsList']),
    isOne() {
      // 包含 1
      return this.searchParmas.order.indexOf('1') !== -1
    },
    isTwo() {
      // 包含 2
      return this.searchParmas.order.indexOf('2') !== -1
    },
    isDesc() {
      // 包含 1
      // document.querySelector('.isDown')
      return this.searchParmas.order.indexOf('desc') !== -1
    },
    isAsc() {
      return this.searchParmas.order.indexOf('asc') !== -1
    },
    ...mapState({
      // 对象形式,计算出属性
      total: state => state.search.searchList.total
    })
  },
  watch: {
    // 检测路由有没有发送变化
    $route(oldvaule, newvalue) {
      // 每次加载之前都要重写给 categoryxId 赋值
      // 重点
      this.searchParmas.category1Id = undefined
      // 注意是对象里的id
      this.searchParmas.category2Id = undefined
      this.searchParmas.category3Id = undefined
      // 再次发送请求之前整理参数
      Object.assign(this.searchParmas, this.$route.query, this.$route.params)
      // 调用getSearchParmas重写加载数据
      this.getSearchParmas()
    }
  },
  components: {
    SearchSelector
  }
}

</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
