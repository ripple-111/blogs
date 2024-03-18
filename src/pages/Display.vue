<template>
    <div style="background:#f2f3f5">
        <TopNavBar />
        <div class=" max-w-screen-lg w-full pb-10 mx-auto relative min-h-screen">
            <md-editor previewOnly editorId="md-edit" v-model="article.text" :preview-theme="theme" ref="edit"
                class="max-w-full mt-6" style="width:760px;min-height: 90vh;"></md-editor>
            <div class="w-60 fixed top-20 right-60">
                <span class="text-black align-middle mr-2">主题:</span>
                <el-select v-model="value" class="w-48" placeholder="选择主题" @change="(val) => { theme = val }">
                    <el-option v-for="(item, index) in options" :key="index" :label="item" :value="item" />
                </el-select>
                <Author :user="article.user" :isFollow="isFollow" :good="article.good" :watch="article.watch" />
                <div class="bg-blue-300 hover:bg-blue-400 my-2 flex h-10 justify-center items-center shadow-gray-200 shadow-xl border-b-2 border-gray-200 group rounded-sm hover:animate-shake hover:cursor-pointer"
                    @click="like">
                    <i class="group-hover:animate-bounce group-hover:bg-blue-200 "
                        style="display:block;vertical-align: middle;width:20px;margin:auto 0;height: 20px;background-size: 100%;background-repeat: no-repeat;background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJ9SURBVHgB7VZNbtNQEP7GP7AkN8DcoJyA5gRNTwCR2kqsUm9YEKEaoZRl0hUSBLWcAHOCpjdIT1AfIewgTjzM+AccxwHXLRYS/STnvbyxZ743b34e8L+DcEMMhu+fERk7DLTAuAwRjjz3eVD1+xsROD75eARmr7AczDlsVyVhoCbeDt85mXHmqLtkbst0Ko9jk31aVU9tAgvYW7FxYNJ3D85eufuTOZtKYiZu3X4z/LBdRU9tAia4E0+YL7I1z+3OmPEpkWOrip7aBED0RAcb7K8KeBb/alD+LQIa+TI48kxfuAfTVSlVMlybgAafpN1RYgujopwIOzpGEhuogGuloTc8bd2j5TmS8/VfHu7t5uUaeCaRygORPaqi00JFJAVn2UuNa667xXfEeJZ+rePR+Kool7gIQg67+RpBJTvo5QMoZHPXxFLW8Tld2lhoUqMOfg/JlKjdT2Pnpwf0bDlx3worG1EnPlENF0m5OayO5+7NyjRLHXgMfCsNQhumrBviRfRAhnqyu0KAYXmpcX/BfKKekL+dvBIheOUddkuNK7QO6A43ycXDvolYr5OtGTnlD3VU41rVZLdfccvIipMYDdYINAHZZJyicgR+4wQ0hbVH6Px7RBeNE9BM0lGbVxorTRNImhcxf8mvNxcDafOywBM0TUCqqEa/I09QbF6NECDQdjKuN6hGCJSlX2MENqXfGgFKS6hlmA9wi7hvLJ/qWEy/DL96AfMlEXWkU/mD0XiCkjud7kRk56iOltwRYz3ShM7KXlhpx4PheBR3qxzS6zbSi0YtyOZe9919D38ioNC2vIDl6NyQC2bWtzWVomvf93gWwg7KXH+HfwY/AGsn+Lf3Dim6AAAAAElFTkSuQmCC);"></i>
                    <span class="text-xl font-semibold ml-2 group-hover:text-white">点赞</span>
                </div>
                <div class="bg-white px-2">
                    <p class="py-4 mx-4 text-lg">目录</p>
                    <el-divider class="my-2" />
                    <MdCatalog editorId="md-edit" scrollElement='.el-scrollbar__wrap.el-scrollbar__wrap--hidden-default'
                        :scrollElementOffsetTop="50" :offsetTop="70" />
                </div>
                <Scroll />
            </div>
        </div>
    </div>
</template>

<script setup>
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import TopNavBar from '../components/TopNavBar.vue';
import Scroll from '../components/Scroll.vue'
import Author from '../components/author.vue';
import { ElMessage } from 'element-plus';
const { MdCatalog } = MdEditor;
const value = ref('smart-blue')
const edit = ref()
const router = useRouter()
const store = useHomeStore()
const route = useRoute()
let theme = 'smart-blue'
const options = ['default', 'github', 'vuepress', 'mk-cute', 'smart-blue', 'cyanosis']
const article = ref({
    text: ''
})
const isFollow = ref()
if (route.query.id)
    getArticleInfo(route.query.id).then(res => {
        article.value = res.data.data
        article.value.user.id = article.value.uid
        isFollow.value = res.data.isFollow
    })
else
    router.push('community')
let timer = null
onMounted(() => {
    if (route.query.id)
        timer = setTimeout(() => {
            watchArticle(route.query.id)
        }, 5000)
})
onBeforeUnmount(() => {
    clearTimeout(timer)
})
function like() {
    goodArticle(route.query.id).then(res => {
        res.msg == '点赞成功' ? ElMessage.success(res.msg) : ElMessage.info(res.msg)
    })
}
MdEditor.config({
    markedRenderer(renderer) {
        renderer.heading = (text, level, raw, s, index) => {
            return `
            <h${level} id="${text}">
            <a href="#${text}" onclick="return false;">${text}</a>
            </h${level}>`
        }
        return renderer
    }
})
</script>
<style lang="scss">
article {
    padding: 10px 20px !important;

    h1 {
        font-size: 2rem !important;
        margin: 0px !important;
    }
}
</style>