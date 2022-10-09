<template>
    <h1 class="text-center my-4 font-bold text-xl text-blue-500">留言板</h1>
    <el-card class="m-4">
        <template #header>
            <div class="flex justify-between items-center">
                    <el-avatar :size="50" class="inline-block align-middle" src="../src/assets/headImage.jpeg"
                        fit="cover" />
                    <span class="text-xl  inline-block align-middle mx-2">{{'mike'}}</span>
                <el-button :icon="Operation"></el-button>
            </div>
        </template>
        <div class="p-2 font-semibold">{{'11111111111111111111111111111'}}</div>
        <el-divider></el-divider>
    </el-card>
    <el-card class="m-4">
        <template #header>
            <div class="flex justify-between items-center">
                    <el-avatar :size="50" class="inline-block align-middle" src="../src/assets/headImage.jpeg"
                        fit="cover" />
                    <span class="text-xl  inline-block align-middle mx-2">{{'mike'}}</span>
                <el-button :icon="Operation"></el-button>
            </div>
        </template>
        <div class="p-2 font-semibold">{{'11111111111111111111111111111'}}</div>
        <el-divider></el-divider>
    </el-card>
</template>
<script setup>
import { Operation } from '@element-plus/icons-vue';

</script>
<style>

</style>