<!--
 * @Author: Nxf
 * @Date: 2022-05-04 13:21:33
 * @LastEditors: Nxf
 * @LastEditTime: 2022-05-09 23:20:17
 * @Descripttion: 
-->

<template>
  <div>
    <a-descriptions title="公司详情" bordered :column='3'>
      <a-descriptions-item label="公司ID" :span="1">
        {{ companyData.id }}
      </a-descriptions-item>
      <a-descriptions-item label="公司名称" :span="2">
        {{ companyData.name }}
      </a-descriptions-item>
      <a-descriptions-item label="公司编号" :span="3">
        {{ companyData.vat }}
      </a-descriptions-item>
      <a-descriptions-item label="电话" :span="3">
        {{ companyData.mobile }}
      </a-descriptions-item>
      <a-descriptions-item label="邮箱" :span="3">
        {{ companyData.email }}
      </a-descriptions-item>
      <a-descriptions-item label="全名" :span="3">
        {{ companyData.display_name }}
      </a-descriptions-item>
      <a-descriptions-item label="logo" :span="3">
        {{ companyData.logo }}
      </a-descriptions-item>
      <a-descriptions-item label="员工编号" :span="3">
        {{ companyData.unitPrice }}
      </a-descriptions-item>
      <a-descriptions-item label="company_registry" :span="3">
        {{ companyData.company_registry }}
      </a-descriptions-item>
      <!-- <a-descriptions-item label="销售方" :span="3">
        <h4>名称:</h4>
        {{ companyData.seller }}
        <br />
        <h4>纳税人识别号:</h4>
        {{ companyData.sellerId }}
        <br />
        <h4>地址:</h4>
        {{ companyData.sAddress }}
        <br />
        <h4>电话:</h4>
        {{ companyData.sPhone }}
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
import odooRpc from '@/odoorpc'

Vue.use(Table).use(Descriptions).use(Divider).use(Button);



export default {
  name: "InvoiceDetailCpnt",
  data() {
    return {
        companyData:{}
    };
  },
  mounted() {
    this.getData();
  },
  methods:{
    async getData(){

      try{
        console.log('------cid -----',this.$route.query.companyId);
        const cid = parseInt(this.$route.query.companyId);

        const companyModel = odooRpc.env.model('res.company');

        const res = await companyModel.read(cid, ['id','name','mobile','email','vat','logo','user_ids','display_name','company_registry']);
        console.log('===== company_info =====', res)
        

        this.companyData = res[0];
        // this.contentDatas = oneData[0].content;
      } catch (err){
        console.log('------- company err ------',err);
      }  
    }
  }
};
</script>
<style  lang='less' scoped>
    /deep/.ant-descriptions {
      margin: 40px 20px 0px 20px;
      padding-top: 20px;
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