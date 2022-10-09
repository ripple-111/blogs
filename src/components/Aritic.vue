<template>
    <div class="w-full bg-white border-2 min-h-screen rounded-md  p-6">
        <div class="flex text-blue-600 text-center text-lg flex-wrap">
            <div class="bg-blue-500 h-10 rounded-xl bg-opacity-40 m-2 p-2 cursor-pointer">{{'#1111'}}</div>
            <div class="bg-blue-500 h-10 rounded-xl bg-opacity-40 m-2 p-2 cursor-pointer">{{'#1111'}}</div>
            <div class="bg-blue-500 h-10 rounded-xl bg-opacity-40 m-2 p-2 cursor-pointer">{{'#1111'}}</div>
            <div class="bg-blue-500 h-10 rounded-xl bg-opacity-40 m-2 p-2 cursor-pointer">{{'#1111'}}</div>
            <div class="bg-blue-500 h-10 rounded-xl bg-opacity-40 m-2 p-2 cursor-pointer">{{'#1111'}}</div>
            <div class="bg-blue-500 h-10 rounded-xl bg-opacity-40 m-2 p-2 cursor-pointer">{{'#1111'}}</div>
            <div class="bg-blue-500 h-10 rounded-xl bg-opacity-40 m-2 p-2 cursor-pointer">{{'#1111'}}</div>
            <div class="bg-blue-500 h-10 rounded-xl bg-opacity-40 m-2 p-2 cursor-pointer">{{'#1111'}}</div>
            <div class="bg-blue-500 h-10 rounded-xl bg-opacity-40 m-2 p-2 cursor-pointer">{{'#22222222'}}</div>
        </div>
        <div class="my-8 text-2xl text-bold text-center flex flex-wrap content-between">
            <div class="w-60 bg-blue-400 h-40 leading-40 rounded-xl text-white m-2 cursor-pointer shadow-xl">
                {{'技术'}}
            </div>
            <div class="w-60 bg-red-400 h-40 leading-40 rounded-xl text-white m-2 cursor-pointer shadow-xl">
                {{'生活'}}
            </div>
            <div class="w-60 bg-green-400 h-40 leading-40 rounded-xl text-white m-2 cursor-pointer shadow-xl">
                {{'工作'}}
            </div>
            <div class="w-60 bg-yellow-400 h-40 leading-40 rounded-xl text-white m-2 cursor-pointer shadow-xl">
                {{'？？？'}}
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

<script>
export default {

}
</script>

<style>

</style>