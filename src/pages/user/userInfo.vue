<!--
 * @Author: Nxf
 * @Date: 2022-05-04 13:21:33
 * @LastEditors: Nn
 * @LastEditTime: 2022-05-21 11:07:36
 * @Descripttion: 
-->

<template>
  <div>
        <div style="height:40px;textAlign:right;paddingTop:8px">
      <router-link 
          :to="{
              path:'/user/userList/userEdit',
              query:{
                  userId:userData.id
              }
          }"
           style="marginRight:10px"
      >
          <a-button type="primary">编辑</a-button>
      </router-link>
      <router-link 
          :to="{
              path:'/user/userList',
          }"
           style="marginLeft:10px; marginRight:10px"
      >
          <a-button type="primary">返回</a-button>
      </router-link>
    </div>
    <a-descriptions title="管理员详情" bordered :column='3'>
      <a-descriptions-item label="管理员ID" :span="1">
        {{ userData.id }}
      </a-descriptions-item>
      <a-descriptions-item label="管理员姓名" :span="1">
        {{ userData.name }}
      </a-descriptions-item>
      <a-descriptions-item label="职位">
        {{ userData.function }}
      </a-descriptions-item>
      <a-descriptions-item label="电话">
        {{ userData.mobile }}
      </a-descriptions-item>
      <a-descriptions-item label="邮箱">
        {{ userData.email }}
      </a-descriptions-item>
      <a-descriptions-item label="账号">
        {{ userData.login }}
      </a-descriptions-item>
      <a-descriptions-item label="所属公司" :span="2">
        {{ userData.category_id }}
      </a-descriptions-item>
      <a-descriptions-item label="头像">
        {{ userData.image_1920 }}
      </a-descriptions-item>
      <a-descriptions-item label="ref" :span="2">
        {{ userData.ref }}
      </a-descriptions-item>
      <a-descriptions-item label="user_id" :span="1">
        {{ userData.user_id }}
      </a-descriptions-item>
      <a-descriptions-item label="全名" :span="2">
        {{ userData.display_name }}
      </a-descriptions-item>
      <a-descriptions-item label="company_id" :span="1">
        {{ userData.company_id }}
      </a-descriptions-item>
      <a-descriptions-item label="备注" :span="2">
        {{ userData.comment }}
      </a-descriptions-item>
      <!-- <a-descriptions-item label="购买方" :span="3">
        <h4>名称:</h4>
        {{ userData.buyer }}
        <br />
        <h4>纳税人识别号:</h4>
        {{ userData.buyerId }}
        <br />
        <h4>地址:</h4>
        {{ userData.bAddress }}
        <br />
        <h4>电话:</h4>
        {{ userData.bPhone }}
        <br />
      </a-descriptions-item>
      <a-descriptions-item label="销售方" :span="3">
        <h4>名称:</h4>
        {{ userData.seller }}
        <br />
        <h4>纳税人识别号:</h4>
        {{ userData.sellerId }}
        <br />
        <h4>地址:</h4>
        {{ userData.sAddress }}
        <br />
        <h4>电话:</h4>
        {{ userData.sPhone }}
        <br />
      </a-descriptions-item> -->
    </a-descriptions>

  </div>
</template>
<script>
import Vue from "vue";
import { Table, Descriptions, Divider, Button } from "ant-design-vue";
// import axios from 'axios';
import "ant-design-vue/dist/antd.css";
// import jsonData from '@/assets/ordersData.json';
import odooRpc from '@/odoorpc';

Vue.use(Table).use(Descriptions).use(Divider).use(Button);



export default {
  name: "InvoiceDetailCpnt",
  data() {
    return {
        userData:[],
    };
  },
  mounted() {
    this.getData();
  },
  methods:{
    async getData () {
      try {
        // const oneData = jsonData.filter((obj)=>{

        //   return obj.id == this.$route.query.orderId;
        // });

        // const uid = odooRpc.env.this.$route.query.userId;
      
        const uid = parseInt(this.$route.query.userId);
        console.log('---- uid ----',uid);
        const userModel = odooRpc.env.model('res.users');
        
        // const res = await userModel.read(uid, {fields:['id','name']});

        const res = await userModel.read(uid, ['id','name','login','mobile','email','display_name','image_1920','function','company_id','category_id','comment','ref','user_id']);
        this.userData = res[0];
        console.log('===== user_info =====', this.userData);
      } catch (err) {
        console.log(err)
      }
    }
  }
};
</script>

<style  lang='less' scoped>
    /deep/.ant-descriptions {
    margin: 10px 20px 0px 20px;
    padding-top: 0px;
    }
    /deep/.ant-table {
        background-color: white;
        margin: 0px 20px;
    }
    /deep/.ant-descriptions-item-content {
      padding: 5px 0px 2px 10px;
      text-align: left;
      h4{
        display: inline-block;
        font-weight: bolder;
        // background-color: red;
      }
    }
    /deep/.ant-descriptions-item-label{
      // background-color: cyan;
      padding: 5px;
      font-size: 15px;
      font-weight: bolder;
    }
</style>