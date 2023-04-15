const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    port: 8888,
    proxy: "https://182.92.190.125:9997/"

  }
})
