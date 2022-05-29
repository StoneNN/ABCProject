<!--
 * @Author: Nn
 * @Date: 2022-05-10 10:11:43
 * @LastEditors: Nxf
 * @LastEditTime: 2022-05-29 16:13:15
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
                rowSelection,
                loading: false,
                fields_info: {},
            }
        },
        computed: {
            columns() {
            const cols = [
    
                {
                    title:'产品名称',
                    dataIndex:'name',
                    key:'name',
                    align:'center',
                },
                {
                    title: '全名',
                    dataIndex:'display_name',
                    key: 'display_name',
                    align:'center',
                    // width:'20%'
                },
                {
                    title: '内部类型',
                    dataIndex:'detailed_type',
                    key: 'detailed_type',
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

            const get_render = col => {
                const meta = this.fields_info[col] || {}
                if (meta.type === 'many2one') {
                // eslint-disable-next-line no-unused-vars
                return (value, row, index) => (value ? value[1] : '')
                }
                if (meta.type === 'selection') {
                const get_label = value => {
                    const elm = meta.selection.find(item => item[0] === value)
                    return elm ? elm[1] : ''
                }
                // eslint-disable-next-line no-unused-vars
                return (value, row, index) => (value ? get_label(value) : '')
                }
                return undefined
            }

            return cols.map(col => {
                const col2 = {}
                const render = get_render(col.dataIndex);
                if (render) col2.customRender = render;
                return { ...col, ...col2 };
            })
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

                const domain = [];
                const fields = [];

                const productModel = await odooRpc.env.model('product.template',{fields});
                this.fields_info = productModel._fields;

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

