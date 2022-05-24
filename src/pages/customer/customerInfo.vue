<!--
 * @Author: Nn
 * @Date: 2022-05-10 10:12:32
 * @LastEditors: Nxf
 * @LastEditTime: 2022-05-24 23:43:33
 * @Description: 客户信息
-->

<template>
  <div>
    <div style="height:40px;textAlign:right;paddingTop:8px">
      <router-link 
          :to="{
              path:'/customer/customerList/customerEdit',
              query:{
                  customerId:customerData.id
              }
          }"
           style="marginRight:10px"
      >
          <a-button type="primary">编辑</a-button>
      </router-link>
      <router-link 
          :to="{
              path:'/customer/customerList',
          }"
           style="marginLeft:10px; marginRight:10px"
      >
          <a-button type="primary">返回</a-button>
      </router-link>
    </div>
     
    <a-spin :spinning="spinning">  
      <a-descriptions title="客户详情" bordered :column='3'>
        <!-- <a-descriptions-item label="客户ID" :span="1">
          {{ customerData.id }}
        </a-descriptions-item> -->
        <a-descriptions-item label="客户名称" :span="1">
          {{ customerData.name }}
        </a-descriptions-item>
        <a-descriptions-item label="客户全名">
          {{ customerData.display_name }}
        </a-descriptions-item>
        <!-- <a-descriptions-item label="客户图片">
          {{ customerData.image_1920 }}
        </a-descriptions-item> -->
        <a-descriptions-item label="职务">
          {{ customerData.function }}
        </a-descriptions-item>
        <a-descriptions-item label="客户条码">
          {{ customerData.barcode }}
        </a-descriptions-item>
        <a-descriptions-item label="客户类别">
          {{ customerData.company_type }}
        </a-descriptions-item>
        <a-descriptions-item label="国家" :span="1">
          {{ customerData.country_id }}
        </a-descriptions-item>
        <a-descriptions-item label="省、直辖市">
          {{ customerData.state_id }}
        </a-descriptions-item>
        <a-descriptions-item label="城市" :span="2">
          {{ customerData.city }}
        </a-descriptions-item>
        <a-descriptions-item label="街道" :span="1">
          {{ customerData.street + customerData.street2}}
        </a-descriptions-item>
        <a-descriptions-item label="固定电话" :span="1">
          {{ customerData.phone }}
        </a-descriptions-item>
        <a-descriptions-item label="移动电话" :span="1">
          {{ customerData.mobile }}
        </a-descriptions-item>
        <a-descriptions-item label="邮箱" :span="1">
          {{ customerData.email }}
        </a-descriptions-item>
        <a-descriptions-item label="标签" :span="1">
          {{ customerData.category_id }}
        </a-descriptions-item>
      </a-descriptions>
    </a-spin>
    
  </div>
</template>

<script>
import Vue from "vue";
import { Table, Descriptions, Spin, Button } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import odooRpc from '@/odoorpc';

Vue.use(Table).use(Descriptions).use(Spin).use(Button);



export default {
  name: "CustomerInfoCpnt",
  data() {
    return {
        customerData:[],
        spinning: false,
    };
  },
  mounted() {
    console.log('------CustomerInfoCpnt-- mounted --------');
    this.spinning = true;
    this.getData();
  },
  methods:{
    async getData () {
      try {
        const cid = parseInt(this.$route.query.customerId);
        console.log('---- uid ----',cid);
        const customerModel = odooRpc.env.model('res.partner');
        
        // const res = await customerModel.read(uid, {fields:['id','name']});

        const res = await customerModel.read(cid, ['id','name','display_name','function','phone','mobile','email','barcode','vat','bank_ids','type','company_id','company_type','zip','website','avatar_128','category_id','child_ids','parent_id','city','country_id','customer_rank','supplier_rank','industry_id','invoice_ids','ref','state_id','street','street2','team_id','user_id','title','active','currency_id']);
        
        this.spinning = false;
        this.customerData = res[0];
        console.log('===== customerModel _ info =====', this.customerData);
      } catch (err) {
        console.log(err)
      }
    },
    editeInfo(){
        console.log('==== 编辑客户信息 ====');
    }

  }
};
</script>

<style  lang='less' scoped>
    /deep/.ant-descriptions {
    margin: 0px 10px 0px 10px;
    padding-top: 0px;

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