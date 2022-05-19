<!--
 * @Author: Nxf
 * @Date: 2022-05-15 21:47:22
 * @LastEditors: Nn
 * @LastEditTime: 2022-05-19 16:02:53
 * @Descripttion:  产品信息编辑
-->
// style="width:700px; margin:0 auto"
<template>
  <div style="paddingTop:20px">
    <a-form-model 
      layout="horizontal" 
      :model="formInline" 
      @submit="handleSubmit" 
      @submit.native.prevent
    >
     <a-descriptions title="产品详情" bordered :column='3'>
        <a-descriptions-item label="产品ID" :span="1">
          {{ productData.id }}
        </a-descriptions-item>
        <a-descriptions-item label="产品名称" :span="1" style="height:38px" >
          <a-form-model-item>
            <a-input 
              v-model="productData.name" 
              placeholder="产品名称"
              style="border:0px; margin:0px"
            >
              <!-- <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" /> -->
            </a-input>
          </a-form-model-item>
        </a-descriptions-item>
        <a-descriptions-item label="产品名称" :span="1">
          <a-form-model-item>
            <a-input 
              v-model="productData.name" 
              placeholder="产品名称"
              style="border:0px; margin:0px"
            >
              <!-- <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" /> -->
            </a-input>
          </a-form-model-item>
        </a-descriptions-item>
        <a-descriptions-item label="产品名称" :span="1">
          <a-form-model-item>
            <a-input 
              v-model="productData.name" 
              placeholder="产品名称"
              style="border:0px; margin:0px"
            >
              <!-- <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" /> -->
            </a-input>
          </a-form-model-item>
        </a-descriptions-item>
        <a-descriptions-item label="产品名称" :span="1">
          <a-form-model-item>
            <a-input 
              v-model="productData.name" 
              placeholder="产品名称"
              style="border:0px; margin:0px"
            >
              <!-- <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" /> -->
            </a-input>
          </a-form-model-item>
        </a-descriptions-item>
        <a-descriptions-item label="产品名称" :span="1">
          <a-form-model-item>
            <a-input 
              v-model="productData.name" 
              placeholder="产品名称"
              style="border:0px; margin:0px"
            >
              <!-- <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" /> -->
            </a-input>
          </a-form-model-item>
        </a-descriptions-item>
        <a-descriptions-item label="产品名称" :span="1">
          <a-form-model-item>
            <a-input 
              v-model="productData.name" 
              placeholder="产品名称"
              style="border:0px; margin:0px"
            >
              <!-- <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" /> -->
            </a-input>
          </a-form-model-item>
        </a-descriptions-item>
        <a-descriptions-item label="产品名称" :span="1">
          <a-form-model-item>
            <a-input 
              v-model="productData.name" 
              placeholder="产品名称"
              style="border:0px; margin:0px"
            >
              <!-- <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" /> -->
            </a-input>
          </a-form-model-item>
        </a-descriptions-item>
        <a-descriptions-item label="产品名称" :span="1">
          <a-form-model-item>
            <a-input 
              v-model="productData.name" 
              placeholder="产品名称"
              style="border:0px; margin:0px"
            >
              <!-- <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" /> -->
            </a-input>
          </a-form-model-item>
        </a-descriptions-item>
        <a-descriptions-item label="产品名称" :span="1">
          <a-form-model-item>
            <a-input 
              v-model="productData.name" 
              placeholder="产品名称"
              style="border:0px; margin:0px"
            >
              <!-- <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" /> -->
            </a-input>
          </a-form-model-item>
        </a-descriptions-item>
        <a-descriptions-item label="产品名称" :span="1">
          <a-form-model-item>
            <a-input 
              v-model="productData.name" 
              placeholder="产品名称"
              style="border:0px; margin:0px"
            >
              <!-- <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" /> -->
            </a-input>
          </a-form-model-item>
        </a-descriptions-item>
        <a-descriptions-item label="产品名称" :span="1">
          <a-form-model-item>
            <a-input 
              v-model="productData.name" 
              placeholder="产品名称"
              style="border:0px; margin:0px"
            >
              <!-- <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" /> -->
            </a-input>
          </a-form-model-item>
        </a-descriptions-item>
     </a-descriptions>
      <a-form-model-item>
        <a-input v-model="productData.name" placeholder="产品名称">
          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-input v-model="productData.name" placeholder="Password">
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-button
          type="primary"
          html-type="submit"
        >
          编辑
        </a-button>
        <router-link 
          :to="{
              path:'/product/productList/productInfo',
              query:{
                  productId:productData.id
              }
          }"
           style="marginLeft:10px"
      >
          <a-button type="primary">返回</a-button>
      </router-link>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>


<script>

import Vue from "vue";
import { Form, Divider, Button, FormModel, Descriptions } from "ant-design-vue";
Vue.use(Form).use(FormModel).use(Divider).use(Button).use(Descriptions);

import "ant-design-vue/dist/antd.css";
import odooRpc from '@/odoorpc';

export default {
  data() {
    return {
      productData:{},  
      formInline: {
        user: '',
        password: '',
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods:{
    async getData () {
      try {
        const pid = parseInt(this.$route.query.productId);
        console.log('---- uid ----',pid);
        const productModel = odooRpc.env.model('product.template');
        
        // const res = await productModel.read(uid, {fields:['id','name']});

        const res = await productModel.read(pid, ['id','name','display_name','image_1920','barcode','categ_id','company_id','default_code','list_price','standard_price','type','uom_id','uom_name','volume','weight','active']);
        this.productData = res[0];
        console.log('===== productModel _ info _ edit =====', this.productData);
      } catch (err) {
        console.log(err)
      }
    },
    async handleSubmit() {
      console.log('==== 编辑提交 ===',this.productData);
      try {
        const pid = parseInt(this.$route.query.productId);
        console.log('---- pid ----',pid);
        const productModel = odooRpc.env.model('product.template');
        
        const res = await productModel.write(pid,{name:this.productData.name})
        console.log('--------product _ edit--------',res);
        // const res = await productModel.read(pid, ['id','name','display_name','image_1920','barcode','categ_id','company_id','default_code','list_price','standard_price','type','uom_id','uom_name','volume','weight','active']);
        // this.productData = res[0];
        // console.log('===== productModel _ info _ edit =====', this.productData);

      } catch (err) {
        console.log(err)
      }
    },
  },
};
</script>

<style  lang='less' scoped>
    /deep/.ant-descriptions {
      margin: 0px 10px 0px 10px;
      padding: 0px;
    }
    /deep/.ant-descriptions-item-content {
      padding: 0px;
      text-align: left;
      h4{
        display: inline-block;
        font-weight: bolder;
        // background-color: red;
      }
    }
    /deep/.ant-descriptions-item-label{
      // background-color: cyan;
      padding: 0px;
      font-size: 15px;
      font-weight: bolder;
    }
    /deep/.ant-input{
      padding: 0px
    }
</style>
