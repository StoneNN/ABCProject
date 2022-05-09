<!--
 * @Author: Nxf
 * @Date: 2022-05-04 13:21:33
 * @LastEditors: Nxf
 * @LastEditTime: 2022-05-08 22:20:14
 * @Descripttion: 
-->

<template>
  <div>
    <a-descriptions title="用户详情" bordered :column='3'>
      <a-descriptions-item label="用户ID" :span="3">
        {{ userData.id }}
      </a-descriptions-item>
      <a-descriptions-item label="用户名称" :span="3">
        {{ userData.name }}
      </a-descriptions-item>
      <a-descriptions-item label="商品规格">
        {{ userData.standards }}
      </a-descriptions-item>
      <a-descriptions-item label="用户日期">
        {{ userData.date }}
      </a-descriptions-item>
      <a-descriptions-item label="用户数量">
        {{ userData.quantity }}
      </a-descriptions-item>
      <a-descriptions-item label="商品单价">
        {{ userData.unitPrice }}
      </a-descriptions-item>
      <a-descriptions-item label="商品折扣" :span="2">
        {{ userData.discount }}
      </a-descriptions-item>
      <a-descriptions-item label="商品总价">
        {{ userData.total }}
      </a-descriptions-item>
      <a-descriptions-item label="总价大写" :span="2">
        {{ userData.totalBig }}
      </a-descriptions-item>
      <a-descriptions-item label="购买方" :span="3">
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
      </a-descriptions-item>
    </a-descriptions>

  </div>
</template>
<script>
import Vue from "vue";
import { Table, Descriptions, Divider, Button } from "ant-design-vue";
// import axios from 'axios';
import "ant-design-vue/dist/antd.css";
// import jsonData from '@/assets/ordersData.json';
import odooRpc from '@/odoorpc'

Vue.use(Table).use(Descriptions).use(Divider).use(Button);



export default {
  name: "InvoiceDetailCpnt",
  data() {
    return {
        userData:{}
    };
  },
  mounted() {
    this.getData();
  },
  methods:{
    async getData(){

        // const oneData = jsonData.filter((obj)=>{

        //   return obj.id == this.$route.query.orderId;
        // });

        // const uid = odooRpc.env.this.$route.query.userId;
        console.log('------uid -----',this.$route.query.userId);
        const Model = odooRpc.env.model('res.users');

        const res = await Model.read(this.$route.query.userId, ['id','name','login','mobile','email','display_name','image_1920','function','company_id','category_id','comment','ref','user_id']);
        console.log('===== user_info =====', res)
        
        console.log('-------=-===',res);

        this.userData = res;
        // this.contentDatas = oneData[0].content;
    }
  }
};
</script>
<style  lang='less' scoped>
    /deep/.ant-descriptions {
    margin: 40px 20px 0px 20px;
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