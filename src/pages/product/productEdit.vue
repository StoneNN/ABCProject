<!--
 * @Author: Nxf
 * @Date: 2022-05-15 21:47:22
 * @LastEditors: Nn
 * @LastEditTime: 2022-05-21 17:03:00
 * @Descripttion:  产品信息编辑
-->

<template>
  <div style="paddingTop:20px; paddingBottom:20px;">
    <a-form-model 
      layout="horizontal" 
      :model="productData"
      @submit="handleSubmit" 
      @submit.native.prevent
      style="width:100%; margin:0 auto"
      v-bind="layout"
    >
        <a-form-model-item>
        <div style="width:100%; height:40px;textAlign:right;paddingTop:8px;background:red">

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
          >
            <a-button type="primary">返回</a-button>
          </router-link>
        </div>
        </a-form-model-item>
      <a-form-model-item label="产品ID">
        <a-input v-model="productData.id" placeholder="产品ID">
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="产品名称">
        <a-input v-model="productData.name" placeholder="产品名称" @blur="onChange">
          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="产品全名">
        <a-input v-model="productData.display_name" placeholder="产品全名">
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <!-- <a-form-model-item label="产品条码">
        <a-input v-model="productData.barcode" placeholder="产品条码">
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item> -->
      <!-- <a-form-model-item label="产品类别">
        <a-input v-model="productData.categ_id" placeholder="产品类别">
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="产品编码">
        <a-input v-model="productData.default_code" placeholder="产品编码">
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item> -->
      <a-form-model-item label="产品售价">
        <a-input v-model="productData.list_price" placeholder="产品售价">
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="产品成本价">
        <a-input v-model="productData.standard_price" placeholder="产品成本价">
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="产品体积">
        <a-input v-model="productData.volume" placeholder="产品体积">
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="产品重量">
        <a-input v-model="productData.weight" placeholder="产品重量">
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <!-- <a-form-model-item>
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
      </a-form-model-item> -->
    </a-form-model>
  </div>
</template>


<script>

import Vue from "vue";
import { Divider, Button, FormModel, Descriptions } from "ant-design-vue";
Vue.use(FormModel).use(Divider).use(Button).use(Descriptions);

import "ant-design-vue/dist/antd.css";
import odooRpc from '@/odoorpc';

export default {
  data() {
    return {
      productData:{
        // barcode:barcode[0]
      },  
      value2:{},
      layout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 14 },
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
    onChange(field){
      console.log('------ input 变化 -----',field);
      this.value2[field] = this.productData[field];
      console.log('------ value2 变化 -----',this.value2);
    },
    async handleSubmit() {
      console.log('==== 编辑提交 ===',this.productData);
      try {
        const pid = parseInt(this.$route.query.productId);
        console.log('---- pid ----',pid);
        const productModel = odooRpc.env.model('product.template');
        
        // const res = await productModel.write(pid,this.value2);
        // console.log('--------product _ edit--------',res);
        const res = await productModel.read(pid, ['id','name','display_name','image_1920','barcode','categ_id','company_id','default_code','list_price','standard_price','type','uom_id','uom_name','volume','weight','active']);
        this.productData = res[0];
        console.log('===== productModel _ info _ edit =====', this.productData);

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
</style>
