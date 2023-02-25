<template>
    <nav class="w-full bg-white shadow-slate-200 shadow transition-all duration-200">
        <div class="flex mx-auto max-w-[1060px] items-center text-gray-600 text-sm h-[50px] relative">
            <a v-for="(tag,index) in tags" class="px-4 hover:text-blue-400 cursor-pointer" :key="index">
                {{ tag }}
            </a>
            <a class="absolute right-0 top-0 items-center flex h-full">标签管理</a>
        </div>
    </nav>
</template>

<script setup>
const {tags}=storeToRefs(useHomeStore())
</script>