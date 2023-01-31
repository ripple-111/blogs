<template>
    <div v-if="store.articles.length">
        <div class="p-4 px-6 mb-2 border-b-2 border-zinc-500 bg-white box-content rounded" v-for="essay in store.articles"
            :key="essay.id">
            <div class="flex items-center ">
                <el-avatar :size="50"  :src=essay?.headImage fit="cover" />
                <div class="mx-4 mt-1 flex-1">
                    <p class="font-semibold">{{ essay?.name }}</p>
                    <p class="mt-1 text-gray-500 leading-6 text-sm">
                        <el-icon size="16" class="align-middle">
                            <Clock />
                        </el-icon>
                        <text class="align-middle ml-1" >{{ '发表于'+timeFormat(essay?.time) }}</text>
                    </p>
                </div>
                <el-icon :size="20" class="my-auto" color="gray">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <el-icon class="el-icon--right">
                                <Menu />
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item :icon="EditPen" @click="router.push({ path: '/edit', query: { id: essay.id } })">编辑</el-dropdown-item>
                                <el-dropdown-item :icon="Delete" @click="deleteBlog({ id: essay.id })">删除</el-dropdown-item>
                                <el-dropdown-item :icon="More">Action 5</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </el-icon>
            </div>
            <el-divider></el-divider>
            <div class="my-2 text-xl font-bold flex flex-wrap justify-between hover:text-gray-600 hover:cursor-pointer">
                <h1>{{ essay?.title }}</h1>
                <div class=" ml-16 font-medium inline-block">
                    <el-tag class="ml-2" v-for="item in essay?.tags.split(',')">{{ item }}</el-tag>
                </div>
            </div>
            <div class="mt-2 flex w-full">
                <el-image style="width: 20%; height: auto;" :src="essay?.image" fit="cover" />
                <div class="ml-4 flex-1 ">
                {{ essay?.expla }}
                </div>
            </div>
            
            <el-divider></el-divider>
            <div class="mt-4 flex justify-between">
                <el-button type="primary" plain @click="enter(essay)">>>进入看看</el-button>
                <span class="mr-4">
                    <el-badge :value="99" class="item" type="primary">
                        <el-icon class="align-middle ml-8" :size="20">
                            <View />
                        </el-icon>
                    </el-badge>
                    <el-badge :value="12" class="item" type="primary">
                        
                        <el-icon class="align-middle ml-8" :size="20">
                            <Star />
                        </el-icon>
                    </el-badge>
                    <el-badge :value="12" class="item" type="primary">
                        <el-icon class="align-middle ml-8" :size="20">
                            <Document />
                        </el-icon>
                    </el-badge>
                </span>
            </div>
        </div>
    </div>
    <div v-else class="text-center font-medium text-xl mt-10">
        似乎没有文章
    </div>
    <el-pagination v-model:currentPage="currentPage" layout="prev, pager, next, jumper" :total="store.total"
        :page-size="4" @current-change="store.getAll({ currentPage })" class="justify-center" />
</template>

<script setup>
import { timeFormat } from '../../util/time'
import {
    EditPen,More,Delete,
} from '@element-plus/icons-vue'
const router = useRouter()
const store = useStore()
const currentPage = ref(1)
function enter(n) {
    router.push({ path: '/display', query: { id: n.id } })
}
</script>

<style>

</style>