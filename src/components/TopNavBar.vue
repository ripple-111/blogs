<template>

    <div class="w-full sticky z-50 top-0">
        <el-menu mode="horizontal" router :default-active="'/blog'" :ellipsis="false" 
            class="h-12"
            background-color="rgba(7,21,58,.7)"
            style="backdrop-filter: blur(2px);--el-menu-hover-text-color:white;--el-menu-hover-bg-color:rgb(3 6 14 / 54%)"
            text-color="rgb(191 179 179 / 55%)">
            <el-menu-item>LOGO</el-menu-item>
            <div class="flex-1"></div>
            <el-menu-item index="/blog">
                <el-icon :size="40">
                    <HomeFilled />
                </el-icon>主页
            </el-menu-item>
            <el-menu-item index="/community">
                <el-icon :size="40">
                    <Promotion />
                </el-icon>社区
            </el-menu-item>
            <el-menu-item index="/edit">
                <el-icon :size="40">
                    <EditPen />
                </el-icon>创作
            </el-menu-item>
            <el-menu-item index="/more">
                <el-icon :size="40">
                    <MoreFilled />
                </el-icon>更多
            </el-menu-item>
            <el-avatar :size="40" class="my-auto mx-2" :src="info.headImage" fit="fill" />
            <el-dropdown class="my-auto mr-6">
                <span class="text-white font-semibold">
                    <span class="align-middle">{{ info.username }}</span>
                    <el-icon :size="20" class="align-middle">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="pageStore.drawer = true">账号管理</el-dropdown-item>
                        <el-dropdown-item @click="router.push('/login')">登录注册</el-dropdown-item>
                        <el-dropdown-item>Action 3</el-dropdown-item>
                        <el-dropdown-item>Action 4</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

        </el-menu>
    </div>

</template>

<script setup>
const router = useRouter()
const store = useStore()
const pageStore = usePageStore()
let { info } = storeToRefs(store)
</script>
<style lang="scss" scoped>

</style>