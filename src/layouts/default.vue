<!--
 * @Author: Nxf
 * @Date: 2022-04-05 18:42:09
 * @LastEditors: Nxf
 * @LastEditTime: 2022-05-05 22:10:13
 * @Descripttion: Default Layout
-->


<template>
  <a-layout id="components-layout-demo-side" style="height: 100vh">
    <a-layout-sider v-model="collapsed" collapsible>
      <div class="logo">{{ appName }}</div>
      <a-menu 
        theme="dark" 
        :default-selected-keys="['1']" 
        mode="inline"
        :inlineIndent="inlineIndent"
        :defaultSelectedKeys="[$route.path]"
        :openKeys="openKeys"
        :inline-collapsed="collapsed"
        @openChange="onOpenChange"
        @click="menuClick"
      >
        <!-- 菜单遍历的开始 -->
        <template v-for="item in menuList">
          <!-- 如果当前遍历项没有children，视为子菜单项，注意所有的key都是path用于路由跳转，以及当前选中记录 -->
          <a-menu-item v-if="!item.children" :key="item.path">
            <a-icon :type="item.icon" />
            <span>{{ item.title }}</span>
          </a-menu-item>
          <!-- 否则视为子菜单，传入菜单信息并且运用下面定义的函数式组件 -->
          <sub-menu v-else :key="item.path" :menu-info="item" />
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style=" position:relative; padding: 0; backgroundColor:lightGray; height:69px;">
        <a-dropdown>
          <a class="ant-dropdown-link">
            <!-- 你好，用户001
            <a-icon type="down" /> -->
            <img src="../assets/people.png" alt="UserHeader" style="width:30px">
          </a>
          <a-menu slot="overlay" style="text-align:right ">
            <a-menu-item>
              你好，{{userName}}!
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item>
              <a>用户信息 ></a>
            </a-menu-item>
            <a-menu-item>
              <a>退出登录 ></a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>  
      </a-layout-header>  
      <a-layout-content style="margin: 0 16px;">
        <BreadCrumbRouter :currentPath="currentPath"/>
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        >
          <router-view></router-view>
        </div>

      </a-layout-content>
      <a-layout-footer style="height:40px; line-height:40px; padding:0px; text-align: center; font-size: 10px; font-weight: bolder; backgroundColor:lightGray">
        {{ appCompany }}
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
 
  import Vue from "vue";
  import { Layout, Table, Icon, Menu, Dropdown} from "ant-design-vue";
  import BreadCrumbRouter from "../components/breads.vue";
  import 'ant-design-vue/dist/antd.css';
  
  Vue.use(Layout).use(Table).use(Icon).use(Menu).use(Dropdown);
  Vue.use(BreadCrumbRouter);
  
  // 定义函数式组件
  const SubMenu = {
    template: `
        <a-sub-menu :key="menuInfo.path" v-bind="$props" v-on="$listeners">
          
          <span slot="title">
            <a-icon :type="menuInfo.icon" /><span>{{ menuInfo.title }}</span>
          </span>

          <template v-for="item in menuInfo.children">
            <a-menu-item v-if="!item.children" :key="item.path">
              <a-icon :type="item.icon" />
              <span>{{ item.title }}</span>
            </a-menu-item>
            <sub-menu v-else :key="item.path" :menu-info="item" />
          </template>
          
        </a-sub-menu>
      `,
    name: 'SubMenu',
    // must add isSubMenu: true 此项必须被定义
    // isSubMenu: true,
    props: {
      // 解构a-sub-menu的属性，也就是文章开头提到的为什么使用函数式组件
      ...Menu.SubMenu.props,
      // 接收父级传递过来的菜单信息
      menuInfo: {
        type: Object,
        default: () => ({}),
      },
    },
  };
  export default {
    name:"defaultLayoutCpnt",
    // 注册局部组件
    components:{
      BreadCrumbRouter,
      'sub-menu': SubMenu,
    },
    data() {
      return {
        //
        appCompany:process.env.VUE_APP_COMPANY,
        appName:process.env.VUE_APP_NAME,
        
        // 菜单缩进
        inlineIndent:12,
        // 默认不折叠
        collapsed: false,
        // 全部顶级父节点,用来控制所有父级菜单只展开其中的一项，可用遍历菜单信息进行赋值
        rootSubmenuKeys: ['/infomationManage','/safeInfoManage','/qualityInfoManage'],
        // 展开的父菜单项
        openKeys: [], 
        // 选中的子菜单项
        defaultSelectedKeys: [this.$route.path], 
        // 菜单信息，可从后台获取
        menuList: [
        {
          key: '首页',
          title: '首页',
          path: '/home',
          icon:'home'
        },
        {
          key: '财务信息',
          title: '财务信息',
          icon:'account-book',
          children: [
            {
              key: '订单',
              title: '订单',
              path: '/financial/orderList',
              icon:'-',
            },
            {
              key: '规则',
              title: '规则',
              path: '/financial/rulesList',
              icon:'-',
            },
            {
              key: '发票',
              title: '发票',
              path: '/financial/invoiceList',
              icon:'-',
            },
          ],
        },
        {
          key: '用户信息',
          title: '用户信息',
          icon:'team',
          children:[
            { 
              key: '超级用户',
              title: '超级用户',
              path: '/user/adminUser',
              icon:'-',
            },
            { 
              key: '普通用户',
              title: '普通用户',
              path: '/user/normalUser',
              icon:'-',
            },
            {
                key: 'VIP用户',
                title: 'VIP用户',
                path: '/user/vipUser',
                icon:'-',
            }
          ]
        },
        {
          key:'5',
          path: '/testPage',
          title:' 测试页面',
          icon:'api'
        }
        ],
        //当前路由路径
        currentPath:"",
        //
        userName:localStorage.getItem('userName'),
      };
    },
    created(){
      // 将从缓存中取出openKeys
      const openKeys = window.sessionStorage.getItem('openKeys')
      if(openKeys){
        // 存在即赋值
        this.openKeys = JSON.parse(openKeys)
      }
    },
    mounted(){
      console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-',this);
      
    },
    methods: {
      // 点击菜单，路由跳转,注意的是当点击MenuItem才会触发此函数
      menuClick({ item, key, keyPath }) {
        console.log('------- menuClick -------',item,key,keyPath);
        // if (key) {
          
        // }
        localStorage.setItem("name","john");
        // 获取到当前的key,并且跳转[.catch()-->防止重复点击同一个menu报错]
        this.$router.push({
          path: key
        }).catch(err=>err);
      },
      onOpenChange(openKeys) {
        // 将当前打开的父级菜单存入缓存中
        window.sessionStorage.setItem('openKeys', JSON.stringify(openKeys))
        //  控制只打开一个
        const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.openKeys = openKeys;
        } else {
          this.openKeys = latestOpenKey ? [latestOpenKey] : [];
        }
      },
    },
  };
</script>

<style>
  #components-layout-demo-side .logo {
    height: 32px;
    line-height: 32px;
    font-weight: bolder;
    background: rgba(172, 166, 166, 0.2);
    margin: 16px;
    color: white;
  }
  .ant-dropdown-link {
    height: 40px;
    position:absolute;
    right: 10px;
    bottom: 10px;
    color: white;
  }
</style>
