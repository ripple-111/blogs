<script setup>
import UserInfo from './components/UserInfo.vue'
import Top  from './components/Top.vue';
import debounce from '../util/shake'
import zhCn from 'element-plus/dist/locale/zh-cn'
const router = useRouter()
const scroll = ref()
const isScroll = ref(false)
router.beforeEach((to, from) => {
    if (!localStorage.getItem('token') && to.path !== '/login') {
        ElMessage.warning('未登录')
        return { path: '/login' }
    }

    if (to.path == '/display' || from.path == '/community') {
        if (scroll.value) {
            scroll.value.scrollTo({ top: 0, left: 0 })
            isScroll.value = false
        }
    }
})
onMounted(() => {
    provide('scroll', scroll.value)
})
provide('isScroll', isScroll)
const hasScroll = debounce(({ scrollTop }) => {
    scrollTop + 50 > window.innerHeight ? isScroll.value = true : isScroll.value = false //副标题是否显示
}, 200)
let flag = window && window.process && window.process.versions && window.process.versions['electron']
</script>

<template>
    <el-config-provider :locale="zhCn">
        <UserInfo />
        <el-scrollbar height="100vh" ref="scroll" @scroll="hasScroll">
            <Top v-if="flag" />
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component" v-if="$route.meta.keepAlive" />
                </keep-alive>
                <component :is="Component" v-if="!$route.meta.keepAlive" />
            </router-view>
        </el-scrollbar>
    </el-config-provider>
</template>

<style lang="scss">
@import 'blog.css';
</style>
