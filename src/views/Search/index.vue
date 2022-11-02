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
          <ul class="fl sui-tag">
            <li class="with-x">手机</li>
            <li class="with-x">iphone<i>×</i></li>
            <li class="with-x">华为<i>×</i></li>
            <li class="with-x">OPPO<i>×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector />

        <!--details-->
        <div class="details clearfix">
          <!-- 价铬结构 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li class="active">
                  <a href="#">综合</a>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li>
                  <a href="#">价格⬆</a>
                </li>
                <li>
                  <a href="#">价格⬇</a>
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
                    <a href="item.html" target="_blank"
                      ><img :src="good.defaultImg"
                    /></a>
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
          <!-- 分页 -->
          <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共10页&nbsp;</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
        order: '',
        pageNo: 1,
        pageSize: 4,
        props: [],
        trademark: ''
      }
    }
  },
  // 当组件挂载完成之前，执行一次，修改搜索的数据
  beforeMount() {
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
      this.$store.dispatch('getSearchList', this.searchParmas)
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
    // 删除params参数跟面包屑
    removeKeyword() {
      // 清空 keyword
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
    // 返回展示的内容
    sentTrademark(trademark) {
      // 整理品牌的的字段 id:品牌名称
      this.searchParmas.trademark = `${trademark.tmId}:${trademark.tmName}`
      this.getSearchParmas()
    }
  },
  computed: {
    ...mapGetters(['goodsList'])
  },
    isTwo() {
      // 包含 2
      return this.searchParmas.order.indexOf('2') !== -1
    },
    isDesc() {
      // 包含 1
      return this.searchParmas.order.indexOf('desc') !== -1
    },
    isAsc() {
      // 包含 2 asc 升序
      return this.searchParmas.order.indexOf('asc') !== -1
    }
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

<style>

</style>
