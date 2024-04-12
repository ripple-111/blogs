<template>
    <TopNavBar/>
    <div class="flex min-h-[93vh]">
    <el-menu active-text-color="#fff" 
        background-color="rgba(7,21,58,.7)" 
        :default-active="path" :collapse="isCollapse"
        router
        
        :class="styleClass"
        style="backdrop-filter: blur(2px);
        --el-menu-hover-text-color:white;
        --el-menu-hover-bg-color:rgb(3 6 14 / 54%);
        --el-menu-active-color:#9af9dc"  text-color="rgb(191 179 179 / 55%)">
        <el-menu-item index="/admin/home">
            <el-icon><House /></el-icon>
            <span>主页</span>
        </el-menu-item>
        <el-menu-item index="/admin/data">
            <el-icon><DataAnalysis /></el-icon>
            <span>数据看板</span>
        </el-menu-item>
        <el-menu-item index="/admin/manage">
            <el-icon><Document /></el-icon>
            <span>文章管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/friend">
            <el-icon><MostlyCloudy /></el-icon>
            <span>朋友管理</span>
        </el-menu-item>
    </el-menu>
    <div class="flex flex-col flex-1">
        <div class="flex items-center cursor-pointer" @click="isCollapse = !isCollapse">
            <el-icon :size="30" color="gray" v-show="isCollapse"  ><Expand /></el-icon>
            <el-icon :size="30" color="gray" v-show="!isCollapse" ><Fold /></el-icon>
            点此{{ isCollapse ? '展开' : '关闭' }}菜单
        </div>
        <div class="min-h-[90vh] bg-slate-100 p-1">
            <router-view>

            </router-view>
        </div>
    </div>
    </div>
</template>

<script setup>
import TopNavBar from '../components/TopNavBar.vue'
import { useRouter } from 'vue-router';
const isCollapse = ref(false)
const router = useRouter()
const path = computed(() => {
    return router.currentRoute.value.matched[1].path
})
const styleClass = isCollapse ? 'min-w-[15vw]' : 'min-w-0'
</script>

<style lang="scss" scoped>
</style>