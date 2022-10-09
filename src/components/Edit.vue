<template>
    <div class="grid grid-flow-row grid-cols-2 gap-x-10 px-4 bg-blue-300">
        
    <div class="h-screen bg-blue-200 p-4">
        <el-button class="mb-4 ml-2" type="info" @click="router.push('/blog')">返回</el-button>
        <el-tabs v-model="activeName" type="card" class="tab">
           
                <el-tab-pane label="文本编辑区" name="first" class="tab">
                    <el-input v-model="textarea" :autosize="{ minRows: 15, maxRows: 20 }" type="textarea"
                    placeholder="在此书写你的文字" />
                </el-tab-pane>
        
        <el-tab-pane label="样式编辑区" name="second" class="tab">Config</el-tab-pane>
        <el-tab-pane label="Role" name="third" class="tab">Role</el-tab-pane>
    </el-tabs>
    <div class="flex justify-end mt-4">
        <el-button type="primary" class="w-20">导入</el-button>
        <el-button type="primary" class="w-20">保存</el-button>
        <el-button type="primary" class="w-20">发布</el-button>
    </div>
    
    </div>
    <div class="h-screen bg-gray-700 p-4 overflow-y-auto">
        <el-scrollbar height="100vh">
        <div v-html="text" id="edit">
        </div>
        </el-scrollbar>
    </div>
    </div>
</template>
<script setup>

import showdown from 'showdown'


const router=useRouter()
const converter = new showdown.Converter()

const textarea = ref('')
const text=computed(()=>converter.makeHtml(textarea.value))

let activeName='first'


</script>
<style lang="scss">
.is-active{
    @apply text-blue-600 after:block after:w-full after:h-1 after:bg-slate-700 after:my-2 #{!important};
}
.el-tabs__nav.is-top,.el-tabs__item.is-top{
   @apply border-none font-semibold text-lg  #{!important};
}

.tab{
    @apply border-0 #{!important};
}
#edit{
    @apply text-white text-lg mb-20 leading-loose px-6;
    h1,h2,h3,h4,h5{
        @apply my-4 text-teal-600
    }
    h1{
        font-size:30px;
        @apply text-center font-extrabold  
        after:w-full after:block after:h-border after:bg-black after:my-4;
    }
    h2{
        font-size: 25px;
        @apply font-bold 
    }
    h3{
        font-size: 20px;
        @apply font-semibold 
    }
    h4,h5{
        font-size: 18px; 
    }
    p,pre{
        font-size: 18px;
        margin: 10px;
    }
    strong{
        @apply mx-1 text-amber-600 my-2
    }
    em{
        @apply mx-1
    }
    blockquote{
        @apply bg-slate-600 leading-10 w-full border-l-4 border-gray-400 shadow-xl;
        p{
            @apply opacity-80 
        }
    }
    ul,ol{
        @apply list-disc list-inside text-blue-400 leading-loose text-base;    
    }
    ol{
        @apply list-decimal
    }
    pre:has(>code){
        @apply  p-2 bg-gray-800 shadow-2xl;
        &::before{
            content: '\1F534\1F7E1\1F7E2';
        }
        code{
        @apply w-full block  min-h-200
    }
    }
    p:has(>code){
        @apply  p-2 bg-gray-800 shadow-2xl rounded-lg; 
    }
    hr{
        @apply my-4 border-teal-700
    }
    img{
        @apply min-h-150 object-contain object-center w-full my-4
    }
    p:has(>a){
        @apply  text-center;
        a{
            @apply underline text-blue-400 hover:text-red-300  text-center 
        }
    }
}
</style>