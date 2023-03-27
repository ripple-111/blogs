<template>
    <nav class="w-full bg-white shadow-slate-200 shadow transition-all duration-200">
            <ul class="flex mx-auto max-w-[1000px] items-center text-gray-600 text-sm h-[50px] relative">
                <li v-for="(tag, index) in tags" class="relative px-2 group" @click="current = tag">
                    <el-icon :size="12" v-if="tag!=='综合'" class="!absolute top-0 right-[0] opacity-0 hover:text-blue-400 group-hover:opacity-100" @click.stop="del(tag)">
                            <Close />
                    </el-icon>
                    <a class="px-4 hover:text-blue-400 cursor-pointer relative" :key="index"
                        :style="{color: (store.currentTag||current) == tag || (store.currentTag == 'focu' && tag=='关注') ? '#3b82f6' : ''}" >
                        {{ tag }}
                    </a>
                </li>
                <a class="absolute right-10 top-0 items-center flex h-full text-base text-black">标签管理</a>
            </ul>  
    </nav>
</template>

<script setup>
import { Close } from '@element-plus/icons-vue';
const store = useHomeStore()
const userStore = useStore()
const { tags } = storeToRefs(store)
const current = ref('综合')
function del(tag){
    store.tags=store.tags.filter(i=>i!=tag)
    current.value='综合'
    store.currentTag=null
    store.getAllArticle()
}
watch(current, () => {
    console.log(1111)
    if (current.value == '综合')
        store.currentTag = null
    else if (current.value == '关注')
        store.currentTag = 'focu'
    else
        store.currentTag = current.value
    store.getAllArticle()
})
</script>