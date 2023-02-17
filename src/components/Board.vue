<template>
    <h1 class="text-center my-4 font-bold text-xl text-blue-500">留言板</h1>
    <el-card class="m-4" v-for="m in messages">
        <template #header>
            <div class="flex justify-between items-center">
                    <el-avatar :size="40" class="inline-block align-middle" :src="m.user.headImage"
                        fit="cover" />
                    <span class="text-xl  inline-block align-middle mx-2">{{m.user.username}}</span>
                <el-button :icon="Operation"></el-button>
            </div>
        </template>
        <div class="p-2 font-semibold">{{m.message}}</div>
    </el-card>
    <el-pagination
        v-model:currentPage="currentPage"
        layout="prev, pager, next, jumper"
        :total="total"
        :page-size="5"
        @current-change="getMessage()"
        class="justify-center"
        />
    <!-- <div class="px-4 mt-4">
        <el-input  v-model="textarea" :autosize="{ minRows: 4, maxRows: 4 }" type="textarea" placeholder="留下你的评论"></el-input>
        <el-button type="primary" class="float-right mt-2" @click="send">提交</el-button>
    </div> -->
    
</template>
<script setup>
import { Operation } from '@element-plus/icons-vue';
const store=useStore()
const total=ref(1)
const currentPage=ref(1)
const textarea=ref('')
const messages=ref([])
getMessage().then(res=>messages.value=res.data.message)
function send(){
    sendMessage({message:textarea.value,uid:store.userId}).then(res=>{if(res.code==200)ElMessage.success('提交成功')})
    getMessage().then(res=>messages.value=res.data.message)
}
</script>
<style>

</style>