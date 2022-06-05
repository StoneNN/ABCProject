<!--
 * @Author: Nxf
 * @Date: 2022-04-05 00:39:58
 * @LastEditors: Nxf
 * @LastEditTime: 2022-06-04 09:52:41
 * @Descripttion: 
-->

<template>
        <h1>超级管理员页面</h1>
</template>
<script>

    import odooRpc from '@/odoorpc';

    export default {
        name:"AdminUserCpnt",
        data(){
            return{
                
            }
        },
        mounted(){
            console.log('------ get user info -------');
            // this.get_user_info();
            this.user_model_fields();
        },
        methods:{
           async get_user_info () {
               console.log('-=-=-=-=-=    ------');
                const uid = odooRpc.env.uid
                console.log('------uid -----',uid);
                const Model = odooRpc.env.model('res.users');

                const res = await Model.read(uid, ['name', 'email', 'company_id'])
                console.log('===== user_info =====', res)
                return res;
            },
            async user_model_fields () {
                const Model = odooRpc.env.model('res.users');
                const allfields = [];
                const attributes = [];
                const res = await Model.fields_get(allfields, attributes);
                console.log('----- user_model_fields ------', res);
                return res;
            }
        }
    }
</script>
<style scoped>
    
</style>