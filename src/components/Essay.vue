<template>
    <div class="p-4 my-2">
        <div class="flex">
        <el-avatar :size="60" class="" src="../src/assets/headImage.jpeg" fit="cover"  />
        <div class="mx-4 mt-1 flex-1">
        <p class="text-lg font-semibold">{{'John'}}</p>
        <p class="mt-1 text-gray-500 leading-6">
            <el-icon size="16" class="align-middle"><Clock /></el-icon>
            <text class="align-middle ml-2">{{'一分钟前'}}</text>
        </p>
        </div>
        <el-icon :size="20" class="my-auto" color="gray"><Menu /></el-icon>
        </div>
        <el-divider></el-divider>
        <div class="mt-4 ml-2 text-xl font-bold flex flex-wrap justify-between">
            <h1>{{'标题'}}</h1>
            <div class=" ml-16 font-medium inline-block">
                <el-tag class="ml-2" >Tag 2</el-tag>
                <el-tag class="ml-2" >Tag 2</el-tag>
                <el-tag class="ml-2" >Tag 2</el-tag>
                <el-tag class="ml-2" >Tag 2</el-tag>

            </div>
        </div>
        <div class="mt-2 ml-2">
            <el-image style="width: 100%; height: 350px" :src="`https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg`" :fit="`cover`" />
        </div>
        <div class="mt-4 ml-2 tracking-wide text-lg">
            {{'正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文'}}
        </div>
        <el-divider></el-divider>
        <div class="mt-4 flex justify-between"> 
            <el-button type="primary">>>进入看看</el-button>
            <span class="mr-4">
            <el-badge :value="99" class="item" type="primary">
                <el-icon class="align-middle ml-8" :size="25"><View /></el-icon>
            </el-badge>
            <el-badge :value="12" class="item" type="primary">
                <el-icon class="align-middle ml-8" :size="25"><Star /></el-icon>
            </el-badge>
            <el-badge :value="12" class="item" type="primary">
                <el-icon class="align-middle ml-8" :size="25"><Promotion /></el-icon>
            </el-badge>       
            </span>
        </div>
    </div>

</template>

<script>
export default {

}
</script>

<style>

</style>