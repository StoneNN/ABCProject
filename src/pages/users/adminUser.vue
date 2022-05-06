<!--
 * @Author: Nxf
 * @Date: 2022-04-05 00:39:58
 * @LastEditors: Nxf
 * @LastEditTime: 2022-05-05 23:29:46
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

        },
        mounted(){
            console.log('------ get user info -------',this.get_user_info);
            this.get_user_info();
        },
        methods:{
            get_user_info: async () => {
                const uid = odooApi.env.uid
                const Model = odooApi.env.model('res.users')
                const res = await Model.read(uid, ['name', 'email', 'company_id'])
                console.log('user_info', res)
                return res;
            }
        }
    }
</script>
<style scoped>
    
</style>