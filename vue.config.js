const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        // 目标服务器
        target: 'http://gmall-h5-api.atguigu.cn',
        // 重写 /api 路径
        // pathRewrite: { '^/api': '' }
        changeOrigin: true
      }
    }
  }
})
