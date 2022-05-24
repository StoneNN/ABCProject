<!--
 * @Author: Nn
 * @Date: 2022-05-24 09:25:08
 * @LastEditors: Nxf
 * @LastEditTime: 2022-05-25 00:34:18
 * @Description: 公司编辑
-->

<template>
  <a-spin :spinning="spinning">
    <a-form-model 
      layout="horizontal" 
      :model="companyData"
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
                path:'/company/companyList/companyInfo',
                query:{
                    companyId:companyData.id
                }
            }"
            style="marginRight:10px;"
          >
            <a-button type="primary">返回</a-button>
          </router-link>
        </div>
        <h3 style="font-weight: bold; font-size: 16px;"> 公司信息编辑</h3>
      <!-- <a-form-model-item label="公司ID">
        <a-input v-model="companyData.id" placeholder="公司ID" disabled>
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item> -->
      <a-form-model-item label="公司名称">
        <a-input v-model="companyData.name" placeholder="公司名称" @blur="(e)=>onBlur('name',e)">
          <a-icon slot="prefix" type="tag" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="公司编号">
        <a-input v-model="companyData.vat" placeholder="公司编号" @blur="(e)=>onBlur('vat',e)">
          <a-icon slot="prefix" type="tags" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="移动电话">
        <a-input v-model="companyData.mobile" placeholder="移动电话" @blur="(e)=>onBlur('mobile',e)">
          <a-icon slot="prefix" type="barcode" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="邮箱">
        <a-input v-model="companyData.email" placeholder="邮箱" @blur="(e)=>onBlur('email',e)">
          <a-icon slot="prefix" type="book" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="员工编号">
        <a-input v-model="companyData.user_ids" placeholder="员工编号" @blur="(e)=>onBlur('user_ids',e)">
          <a-icon slot="prefix" type="profile" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="company_registry">
        <a-input v-model="companyData.company_registry" placeholder="company_registry" @blur="(e)=>onBlur('company_registry',e)">
          <a-icon slot="prefix" type="red-envelope" style="color:rgba(0,0,0,.25)" />
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

  name:"CompanyEditCpnt",
  data() {
    return {
      companyData:{
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
        const cid = parseInt(this.$route.query.companyId);
        console.log('---- uid ----',cid);
        const companyModel = odooRpc.env.model('res.company');
        

        const res = await companyModel.read(cid, ['id','name','mobile','email','vat','logo','user_ids','display_name','company_registry']);
        
        this.spinning = false;
        this.companyData = res[0];
        console.log('===== companyModel _ info _ edit =====', this.companyData);
      } catch (err) {
        console.log(err)
      }
    },
    onBlur(field,e){
      console.log('------ input 变化 -----',field,e.target.value);
      this.changeData[field] = this.companyData[field];
      console.log('------ changeData 变化 -----',this.changeData);
    },
    async handleSubmit() {
      
      this.btnLoading = true;
      console.log('==== 编辑提交 ====',this.companyData);
      const cid = parseInt(this.$route.query.companyId);
      console.log('---- cid changeData----',cid,this.changeData);
      try {
        
        const companyModel = odooRpc.env.model('res.company');
        
        // const res = await companyModel.write(cid,this.changeData);
        // console.log('--------customer _ edit--------',res);
       
        const res = await companyModel.write(cid, this.changeData);
        console.log('--- customer edit res ---',res);
        
        if (res) {
          this.btnLoading = false;
          this.$router.push(
            {
              path: '/company/companyList/companyInfo', 
              query: {
                companyId: this.companyData.id
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