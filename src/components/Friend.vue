<template>
    <div class="bg-white/20 min-h-[90vh] px-2">
        <div v-if="!followers.length" class="w-40 pt-20 text-xl font-bold m-auto">暂无关注...</div>
        <div class="grid grid-cols-3 grid-flow-row gap-4" v-else>          
            <el-card v-for="item in followers" :key="item.id">
                <template #header>
                <div class="flex justify-between items-center">
                    <div>
                    <el-avatar :size="50" class="inline-block align-middle" :src="item.headImage" fit="cover"  />
                    <span class="text-xl font-semibold inline-block align-middle mx-2">{{item.username}}</span>
                    </div>
                    <el-button type="primary" :icon="View" @click="router.push(`/blog?id=${item.id}`)"></el-button>
                </div>
                </template>
                <div class="font-semibold flex justify-between items-center">
                    最新博客
                    <el-button type="primary" @click="cancel(item.id)">取消关注</el-button>
                </div>
                <div class="mt-2 ml-2 flex border-t-2 border-slate-300" v-for="i in item.userArticles" :key="i.id">
                    <div class="cursor-pointer hover:bg-blue-200 text-lg font-semibold w-3/4 text-ellipsis overflow-hidden whitespace-nowrap h-10 leading-[40px]" @click="router.push(`/display?id=${i.id}`)">{{ i.title }}</div>
                    <div class="w-1/4 overflow-hidden whitespace-nowrap text-sm leading-[40px]">{{interval(i.time)}}</div>
                </div>
            </el-card>
            
        </div>
    </div>
</template>
<script setup>
import {View} from '@element-plus/icons-vue'
import {interval} from '#/util/interval'
const store=useStore()
const router=useRouter()
const route=useRoute()
const id=computed(()=>route.query.id)
store.getAllFollowees(id.value)
const cancel=(i)=>{
    unfollow(i).then(res=>{
        ElMessage.success('取关成功')
        store.getAllFollowees(id.value?id.value:store.userId)
    })
}
const {followers}=storeToRefs(store)
</script>
<style lang="scss" scoped>
</style>