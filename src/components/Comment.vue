<template>
    <div class="my-4" v-if="!isChild">
        <el-input v-model="content" :autosize="{ minRows: 4, maxRows: 4 }" type="textarea"
            placeholder="留下你的评论"></el-input>
        <el-button type="primary" class="float-right my-2" @click="discuss(childId)">提交</el-button>
    </div>
    <div v-for="(item, index) in comments" class="w-full flex p-2 my-4 border-gray-200 border-2 shadow-xl shadow-slate-100" :key="item.id">
        <el-avatar :size="40" :src="item?.user?.headImage" class="min-w-[40px]" />
        <div class="flex flex-col ml-2 flex-wrap text-sm flex-1">
            <div class="text-lg font-semibold">{{ item?.user?.username }}</div>
            <span class="my-2 leading-6">{{ item?.content }}</span>
            <div class="flex items-center text-slate-600">
                <span>{{ timeFormat(item?.time || "") }}</span>
                <div class="min-w-[84px] hover:bg-blue-300 flex mx-2 px-2 bg-slate-200 h-8 justify-center items-center shadow-gray-200 shadow-xl border-b-2 border-gray-200 group rounded-sm hover:animate-shake hover:cursor-pointer"
                    @click="like(item.id)">
                    <i class="group-hover:animate-bounce group-hover:bg-blue-200 "
                        style="display:block;width:20px;margin:auto 0;height: 20px;background-size: 100%;background-repeat: no-repeat;background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJ9SURBVHgB7VZNbtNQEP7GP7AkN8DcoJyA5gRNTwCR2kqsUm9YEKEaoZRl0hUSBLWcAHOCpjdIT1AfIewgTjzM+AccxwHXLRYS/STnvbyxZ743b34e8L+DcEMMhu+fERk7DLTAuAwRjjz3eVD1+xsROD75eARmr7AczDlsVyVhoCbeDt85mXHmqLtkbst0Ko9jk31aVU9tAgvYW7FxYNJ3D85eufuTOZtKYiZu3X4z/LBdRU9tAia4E0+YL7I1z+3OmPEpkWOrip7aBED0RAcb7K8KeBb/alD+LQIa+TI48kxfuAfTVSlVMlybgAafpN1RYgujopwIOzpGEhuogGuloTc8bd2j5TmS8/VfHu7t5uUaeCaRygORPaqi00JFJAVn2UuNa667xXfEeJZ+rePR+Kool7gIQg67+RpBJTvo5QMoZHPXxFLW8Tld2lhoUqMOfg/JlKjdT2Pnpwf0bDlx3worG1EnPlENF0m5OayO5+7NyjRLHXgMfCsNQhumrBviRfRAhnqyu0KAYXmpcX/BfKKekL+dvBIheOUddkuNK7QO6A43ycXDvolYr5OtGTnlD3VU41rVZLdfccvIipMYDdYINAHZZJyicgR+4wQ0hbVH6Px7RBeNE9BM0lGbVxorTRNImhcxf8mvNxcDafOywBM0TUCqqEa/I09QbF6NECDQdjKuN6hGCJSlX2MENqXfGgFKS6hlmA9wi7hvLJ/qWEy/DL96AfMlEXWkU/mD0XiCkjud7kRk56iOltwRYz3ShM7KXlhpx4PheBR3qxzS6zbSi0YtyOZe9919D38ioNC2vIDl6NyQC2bWtzWVomvf93gWwg7KXH+HfwY/AGsn+Lf3Dim6AAAAAElFTkSuQmCC);"></i>
                    <span class="text-xl font-semibold ml-2 group-hover:font-bold group-hover:text-black">
                        {{JSON.parse(item?.good) ? JSON.parse(item?.good)?.length : '点赞' }}
                        <!-- {{ item?.good }} -->
                    </span>
                </div>
                <div @click="childId = item.fid || item.id"
                    class="min-w-[84px] hover:bg-blue-300 flex mx-2 px-2 bg-slate-200 h-8 justify-center items-center shadow-gray-200 shadow-xl border-b-2 border-gray-200 group rounded-sm hover:animate-shake hover:cursor-pointer">
                    <el-icon size="20px" class="group-hover:animate-bounce group-hover:bg-blue-200 ">
                        <ChatDotSquare />
                    </el-icon>
                    <span class="text-xl font-semibold ml-2 group-hover:font-bold group-hover:text-black">
                        {{ item?.childs?.length || '回复' }}
                    </span>
                </div>

            </div>
            <comment v-if="item?.childs?.length" :comments="item?.childs" :isChild="true" :aid="aid" @refresh="()=>emit('refresh')"/>
        </div>
        <div @click="deleteComment(item.id)" v-if="item.user.id == store.userId">
            <el-icon class="hover:bg-blue-200"><Delete /></el-icon>
        </div>
    </div>
    <el-dialog v-model="visiable" title="评论" :before-close="handleClose">
        <div class="pb-4">
        <el-input v-model="content" :autosize="{ minRows: 4, maxRows: 4 }" type="textarea" class="mb-4"
            placeholder="留下你的评论"></el-input>
        <el-button type="primary" class="float-right" @click="discuss(childId)">提交</el-button>
        </div>
    </el-dialog>
</template>
<script setup>
import { computed } from 'vue';
import { useStore } from '../../stores/user';
import { timeFormat } from '../../util/time';
import { deleComment, likeComment, setComment } from '../http/api';
import { ElMessage } from 'element-plus';
const { comments, aid, isChild } = defineProps({
    comments: {
        type: Array,
        default() {
            return [{
                id: 1,
                fid: null,
                user: {
                    headImage: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
                    username: '111',
                },
                content: `Radash，这个新兴的工具库，以其现代化的设计和对TypeScript的原生支持，迅速吸引了开发者的注意。
虽然 Radash 是新产品，但它在 GitHub 上的 star 数已超过 2.8K，拥有 99 个 Forks，每周的 NPM 下载量超过 7.6 万。您可以使用 NPM 或 Yarn 轻松安装 Radash。

作者：芝士加
链接：https://juejin.cn/post/7347279011653402659
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。`,
                time: "2022-10-27T06:42:31.000Z",
                good: 10,
                childs: [{
                    id: 2,
                    url: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
                    name: '111',
                    content: `Radash，这个新兴的工具库，以其现代化的设计和对TypeScript的原生支持，迅速吸引了开发者的注意。
虽然 Radash 是新产品，但它在 GitHub 上的 star 数已超过 2.8K，拥有 99 个 Forks，每周的 NPM 下载量超过 7.6 万。您可以使用 NPM 或 Yarn 轻松安装 Radash。

作者：芝士加
链接：https://juejin.cn/post/7347279011653402659
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。`,
                    time: "2022-10-27T06:42:31.000Z",
                    childs: []
                }]
            }]
        }
    },
    aid: {
        type: String,
    },
    isChild: {
        type: Boolean,
        default: false
    },
})
const emit = defineEmits(['refresh'])
let store = useStore()
let childId = ref()
const visiable = computed(()=>{
    return Number.isInteger(childId.value) && Boolean(childId.value)
})
const handleClose = (done) => {
  ElMessageBox.confirm('你的内容不会保存，确定退出吗？')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
const like = (id) => {
    likeComment({
        uid:store.userId,
        id
    }).then(res=>{
        res.data == '点赞成功' ? ElMessage.success(res.data) : ElMessage.warning(res.data)
        emit('refresh')
        childId.value = null
    })
}
const deleteComment = (id) => {
    deleComment({id}).then(res=>{
        console.log(res.data)
        emit('refresh')
        childId.value = null
        ElMessage.success('删除成功')
    })
}
const content = ref('')
const discuss = (fid = null) => {
    console.log(fid)
    let param = {
        id: store.userId,
        content:content.value,
        aid,
        fid
    }
    setComment(param).then(res => {
        console.log(res.data)
        emit('refresh')
        childId.value = null
    })
}
</script>

<style lang="scss" scoped></style>