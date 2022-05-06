/*
 * @Author: Nxf
 * @Date: 2022-05-03 21:50:24
 * @LastEditors: Nxf
 * @LastEditTime: 2022-05-04 11:06:43
 * @Descripttion: 
 */


// export const test_rpc = async()=>{
//     console.log('====================================');
//     console.log('-=-=-=-=ssssssssss');
//     console.log('====================================');
// } 

import rpc from '@/odoorpc'
// const baseURL = process.env.VUE_APP_BASE_API
// const timeout = 50000
// rpc.init({ baseURL, timeout })

const { db, login, password } = {
    db: 'T1',
    login: 'admin',
    password: '123456'
  }


export const test_rpc = async()=>{
    const aaa = await rpc.web.session.authenticate({ db, login, password })
    console.log('0-=-=-=-=-=',aaa);

    const res2 = await rpc.web.session.get_session_info()
    console.log('test get_session_info ', res2);

    const res3 = await rpc.web.session.modules()
    console.log('test session modules ', res3)
}