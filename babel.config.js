/*
 * @Author: Nn
 * @Date: 2022-04-25 16:36:39
 * @LastEditors: Nn
 * @LastEditTime: 2022-04-25 17:06:38
 * @Description: 
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
       "import",
        { 
          libraryName: "ant-design-vue", 
          libraryDirectory: "es", 
          style: "less" 
        }
    ]
  ]
}
