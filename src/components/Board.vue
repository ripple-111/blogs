<template>
    <div class=" min-h-[80px] py-5 bg-slate-50/40">
        <h1 class="text-center font-bold text-2xl">留言板</h1>
        <el-card class="m-4" v-for="item in messages">
            <template #header>
                <div class="flex justify-between items-center">
                    <el-avatar :size="40" class="inline-block align-middle" :src="item.user.headImage" fit="cover" />
                    <span class="text-xl  inline-block align-middle mx-2">{{ item.user.username }}</span>
                    <el-dropdown>
                    <el-button>
                    操作<el-icon class="el-icon--right"><arrow-down /></el-icon>
                    </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                        <el-dropdown-item @click="del(item)">删除</el-dropdown-item>
                        <el-dropdown-item>开发中.</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                    </el-dropdown>
                </div>
            </template>
            <div class="p-2 font-semibold">{{ item.message }}</div>
        </el-card>
    </div>
    <div class="mt-4">
        <el-input v-model="textarea" :autosize="{ minRows: 4, maxRows: 4 }" type="textarea" placeholder="留下你的评论"></el-input>
        <el-button type="primary" class="float-right mt-2" @click="send">提交</el-button>
    </div>
</template>
<script setup>
const store = useStore()
const route = useRoute()
const textarea = ref('')
const messages = ref([])
function getData() {
    if (route.query.id)
        getMessage(route.query.id).then(res => {
            messages.value = res.data
        })
    else
        getMessage(store.userId).then(res => {
            messages.value = res.data
        })
}
getData()
function send() {
    if(textarea.value)
    sendMessage({ message: textarea.value, uid: route.query.id?route.query.id:store.userId }).then(res => {
        if (res.code == 200)
            ElMessage.success('提交成功')
    })
    else
    ElMessage.warning('请输入内容')
    getData()
}
function del(item){
    delMessage({id:item.id}).then(res=>{
        if(res.code==200)
        ElMessage.success('删除成功')
    })
    getData()
}
</script>
<style></style>