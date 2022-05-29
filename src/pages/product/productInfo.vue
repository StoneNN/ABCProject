<!--
 * @Author: Nn
 * @Date: 2022-05-10 10:12:02
 * @LastEditors: Nxf
 * @LastEditTime: 2022-05-29 16:37:20
 * @Description: 产品列表
-->

<template>
  <div>
    <!-- <a-button type="primary" @click="editeInfo()">
      编辑
    </a-button>   -->
    <div style="height:40px;textAlign:right;paddingTop:8px">
      <router-link 
          :to="{
              path:'/product/productList/productEdit',
              query:{
                  productId:productData.id
              }
          }"
           style="marginRight:10px"
      >
          <a-button type="primary">编辑</a-button>
      </router-link>
      <router-link 
          :to="{
              path:'/product/productList',
          }"
           style="marginLeft:10px; marginRight:10px"
      >
          <a-button type="primary">返回</a-button>
      </router-link>
    </div>
     
    <a-spin :spinning="spinning">  
      <a-descriptions title="产品详情" bordered :column='3'>
        <!-- <a-descriptions-item label="产品ID" :span="1">
          {{ productData.id }}
        </a-descriptions-item> -->
        <a-descriptions-item label="产品名称" :span="1">
          {{ productData.name }}
        </a-descriptions-item>
        <a-descriptions-item label="产品全名">
          {{ productData.display_name }}
        </a-descriptions-item>
        <a-descriptions-item label="内部类型">
          <!-- {{ productData.detailed_type }} -->
          {{ format_selection('detailed_type') }}
        </a-descriptions-item>
        <!-- <a-descriptions-item label="产品图片">
          {{ productData.image_1920 }}
        </a-descriptions-item> -->
        <a-descriptions-item label="产品条码">
          {{ productData.barcode }}
        </a-descriptions-item>
        <a-descriptions-item label="产品类别">
          {{ productData.categ_id ? productData.categ_id[1]:''}}
        </a-descriptions-item>
        <a-descriptions-item label="产品编码" :span="1">
          {{ productData.default_code }}
        </a-descriptions-item>
        <a-descriptions-item label="售价">
          {{ productData.list_price }}
        </a-descriptions-item>
        <a-descriptions-item label="成本价" :span="2">
          {{ productData.standard_price }}
        </a-descriptions-item>
        <a-descriptions-item label="体积" :span="1">
          {{ productData.volume }}
        </a-descriptions-item>
        <a-descriptions-item label="重量" :span="2">
          {{ productData.weight }}
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
  name: "ProductInfoCpnt",
  data() {
    return {
        productData:[],
        fields_info: {},
        spinning: false,
    };
  },
  mounted() {
    console.log('------ProductInfoCpnt-- mounted --------');
    this.spinning = true;
    this.getData();
  },
  methods:{
    async getData () {
      try {
        const pid = parseInt(this.$route.query.productId);
        console.log('---- pid ----',pid);
        
        const fields = ['id','name','display_name','image_1920','barcode','categ_id','company_id','default_code','list_price','standard_price','type','uom_id','uom_name','volume','weight','active','detailed_type'];
        
        const productModel = await odooRpc.env.model('product.template',{fields});
        this.fields_info = productModel._fields;
        

        const res = await productModel.read(pid, {fields});
        
        this.spinning = false;
        this.productData = res[0];
        console.log('===== productModel _ info =====', this.productData);
      } catch (err) {
        console.log(err)
      }
    },
    format_selection(field) {
      const value = this.productData[field]
      const meta = this.fields_info[field] || {}
      if (meta.type !== 'selection') {
        return value
      }

      const get_label = v => {
        const elm = meta.selection.find(item => item[0] === v)
        return elm ? elm[1] : ''
      }

      return value ? get_label(value) : ''
    },
    editeInfo(){
        console.log('==== 编辑产品信息 ====');
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



