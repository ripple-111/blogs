<template>
    <nav class="w-full bg-white shadow-slate-200 shadow transition-all duration-200">
        <div class="flex mx-auto max-w-[1060px] items-center text-gray-600 text-sm h-[50px] relative">
            <a v-for="(tag,index) in tags" class="px-4 hover:text-blue-400 cursor-pointer" :key="index" :style="{color: current==tag?'#3b82f6':''}" @click="current=tag">
                {{ tag }}
            </a>
            <a class="absolute right-10 top-0 items-center flex h-full">标签管理</a>
        </div>
    </nav>
</template>

<script setup>
const store=useHomeStore()
const userStore=useStore()
const {tags}=storeToRefs(store)
const current=ref('综合')
watch(current,()=>{
    if(current.value=='综合')
    store.currentTag=null
    else if(current.value=='关注')
    store.currentTag='focu'
    else
    store.currentTag=current.value
    store.getAllArticle()
    // store.getAllArticle(current.value)
})
</script>