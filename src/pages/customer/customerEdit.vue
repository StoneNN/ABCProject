<!--
 * @Author: Nn
 * @Date: 2022-05-24 09:22:36
 * @LastEditors: Nxf
 * @LastEditTime: 2022-05-25 00:11:58
 * @Description: 客户编辑
-->

<template>
  <a-spin :spinning="spinning">
    <a-form-model 
      layout="horizontal" 
      :model="customerDaTa"
      @submit="handleSubmit" 
      @submit.native.prevent
      v-bind="layout"
      style="paddingBottom:20px;"
    >
        <div style="width:100%;height:40px;marginRight: 0px; textAlign:right;paddingTop:8px;">
          <a-button
            type="primary"
            html-type="submit"
            style="marginRight:20px;"
            :loading="btnLoading"
          >
            提交
          </a-button>
          <router-link 
            :to="{
                path:'/customer/customerList/customerInfo',
                query:{
                    customerId:customerDaTa.id
                }
            }"
            style="marginRight:10px;"
          >
            <a-button type="primary">返回</a-button>
          </router-link>
        </div>
        <h3 style="font-weight: bold; font-size: 16px;"> 客户信息编辑</h3>
      <!-- <a-form-model-item label="客户ID">
        <a-input v-model="customerDaTa.id" placeholder="客户ID" disabled>
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item> -->
      <a-form-model-item label="客户名称">
        <a-input v-model="customerDaTa.name" placeholder="客户名称" @blur="(e)=>onBlur('name',e)">
          <a-icon slot="prefix" type="tag" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="职务">
        <a-input v-model="customerDaTa.function" placeholder="职务" @blur="(e)=>onBlur('function',e)">
          <a-icon slot="prefix" type="tags" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="客户条码">
        <a-input v-model="customerDaTa.barcode" placeholder="客户条码" @blur="(e)=>onBlur('barcode',e)">
          <a-icon slot="prefix" type="barcode" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="客户类别">
        <a-input v-model="customerDaTa.company_type" placeholder="客户类别" @blur="(e)=>onBlur('company_type',e)">
          <a-icon slot="prefix" type="book" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="国家">
        <a-input v-model="customerDaTa.country_id" placeholder="国家" @blur="(e)=>onBlur('country_id',e)">
          <a-icon slot="prefix" type="profile" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="省、直辖市">
        <a-input v-model="customerDaTa.state_id" placeholder="省、直辖市" @blur="(e)=>onBlur('state_id',e)">
          <a-icon slot="prefix" type="red-envelope" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="城市">
        <a-input v-model="customerDaTa.city" placeholder="城市" @blur="(e)=>onBlur('city',e)">
          <a-icon slot="prefix" type="money-collect" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="街道">
        <a-input v-model="customerDaTa.street" placeholder="街道" @blur="(e)=>onBlur('street',e)">
          <a-icon slot="prefix" type="fullscreen" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="街道2">
        <a-input v-model="customerDaTa.street2" placeholder="街道2" @blur="(e)=>onBlur('street2',e)">
          <a-icon slot="prefix" type="fullscreen" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="固定电话">
        <a-input v-model="customerDaTa.phone" placeholder="固定电话" @blur="(e)=>onBlur('phone',e)">
          <a-icon slot="prefix" type="fullscreen" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item> 
      <a-form-model-item label="移动电话">
        <a-input v-model="customerDaTa.mobile" placeholder="移动电话" @blur="(e)=>onBlur('mobile',e)">
          <a-icon slot="prefix" type="file-word" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="邮箱">
        <a-input v-model="customerDaTa.email" placeholder="邮箱" @blur="(e)=>onBlur('email',e)">
          <a-icon slot="prefix" type="file-word" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="标签">
        <a-input v-model="customerDaTa.category_id" placeholder="标签" @blur="(e)=>onBlur('category_id',e)">
          <a-icon slot="prefix" type="file-word" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
    </a-form-model>
  </a-spin>
</template>


<script>

import Vue from "vue";
import { Spin, Button, FormModel } from "ant-design-vue";
Vue.use(FormModel).use(Spin).use(Button);

import "ant-design-vue/dist/antd.css";
import odooRpc from '@/odoorpc';

export default {

  name:"CustomerEditCpnt",
  data() {
    return {
      customerDaTa:{
        // barcode:barcode[0]
      },  
      changeData:{},
      btnLoading:false,
      spinning: false,
      layout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 14 },
      },
    };
  },
  mounted() {
    this.spinning = true;
    this.getData();
  },
  methods:{
    async getData () {
      try {
        const cid = parseInt(this.$route.query.customerId);
        console.log('---- uid ----',cid);
        const customerModel = odooRpc.env.model('res.partner');
        

        const res = await customerModel.read(cid, ['id','name','display_name','function','phone','mobile','email','barcode','vat','bank_ids','type','company_id','company_type','zip','website','avatar_128','category_id','child_ids','parent_id','city','country_id','customer_rank','supplier_rank','industry_id','invoice_ids','ref','state_id','street','street2','team_id','user_id','title','active','currency_id']);
        
        this.spinning = false;
        this.customerDaTa = res[0];
        console.log('===== customerModel _ info _ edit =====', this.customerDaTa);
      } catch (err) {
        console.log(err)
      }
    },
    onBlur(field,e){
      console.log('------ input 变化 -----',field,e.target.value);
      this.changeData[field] = this.customerDaTa[field];
      console.log('------ changeData 变化 -----',this.changeData);
    },
    async handleSubmit() {
      
      this.btnLoading = true;
      console.log('==== 编辑提交 ====',this.customerDaTa);
      const cid = parseInt(this.$route.query.customerId);
      console.log('---- cid changeData----',cid,this.changeData);
      try {
        
        const customerModel = odooRpc.env.model('res.partner');
        
        // const res = await customerModel.write(cid,this.changeData);
        // console.log('--------customer _ edit--------',res);
       
        const res = await customerModel.write(cid, this.changeData);
        console.log('--- customer edit res ---',res);
        
        if (res) {
          this.btnLoading = false;
          this.$router.push(
            {
              path: '/customer/customerList/customerInfo', 
              query: {
                customerId: this.customerDaTa.id
              }
            })
        }

      } catch (err) {
        console.log(err)
      }
    },
  },
};
</script>

<style  lang='less' scoped>
    /deep/.ant-input{
      padding: 0px
    }
    /deep/ .ant-form-item-control{
      // background:gray
    }
</style>