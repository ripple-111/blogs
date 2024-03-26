<template>
    <div class="w-full sticky z-50 top-10" ref="sticky">
        <el-menu mode="horizontal" router :default-active="path" :ellipsis="false" class="h-14"
            background-color="rgba(7,21,58,.7)" style="backdrop-filter: blur(2px);
                --el-menu-hover-text-color:white;
                --el-menu-hover-bg-color:rgb(3 6 14 / 54%);
                --el-menu-active-color:#9af9dc" text-color="rgb(191 179 179 / 55%)">
            <el-menu-item index="/">
                <el-avatar  :size="40" class="my-auto mx-2" src="../../icon.png" fit="fill" />
            </el-menu-item>
            <div class="flex-1"></div>
            <el-menu-item index="/community">
                <el-icon :size="40">
                    <HomeFilled />
                </el-icon>主页
            </el-menu-item>
            <el-menu-item index="/blog">
                <el-icon :size="40">
                    <Promotion />
                </el-icon>博客
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
                        <el-dropdown-item @click="pageStore.drawer = true">个人中心</el-dropdown-item>
                        <el-dropdown-item @click="router.push('/login')">登录注册</el-dropdown-item>
                        <el-dropdown-item >自定样式</el-dropdown-item>
                        <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-menu>
        <SecondTopNav v-show="isScroll && router.currentRoute.value.path == '/community'" />
    </div>
</template>

<script setup>
import SecondTopNav from './SecondTopNav.vue';
const router = useRouter()
const store = useStore()
const pageStore = usePageStore()
const path = computed(() => {
    return router.currentRoute.value.matched[0].path
})
let { info } = storeToRefs(store)
function loginOut() {
    localStorage.removeItem('token')
    router.push('/login')
}
const sticky = ref()
const isScroll = inject('isScroll')
onMounted(() => {
    watchEffect(() => {
        isScroll.value ? sticky.value.style.backgroundColor = 'white' : sticky.value.style.backgroundColor = ''
    })
})

</script>
<style lang="scss">
</style>