<!--
 * @Author: Nxf
 * @Date: 2022-06-03 18:08:34
 * @LastEditors: Nn
 * @LastEditTime: 2022-06-10 17:04:37
 * @Descripttion: 
-->
<template>
    <div id="root">
        <div id="root1">
            <!-- <a-button type="primary" style="marginRight:10px" @click="deleteAction(selectedRowKeys)">
            批量删除
            </a-button> -->
            
            <a-button type="primary" @click="onResetSearch()">
            重置
            </a-button>

            <a-input-search
                placeholder="请输入国家名称"
                enter-button="搜索"
                size="default"
                style="width:300px;"
                @search="onSearch"
                v-model="serchValue"
            />
        </div>
        <a-table
            :columns="columns" 
            :data-source="countryData"
            :row-selection="rowSelection"
            :row-key="record => record.id" 
            :loading="loading"
        >

            <template slot="action" slot-scope="text,record">
                <router-link 
                    :to="{
                        path:'/country/countryList/countryInfo',
                        query:{
                            countryId:record.id
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
        
   
    export default {
        name:"ProductListCpnt",
        data(){
            return{
                countryData:[],
                selectedRowKeys:[],
                loading: false,
                fields_info: {},
                serchValue:''
            }
        },
        computed: {
            columns() {
            const cols = [
                {
                    title:'国家代码',
                    dataIndex:'code',
                    key:'code',
                    align:'center',
                    width:'15%'
                },
                {
                    title:'国家名称',
                    dataIndex:'name',
                    key:'name',
                    align:'center',
                    width:'35%'
                },
                {
                    title: '州、省名称',
                    dataIndex:'state_ids',
                    key: 'state_ids',
                    align:'center',
                    width:'35%'
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
            },
            rowSelection () {
                const {selectedRowKeys} = this;
                return{
                    selectedRowKeys,
                    onChange: (selectedRowKeys, selectedRows) => {
                        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                        this.selectedRowKeys = selectedRowKeys;
                    },
                    onSelect: (record, selected, selectedRows) => {
                        console.log(record, selected, selectedRows);
                    },
                    onSelectAll: (selected, selectedRows, changeRows) => {
                        console.log(selected, selectedRows, changeRows);
                    },
                }
                
            }
        },
        mounted() {
            this.loading = true;
            this.get_country_model();
        },
        methods: {
            deleteAlert(id){
                if (confirm("确定删除吗？")) {
					console.log('-- 确定删除吗？ --',id);
					this.deleteAction(id);
				}
            },
            async deleteAction(pid){
                console.log('-- 删除 --',pid);
                const countryModel = odooRpc.env.model('res.country');
                const res = await countryModel.unlink(pid);
                if (res) {
                    this.get_country_model();
                    this.clearSelectRowKeys();
                }
            },
            onSearch(value) {
                console.log('-------- 产品名称搜索 ---------',value);
                this.get_country_model(value);
            },
            onResetSearch(){
                this.get_country_model();
                this.serchValue = "";
            },
            clearSelectRowKeys(){
                this.selectedRowKeys = [];
            },
            async get_country_model (cName) {

                const domain = [ [ 'name', 'like',  cName ] ]
                const fields = ['id','code','name','state_ids'];

                const countryModel = await odooRpc.env.model('res.country',{fields});
                this.fields_info = countryModel._fields;

                const limit = 5;
                const offset = 0;
                const order = 'display_name';
                const result = await countryModel.search_read({
                    domain,
                    fields,
                    offset,
                    limit,
                    order
                });
                console.log('---- get countryModel ----',result);
                this.loading = false;
                this.countryData = result;
                
            }
        },
     
    }
</script>
<style lang='less' scoped>
#root {
    background-color: white;
    padding-right: 10px;
    // position: relative;
    // left: 0;
    // right: 0;
    // top: 0;
    // bottom: 0;
    // min-width: 1000px;

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
}
</style>