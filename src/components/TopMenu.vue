<template>
   <ul class="fixed w-2/3 flex flex-row justify-end text-lg antialiased hover:bg-gray-900 h-16 list-disc bg-opacity-40 transition-colors z-50 text-gray-400">
            <li class="mx-8  py-4 hover:text-white hover:underline hover:cursor-pointer list-none" :class="activePage==1?'text-white underline':''" @click="activePage=1;router.push('/')">首页</li> 
            <li class="mx-8  py-4 hover:text-white hover:underline hover:cursor-pointer" :class="activePage==2?'text-white underline':''" @click="activePage=2;router.push('/blog')">博客</li>
            <li class="mx-8  py-4 hover:text-white hover:underline hover:cursor-pointer" :class="activePage==3?'text-white underline':''" @click="activePage=3">开发日志</li>
            <li class="mr-20 ml-8 py-4 hover:text-white hover:underline hover:cursor-pointer">开发中...</li>
    </ul>
</template>

<script setup>
    import {ref} from 'vue'
    const router=useRouter()
    var activePage=ref(1)
</script>

<style>

</style>