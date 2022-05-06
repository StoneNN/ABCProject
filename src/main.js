/*
 * @Author: Nn
 * @Date: 2022-04-25 16:36:39
 * @LastEditors: Nxf
 * @LastEditTime: 2022-05-04 11:02:40
 * @Description: 项目入口文件
 */
import Vue from 'vue'
import App from './App.vue'
// 引入VueRouter
import VueRouter from 'vue-router';
// 引入路由器
import router from '@/router/index';

Vue.config.productionTip = false

//Applications
import rpc from '@/odoorpc'
const baseURL = process.env.VUE_APP_BASE_API
const timeout = 50000
rpc.init({ baseURL, timeout })
//

// 应用插件
Vue.use(VueRouter);

//创建Vue实例对象
new Vue({
  //挂载路由器
  router:router,
  render: h => h(App),
}).$mount('#app')
