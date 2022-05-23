<!--
 * @Author: Nxf
 * @Date: 2022-05-15 21:47:22
 * @LastEditors: Nn
 * @LastEditTime: 2022-05-23 16:41:32
 * @Descripttion:  产品信息编辑
-->

<template>
  <a-spin :spinning="spinning">
    <a-form-model 
      layout="horizontal" 
      :model="productData"
      @submit="handleSubmit" 
      @submit.native.prevent
      v-bind="layout"
      style="paddingBottom:20px;"
    >
        <!-- <a-form-model-item style="height:40px;background:red; text-align: right;"> -->
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
                path:'/product/productList/productInfo',
                query:{
                    productId:productData.id
                }
            }"
            style="marginRight:10px;"
          >
            <a-button type="primary">返回</a-button>
          </router-link>
        </div>
        <!-- </a-form-model-item> -->
        <h3 style="font-weight: bold; font-size: 16px;"> 产品信息编辑</h3>
      <!-- <a-form-model-item label="产品ID">
        <a-input v-model="productData.id" placeholder="产品ID" disabled>
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item> -->
      <a-form-model-item label="产品名称">
        <a-input v-model="productData.name" placeholder="产品名称" @change="(e)=>onChange('name',e)">
          <a-icon slot="prefix" type="tag" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <!-- <a-form-model-item label="产品全名">
        <a-input v-model="productData.display_name" placeholder="产品全名" disabled>
          <a-icon slot="prefix" type="tags" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item> -->
      <a-form-model-item label="产品条码">
        <a-input v-model="productData.barcode" placeholder="产品条码" @change="(e)=>onChange('barcode',e)">
          <a-icon slot="prefix" type="barcode" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <!-- <a-form-model-item label="产品类别">
        <a-input v-model="productData.categ_id" placeholder="产品类别" @change="(e)=>onChange('categ_id',e)">
          <a-icon slot="prefix" type="book" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item> -->
      <a-form-model-item label="产品编码">
        <a-input v-model="productData.default_code" placeholder="产品编码" @change="(e)=>onChange('default_code',e)">
          <a-icon slot="prefix" type="profile" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="产品售价">
        <a-input v-model="productData.list_price" placeholder="产品售价" @change="(e)=>onChange('list_price',e)">
          <a-icon slot="prefix" type="red-envelope" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="产品成本价">
        <a-input v-model="productData.standard_price" placeholder="产品成本价" @change="(e)=>onChange('standard_price',e)">
          <a-icon slot="prefix" type="money-collect" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="产品体积">
        <a-input v-model="productData.volume" placeholder="产品体积" @change="(e)=>onChange('volume',e)">
          <a-icon slot="prefix" type="fullscreen" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="产品重量">
        <a-input v-model="productData.weight" placeholder="产品重量" @change="(e)=>onChange('weight',e)">
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

  name:"productEditCpnt",
  data() {
    return {
      productData:{
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
        const pid = parseInt(this.$route.query.productId);
        console.log('---- uid ----',pid);
        const productModel = odooRpc.env.model('product.template');
        
        // const res = await productModel.read(uid, {fields:['id','name']});

        const res = await productModel.read(pid, ['id','name','display_name','barcode','categ_id','default_code','list_price','standard_price','volume','weight']);
        
        this.spinning = false;
        this.productData = res[0];
        console.log('===== productModel _ info _ edit =====', this.productData);
      } catch (err) {
        console.log(err)
      }
    },
    onChange(field,e){
      console.log('------ input 变化 -----',field,e.target.value);
      this.changeData[field] = this.productData[field];
      console.log('------ changeData 变化 -----',this.changeData);
    },
    async handleSubmit() {
      
      this.btnLoading = true;
      console.log('==== 编辑提交 ====',this.productData);
      const pid = parseInt(this.$route.query.productId);
      console.log('---- pid changeData----',pid,this.changeData);
      try {
        
        const productModel = odooRpc.env.model('product.template');
        
        // const res = await productModel.write(pid,this.changeData);
        // console.log('--------product _ edit--------',res);
       
        const res = await productModel.write(pid, this.changeData);
        console.log('--- product edit res ---',res);
        
        if (res) {
          this.btnLoading = false;
          this.$router.push(
            {
              path: '/product/productList/productInfo', 
              query: {
                productId: this.productData.id
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
