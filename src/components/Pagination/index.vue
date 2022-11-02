<template>
  <div class="pagination">
    <button :disabled="pageNo==1" @click="prePage">上一页</button>
    <button v-if="startAndEndPage.start > 1" :class="{active:pageNo==1}" @click="jumpOne" >1</button>
    <button v-if="startAndEndPage.start > 2">···</button>
    <!-- 展示 continues 里面的数据 end = 8 -->
    <template v-for="(page,index) in startAndEndPage.end" >

    <button :key="index"  v-if="page>=startAndEndPage.start" :class="{active:pageNo==page}"  @click="jumpCom(page)">{{page}}</button>

    </template>

    <button v-if="startAndEndPage.end < totalPage - 1">···</button>
    <button v-if="startAndEndPage.end < totalPage" :class="{active:pageNo==totalPage}" @click="jumpEnd(totalPage)">{{totalPage}}</button>
    <button :disabled="pageNo==totalPage" @click="nextPage()">下一页</button>

    <button style="margin-left: 30px">{{total}}条</button>
    <h1>{{startAndEndPage}}</h1>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  // 一页展示的数据 当前页  总数据 连续页码数
  props: ['pageSize', 'pageNo', 'total', 'continues'],
  computed: {

    // 总页数
    totalPage() {
      const { total, pageSize } = this
      return Math.ceil(total / pageSize)
    },

    // 计算连续页码的start 和 end数字
    startAndEndPage() {
      const { pageNo, totalPage, continues } = this
      let start = 0
      let end = 0
      // 不正常的的情况，总页数小于continues数
      if (totalPage < continues) {
        // 目的是给 start 和 end 赋值
        start = 1
        end = continues
      } else {
        // 首页等于当前页 - continues/2 的值
        start = pageNo - parseInt(continues / 2)
        // console.log(start)
        end = pageNo + parseInt(continues / 2)
        // 首页小于1
        if (start < 1) {
          start = 1
          end = continues
        }
        // 末页 > 总页数
        if (end > totalPage) {
          end = totalPage
          start = totalPage - continues + 1
        }
      }
      return { start, end }
    }
  },
  methods: {
    // 上一页
    prePage() {
      this.$emit('pageNo', this.pageNo - 1)
    },
    // 跳转到第一页
    jumpOne() {
      this.$emit('pageNo', 1)
    },
    // 添砖com中的页数
    jumpCom(page) {
      this.$emit('pageNo', page)
    },
    // 跳转到最后一页
    jumpEnd(totalPage) {
      this.$emit('pageNo', totalPage)
    },
    nextPage() {
      this.$emit('pageNo', this.pageNo + 1)
    }
  }
}
</script>

<style lang="less" scoped>
  .pagination {
    // margin-left: 300px;
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        // cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>
