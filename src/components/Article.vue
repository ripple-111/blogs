<template>
    <div v-if="all?homeStore.articles.length:store.articles.length">
        <div class="p-4 px-6 mb-2 border-b-2 border-zinc-500 bg-white box-content rounded shadow-sm shadow-gray-400 hover:bg-slate-50" v-for="essay in all?homeStore.articles:store.articles"
            :key="essay.id">
            <div class="flex items-center">
                <!-- <el-avatar :size="50"  :src=essay?.headImage fit="cover" /> -->
                <div class=" mt-1 flex-1 text-gray-600 ">
                    <span class="align-middle hover:text-blue-600 hover:bg-slate-300 hover:cursor-pointer bg-slate-100 px-2" @click="router.push(`/blog?id=${essay.uid}`)">{{ essay?.user.username||'未知名称' }} </span>
                    
                    <span class="mt-1 ml-2 leading-6 text-sm align-middle">
                        |
                        <el-icon size="16" class="align-middle">
                            <Clock />
                        </el-icon>
                        <text class="align-middle mx-1" >{{ '发表于'+timeFormat(essay?.time) }}</text>
                    </span> 
                    <span class="font-medium align-middle">
                        |
                        <el-tag class="ml-1 hover:bg-blue-200 hover:cursor-pointer" v-for="item in essay?.tags.split(',')">{{ item }}</el-tag>
                    </span>
                </div>
                <el-icon :size="20" class="my-auto" color="gray" v-if="!all&&isEdit">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <el-icon class="el-icon--right">
                                <Menu />
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item :icon="EditPen" @click="router.push({ path: '/edit', query: { id: essay.id } })">编辑</el-dropdown-item>
                                <el-dropdown-item :icon="Delete" @click="deleteItem(essay.id)">删除</el-dropdown-item>
                                <el-dropdown-item :icon="More">Action 5</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </el-icon>
            </div>
            <div class="flex w-full mt-2" >
                <div class="flex-1 text-gray-500 text-sm pr-1">
                <h1 class="text-lg font-semibold mb-2 text-black">{{ essay?.title }}</h1>
                <p id="overText" class="min-h-[80px]">{{ essay?.expla }}</p>
                </div>
                <el-image  class="w-40 h-full" :src="essay?.image" fit="cover" v-if="essay.image"/>
            </div>
            
            <el-divider></el-divider>
            <div class="mt-4 flex justify-between">
                <el-button type="primary" plain @click="enter(essay)">>>进去看看</el-button>
                <span class="mr-4">
                    <el-badge :value="99" class="item" type="primary">
                        <el-icon class="align-middle ml-8" :size="20">
                            <View />
                        </el-icon>
                    </el-badge>
                    <el-badge :value="12" class="item" type="primary">
                        
                        <el-icon class="align-middle ml-8" :size="20">
                            <Star />
                        </el-icon>
                    </el-badge>
                    <el-badge :value="12" class="item" type="primary">
                        <el-icon class="align-middle ml-8" :size="20">
                            <Document />
                        </el-icon>
                    </el-badge>
                </span>
            </div>
        </div>
    </div>
    <div v-else class="text-center font-medium text-xl leading-[100px] bg-gray-400 hover:bg-gray-300 cursor-pointer" @click="router.push('/edit')">
        似乎没有文章（点此创建）
    </div>
    <el-pagination v-model:currentPage="currentPage" layout="prev, pager, next, jumper" :total="store.total"
        :page-size="4" @current-change="store.getAll({ currentPage })" class="justify-center" />
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { timeFormat } from '../../util/time'
import {
    EditPen,More,Delete,
} from '@element-plus/icons-vue'
const props=defineProps(['all'])
const {all}=toRefs(props)
const router = useRouter()
const route=useRoute()
const homeStore=useHomeStore()
const store = useStore()
const currentPage = ref(1)
const isEdit=computed(()=>!route.query.id||route.query.id==store.userId)
function enter(n) {
    router.push({ path: '/display', query: { id: n.id } })
}
async function deleteItem(id){
    const res=await deleteBlog({ id })
    if(res.data==1)
    ElMessage.success('删除成功')
    store.getArticle({})
}
</script>

<style>

</style>