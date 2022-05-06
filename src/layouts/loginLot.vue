<!--
 * @Author: Nn
 * @Date: 2022-04-26 15:39:21
 * @LastEditors: Nxf
 * @LastEditTime: 2022-05-05 00:06:49
 * @Description: 
-->


<template>
  <a-layout id="components-layout-demo-responsive">
    
     <a-layout-sider
        breakpoint="lg"
        collapsed-width="0"
        @collapse="onCollapse"
        @breakpoint="onBreakpoint"
      >
        <div class="logo">
          智竞平台
        </div>
        <a-menu theme="light" mode="inline" :default-selected-keys="['1']" id="abc-menu">
          <a-menu-item key="1">
            <a-icon type="user" />
            <span class="nav-text">nav 1</span>
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="video-camera" />
            <span class="nav-text">nav 2</span>
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="upload" />
            <span class="nav-text">nav 3</span>
          </a-menu-item>
          <a-menu-item key="4">
            <a-icon type="user" />
            <span class="nav-text">nav 4</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
    <a-layout>
     <a-layout-header >
        <span>智力竞技比赛平台</span> 
      </a-layout-header>
      <a-layout-content>
        <div>
          <router-view></router-view>
        </div>
      </a-layout-content>
       <a-layout-footer style="textalign: center">
      北京欧德慧通信息技术有限公司
    </a-layout-footer>
    </a-layout>
   
  </a-layout>
</template>
<script>

  import Vue from "vue";
  import { Layout, Table, Icon, Menu, Dropdown} from "ant-design-vue";
  import 'ant-design-vue/dist/antd.css';
  
  Vue.use(Layout).use(Table).use(Icon).use(Menu).use(Dropdown);

export default {
  methods: {
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    },
  },
};
</script>

<style scoped>
#components-layout-demo-responsive {
    text-align: center;
    height: 100%;
  }
  #components-layout-demo-responsive .ant-layout-header,
  #components-layout-demo-responsive .ant-layout-footer {
    color: #fff;
    padding: 0;
  }
  #components-layout-demo-responsive .ant-layout-header {
    height: 10vh;
    line-height: 10vh;
    position: relative;
    background: #007acc;
  }
  #components-layout-demo-responsive .ant-layout-header span {
      font-size: 30px;
      font-weight: bolder;
  }
  #components-layout-demo-responsive .ant-layout-footer {
    height: 5vh;
    line-height: 5vh;
    background: #007acc;
  }
  #components-layout-demo-responsive .ant-layout-sider {
    background: white;
    color: #fff;
    height: 100vh;
  }
  #abc-menu{
    /* background-color: #007acc; */
  }
  #components-layout-demo-responsive .ant-layout-content {
    background: white;
    color: #fff;
    padding: 10px;
    height: 85vh;
  }
  #components-layout-demo-responsive > .ant-layout {
    /* margin-bottom: 48px; */
  }
  #components-layout-demo-responsive > .ant-layout:last-child {
    margin: 0;
  }
  .ant-dropdown-link {
    height: 70px;
    position:absolute;
    right: 10px;
    bottom: 10px;
    color: white;
  }
#components-layout-demo-responsive .logo {
  height: 32px;
  background: rgba(12, 12, 12, 0.2);
  margin: 16px;
}
</style>