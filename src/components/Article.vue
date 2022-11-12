<template>
    <div class="w-full bg-white border-2 min-h-screen rounded-md  p-6">
        <div class="flex text-blue-600 text-center text-lg flex-wrap">
            <div class="bg-blue-500 h-10 leading-10 rounded bg-opacity-40 m-4 px-2 cursor-pointer min-w-50" v-for="tag in store.tags" :key="tag">{{'#'+tag}}</div>
        </div>
        <div class="my-8 text-2xl text-bold text-center flex flex-wrap content-between">
            <div class="w-60 bg-blue-400 h-40 leading-40 rounded-xl text-white m-2 cursor-pointer shadow-xl" v-for="item in store.type">
                {{item.type}}
            </div>
        </div>
        <div class="">
            <el-timeline>
                <el-timeline-item timestamp="2018/4/12" placement="top" color="#008899">
                    <el-card class="hover:bg-gray-200">
                        <p class="text-lg text-semibold hover:cursor-pointer">标题</p>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/3" placement="top" color="#008899">
                    <el-card class="hover:bg-gray-200">
                        <p class="text-lg text-semibold hover:cursor-pointer">标题</p>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/2" placement="top" color="#008899">
                    <el-card class="hover:bg-gray-200">
                        <p class="text-lg text-semibold hover:cursor-pointer">标题</p>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>

<script setup>
import {useStore} from '../../stores/index'
const store=useStore()
</script>

<style>

</style>