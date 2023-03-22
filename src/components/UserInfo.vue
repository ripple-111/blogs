<template>
        <el-drawer
            v-model="pageStore.drawer"
            title="个人中心"
            direction="ltr"
            size="30%"
            >
            <div class="text-center text-2xl  mb-2">
            <el-tooltip
                effect="dark"
                content="点击头像更换上传你的新头像"
                placement="top"
            >
            <el-upload
                :action='`http://127.0.0.1:3000/uploadHead?${store.userId}`'
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
            >
            <el-avatar :size="64"  :src="info.headImage||imageUrl" fit="fill" class="hover:animate-shake"/>
            </el-upload>
            </el-tooltip>
            <div class="my-2">Hi, 你好!</div>
            </div>
            <el-card class="mt-4">
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
import { ElMessage } from 'element-plus';
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
const imageUrl=ref('')
const handleAvatarSuccess = (
  response,
  uploadFile
) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw)
    ElMessage.success('上传成功')
}

const beforeAvatarUpload= (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('头像格式必须为jpg')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像的大小不能超过2MB')
    return false
  }
  return true
}

</script>
<style lang="scss" scoped>

</style>