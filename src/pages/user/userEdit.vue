<!--
 * @Author: Nn
 * @Date: 2022-05-21 10:59:02
 * @LastEditors: Nxf
 * @LastEditTime: 2022-05-22 02:55:32
 * @Description: 管理员信息编辑
-->

<template>
  <a-form-model :model="userForm" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-model-item label="管理员姓名">
      <a-input v-model="userForm.name" />
    </a-form-model-item>
    
    <a-form-model-item label="Activity form">
      <a-input v-model="userForm.desc" type="textarea" />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">
        Create
      </a-button>
      <a-button style="margin-left: 10px;">
        Cancel
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>

    import Vue from "vue";
    import { FormModel , Input, Divider, Button } from "ant-design-vue";
    import "ant-design-vue/dist/antd.css";
    import odooRpc from '@/odoorpc';

    Vue.use(FormModel).use(Input).use(Divider).use(Button);

    export default {
    data() {
        return {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
        userForm: {
            name: '',
            region: undefined,
            date1: undefined,
            delivery: false,
            type: [],
            resource: '',
            desc: '',
        },
        };
    },
    mounted(){
        this.get_user_info();
    },
    methods: {
        async get_user_info () {
            try {
                const uid = parseInt(this.$route.query.userId);
                console.log('---- uid ----',uid);
                const userModel = odooRpc.env.model('res.users');
                
                // const res = await userModel.read(uid, {fields:['id','name']});

                const res = await userModel.read(uid, ['id','name','login','mobile','email','display_name','image_1920','function','company_id','category_id','comment','ref','user_id']);
                this.userData = res[0];
                console.log('===== user_info =====', this.userData);
            } catch (err) {
                console.log(err)
            }
        },
        onSubmit() {
        console.log('submit!', this.form);
        },
    },
    };
</script>
