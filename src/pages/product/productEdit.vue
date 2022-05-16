<!--
 * @Author: Nxf
 * @Date: 2022-05-15 21:47:22
 * @LastEditors: Nxf
 * @LastEditTime: 2022-05-16 22:43:20
 * @Descripttion:  产品信息编辑
-->

<template>
  <a-form-model layout="inline" :model="formInline" @submit="handleSubmit" @submit.native.prevent>
    <a-form-model-item>
      <a-input 
        v-model="productData.name" 
        placeholder="产品名称"
        @change="onChange('name')"
      >
        <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-model-item>
    <!-- <a-form-model-item>
      <a-input v-model="formInline.password" type="password" placeholder="Password">
        <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-model-item> -->
    <a-form-model-item>
      <a-button
        type="primary"
        html-type="submit"
      >
        编辑
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>

import Vue from "vue";
import { Form, Divider, Button, FormModel } from "ant-design-vue";
Vue.use(Form).use(FormModel).use(Divider).use(Button);

import "ant-design-vue/dist/antd.css";
import odooRpc from '@/odoorpc';

export default {
  data() {
    return {
      productData:{},  
      value2:{},
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
        
        const res = await productModel.write(pid,this.value2);
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