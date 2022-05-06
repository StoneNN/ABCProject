/*
 * @Author: Nn
 * @Date: 2022-04-25 16:36:39
 * @LastEditors: Nxf
 * @LastEditTime: 2022-05-03 21:41:38
 * @Description: 
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true, //加入内容
  lintOnSave: false,  // 默认为true，警告仅仅会被输出到命令行，且不会使得编译失败。
  devServer: {
    port: 8000,  // 端口，如果端口被占用自动提升1
    open: false,  // 启动服务后自动打开浏览器
    https: false, // https协议
    host: 'localhost', // 主机名，也可以是127.0.0.1，或者真机测试的时候0.0.0.0
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: ' http://1.15.178.125:8069',
        // target: 'http://124.71.163.195:8069',
        // target: 'http://192.168.56.110:8069',
        // target: 'http://192.168.56.108:8069',
        // target: 'http://192.168.56.108/odoo',
        // target: 'http://app.snowacres.net/odoo',

        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  publicPath: "./",// 基本路径
})
