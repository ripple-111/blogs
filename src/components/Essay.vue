<template>
    <div v-if="store.articles.length">
        <div class="p-4 mb-2 border-b-2 border-zinc-500 bg-white box-content rounded" v-for="essay in store.articles"
            :key="essay.id">
            <div class="flex">
                <el-avatar :size="60" class="" :src=essay?.headImage fit="cover" />
                <div class="mx-4 mt-1 flex-1">
                    <p class="text-lg font-semibold">{{ essay?.name }}</p>
                    <p class="mt-1 text-gray-500 leading-6">
                        <el-icon size="16" class="align-middle">
                            <Clock />
                        </el-icon>
                        <text class="align-middle ml-2">{{ timeFormat(essay?.time) }}</text>
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
                                <el-dropdown-item :icon="Check">Action 4</el-dropdown-item>
                                <el-dropdown-item :icon="More">Action 5</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </el-icon>
            </div>
            <el-divider></el-divider>
            <div class="mt-4 ml-2 text-xl font-bold flex flex-wrap justify-between">
                <h1>{{ essay?.title }}</h1>
                <div class=" ml-16 font-medium inline-block">
                    <el-tag class="ml-2" v-for="item in essay?.tags.split(',')">{{ item }}</el-tag>

                </div>
            </div>
            <div class="mt-2 ml-2">
                <el-image style="width: 100%; height: 350px" :src="essay?.image" fit="cover" />
            </div>
            <div class="mt-4 ml-2 tracking-wide text-lg">
                {{ essay?.expla }}
            </div>
            <el-divider></el-divider>
            <div class="mt-4 flex justify-between">
                <el-button type="primary" @click="enter(essay)">>>进入看看</el-button>
                <span class="mr-4">
                    <el-badge :value="99" class="item" type="primary">
                        <el-icon class="align-middle ml-8" :size="25">
                            <View />
                        </el-icon>
                    </el-badge>
                    <el-badge :value="12" class="item" type="primary">
                        <el-icon class="align-middle ml-8" :size="25">
                            <Star />
                        </el-icon>
                    </el-badge>
                    <el-badge :value="12" class="item" type="primary">
                        <el-icon class="align-middle ml-8" :size="25">
                            <Promotion />
                        </el-icon>
                    </el-badge>
                </span>
            </div>
        </div>
    </div>
    <div v-else class="text-center font-medium text-xl mt-10">
        用户似乎没有文章
    </div>
    <el-pagination v-model:currentPage="currentPage" layout="prev, pager, next, jumper" :total="store.total"
        :page-size="3" @current-change="store.getAll({ currentPage })" class="justify-center" />
</template>

<script setup>
import { useStore } from '../../stores/index'
import { useRouter } from 'vue-router'
import { timeFormat } from '../../util/time'
import {
    EditPen,
  Check,
  More
} from '@element-plus/icons-vue'
const router = useRouter()
const store = useStore()
const currentPage = ref(1)
function enter(n) {
    router.push({ path: '/display', query: { id: n.id } })
}
// const essay=reactive({
//     name:'John',
//     time:'一分钟前',
//     title:'标题',
//     tags:['标签二','标签二','标签二'],
//     headImage:'../src/assets/headImage.jpeg',
//     img:`https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg`,
//     expla:'正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文'
// })

</script>

<style>

</style>