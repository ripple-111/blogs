<template>
    <div style="background:#f2f3f5">
        <TopNavBar />
        <div class=" max-w-screen-lg w-full pb-10 mx-auto relative min-h-screen">
            <md-editor previewOnly editorId="md-edit" v-model="article.text" :preview-theme="theme" ref="edit"
                class="max-w-full mt-6" style="width:760px;min-height: 90vh;" ></md-editor>
            <div class="w-60 absolute top-0 right-0 ml-4 ">
                <span class="text-black align-middle mr-2">主题:</span>
                <el-select v-model="value" class="w-48" placeholder="选择主题" @change="(val) => { theme = val }">
                    <el-option v-for="(item, index) in options" :key="index" :label="item" :value="item" />
                </el-select>
                <Author :user="article.user"/>
                <div class="bg-white px-2">
                    <p class="py-4 mx-4 text-lg">目录</p>
                    <el-divider class="my-2"/>
                    <MdCatalog editorId="md-edit" :scrollElement="scroll"  :scrollElementOffsetTop="50" :offsetTop="70"/>
                </div>
                <Scroll/>
            </div>
        </div>
    </div>
</template>

<script setup>
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import TopNavBar from '../components/TopNavBar.vue';
import Scroll from '../components/Scroll.vue'
import Author from '../components/author.vue';
const { MdCatalog } = MdEditor;
const scroll = document.documentElement
const value = ref('smart-blue')
const edit = ref()
const router = useRouter()
const store = useHomeStore()
const route = useRoute()
const user={
    id:1,
    name:'ripple',
    headImage:'https://picb.zhimg.com/v2-52ce0e6e9154a9f742a3a44dad3d3fd9_r.jpg?source=1940ef5c',
    like:999,
    read:999
}
let theme = 'smart-blue'
console.log()
const options = ['default', 'github', 'vuepress', 'mk-cute', 'smart-blue', 'cyanosis']
const article = store.articles.find(item => item.id == route.query.id)
MdEditor.config({
    markedRenderer(renderer){
        renderer.heading = (text,level,raw,s,index)=>{
            return  `
            <h${level} id="${text}">
            <a href="#${text}" onclick="return false;">${text}</a>
            </h${level}>`
        }
        return renderer
    }
})
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