<template>
    <div class="m-2 relative h-[85vh]">
        <el-table :data="tableData" class="w-full !absolute" max-height="80vh">
            <el-table-column prop="title" label="文章名" width="180" />
            <el-table-column prop="expla" label="简介" min-width="180" />
            <el-table-column prop="time" label="发表时间" min-width="100" :formatter="format"></el-table-column>
            <el-table-column prop="type" label="博客类型" />
            <el-table-column prop="watch" label="浏览量" />
            <el-table-column prop="good" label="点赞量" :formatter="goodFormat"/>
            <el-table-column fixed="right" label="Operations" width="240">
                <template v-slot="scope">
                    <el-button  type="primary" @click="router.push({ path: '/display', query: { id:scope.row.id } })">查看</el-button>
                    <el-button  type="warning" @click="router.push({ path: '/edit', query: { id: scope.row.id } })">编辑</el-button>
                    <el-button  type="danger" @click="deleteItem(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="currentPage" :page-size="10" :background="true"
            layout="total, prev, pager, next" :total="total" class="right-1 absolute bottom-[-1px]"  @current-change="getTableData" />
    </div>
</template>

<script setup>
import { getArticle,deleteBlog } from '@/http/api.js'
import { timeFormat } from '../../../util/time'
import { useRouter} from 'vue-router';
const tableData = ref([])
const currentPage = ref(1)
const router = useRouter()
const total = ref(100)
const format = (row,col) =>{
    return timeFormat(row.time)
}
const goodFormat = (row) =>{
    return row.good ? JSON.parse(row.good).length : 0
}
const getTableData = async () =>{
    const res = await getArticle({pageSize:10,currentPage:currentPage.value})
    console.log(res)
    total.value = res.data.count
    tableData.value = res.data.rows
}
const deleteItem = async (id) =>{
    const res=await deleteBlog({ id:id })
    if(res.data==1)
    ElMessage.success('删除成功')
    currentPage.value = 1
    getTableData()
}
getTableData()
</script>

<style lang="scss" scoped></style>