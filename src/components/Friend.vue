<template>
    <div class="p-4">
        <div class="grid grid-cols-3 grid-flow-row gap-4">          
            <el-card>
                <template #header>
                <div class="flex justify-between items-center">
                    <div>
                    <el-avatar :size="50" class="inline-block align-middle" src="../public/headImage.jpeg" fit="cover"  />
                    <span class="text-xl font-semibold inline-block align-middle mx-2">{{'mike'}}</span>
                    </div>
                    <el-button type="primary" :icon="View"></el-button>
                </div>
                </template>
                <div class="font-semibold flex justify-between items-center">
                    最新博客
                    <el-button type="danger">取消关注</el-button>
                </div>
                <div class="divide-y text-base mt-2">
                    <div class="my-2 cursor-pointer hover:bg-blue-200" >{{111}}</div>
                    <div class="my-2 cursor-pointer hover:bg-blue-200" >{{222}}</div>
                    <div class="my-2 cursor-pointer hover:bg-blue-200" >{{333}}</div>
                </div>
            </el-card>
            <el-card>
                <template #header>
                <div class="flex justify-between items-center">
                    <div>
                    <el-avatar :size="50" class="inline-block align-middle" src="../public/headImage.jpeg" fit="cover"  />
                    <span class="text-xl font-semibold inline-block align-middle mx-2">{{'mike'}}</span>
                    </div>
                    <el-button type="primary" :icon="View"></el-button>
                </div>
                </template>
                <div class="font-semibold flex justify-between items-center">
                    最新博客
                    <el-button type="danger">取消关注</el-button>
                </div>
                <div class="divide-y text-base mt-2">
                    <div class="my-2 cursor-pointer hover:bg-blue-200" >{{111}}</div>
                    <div class="my-2 cursor-pointer hover:bg-blue-200" >{{222}}</div>
                    <div class="my-2 cursor-pointer hover:bg-blue-200" >{{333}}</div>
                </div>
            </el-card>
            <el-card>
                <template #header>
                <div class="flex justify-between items-center">
                    <div>
                    <el-avatar :size="50" class="inline-block align-middle" src="../public/headImage.jpeg" fit="cover"  />
                    <span class="text-xl font-semibold inline-block align-middle mx-2">{{'mike'}}</span>
                    </div>
                    <el-button type="primary" :icon="View"></el-button>
                </div>
                </template>
                <div class="font-semibold flex justify-between items-center">
                    最新博客
                    <el-button type="danger">取消关注</el-button>
                </div>
                <div class="divide-y text-base mt-2">
                    <div class="my-2 cursor-pointer hover:bg-blue-200" >{{111}}</div>
                    <div class="my-2 cursor-pointer hover:bg-blue-200" >{{222}}</div>
                    <div class="my-2 cursor-pointer hover:bg-blue-200" >{{333}}</div>
                </div>
            </el-card>
            <el-card>
                <template #header>
                <div class="flex justify-between items-center">
                    <div>
                    <el-avatar :size="50" class="inline-block align-middle" src="../public/headImage.jpeg" fit="cover"  />
                    <span class="text-xl font-semibold inline-block align-middle mx-2">{{'mike'}}</span>
                    </div>
                    <el-button type="primary" :icon="View"></el-button>
                </div>
                </template>
                <div class="font-semibold flex justify-between items-center">
                    最新博客
                    <el-button type="danger">取消关注</el-button>
                </div>
                <div class="divide-y text-base mt-2">
                    <div class="my-2 cursor-pointer hover:bg-blue-200" >{{111}}</div>
                    <div class="my-2 cursor-pointer hover:bg-blue-200" >{{222}}</div>
                    <div class="my-2 cursor-pointer hover:bg-blue-200" >{{333}}</div>
                </div>
            </el-card>
        </div>
    </div>
</template>
<script setup>
import {View} from '@element-plus/icons-vue'
</script>
<style lang="scss" scoped>
    .el-card{
        background-color: rgb(142, 174, 223);
    }
</style>