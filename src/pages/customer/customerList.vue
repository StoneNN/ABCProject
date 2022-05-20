<!--
 * @Author: Nn
 * @Date: 2022-05-10 10:12:23
 * @LastEditors: Nn
 * @LastEditTime: 2022-05-20 17:02:57
 * @Description: 客户列表
-->

<template>
    <div id="root">
        <div id="root1">
            <!-- <span>999</span> -->
            <a-button type="primary">
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
            style="width:40%;"
            @search="onSearch"
            />
        </div>
        <a-table
            :columns="columns" 
            :data-source="customerData"
            :row-selection="rowSelection"
            :row-key="record => record.id" 
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
    import Vue from 'vue'
    import odooRpc from '@/odoorpc';
    import odooApi from '@/odooapi';

    const columns = [
        {
            title: '公司ID',
            dataIndex:'id',
            key: 'id',
            align:'center',
            slots: { title: 'userId' },
            scopedSlots: { customRender: 'userId' },
            width:'75px'
        },
         {
            title: '公司编号',
            dataIndex:'vat',
            key: 'vat',
            align:'center',
            width:'15%'
        },
        {
            title: '公司名称',
            dataIndex:'name',
            key: 'name',
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
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
            align:'center',
        },
        {
            title: '全名',
            dataIndex:'display_name',
            key: 'display_name',
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
            }
        },
        mounted() {
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

                const cid = odooApi.web.session.session_info.company_id;
                const domain = [['company_id', '=', cid]];
                // const domain = [];
                // const fields = [];

                const customerModel = odooRpc.env.model('res.partner');
                // const fields = ['id','name','mobile','email','display_name','vat','logo','company_registry','user_ids'];
                const fields = [];
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
                this.customerData = result;
            }
        }
    }
</script>

<style lang='less' scoped>

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