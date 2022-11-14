import { defineConfig } from 'vite'

import path from 'path'   
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import {createStyleImportPlugin,ElementPlusResolve} from 'vite-plugin-style-import' 
export default defineConfig({
//   base: path.resolve(__dirname, './dist/'), // 新增
  plugins: [
    vue(),
    createStyleImportPlugin({
        resolves: [ElementPlusResolve()],
        libs: [
          {
            libraryName: 'element-plus',
            esModule: true,
            resolveStyle: (name) => {
                if(name!='gen-file-id'&&name!='el-notification')
                return `element-plus/lib/theme-chalk/${name}.css`
            },
          }]}),
    AutoImport({
        include: [
          /\.[tj]sx?$/, 
          /\.vue$/, 
          /\.vue\?vue/, 
          /\.md$/,
        ],
        imports: [
          // 插件预设支持导入的api
          'vue',
          'vue-router',
          'pinia'
          // 自定义导入的api
        ],
        resolvers:[ElementPlusResolver()]
    }),
    Components({
        dirs:['src/components/'],
        extensions:['vue'],
        resolvers: [ElementPlusResolver()],
        
     }),
  ],

})
