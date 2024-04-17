<template>
    <div class="m-2 text-slate-500">关注列表</div>
    <div class="m-2 relative h-[40vh]">
        <el-table :data="tableData2" class="w-full !absolute" max-height="80vh">
            <el-table-column prop="headImage" label="头像" width="100">
                <template v-slot="scope">
                    <el-avatar :src="scope.row.headImage" />
                </template>
            </el-table-column>
            <el-table-column prop="username" label="名称" width="180" />
            <el-table-column prop="introduce" label="介绍" min-width="100"></el-table-column>
            <el-table-column prop="ipfs" label="ipfs地址" />
            <el-table-column fixed="right" label="Operations" width="240">
                <template v-slot="scope">
                    <el-button type="primary" @click="router.push(`/blog?id=${scope.row.id}`)">查看</el-button>
                    <el-button type="danger" @click="deleteItem(scope.row.id)">取关</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="m-2 text-slate-500">粉丝列表</div>
    <div class="m-2 relative h-[40vh]">
        <el-table :data="tableData" class="w-full !absolute" max-height="80vh">
            <el-table-column prop="headImage" label="头像" width="100">
                <template v-slot="scope">
                    <el-avatar :src="scope.row.headImage" />
                </template>
            </el-table-column>
            <el-table-column prop="username" label="名称" width="180" />
            <el-table-column prop="introduce" label="介绍" min-width="100"></el-table-column>
            <el-table-column prop="ipfs" label="ipfs地址" />
            <el-table-column fixed="right" label="Operations" width="240">
                <template v-slot="scope">
                    <el-button type="primary" @click="router.push(`/blog?id=${scope.row.id}`)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { getAllFollowers, getAllFollowees,unfollow } from '@/http/api.js'
import { useRouter } from 'vue-router';
const tableData = ref([])
const tableData2 = ref([])
const router = useRouter()
const store = useStore()
const getTableData = async () => {
    const res = await getAllFollowers(store.userId)
    tableData.value = res.data
    const res2 = await getAllFollowees(store.userId)
    tableData2.value = res2.data
}
const deleteItem = async (id) => {
    unfollow(id).then(res => {
        if (res.code == 200) {
            ElMessage.success('取关成功')
            getTableData()
        }

    })
}
getTableData()
</script>

<style lang="scss" scoped></style>