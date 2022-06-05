<!--
 * @Author: Nxf
 * @Date: 2022-06-03 18:09:04
 * @LastEditors: Nxf
 * @LastEditTime: 2022-06-05 18:09:04
 * @Descripttion: 
-->

<template>
  <div>

    <div style="height:40px;textAlign:right;paddingTop:8px">
      <router-link 
          :to="{
              path:'/country/countryList/countryEdit',
              query:{
                  countryId:countryData.id
              }
          }"
           style="marginRight:10px"
      >
          <a-button type="primary">编辑</a-button>
      </router-link>
      <router-link 
          :to="{
              path:'/country/countryList',
          }"
           style="marginLeft:10px; marginRight:10px"
      >
          <a-button type="primary">返回</a-button>
      </router-link>
    </div>
     
    <a-spin :spinning="spinning">  
      <a-descriptions title="国家详情" bordered :column='4'>
        <a-descriptions-item label="国家代码" :span="4">
          {{ countryData.code }}
        </a-descriptions-item>
        <a-descriptions-item label="国家名称" :span="4">
          {{ countryData.name }}
        </a-descriptions-item>
        <a-descriptions-item label="省、州信息" :span="4">
           
            <a-table
                :columns="columns" 
                :data-source="stateData"
                :row-key="record => record.id" 
            >
            </a-table>

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

const columns = [
    {
        title:'省、州 id',
        dataIndex:'id',
        key:'id',
        align:'center',
        // width:'35%'
    },
    {
        title:'省、州代码',
        dataIndex:'code',
        key:'code',
        align:'center',
        width:'35%'
    },
    {
        title:'省、州名称',
        dataIndex:'name',
        key:'name',
        align:'center',
        width:'30%'
    },
]

export default {
  name: "ProductInfoCpnt",
  data() {
    return {
        columns,
        countryData:[],
        stateData:[],
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
        const pid = parseInt(this.$route.query.countryId);
        console.log('---- pid ----',pid);
        
        const fields = ['id','code','name','state_ids'];
        
        const countryModel = await odooRpc.env.model('res.country',{fields});
        this.fields_info = countryModel._fields;
        

        const res = await countryModel.read(pid, {fields});
        
        this.spinning = false;
        this.countryData = res[0];
        console.log('===== countryModel _ info =====', this.countryData);

        const meta = this.fields_info['state_ids'] || {};
        const relation = meta.relation;
        const Relation = odooRpc.env.model(relation);
        const temp = await Relation.read( res[0].state_ids, ['name', 'code'])

        // const temp = res[0].state_ids.map(function(item){
        //     return {id:item, code:item+'省代码', name:item+'名称'}
        // });
        console.log('----省州信息----',temp);
        this.stateData = temp;
      } catch (err) {
        console.log(err)
      }
    },
    format_selection(field) {
      const value = this.countryData[field]
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
  }
};
</script>

<style  lang='less' scoped>
    /deep/.ant-descriptions {
    margin: 0px 10px 0px 10px;
    padding-top: 0px;

    }
    /deep/.ant-descriptions-item-content {
      padding: 5px 10px 2px 10px;
      text-align: left;
      h4{
        display: inline-block;
        font-weight: bolder;
        // background-color: red;
      }
    }
    /deep/.ant-descriptions-item-label{
      // background-color: cyan;
      width: 150px;
      padding: 5px;
      font-size: 15px;
      font-weight: bolder;
    }
</style>