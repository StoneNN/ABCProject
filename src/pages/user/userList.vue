<!--
 * @Author: Nxf
 * @Date: 2022-05-04 13:21:14
 * @LastEditors: Nn
 * @LastEditTime: 2022-05-20 17:06:28
 * @Descripttion: userList页面
-->


<template>
    <div id="root">
        <div id="root1">
            <a-button type="primary">
            批量删除
            </a-button>
            <a-button type="primary">
            新建用户
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
            :data-source="userData"
            :row-selection="rowSelection"
            :row-key="record => record.id" 
        >
        
            <a slot="orderCode" slot-scope="text">{{text}}</a>
            <span slot="total" slot-scope="text">￥{{text}}</span>
            <template slot="action" slot-scope="text,record">
                <router-link 
                    :to="{
                        path:'/user/userList/userInfo',
                        query:{
                            userId:record.id
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
        // {
        //     title: '用户ID',
        //     dataIndex:'id',
        //     key: 'id',
        //     align:'center',
        //     slots: { title: 'userId' },
        //     scopedSlots: { customRender: 'userId' },
        //     width:'80px'
        // },
        {
            title: '账号',
            dataIndex: 'login',
            key: 'login',
            align:'center',
        },
        {
            title: '姓名',
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
            width:'100px'
        },
        {
            title: '全名',
            dataIndex:'display_name',
            key: 'display_name',
            align:'center',
        },
        // {
        //     title: '头像',
        //     dataIndex:'image_1920',
        //     key: 'image_1920',
        //     align:'center',
        //     scopedSlots:{ customRender: 'image_1920' }
        // },
        {
            title: '职位',
            dataIndex:'function',
            key: 'function',
            align:'center',
            scopedSlots: {customRender:'function'},
            width:'80px'
        },
        {
            title: '公司id',
            dataIndex:'company_id',
            key: 'company_id',
            align:'center',
            scopedSlots: {customRender:'company_id'},
            // width:'15%'
        },
        // {
        //     title: '??',
        //     dataIndex:'category_id',
        //     key: 'category_id',
        //     align:'center',
        //     scopedSlots: {customRender:'category_id'},
        //     width:'15%'
        // },
        // {
        //     title: '销售经理id',
        //     dataIndex:'user_id',
        //     key: 'user_id',
        //     align:'center',
        //     scopedSlots: {customRender:'user_id'},
        //     width:'15%'
        // },
        // {
        //     title: '职工编号',
        //     dataIndex:'ref',
        //     key: 'ref',
        //     align:'center',
        //     scopedSlots: {customRender:'ref'},
        //     width:'15%'
        // },
        // {
        //     title: '备注',
        //     dataIndex:'comment',
        //     key: 'comment',
        //     align:'center',
        //     scopedSlots: {customRender:'comment'},
        //     width:'15%'
        // },
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
        name:"userListCpnt",
        data(){
            return{
                userData:[],
                columns,
                rowSelection,
            }
        },
        mounted(){
            console.log('------ get user info -------');
            // this.get_user_info();
            // this.user_model_fields();
            this.get_user_model();
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

            async get_user_info () {
               console.log('-=-=-=-=-=    ------');
                const uid = odooRpc.env.uid
                console.log('------uid -----',uid);
                const userModel = odooRpc.env.model('res.users');

                const res = await userModel.read(uid, ['name', 'email', 'company_id'])
                console.log('===== user_info =====', res)
                return res;
            },
            async user_model_fields () {
                const userModel = odooApi.env.model('res.users');
                const allfields = [];
                const attributes = [];
                const res = await userModel.fields_get(allfields, attributes);
                console.log('----- user_model_fields ------', res);
                return res;
            },
            async get_user_model () {

                const cid = odooApi.web.session.session_info.company_id;
                const userModel = odooRpc.env.model('res.users');
                const domain = [['company_id', '=', cid]];
                const fields = ['id','name','login','mobile','email','display_name','image_1920','function','company_id','category_id','comment','ref','user_id'];
                
                // const domain = [];
                // const fields = [];
                const limit = 8;
                const offset = 0;
                const order = 'display_name';
                const result = await userModel.search_read({
                    domain,
                    fields,
                    offset,
                    limit,
                    order
                });
                console.log('---- get_user_model ----',result);
                this.userData = result;
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