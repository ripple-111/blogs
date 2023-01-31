<template>
        <el-drawer
            v-model="pageStore.drawer"
            title="个人中心"
            direction="ltr"
            size="30%"
            >
            <div class="text-center text-2xl h-16 leading-16 ">
            <el-avatar :size="64"  src="../public/headImage.jpeg" fit="fill" class="align-middle"/>
            <span class=" ml-4">Hi, 你好!</span>
            </div>
            <el-card class="mt-10">
                <div class="mb-4 leading-6">我是<span class="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">{{ info.username }}</span>
                    <ChangeButton text="更改名称" place="名称" type="username" class="float-right" :length="[3,12]" @confirm="setUserInfo"/>
                </div>
                <div class="mb-4">
                    <p>自我介绍：</p>
                    <p class="m-2 mr-0 text-gray-500">{{ info.introduce }}<ChangeButton text="更改介绍" place="自我介绍" class="float-right" :length="[1,100]" type="introduce" @confirm="setUserInfo"/></p>                  
                </div>
                <div class="mb-4">
                    <p>IPFS地址：</p>
                    <p class="break-words">{{info.ipfs}}</p>
                </div>
                <ChangeButton text="修改密码" place="密码" :length="[6,12]" type="password" class="float-right" @confirm="setUserInfo"/>
            </el-card>
        </el-drawer>
</template>

<script setup>
import { useRouter } from 'vue-router';
import ChangeButton from './ChangeButton.vue';
const pageStore=usePageStore()
const store=useStore()
const router=useRouter()
let {info}=storeToRefs(store)
const setUserInfo=(type,value,pas)=>{  
    changeUserInfo({[type]:value,pas}).then(res=>{
        if(res.msg=='修改成功'){
        ElMessage.success(res.msg)
        if(type=='password'){
            localStorage.removeItem('token')
            router.replace('/login')
        }
        }
        else
        ElMessage.error(res.msg)
        store.userInfo()
        
    })
}
</script>
<style lang="scss" scoped>

</style>