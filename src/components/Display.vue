<template>
    <div class="flex">
    <div class="w-1/6 bg-gray-800">
        <el-button type="primary" class="m-10 ml-20" @click="router.push('/blog')">返回</el-button>
    </div>
  <div v-html="text" id="edit" v-highLight class="flex-1">

  </div>
<div class="w-1/4 bg-gray-800">
    <nav class="w-1/6 fixed bg-slate-300 top-1/2 right-1/12 max-h-80 overflow-y-auto p-2">
        <p class="text-center font-bold text-lg border-b-2 border-b-neutral-600">目录</p>
        <p v-for="item in directory" class="leading-8 px-2 border-b-2 border-zinc-400 truncate bg-gray-300 hover:bg-slate-50 active:bg-slate-200 cursor-pointer" @click="item.scrollIntoView()">
        {{item.innerHTML}}
        </p>
    </nav>
</div>
</div>
</template>

<script setup>
import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.css'
import showdown from 'showdown'
import {useStore} from '../../stores/index'
const route=useRoute()
const router=useRouter()
const store=useStore()
const text=ref('')
const vHighLight = {
    updated: (el) => {
        let block = el.querySelectorAll('pre code');
        let input = el.querySelectorAll('input[type="checkbox"]')
        if (block.length)
            block.forEach(block => hljs.highlightElement(block))
        if (input.length) {
            input.forEach(item => item.disabled = false)
        }
    }
}
const converter = new showdown.Converter({
    tables: true,
    parseImgDimensions: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    smoothLivePreview: true,
    encodeEmails: true,
    emoji: true,
    tasklists: true,
})

if(store.articles.length)
text.value = converter.makeHtml(store.articles.find(item=>item.id==route.query.id).text)
else
router.push('blog')
let directory=reactive([])
onMounted(()=>{
    directory.splice(0,0,...Array.from(document.querySelectorAll('h1,h2,h3,h4,h5')))
})
console.log(store.articles[1]?.selfCss.split(',#'))
let index=reactive([])
let stylesheet=Array.from(document.styleSheets).find(i=>i.cssRules[0]?.selectorText=='#edit');
    let length=stylesheet.cssRules.length
    try{
        if(index.length)
        index.forEach((item,i)=>{ 
        if(item){
        stylesheet.deleteRule(item)
        }
        index=['']
    })
        if(store.articles[1]?.selfCss!=''){
            store.articles[1]?.selfCss.split(',#').forEach((item,i)=>{
            if(i!=0)
            index.push(stylesheet.insertRule('#'+item,length))
            else
            index.push(stylesheet.insertRule(item,length))
        })
        
        }
    
    }
    catch(err){
        ElMessage.error('自定义样式格式有误')
        console.log(err)
    }

</script>
