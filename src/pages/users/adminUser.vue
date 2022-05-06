<!--
 * @Author: Nxf
 * @Date: 2022-04-05 00:39:58
 * @LastEditors: Nn
 * @LastEditTime: 2022-05-06 17:17:37
 * @Descripttion: 
-->

<template>
        <h1>超级用户页面</h1>
</template>
<script>
    import odooApi from '@/odoorpc';

    export default {
        name:"AdminUserCpnt",
        data(){
            return{
                
            }
        },
        mounted(){
            console.log('------ get user info -------');
            this.get_user_info();
            // this.test();
        },
        methods:{
           async get_user_info () {
                const uid = odooApi.env.uid
                const Model = odooApi.env.model('res.users')
                const res = await Model.read(uid, ['name', 'email', 'company_id'])
                console.log('===== user_info =====', res)
                return res;
            },
            test(){
                console.log('----- test ----');
            }
        }
    }
</script>
<style scoped>
    
</style>