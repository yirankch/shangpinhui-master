<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请</span>
            <!-- 声明式导航 必须有 to 属性 -->
            <router-link to="./login">登录</router-link>
            <router-link class="register" to="./register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <a class="logo" title="尚品汇" to="/home">
          <img src="../images/logo.png" alt="" />
        </a>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="getSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>

export default {
  data() {
    return {
      keyword: ''
      // k: ''
    }
  },
  methods: {
    getSearch() {
      // // 第一种字符串传参 如果不加 {} 默认跳转路径
      // this.$router.push('/search/' + this.Search + '?Search=' + this.Search.toLocaleLowerCase())
      // // 第二种模板字符串传参
      // this.$router.push(
      //   { path: `/search/${this.Search}?Search=${this.Search.toLocaleLowerCase()}` }
      // )
      // // 第三种对象传参
      // this.$router.push({
      //   name: 'search',
      //   params: {
      //     Search: this.Search
      //   },
      //   query: {
      //     Search: this.Search.toLocaleUpperCase()
      //   }
      // })
      // // 2:如何指定params参数可传可不传?
      // this.$router.push({
      //   name: 'search',
      //   // path: '/search',
      //   // params: {
      //   //   Search: this.Search
      //   // },
      //   query: {
      //     Search: this.Search
      //   }
      // }).catch(err => err)
      // 2:指定传递是空串，?
      // 判断有没有 query参数
      if (this.$route.query) {
        let location = {
          name: 'search',
          // 传递为空串
          params: {
            keyword: '' || undefined || this.keyword
          }
        }
        location.query = this.$route.query
        this.$router.push(location)
      }
    }

  }
}
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
