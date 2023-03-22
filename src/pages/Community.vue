<template>
        <div class="bg-water fixed w-full h-screen z-underer"></div>
        <TopNavBar/>
        <div class="flex flex-wrap  w-screen h-screen content-start">
            <div class="w-full flex justify-center h-full items-center relative">
                <div class="w-80">
                    <p class="font-blod text-5xl text-center mb-4 text-transparent"
                        style="background-clip: text;-webkit-background-clip: text;background-image:linear-gradient(60deg,#64b3f4 0%, #c2e59c 100%)">
                        The Star</p>
                    <el-input v-model="search" placeholder="输入你想搜索的文章名字" prefix-icon="Search"
                        style="height:40px;--el-input-bg-color:#eef1f5" class="mb-2"
                        @input="(search) => homeStore.getAllArticle(1,search.trim())" @change="scrollTo()">
                    </el-input>
                    <p class="font-blod text-lg text-center mb-4 text-white mt-4">开启你的去中心博客之旅</p>
                </div>
                <Scroll/>
            </div>
        </div>
        <div class="min-h-screen w-full" style="background-color: #f2f3f5;">
        <div class="w-full max-w-5xl mx-auto relative pt-14 p-6">
            <div class="lg:max-w-[700px] transition-all duration-150" v-loading="homeStore.loading"  element-loading-text="Loading...">
            <Article :all="true"/>
            </div>
            <div class="hidden lg:block">
            <Aside/>
            </div>
        </div>
        </div>
</template>

<script setup>
import Article from '../components/Article.vue';
import Aside from '../components/Aside.vue';
import Scroll from '../components/Scroll.vue';
import TopNavBar from '../components/TopNavBar.vue';
const store = useStore()
const homeStore=useHomeStore()
const search = ref()
store.userInfo()
homeStore.getAllArticle()
homeStore.getBestAuthors()
const scroll=inject('scroll')
function scrollTo(){
    scroll.scrollTo({ top: window.innerHeight, left: 0, behavior: 'smooth' })
}
</script>

<style lang="scss" scoped>
.el-menu-item {
    font-size: 20px
}

.el-divider {
    margin: 1px 0;
}
</style>