<!--
 * @Author: Nn
 * @Date: 2022-05-10 10:12:23
 * @LastEditors: Nn
 * @LastEditTime: 2022-06-11 11:06:45
 * @Description: 客户列表
-->

<template>
    <div id="root">
        <div id="root1">
            <!-- <span>999</span> -->
            <a-button type="primary" style="marginRight:10px">
            批量删除
            </a-button>
            
            <a-button type="primary">
            新建客户
            </a-button>
            <a-button type="primary">
            重置
            </a-button>
            
            <a-input-search
            placeholder="请输入客户名称"
            enter-button="搜索"
            size="default"
            style="width:300px;"
            @search="onSearch"
            />
        </div>
        <a-table
            :columns="columns" 
            :data-source="customerData"
            :row-selection="rowSelection"
            :row-key="record => record.id" 
            :loading="loading"
        >
            <a slot="orderCode" slot-scope="text">{{text}}</a>
            <span slot="total" slot-scope="text">￥{{text}}</span>
            <template slot="action" slot-scope="text,record">
                <router-link 
                    :to="{
                        path:'/customer/customerList/customerInfo',
                        query:{
                            customerId:record.id
                        }
                    }"
                >
                    详情
                </router-link>
                <a-divider type="vertical" />
                <a @click.prevent = "deleteAlert(record.id)">删除</a>
            </template>
        </a-table>
    </div>
</template>

<script>
    import odooRpc from '@/odoorpc';

    const columns = [
        {
            title: '客户名称',
            dataIndex:'name',
            key: 'name',
            align:'center',
            width:'100px'
        },
         {
            title: '客户全名',
            dataIndex:'display_name',
            key: 'display_name',
            align:'center',
            width:'15%'
        },
        {
            title: '客户类型',
            dataIndex:'company_type',
            key: 'company_type',
            align:'center',
            // width:'20%'
        },
        {
            title: '手机号',
            dataIndex: 'mobile',
            key: 'mobile',
            align:'center',
        },
        {
            title: '所属行业',
            dataIndex: 'industry_id',
            key: 'industry_id',
            align:'center',
        },
        {
            title: '条形码',
            dataIndex:'barcode',
            key: 'barcode',
            align:'center',
        },
        {
            title: '操作',
            dataIndex:'action',
            key: 'action',
            align:'center',
            scopedSlots: {customRender:'action'},
            width:'15%'
        },
    ];
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
    };
    export default {
        name:"CustomerListCpnt",
        data(){
            return{
                customerData:[],
                columns,
                rowSelection,
                loading: false,
            }
        },
        mounted() {
            this.loading = true;
            this.get_customer_model();
        },
        methods:{
            deleteAlert(id){
                if (confirm("确定删除吗？")) {
					console.log('-- 确定删除吗？ --',id);
					this.deleteOne(id);
				}
            },
            deleteOne(v){
                console.log('-- 删除 --',v);
            },
            onSearch(value) {
                console.log(value);
            },

            async get_customer_model () {

                const cid = odooRpc.web.session.session_info.company_id;
                const domain = [['company_id', '=', cid]];
                // const domain = [];
                // const fields = [];

                const customerModel = odooRpc.env.model('res.partner');
                const fields = ['id','name','display_name','function','phone','mobile','email','barcode','vat','bank_ids','type','company_id','company_type','zip','website','avatar_128','category_id','child_ids','parent_id','city','country_id','customer_rank','supplier_rank','industry_id','invoice_ids','ref','state_id','street','street2','team_id','user_id','title','active','currency_id'];
                const limit = 8;
                const offset = 0;
                const order = 'display_name';
                const result = await customerModel.search_read({
                    domain,
                    fields,
                    offset,
                    limit,
                    order
                });
                console.log('---- get_customer_model ----',result);
                
                this.loading = false;
                this.customerData = result;
            }
        }
    }
</script>

<style lang='less' scoped>
    #root {
        background-color: white;
        padding-right: 10px;
        position: relative;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        min-width: 1000px;
    }
    #root1 {
        background-color: white;
        width: 100%;
        height: 50px;
        position: relative;
        top: 0;
        left: 0;
        .ant-btn {
            float: right;
            margin-right: 20px;
            margin-bottom: 10px;
            margin-top: 10px;
        }
        .ant-input-search {
            float: right;
            margin-right: 10px;
            margin-top: 10px;
        }
    }
    /deep/.ant-table {
        background-color: white;
        margin: 10px 20px;
    }
</style>