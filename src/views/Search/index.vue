<template>
  <div>
    <!-- 接收参数 -->
    params传参：{{$route.params.Search}}
    query传参：{{$route.query.k}}
    {{Search}}
    {{k}}
  </div>
</template>

<script>
export default {
  props: ['Search', 'k']
}
</script>

<style>

</style>
