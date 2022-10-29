<template>
    <div class="flex">
    <div class="w-1/6 bg-gray-800">
        <el-button type="primary" class="m-10 ml-20" @click="router.push('/blog')">返回</el-button>
    </div>
  <div v-html="text" id="edit" v-highLight class="flex-1">

  </div>
<div class="w-1/6 bg-gray-800"></div>
</div>
</template>

<script setup>
import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.css'
import showdown from 'showdown'
import {useStore} from '../../stores/index'
import { useRoute,useRouter} from 'vue-router'
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
</script>
