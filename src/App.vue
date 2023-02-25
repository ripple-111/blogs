<script setup>
import UserInfo from './components/UserInfo.vue'
import debounce from '../util/shake'
import zhCn from 'element-plus/dist/locale/zh-cn'
const router=useRouter()
const scroll = ref()
const isScroll=ref(false)
router.beforeEach(()=>{
    if(scroll.value){
    scroll.value.scrollTo({top:0,left:0})
    isScroll.value=false
    }
})
onMounted(()=>{
    provide('scroll',scroll.value)
})
provide('isScroll',isScroll)
const hasScroll=debounce(({scrollTop})=>{
    scrollTop+50>window.innerHeight?isScroll.value=true:isScroll.value=false //副标题是否显示
},200)
</script>

<template>
    <el-config-provider :locale="zhCn">
    <UserInfo/>
    <el-scrollbar height="100vh" ref="scroll"  @scroll="hasScroll">
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
