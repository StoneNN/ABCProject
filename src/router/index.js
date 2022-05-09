/*
 * @Author: Nn
 * @Date: 2022-04-25 17:05:44
 * @LastEditors: Nn
 * @LastEditTime: 2022-05-09 17:45:17
 * @Description: 
 */

import Vue from 'vue';
//  --1.--导入路由对象
import VueRouter from 'vue-router';

//引入布局
// import loginLot from '../layouts/loginLot.vue';
import defaultLot from '../layouts/default.vue';

//引入组件
import Home from '../pages/home.vue';
import OrderList from '@/pages/bills/orders/orderList.vue';
import OrderDetail from '@/pages/bills/orders/orderDetail.vue';
import InvoiceList from '../pages/bills/invoices/InvoiceList.vue';
import InvoiceDetail from '../pages/bills/invoices/InvoiceDetail.vue';
import RulesList from '@/pages/bills/rules/rulesList.vue';
import RulesDetail from '@/pages/bills/rules/rulesDetail.vue';
// import AdminUser from '../pages/users/adminUser.vue';
import UserList from '@/pages/users/userList';
import UserInfo from '@/pages/users/userInfo';
import CompanyList from '@/pages/companys/companyList';
import CompanyInfo from '@/pages/companys/companyInfo';

import Login from '@/pages/login.vue';
import Register from '@/pages/register.vue';
import TestView from '@/components/TestRpc';

import odooApi from '@/odooapi';

//  --2.--注入VueRouter插件
Vue.use(VueRouter);

//路由1
const loginRoutes = [
    {
        path:'/userLogin',
        name:'userLogin',
        meta:{title:'用户登录'},
        component:Login
    },
    {
        path:'/userRegister',
        name:'userRegister',
        meta:{title:'用户注册'},
        component:Register
    }
    // {
    //     path:'/userLogin',
    //     name:'yongHuDengLu',
    //     component:loginLot,
    //     redirect:'/userLogin',
    //     children:[
    //         {
    //             path:'/userLogin',
    //             name:'userLogin',
    //             meta:{title:'用户登录'},
    //             component:Login
    //         }
    //     ]
    // }
];
//路由2
const invoiceRoutes = [

    {
        path:'/',
        name:'home',
        component:defaultLot,
        redirect:'/home',
        children:[
            {
                path:'/home',
                name:'home',
                meta:{title:'首页'},
                component:Home
            },

            // {
            //     path:'/users',
            //     name:'users',
            //     meta:{title:'用户列表'},
            //     component:UserList
            // },

            {
                path:'/financial',
                redirect:'financial/orderList'
            },
            {
                path:'financial/orderList',
                component:{render(c) { return c('router-view')  }},
                meta:{title:'订单'},
                redirect:'financial/orderList',
                children:[
                    {
                        path:'',
                        name:'orderList',
                        meta:{title:'订单列表'},
                        component:OrderList
                    },
                    {
                        path:'orderDetail',
                        name:'orderDetail',
                        meta:{title:'订单详情'},
                        component:OrderDetail
                    },
                ]
            },
            {
                path:'financial/rulesList',
                component:{render(c) { return c('router-view') }},
                meta:{title:'规则'},
                redirect:'financial/rulesList',
                children:[
                    {
                        path:'',
                        name:'rulesList',
                        meta:{title:'规则列表'},
                        component:RulesList,
                    },
                    {
                        path:'rulesDetail',
                        name:'rulesDetail',
                        meta:{title:'规则详情'},
                        component:RulesDetail
                    },
                ]
            },
            {
                path:'financial/invoiceList',
                component:{render(c) { return c('router-view') }},
                meta:{title:'发票列表'},
                redirect:'financial/invoiceList',
                children:[
                    {
                        path:'',
                        name:'invoiceList',
                        // meta:{title:'发票列表'},
                        component:InvoiceList,
                    },
                    {
                        path:'invoiceDetail',
                        name:'invoiceDetail',
                        meta:{title:'发票详情'},
                        component:InvoiceDetail
                    },
                ]
            },

            {
                path:'/user',
                redirect:'user/userList'
            },
            // {
            //     path:'user/adminUser',
            //     name:'adminUser',
            //     meta:{title:'超级用户'},
            //     component:AdminUser
            // },
            {
                path:'user/userList',
                component:{render(c) { return c('router-view')  }},
                meta:{title:'用户信息'},
                redirect:'user/userList',
                children:[
                    {
                        path:'',
                        name:'userList',
                        meta:{title:'用户列表'},
                        component:UserList
                    },
                    {
                        path:'userInfo',
                        name:'userInfo',
                        meta:{title:'用户信息'},
                        component:UserInfo
                    },
                ]
            },
            {
                path:'/company',
                redirect:'company/companyList'
            },
            {
                path:'company/companyList',
                component:{render(c) { return c('router-view')  }},
                meta:{title:'公司信息'},
                redirect:'company/companyList',
                children:[
                    {
                        path:'',
                        name:'companyList',
                        meta:{title:'公司列表'},
                        component:CompanyList
                    },
                    {
                        path:'companyInfo',
                        name:'companyInfo',
                        meta:{title:'公司信息'},
                        component:CompanyInfo
                    },
                ]
            },
            {
                path:'testPage',
                name:'Test',
                meta:{title:'测试页面'},
                component:TestView
            },
        
        ]
    }
];

const allRoutes = [...loginRoutes, ...invoiceRoutes];

  
//  --3.-- 创建一个路由器实例 （机场）
const router = new VueRouter({
    //路由器工作模式（默认是 hash）
    mode:'hash',
    //  --4.-- 对路由实例设置 映射配置（航线）是一个对象
    routes:allRoutes
});

//全局前置路由守卫 ---- 初始化的时候被调用；每次路由切换之前被调用
router.beforeEach( async (to,from,next)=>{
    console.log("beforeEach ---> to,from",to, from);
    // next();

    const whiteList = ['/userLogin', '/test'];
    if (whiteList.includes(to.path)) {
        next();
        return;
    }
    const hasToken = await odooApi.web.session_check();
    console.log('======= hasToken =======',hasToken);
    if (hasToken) {
        next();
        return;
    } else {
        next(`/userLogin?redirect=${to.path}`)
        return;
    }
})

//全局后置路由守卫 ---- 初始化的时候被调用；每次路由切换之后被调用（没有 next 参数）
router.afterEach((to,from)=>{
    console.log("afterEach ---> to,from",to, from);
    if(to.meta.title){ 
        document.title = to.meta.title //修改网页的title
    }else{
        document.title = '智力竞技综合管理平台'
    }
})

export default router;