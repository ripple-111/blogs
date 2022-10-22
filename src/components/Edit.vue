<template>
    <div class="grid grid-flow-row grid-cols-2 bg-black">
        <div class="min-h-screen bg-editor p-4 relative">
            <el-button class="mb-4 ml-2" type="info" @click="router.push('/blog')">返回</el-button>
            <el-switch v-model="model" class="right-10 top-16 z-50" size="large"
                style="position: absolute;--el-switch-on-color: dark; --el-switch-off-color:gray;--el-color-white:white"
                inline-prompt :active-icon="Moon" :inactive-icon="Sunny" />
            <el-tabs v-model="activeName" type="card" class="tab">

                <el-tab-pane label="文本编辑区" name="first" class="tab">
                    <el-input v-model="article.title" placeholder="输入文章标题" ref="title"
                        style="width:80%;--el-input-bg-color:rgb(30,30,30);--el-input-border-color:none;--el-input-focus-border-color:gray;--el-input-text-color:white"
                        class="my-2" maxlength="12"></el-input>

                    <el-badge is-dot class="item mt-2 w-1/6 ml-2">
                        <el-button class="mb-2 w-full" type="info" @click=" drawer = true">文章信息</el-button>
                    </el-badge>
                    <Editorer @input="codeinput" :markdown=file />
                </el-tab-pane>

                <el-tab-pane label="样式编辑区" name="second" class="tab">
                    <Edit_style />
                </el-tab-pane>
                <el-tab-pane label="Role" name="third" class="tab">Role</el-tab-pane>
            </el-tabs>
            <div class="flex justify-end mt-4">
                <el-upload ref="uploadRef" :auto-upload="false" class="mx-3" :on-change="loadIn" :show-file-list="false"  :limit="1"  :on-exceed="handleExceed">
                <template #trigger>
                    <el-button type="primary" class="w-20" >导入</el-button>
                </template>
                </el-upload>  
                <el-button type="primary" class="w-20 mx-1" @click="upload">上传</el-button>
                <el-button type="primary" class="w-20 mx-1">发布</el-button>
            </div>

        </div>
        <div class="h-screen bg-gray-700 p-4 overflow-y-auto">
            <el-scrollbar height="100vh">
                <div v-html="text" id="edit" v-highLight>
                </div>
            </el-scrollbar>
        </div>
    </div>
    <el-drawer v-model="drawer" title="文章分类" custom-class="drawer" :close-on-click-modal="false">
        <el-form label-position="top">
            <el-form-item label="文章类型">
                <el-input v-model="article.type" placeholder="输入文章的类型" />
            </el-form-item>
            <el-form-item label="文章封面">
                <el-input v-model="article.image" placeholder="输入文章封面链接" />
            </el-form-item>
            <el-form-item label="文章标签"></el-form-item>
            <el-tag v-for="tag in article.tags" :key="tag" closable size="large" class="m-1"
                :disable-transitions="false" @close="handleClose(tag)">
                {{ tag }}
            </el-tag>
            <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" style="width:60px"
                @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
            <el-button v-else class="button-new-tag ml-1" @click="showInput">
                + 增加标签
            </el-button>
            <p class="ml-1 my-1 text-right">{{article.tags.length+'/10'}}</p>

            <el-form-item label="简介">
                <el-input v-model="article.expla" type="textarea" autosize placeholder="请输入文章简介，便于他人了解你的文章主题"
                    show-word-limit max-length="100">

                </el-input>
            </el-form-item>

        </el-form>
    </el-drawer>
</template>
<script setup>
import { Moon, Sunny } from '@element-plus/icons-vue';
import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.css'
import showdown from 'showdown'
import Edit_style from './Edit-style.vue';
import { genFileId } from 'element-plus'
import { upload as BlogUpload } from '../http/api'
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
const model = ref(true)
let activeName = 'first'
const router = useRouter()

const title=ref()
const text = ref('')
const drawer = ref(false)
let markdown = ''
function upload() {
        if(markdown!=`<!--访问https://github.com/showdownjs/showdown/wiki/emojis 网站得到更多支持的emoji-->
# 标题`){
        if(!article.title){
            ElMessage('请输入文章标题')
            title.value.focus()
        }
        else{
        if(article.type&&article.tags)
        BlogUpload({md:markdown,article}).then(res=>{
            console.log(res.data.md)
        })
        else{
            ElMessage('请补充文章类型和标签')
            drawer.value=true
        }
        }
        
    }
    else
    ElMessage('无内容')
        
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
function codeinput(code) {
    markdown = code
    text.value = converter.makeHtml(code)
}
const article = reactive({
    title: '',
    type: '',
    tags: [],
    image: '',
    expla: ''
})
const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref()

const handleClose = (tag) => {
    article.tags.splice(article.tags.indexOf(tag), 1)
}

const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
        InputRef.value.input.focus()
    })
}
const handleInputConfirm = () => {
    if (inputValue.value) {
        if (article.tags.length < 10)
            article.tags.push(inputValue.value)
    }
    inputVisible.value = false
    inputValue.value = ''
}
const uploadRef=ref()
let file=ref(`<!--访问https://github.com/showdownjs/showdown/wiki/emojis 网站得到更多支持的emoji-->
# 标题`)
function loadIn(n){
    const fileRead=new FileReader()
    // 读取文件内容
    fileRead.readAsText(n.raw,'urf-8')
    // 接下来可对文件内容进行处理
    fileRead.onload = (e) => {
        file.value=e.target.result
        article.title=n.name.slice(0,n.name.indexOf('.'))
    }
}

const handleExceed= (files) => {
    uploadRef.value.clearFiles()
  let file = files[0]
  file.uid = genFileId()
  uploadRef.value.handleStart(file)
}




</script>
<style lang="scss" scoped>
$model: dark;

:deep(.el-tabs__nav.is-top) {
    @apply border-none;
}

:deep(.el-tabs__item) {
    @apply font-semibold text-lg text-gray-400 #{!important};
}

.tab {
    :deep(.el-tabs__item) {
        @apply border-0 after:w-0 after:block after:transition-all duration-500 after:h-1 after:bg-slate-300 after:my-2 #{!important};
    }

    :deep(.is-active) {
        @apply text-blue-300 after:w-full #{!important};
    }
}
</style>