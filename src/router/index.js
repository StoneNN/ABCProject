/*
 * @Author: Nn
 * @Date: 2022-04-25 17:05:44
 * @LastEditors: Nxf
 * @LastEditTime: 2022-06-04 09:53:14
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

// import AdminUser from '../pages/user/adminUser.vue';
import UserList from '@/pages/user/userList';
import UserInfo from '@/pages/user/userInfo';
import UserEdit from '@/pages/user/userEdit';
import UserCreate from '@/pages/user/userCreate';

import CompanyList from '@/pages/company/companyList';
import CompanyInfo from '@/pages/company/companyInfo';
import CompanyEdit from '@/pages/company/companyEdit';
import CompanyCreate from '@/pages/company/companyCreate';

import CustomerList from '@/pages/customer/customerList';
import CustomerInfo from '@/pages/customer/customerInfo';
import CustomerEdit from '@/pages/customer/customerEdit';
import CustomerCreate from '@/pages/customer/customerCreate';

import ProductList from '@/pages/product/productList';
import ProductInfo from '@/pages/product/productInfo'
import ProductEdit from '@/pages/product/productEdit';
import ProductCreate from '@/pages/product/productCreate';

import CountryList from '@/pages/country/countryList';
import CountryInfo from '@/pages/country/countryInfo';
import CountryEdit from '@/pages/country/countryEdit';

import Login from '@/pages/login.vue';
import Register from '@/pages/register.vue';
import TestView from '@/components/TestRpc';

import odooRpc from '@/odoorpc';

//  --2.--注入VueRouter插件
Vue.use(VueRouter);

//路由1
const loginRoutes = [
    {
        path:'/userLogin',
        name:'userLogin',
        meta:{title:'管理员登录'},
        component:Login
    },
    {
        path:'/userRegister',
        name:'userRegister',
        meta:{title:'管理员注册'},
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
    //             meta:{title:'管理员登录'},
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
            //     meta:{title:'管理员列表'},
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
            //     meta:{title:'超级管理员'},
            //     component:AdminUser
            // },
            {
                path:'user/userList',
                component:{render(c) { return c('router-view')  }},
                meta:{title:'管理员信息'},
                redirect:'user/userList',
                children:[
                    {
                        path:'',
                        name:'userList',
                        meta:{title:'管理员列表'},
                        component:UserList
                    },
                    {
                        path:'userInfo',
                        name:'userInfo',
                        meta:{title:'管理员信息'},
                        component:UserInfo
                    },
                    {
                        path:'userEdit',
                        name:'userEdit',
                        meta:{title:'管理员编辑'},
                        component:UserEdit
                    },
                    {
                        path:'userCreate',
                        name:'userCreate',
                        meta:{title:'管理员新建'},
                        component:UserCreate
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
                    {
                        path:'companyEdit',
                        name:'companyEdit',
                        meta:{title:'公司编辑'},
                        component:CompanyEdit
                    },
                    {
                        path:'companyCreate',
                        name:'companyCreate',
                        meta:{title:'公司编辑'},
                        component:CompanyCreate
                    },
                ]
            },

            {
                path:'/customer',
                redirect:'customer/customerList'
            },
            {
                path:'customer/customerList',
                component:{render(c) { return c('router-view')  }},
                meta:{title:'客户信息'},
                redirect:'customer/customerList',
                children:[
                    {
                        path:'',
                        name:'customerList',
                        meta:{title:'客户列表'},
                        component:CustomerList
                    },
                    {
                        path:'customerInfo',
                        name:'customerInfo',
                        meta:{title:'客户信息'},
                        component:CustomerInfo
                    },
                    {
                        path:'customerEdit',
                        name:'customerEdit',
                        meta:{title:'客户编辑'},
                        component:CustomerEdit
                    },
                    {
                        path:'customerCreate',
                        name:'customerCreate',
                        meta:{title:'客户新建'},
                        component:CustomerCreate
                    },
                ]
            },

            {
                path:'/product',
                redirect:'product/productList'
            },
            {
                path:'product/productList',
                component:{render(c) { return c('router-view')  }},
                meta:{title:'产品信息'},
                redirect:'product/productList',
                children:[
                    {
                        path:'',
                        name:'productList',
                        meta:{title:'产品列表'},
                        component:ProductList
                    },
                    {
                        path:'productInfo',
                        name:'productInfo',
                        meta:{title:'产品信息'},
                        component:ProductInfo
                    },
                    {
                        path:'productEdit',
                        name:'productEdit',
                        meta:{title:'产品编辑'},
                        component:ProductEdit
                    },
                    {
                        path:'productCreate',
                        name:'productCreate',
                        meta:{title:'新建产品'},
                        component:ProductCreate
                    },
                ]
            },
            {
                path:'/country',
                redirect:'country/countryList'
            },
            {
                path:'country/countryList',
                component:{render(c) { return c('router-view')  }},
                meta:{title:'国家信息'},
                redirect:'country/countryList',
                children:[
                    {
                        path:'',
                        name:'countryList',
                        meta:{title:'国家列表'},
                        component:CountryList
                    },
                    {
                        path:'countryInfo',
                        name:'countryInfo',
                        meta:{title:'国家信息'},
                        component:CountryInfo
                    },
                    {
                        path:'countryEdit',
                        name:'countryEdit',
                        meta:{title:'国家编辑'},
                        component:CountryEdit
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
    const hasToken = await odooRpc.web.session_check();
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