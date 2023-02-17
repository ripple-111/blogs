<template>
    <el-scrollbar height="100vh" ref="scroll">
        <div class="bg-water fixed w-full h-screen z-underer"></div>
        <div class="flex flex-wrap w-screen min-h-screen content-start">
            <TopNavBar />
            <User />
            <div class="mx-auto ml-10 my-8 w-7/12">
                <router-view></router-view>
            </div>
        </div>
    </el-scrollbar>

</template>

<script setup>
import User from '../components/User.vue';
import TopNavBar from '../components/TopNavBar.vue';
const store = useStore()
store.userInfo()
store.getArticle({})
store.getType()
</script>

<style lang="scss" scoped>
.el-menu-item {
    font-size: 20px
}

.el-divider {
    margin: 1px 0;
}
</style>