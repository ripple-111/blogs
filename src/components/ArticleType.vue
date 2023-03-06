<template>
    <div class="w-full bg-white border-2 min-h-[140vh] rounded-md  p-6">
        <p class="text-2xl font-semibold text-center">标签</p>
        <div class="text-base text-balck tracking-wider font-semibold my-4 grid grid-col-2 gap-8 md:grid-cols-3 lg:grid-cols-4 auto-rows-auto">
            <div v-for="i in store.tags" :key="i.id"
                class="h-16 leading-16 relative text-center hover:animate-shake hover:opacity-100 hover:-translate-y-2 group cursor-pointer"
                @click="current = i;">
                <div class="h-px absolute z-0 bg-opacity-50 bottom-0 w-full group-hover:h-full transition-all duration-100 group-hover:bg-opacity-80 group-hover:rounded"
                    :style="bg()">
                </div>
                <div class="z-10 relative">{{ i }}</div>
            </div>
        </div>
        <p class="text-2xl font-semibold text-center mt-10">文章分类</p>
        <div class="text-base text-balck tracking-wider font-semibold my-4 grid grid-col-2 gap-8 md:grid-cols-3 lg:grid-cols-2 auto-rows-auto">
            <div v-for="(item,index) in store.type" :key="index"
                class="h-16 leading-16 relative text-center hover:animate-shake hover:opacity-100 hover:-translate-y-2 group cursor-pointer"
                @click="current = i;">
                <div class="h-px absolute z-0 bg-opacity-50 bottom-0 w-full group-hover:h-full transition-all duration-100 group-hover:bg-opacity-80 group-hover:rounded"
                    :style="bg()">
                </div>
                <div class="z-10 relative">{{ item.type }}</div>
            </div>
        </div>
        <div>
            <p class="text-2xl font-semibold text-center mt-10">时间线</p>
            <el-timeline>
                <el-timeline-item :timestamp="timeFormat(item.time)" placement="top" color="#008899" v-for="item in store.articles">
                    <el-card class="hover:bg-gray-200">
                        <p class="text-lg text-semibold hover:cursor-pointer">{{item.title}}</p>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>

<script setup>
import { timeFormat } from '../../util/time'
const store = useStore()

const bg = computed(() => () => {
    let arr = [
        '#64748b', '#6b7280', '#71717a',
        '#737373', '#78716c', '#ef4444',
        '#f97316', '#f59e0b', '#eab308',
        '#84cc16', '#22c55e', '#10b981',
        '#14b8a6', '#06b6d4', '#0ea5e9',
        '#3b82f6', '#6366f1', '#8b5cf6',
        '#a855f7', '#d946ef', '#ec4899',
        '#f43f5e'
    ]
    return `background-color: ${arr[Math.floor(Math.random() * 21)]}`
})
</script>

<style></style>