<!--
 * @Author: Nxf
 * @Date: 2022-05-15 21:47:22
 * @LastEditors: Nn
 * @LastEditTime: 2022-06-02 16:35:10
 * @Descripttion:  产品信息编辑
-->

<template>
  <a-spin :spinning="spinning">
    <a-form-model 
      layout="horizontal" 
      :model="productData"
      @submit="onclickSubmit" 
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
          <!-- 返回 -->
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
        <a-input v-model="productData.name" placeholder="产品名称" @blur="(e)=>handelChange('name',e.target.value)">
          <a-icon slot="prefix" type="tag" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="内部类型">
       
        <a-select
          v-model="productData.detailed_type"
          style="width: 100%"
          @change="val => handleChange('detailed_type', val)"
        >
          <a-select-option v-for="op in selection_options('detailed_type')" :key="op[0]" :value="op[0]">
            {{ op[1] }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="产品条码">
        <a-input v-model="productData.barcode" placeholder="产品条码" @blur="(e)=>handelChange('barcode',e.target.value)">
          <a-icon slot="prefix" type="barcode" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <!-- <a-form-model-item label="产品类别"> -->
        <!-- <a-input v-model="productData.categ_id" placeholder="产品类别" @blur="(e)=>handelChange('categ_id',e.target.value)">
          <a-icon slot="prefix" type="book" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item> -->
      <a-form-model-item label="产品类别">
        <OMany2one
          v-model="productData.categ_id"
          :options="many2one_select_options.categ_id"
          width="100%"
          @change="(e) => handelChange('categ_id', e)"
        />
      </a-form-model-item>
      <a-form-model-item label="产品编码">
        <a-input v-model="productData.default_code" placeholder="产品编码" @blur="(e)=>handelChange('default_code',e.target.value)">
          <a-icon slot="prefix" type="profile" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="产品售价">
        <a-input v-model="productData.list_price" placeholder="产品售价" @blur="(e)=>handelChange('list_price',e.target.value)">
          <a-icon slot="prefix" type="red-envelope" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="产品成本价">
        <a-input v-model="productData.standard_price" placeholder="产品成本价" @blur="(e)=>handelChange('standard_price',e.target.value)">
          <a-icon slot="prefix" type="money-collect" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="产品体积">
        <a-input v-model="productData.volume" placeholder="产品体积" @blur="(e)=>handelChange('volume',e.target.value)">
          <a-icon slot="prefix" type="fullscreen" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="产品重量">
        <a-input v-model="productData.weight" placeholder="产品重量" @blur="(e)=>handelChange('weight',e.target.value)">
          <a-icon slot="prefix" type="file-word" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
    </a-form-model>
  </a-spin>
</template>


<script>

import Vue from "vue";
import { Spin, Button, FormModel, Select } from "ant-design-vue";
// import OInput from '@/components/OInput/OInput.vue';
import OMany2one from '@/components/OInput/OMany2one.vue';
Vue.use(FormModel).use(Spin).use(Button).use(Select);

import "ant-design-vue/dist/antd.css";
import odooRpc from '@/odoorpc';

const fields = ['id','name','display_name','barcode','categ_id','default_code','detailed_type','list_price','standard_price','volume','weight']
export default {

  name:"productEditCpnt",
  components: {
    // OInput,
    OMany2one
  },
  data() {
    return {

      fields_info:{},
      productData:{},  
      changeData:{},
      doneData:{},
      edit_model:undefined,
      many2one_select_options: {
        categ_id: []
      },
      
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
        console.log('---- pid ----',pid);

        const productModel = await odooRpc.env.model('product.template',{fields});
        this.fields_info = productModel._fields;
        
        const res = await productModel.read(pid, { fields });
        
        const oneData = res[0];
        this.spinning = false;

        this.productData = { ...oneData };
        this.changeData = { ...oneData };
        this.edit_model = productModel.init_edit_model({
          res_id: pid,
          record: {... this.productData},
          values: {...this.doneData}
        });
        const m2o_options_categ = await this.get_many2one_options('categ_id');
        console.log(m2o_options_categ);
        this.many2one_select_options.categ_id = m2o_options_categ;
        console.log('===== productModel _ info _ edit =====', this.productData);
      } catch (err) {
        console.log(err)
      }
    },
    async get_many2one_options(field) {
      console.log(this.fields_info)

      const meta = this.fields_info[field] || {}
      if (meta.type !== 'many2one') {
        return []
      }

      const relation = meta.relation
      const Relation = odooRpc.env.model(relation)
      const res = await Relation.name_search()
      // console.log(res)

      return res
    },
    async handelChange(fname, value) {
      console.log('=== handelChange ===',fname, value)
      // 这里 是父组件的  handelChange

      if (this.edit_model) {
        this.edit_model.onchange({
          fname,
          value,
          callback: result => {
            console.log('----- onchange result -----', result);
            const { values = {} } = result;
            this.doneData = { ...values };
            this.changeData = { ...this.changeData, ...values };
            console.log('------ 编辑 Input change -------',this.changeData);
            console.log('------ 编辑 Input doneData -------',this.doneData);
          }
        })
      }
    },
    selection_options(field) {
      const meta = this.fields_info[field] || {}
      if (meta.type !== 'selection') {
        return []
      }

      return meta.selection
    },
    onclickSubmit() {
      console.log('onclickSubmit')

      if (this.edit_model) {
        this.edit_model.commit({
          callback: result => {
            console.log('onclickSubmit  cb', result)
            // goto 详情页面
            this.btnLoading = false;
            this.$router.push(
              {
                path: '/product/productList/productInfo', 
                query: {
                  productId: this.productData.id
                }
            })
          }
        })
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
      background:white
    }
</style>
