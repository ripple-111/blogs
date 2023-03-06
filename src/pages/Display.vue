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
                <Author :user="article.user" :isFollow="isFollow" :good="article.good" :watch="article.watch"/>
                <div class="bg-white px-2">
                    <p class="py-4 mx-4 text-lg">目录</p>
                    <el-divider class="my-2"/>
                    <MdCatalog editorId="md-edit" scrollElement='.el-scrollbar__wrap.el-scrollbar__wrap--hidden-default' :scrollElementOffsetTop="50" :offsetTop="70"/>
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
const value = ref('smart-blue')
const edit = ref()
const router = useRouter()
const store = useHomeStore()
const route = useRoute()
let theme = 'smart-blue'
const options = ['default', 'github', 'vuepress', 'mk-cute', 'smart-blue', 'cyanosis']
// const article = store.articles.find(item => item.id == route.query.id)
const article=ref({
    text:''
})
const isFollow=ref()
if(route.query.id)
getArticleInfo(route.query.id).then(res=>{
    article.value=res.data.data
    article.value.user.id=article.value.uid
    isFollow.value=res.data.isFollow
})
let timer=null
onMounted(()=>{
    if(route.query.id)
    timer=setTimeout(()=>{
        watchArticle(route.query.id)
    },5000)
})
onBeforeUnmount(() => {
    clearTimeout(timer)
})
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