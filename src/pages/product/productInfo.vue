<!--
 * @Author: Nn
 * @Date: 2022-05-10 10:12:02
<<<<<<< HEAD
 * @LastEditors: Nn
 * @LastEditTime: 2022-05-19 16:12:04
=======
 * @LastEditors: Nxf
 * @LastEditTime: 2022-05-16 23:04:06
>>>>>>> temp
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
     
      
      <a-descriptions title="产品详情" bordered :column='3'>
        <a-descriptions-item label="产品ID" :span="1">
          {{ productData.id }}
        </a-descriptions-item>
        <a-descriptions-item label="产品名称" :span="1">
          {{ productData.name }}
        </a-descriptions-item>
        <a-descriptions-item label="产品全名">
          {{ productData.display_name }}
        </a-descriptions-item>
        <!-- <a-descriptions-item label="产品图片">
          {{ productData.image_1920 }}
        </a-descriptions-item> -->
        <a-descriptions-item label="产品条码">
          {{ productData.barcode }}
        </a-descriptions-item>
        <a-descriptions-item label="产品类别">
          {{ productData.categ_id }}
        </a-descriptions-item>
        <a-descriptions-item label="产品编码" :span="2">
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
        <!-- <a-descriptions-item label="company_id" :span="1">
          {{ productData.company_id }}
        </a-descriptions-item>
        <a-descriptions-item label="备注" :span="2">
          {{ productData.comment }}
        </a-descriptions-item> -->
        <!-- <a-descriptions-item label="购买方" :span="3">
          <h4>名称:</h4>
          {{ productData.buyer }}
          <br />
          <h4>纳税人识别号:</h4>
          {{ productData.buyerId }}
          <br />
          <h4>地址:</h4>
          {{ productData.bAddress }}
          <br />
          <h4>电话:</h4>
          {{ productData.bPhone }}
          <br />
        </a-descriptions-item>
        <a-descriptions-item label="销售方" :span="3">
          <h4>名称:</h4>
          {{ productData.seller }}
          <br />
          <h4>纳税人识别号:</h4>
          {{ productData.sellerId }}
          <br />
          <h4>地址:</h4>
          {{ productData.sAddress }}
          <br />
          <h4>电话:</h4>
          {{ productData.sPhone }}
          <br />
        </a-descriptions-item> -->
      </a-descriptions>
  </div>
</template>
<script>
import Vue from "vue";
import { Table, Descriptions, Divider, Button } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import odooRpc from '@/odoorpc';

Vue.use(Table).use(Descriptions).use(Divider).use(Button);



export default {
  name: "ProductInfoCpnt",
  data() {
    return {
        productData:[],
    };
  },
  mounted() {
    console.log('------ProductInfoCpnt-- mounted --------');
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
        console.log('===== productModel _ info =====', this.productData);
      } catch (err) {
        console.log(err)
      }
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



