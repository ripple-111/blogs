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
                        @input="(search) => store.getArticle({ search })" @change="scrollTo()">
                    </el-input>
                    <p class="font-blod text-lg text-center mb-4 text-white mt-4">开启你的去中心博客之旅</p>
                </div>
                <div class="fixed right-40 bottom-20 rounded-full bg-white cursor-pointer" style="height:30px"
                    @click="scrollTo()">
                    <el-icon :size="30" color="#409EFC">
                        <CaretBottom v-show="!isScroll"/>
                        <CaretTop v-show="isScroll"/>
                    </el-icon>
                </div>
            </div>
        </div>
        <div class="min-h-screen w-full" style="background-color: #f2f3f5;">
        <div class="w-full max-w-5xl mx-auto relative pt-14 px-4">
            <div class="lg:max-w-[700px] transition-all duration-150">
            <Article/>
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
import TopNavBar from '../components/TopNavBar.vue';
const store = useStore()
const search = ref()
store.userInfo()
store.getArticle({})
store.getType()

const scroll=inject('scroll')
const isScroll=inject('isScroll')
function scrollTo() { //滚动一个窗口
    isScroll.value?scroll.scrollTo({ top: 0, left: 0, behavior: 'smooth' }):scroll.scrollTo({ top: window.innerHeight, left: 0, behavior: 'smooth' })
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