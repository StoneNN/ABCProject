<!--
 * @Author: Nn
 * @Date: 2022-05-10 10:11:43
 * @LastEditors: Nn
 * @LastEditTime: 2022-05-23 15:51:06
 * @Description: 产品列表
-->

<template>
    <div id="root">
        <div id="root1">
            <a-button type="primary" style="marginRight:10px">
            批量删除
            </a-button>

            <a-button type="primary" @click="onCreateAction">
            新建产品
            </a-button>
            
            <a-button type="primary">
            重置
            </a-button>

            <a-input-search
                placeholder="请输入订单号码"
                enter-button="搜索"
                size="default"
                style="width:40%;"
                @search="onSearch"
            />
        </div>
        <a-table
            :columns="columns" 
            :data-source="productData"
            :row-selection="rowSelection"
            :row-key="record => record.id" 
            :loading="loading"
        >

            <a slot="orderCode" slot-scope="text">{{text}}</a>
            <span slot="total" slot-scope="text">￥{{text}}</span>
            <template slot="action" slot-scope="text,record">
                <router-link 
                    :to="{
                        path:'/product/productList/productInfo',
                        query:{
                            productId:record.id
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
    import odooApi from '@/odooapi';
    
    const columns = [
    
        {
            title: '产品名称',
            dataIndex: 'name',
            key: 'name',
            align:'center',
        },
        {
            title: '全名',
            dataIndex:'display_name',
            key: 'display_name',
            align:'center',
            // width:'20%'

        },
        // {
        //     title: '产品图片',
        //     dataIndex: 'image_1920',
        //     key: 'image_1920',
        //     align:'center',
        //     width:'100px'
        // },
        {
            title: '条形码',
            dataIndex: 'barcode',
            key: 'barcode',
            align:'center',
            width:'100px'
        },
        {
            title: '类别',
            dataIndex:'categ_id',
            key: 'categ_id',
            align:'center',
        },
        {
            title: '产品编码',
            dataIndex:'default_code',
            key: 'default_code',
            align:'center',
            scopedSlots:{ customRender: 'default_code' }
        },
        {
            title: '售价',
            dataIndex:'list_price',
            key: 'list_price',
            align:'center',
            // scopedSlots: {customRender:'function'},
            width:'80px'
        },
        {
            title: '成本价',
            dataIndex:'standard_price',
            key: 'standard_price',
            align:'center',
            scopedSlots: {customRender:'standard_price'},
            // width:'15%'
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
        name:"ProductListCpnt",
        data(){
            return{
                productData:[],
                columns,
                rowSelection,
                loading: false,
            }
        },
        mounted() {
            this.loading = true;
            this.get_product_model();
        },
        methods: {
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
            async get_product_model () {

                // const cid = odooApi.web.session.session_info.company_id;
                // const domain = [['company_id', '=', cid]];
                const domain = [];
                const fields = [];

                const productModel = odooRpc.env.model('product.template');
                // const fields = ['id','name','mobile','email','display_name','vat','logo','company_registry','user_ids'];
                const limit = 8;
                const offset = 0;
                const order = 'display_name';
                const result = await productModel.search_read({
                    domain,
                    fields,
                    offset,
                    limit,
                    order
                });
                console.log('---- get productModel ----',result);
                this.loading = false;
                this.productData = result;
                
            },
            onCreateAction(){
                console.log('--------- 新建产品 --------');
                this.$router.push('/product/productList/productCreate');
            }
        },

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

