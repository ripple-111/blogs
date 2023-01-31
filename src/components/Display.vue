<template>
    <div style="background:#f2f3f5">
        <TopNavBar />


        <div class=" max-w-screen-lg w-full my-0 mx-auto relative">
            <md-editor previewOnly editorId="md-edit" v-model="text" :preview-theme="theme" ref="edit"
                class="max-w-full mt-6" style="width:760px"></md-editor>
            <div class="w-60 absolute top-0 right-0 ml-4 ">
                <span class="text-black align-middle mr-2">主题:</span>
                <el-select v-model="value" class="w-48" placeholder="选择主题" @change="(val) => { theme = val }">
                    <el-option v-for="(item, index) in options" :key="index" :label="item" :value="item" />
                </el-select>
                <div class="bg-white">
                    <p class="text-center my-2 text-lg">目录</p>
                    <MdCatalog editorId="md-edit" :scrollElement="scroll" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import TopNavBar from './TopNavBar.vue';
const { MdCatalog } = MdEditor;
const scroll = document.documentElement
const value = ref('smart-blue')
const edit = ref()
const router = useRouter()
const store = useStore()
const route = useRoute()
let theme = 'smart-blue'
const options = ['default', 'github', 'vuepress', 'mk-cute', 'smart-blue', 'cyanosis']
const text = store.articles.find(item => item.id == route.query.id).text
</script>
<style lang="scss">
article {
    padding: 10px 20px !important;

    h1 {
        font-size: 2rem !important;
        margin: 0px !important;
    }
}
</style>