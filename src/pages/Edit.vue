<template>
    <md-editor v-model="state.text" :theme="state.light" 
    :preview-theme="state.theme" 
    :toolbars="toolbar" 
    :footers="footers"
    :previewOnly="lookType"
    pageFullscreen 
    showCodeRowNumber
    placeholder="需要清空示例，输入任意字符保存后即可"
    @onChange="change"
    @onSave="save"
    >
    <template #defToolbars>
    <NormalToolbar title="亮暗模式" class="!h-auto">
        <template #trigger>
           <el-button @click="router.back()" type="primary" class="h-auto">返回</el-button>
        </template>
    </NormalToolbar>    
    <DropdownToolbar
        title="主题样式"
        :visible="state.styleVisible"
        :on-change="(visible)=>{ state.styleVisible=visible}"
      >
        <template #overlay>
          <ul class="md-editor-menu">
            <li v-for="(i,index) in theme" :key="index" class="md-editor-menu-item" @click="()=>{state.theme=i}">
            {{i}}
            </li>
          </ul>
        </template>
        <template #trigger >
            <el-icon class="!mt-1"><Tools /></el-icon>
        </template>
    </DropdownToolbar>
    <NormalToolbar title="亮暗模式" @onClick="()=>{state.light=state.light=='light'?'dark':'light'}"  >
        <template #trigger >
            <el-icon v-if="state.light=='dark'" class="mt-1"><Sunny /></el-icon>
            <el-icon v-else class="mt-1"><Moon /></el-icon>
        </template>
    </NormalToolbar>

    </template>
    <template #defFooters>
        <el-upload ref="uploadRef" :auto-upload="false" :on-change="loadIn"
            :show-file-list="false" :limit="1" :on-exceed="handleExceed" class="inline ml-10 mx-3 h-full">
            <template #trigger>
                <el-button type="primary">导入文件</el-button>
            </template>
        </el-upload>
        <el-button type="primary"  @click="bloguUpload">上传文章</el-button>
        <el-button type="primary"  @click="drawer=true">文章设置</el-button>
    </template>
    </md-editor>
    <el-drawer v-model="drawer" title="文章分类" custom-class="drawer">
        <el-form label-position="top">
            <el-form-item label="文章标题">
                <el-input v-model="article.title" placeholder="输入文章的标题"/>
            </el-form-item>
            <el-form-item label="文章类型">
                <el-input v-model="article.type" placeholder="输入文章的类型"/>
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
                @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" maxlength="2"/>
            <el-button v-else class="button-new-tag ml-1" @click="showInput">
                + 增加标签
            </el-button>
            <p class="ml-1 my-1 text-right">{{article.tags.length+'/10'}}</p>

            <el-form-item label="简介">
                <el-input v-model="article.expla" type="textarea" autosize placeholder="请输入文章简介,便于他人了解你的文章主题,不超过100字"
                    show-word-limit max-length="100" >
            </el-input>
            </el-form-item>
            <p class="ml-1 my-1 text-right  text-xs text-gray-500">{{'字数:'+article.expla.length}}</p>
        </el-form>
    </el-drawer>
</template>
  
<script setup>
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { ElMessage, genFileId}  from 'element-plus'
const router=useRouter()
const {DropdownToolbar,NormalToolbar} = MdEditor;
const toolbar=[
    0,
  'bold',
  'underline',
  'italic',
  '-',
  'title',
  'strikeThrough',
  'sub',
  'sup',
  'quote',
  'unorderedList',
  'orderedList',
  'task',
  '-',
  'codeRow',
  'code',
  'link',
  'image',
  'table',
  'mermaid',
  'katex',
  '-',
    1,
    2,
  '-',
  'revoke',
  'next',
  'save',
  '=',
  'fullscreen',
  'preview',
  'catalog',
];
MdEditor.config({
    markedRenderer(renderer){
        renderer.heading = (text,level,raw,s,index)=>{
            return  `
            <h${level} id="heading-${index}">
            <a href="#${text}" onclick="return false;">${text}</a>
            </h${level}>`
        }
        return renderer
    }
})
const footers = ['markdownTotal', 0,1,2, '=', 'scrollSwitch'];
let theme=['default','github','vuepress','mk-cute','smart-blue','cyanosis']
let lookType=false
const change=(content)=>{
    localStorage.setItem('content',content)
}
onMounted(()=>{
    state.text=localStorage.getItem('content')||state.text
})
const save=(content,h)=>{
    localStorage.setItem('content',content)
    h.then(html=>{})
}
const bloguUpload=()=>{
    if (state.text.length) {
        if (!article.title.length) {
            ElNotification.warning({message:'文章信息缺少',position: 'top-left'})
            setTimeout(()=>{drawer.value = true},800) 
        }
        else {
            if (article.type && article.tags.length && article.expla)
            BlogUpload({ md: state.text, article}).then(res => {
                    if(res.data[0].text==state.text){
                        ElNotification.success('文章上传成功')
                        localStorage.removeItem('content')
                        article.id=res.data.id
                    }
                    else
                    ElNotification.error('出错了')
                    
            })
            else {
                ElNotification.warning({message:'请补充文章类型、标签和简介',position: 'top-left'})
                setTimeout(()=>{drawer.value = true},1000) 
            }
        }

    }
    else
        ElMessage('无内容')

}
const article = reactive({
    title: '',
    type: '',
    tags: [],
    image: '',
    expla: '',
    id:'',
})
const state = reactive({
    text:`# 请先清空示例内容
## 😲 md编辑器示例

### 🤖 基本演示

**加粗**，<u>下划线</u>，_斜体_，~删除线~，上标<sup>26</sup>，下标<sub>1</sub>，\`inline code\`，[超链接](https://imzbf.cc)

> 引用：《I Have a Dream》

1. So even though we face the difficulties of today and tomorrow, I still have a dream.
2. It is a dream deeply rooted in the American dream.
3. I have a dream that one day this nation will rise up.

- [ ] 周五
- [ ] 周六
- [x] 周天

![图片](https://imzbf.github.io/md-editor-rt/imgs/mark_emoji.gif)

## 🤗 代码演示
\`\`\` js
const y = 1
\`\`\`
## 🖨 文本演示

依照普朗克长度这项单位，目前可观测的宇宙的直径估计值（直径约 930 亿光年，即 8.8 × 10<sup>26</sup> 米）即为 5.4 × 10<sup>61</sup>倍普朗克长度。而可观测宇宙体积则为 8.4 × 10<sup>184</sup>立方普朗克长度（普朗克体积）。

## 📈 表格演示

| 昵称 | 来自      |
| ---- | --------- |
| 之间 | 中国-重庆 |,

## 📏 公式

行内：$x+y^{2x}$

$$
\sqrt[3]{x}
$$
## 🧬 图表

\`\`\`mermaid
flowchart TD
  Start --> Stop
\`\`\`

`,
    theme:'mk-cute',
    styleVisible:false,
    light:"light",
});
const drawer = ref(false)
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
const uploadRef = ref()

function loadIn(n) {
    const fileRead = new FileReader()
    // 读取文件内容
    fileRead.readAsText(n.raw, 'urf-8')
    // 接下来可对文件内容进行处理
    fileRead.onload = (e) => {
        state.text = e.target.result
        article.title = n.name.slice(0, n.name.indexOf('.'))
    }
}

const handleExceed = (files) => {
    uploadRef.value.clearFiles()
    let file = files[0]
    file.uid = genFileId()
    uploadRef.value.handleStart(file)
}

</script>
<style>

</style>