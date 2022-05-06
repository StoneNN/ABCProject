<!--
 * @Author: Nxf
 * @Date: 2022-05-03 21:26:03
 * @LastEditors: Nxf
 * @LastEditTime: 2022-05-03 21:52:13
 * @Descripttion: 
-->
<template>
  <div>
    <h1>{{ 'odoorpc-js tutorial' }}</h1>

    <!-- <div>&nbsp;</div>
    <div>&nbsp;</div>
    <button @click="onclickApiAddons"><H1> Test API Addons</H1></button>
    <div>&nbsp;</div> -->
    <div>&nbsp;</div>
    <button @click="onclick"><H1> Test RPC</H1></button>

    <div>&nbsp;</div>
    <div>&nbsp;</div>
    <button @click="onclickJS"><H1> Test OdooJS</H1></button>

    <div>&nbsp;</div>
    <div>&nbsp;</div>

    <button @click="onclick1"><H1> Test Action</H1></button>

    <div>&nbsp;</div>
    <div>&nbsp;</div>
  </div>
</template>

//
<script>
import axios from 'axios';

import { test_rpc } from '@/odooRpc-test/test-rpc';
// import { test_api } from '@/odooapi_test/test_api'

// import { test_api_addons } from '@/api_addons/test_api_addons'

export default {
  name: 'TestRpc',
  props: {},
  data() {
    return {}
  },
  computed: {},

  async created() {},
  methods: {
    onclickApiAddons() {
      console.log('click btn')
      //   alert('click btn')
      // test_api_addons()
    },

    onclick() {
      console.log('click btn')
      //   alert('click btn')
      test_rpc()
    },

    onclickJS() {
      console.log('click onclickJS')
      //   alert('click btn')
      // test_api()
    },
    async request(url, params) {
      const baseURL = process.env.VUE_APP_BASE_API
      const timeout = 50000
      const service = axios.create({ baseURL, timeout })

      const data = {
        params: params,
        jsonrpc: '2.0',
        method: 'call',
        id: Math.floor(Math.random() * 1000000000 + 1)
      }

      const response = await service({ url, method: 'post', data })
      return response.data.result
    },

    async onclick1() {
      const url = '/web/webclient/version_info'
      const result = await this.request(url, {})
      console.log('onlick', result)
      this.result = result
    }
    
    
  }
}
</script>

<style scoped></style>
