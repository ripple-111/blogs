<template>
    <div class="animate-bg from-green-300 to-blue-300  bg-gradient-to-br bg-400%">
    <div class=" w-3/4 h-screen  flex m-auto items-center justify-center" >
        <transition name="login">
            <div class="w-1/3 h-3/4 bg-blue-400 flex flex-col items-center shadow-lg shadow-blue-300 bg-opacity-70 " v-show="!islogin">
                <p class="text-center leading-loose text-2xl mt-16 text-gray-50">Welcome to join The stars</p>
                <div class="mt-10 w-3/4">
                    <el-form :model="user" :rules="rule" show-message scroll-to-error ref="form">
                        <el-form-item prop="username"><el-input placeholder="请输入账号" type="text" class="my-1 h-10" v-model="user.username" autofocus="true" :prefix-icon="UserFilled">
                        </el-input></el-form-item>
                        <el-form-item prop="password"><el-input placeholder="请输入密码" class="my-1 h-10" showPassword v-model="user.password" :prefix-icon="Lock">
                        </el-input></el-form-item>
                        <el-form-item prop="password2"><el-input placeholder="请确认密码" class="my-1 h-10" showPassword v-model="user.password2" :prefix-icon="Lock"></el-input></el-form-item>     
                    </el-form>
                </div>
                <p class=" text-blue-500 font-semibold underline pr-2 overflow-hidden text-sm w-3/4 text-right">忘记密码</p>
                <el-button class="w-3/5 mt-4" type="primary" @click="onRegister(form)" :loading="loading">注册</el-button>
                <p class="text-slate-700 text-sm my-3 mt-10">——寄语——</p>
                <p class="text-base text-gray-600 font-semibold">
                    欢迎加入群星,记载下你的光辉时光,照亮其他人...
                </p>
                <p class="mt-6">已有账号？直接<span class="text-blue-500 font-semibold cursor-pointer" @click="islogin=!islogin;form.resetFields()">登录</span></p>
            </div> 
        </transition>
        <div class="flex-1 h-70 bg-starRiver bg-100%  border-y-2 border-gray-300 border-double relative "> </div> 
        <transition name="login">
            <div class="w-1/3 h-3/4 bg-blue-400 flex flex-col items-center shadow-lg shadow-blue-300 bg-opacity-70" v-show="islogin">
                <p class="text-center leading-loose text-xl mt-32">Welcome to The stars</p>
                <div class="mt-4 w-3/4">

                    <el-input placeholder="请输入账号" class="my-2 h-10" v-model="user.username" required></el-input>
                    <el-input placeholder="请输入密码" class="my-2 h-10" showPassword v-model="user.password" required></el-input>
                </div>
                <p class=" text-blue-500 font-semibold underline pr-2 overflow-hidden text-sm w-3/4 text-right cursor-pointer">忘记密码</p>
                <el-button class="w-3/5 mt-6" type="primary" @click="onLogin" :loading="loading">登录</el-button>
                <p class="text-slate-700 text-sm mt-6">——其他方式登录——</p>
                <div class="my-6">
                    <span class="iconfont icon-QQ rounded-full bg-blue-700 p-2 text-2xl mx-2 cursor-pointer"></span>
                    <span class="iconfont icon-weixing rounded-full bg-blue-700 p-2 text-2xl mx-2 cursor-pointer"></span>
                </div>
                <p class="mt-2">没有账号？立即<span class="text-blue-600 cursor-pointer font-semibold" @click="islogin=!islogin;form.resetFields()">注册</span></p>
            </div>
       
        </transition>
    </div>
    </div>
</template>

<script setup>
import {UserFilled,Lock} from '@element-plus/icons-vue'
import {register,login} from '../http/api'
import {useStore} from '../../stores/index'
const store=useStore()
const islogin=ref(true)
const loading=ref(false)
const form=ref()
const router=useRouter()
const user = reactive({
    username: '',
    password: '',
    password2: ''
})
const checkPas=(rule,value,callback)=>{
    if(value==='')
    callback(new Error('请确认密码'))
    else{
        if(value !== user.password)
        callback('两次密码不一致')
        else
        callback()
    }
}
const rule = reactive({
  username: [{ required:true, message:'请输入用户名',trigger: 'blur' },{min:3,max:12,message:'用户名长度需要在3-12之间',trigger:'blur'}],
  password: [{ required:true, message:'请输入密码',trigger: 'blur' },{min:6,max:12,message:'密码长度需要在6-12之间',trigger:'blur'}],
  password2: [{ validator: checkPas, trigger: 'blur' }],
})
const onRegister=(form)=>{
    form.validate((valid)=>{
        if(valid){
            let {username,password}=user
            loading.value=true
            register({username,password}).then(res=>{
                loading.value=false
                islogin.value=true
                alert(res.msg)
            })
        }
    })
}
const onLogin=()=>{
    let {username,password}=user
    loading.value=true
    login({username,password}).then(res=>{
        loading.value=false
        alert(res.msg)
        console.log(res)
        if(res.msg=='登录成功'){
            localStorage.setItem('token',res.token)
            localStorage.setItem('userId',res.data)
            store.userId=res.data
            router.push('/blog')
        }
        
    })
}

</script>
<style lang="scss" scoped>

.login-enter-active{
    animation:loginEnter .5s ease-in
}
@keyframes loginEnter{
    0%{
        transform:rotateY(-90deg);

    }
    100%{
        transform:rotateY(0deg);
    }
}
</style>