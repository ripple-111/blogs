<template>
    <div class="h-screen  flex  items-center justify-center bg-forest bg-center bg-100% overflow-hidden">
        <div class="w-3/4 flex  items-center justify-center md:h-3/4">
            <div class="self-start mr-2 shadow-base shadow-black cursor-pointer text-lg w-10 text-white hidden md:block">
                <div class="rounded-xl shadow-sm shadow-cyan-600 bg-cyan-500  py-4  leading-10 hover:bg-cyan-400 active:bg-cyan-700 transition-all duration-500"
                    style="writing-mode: vertical-lr;letter-spacing:5px" @click="islogin = true; form.resetFields()"
                    :class="islogin?'text-xl text-semibold bg-opacity-70':'bg-opacity-10'">登录</div>
                <div class="rounded-xl mt-2 shadow-sm shadow-cyan-600 bg-cyan-500  py-4  leading-10  hover:bg-cyan-400  active:bg-cyan-700 transition-all duration-500"
                    style="writing-mode: vertical-lr;letter-spacing:5px" @click="islogin = false; form.resetFields()"
                    :class="!islogin ? 'text-xl text-semibold bg-opacity-70' : 'bg-opacity-10'">注册</div>
            </div>

            <div class="min-w-300 w-5/12 h-full bg-white flex flex-col items-center shadow-xl shadow-black bg-opacity-10 rounded-lg animate__animated animate__bounceInDown "
                v-show="!islogin">
                <p class="text-center leading-loose text-2xl mt-16 text-blue-100">欢迎加入群星之旅</p>
                <div class="mt-10 w-3/4">
                    <el-form :model="user" :rules="rule" show-message scroll-to-error ref="form">
                        <el-form-item prop="username"><el-input placeholder="请输入账号" type="text" class="my-1 h-10"
                                v-model="user.username" autofocus="true" :prefix-icon="UserFilled">
                            </el-input></el-form-item>
                        <el-form-item prop="password"><el-input placeholder="请输入密码" class="my-1 h-10" showPassword
                                v-model="user.password" :prefix-icon="Lock">
                            </el-input></el-form-item>
                        <el-form-item prop="password2"><el-input placeholder="请确认密码" class="my-1 h-10" showPassword
                                v-model="user.password2" :prefix-icon="Lock"></el-input></el-form-item>
                    </el-form>
                </div>
                <p class=" text-blue-500 font-semibold underline pr-2 overflow-hidden cursor-pointer text-sm w-3/4 text-right hover:text-blue-200"
                    @click="dialogVisible = true">忘记密码</p>
                <el-button class="w-3/5 mt-4" type="primary" @click="onRegister(form)" :loading="loading">注册</el-button>
                <p class="text-slate-400 text-sm  mt-4 md:mt-10">——寄语——</p>
                <p class="text-base text-gray-400 font-semibold hover:shadow-md shadow-slate-100 hover:text-slate-200 overflow-hidden">
                    欢迎加入群星<span class="hidden lg:inline">,记载下你的光辉时光,照亮其他人...</span>
                </p>
                <p class="my-6 text-slate-400">已有账号？直接<span
                        class="text-blue-500 font-semibold cursor-pointer hover:text-blue-200"
                        @click="islogin = !islogin; form.resetFields()">登录</span></p>
            </div>

            <!-- <div class="flex-1 h-70 bg-starRiver bg-100%  border-y-2 border-gray-300 border-double relative "> </div>  -->

            <div class="min-w-300 w-5/12 h-full bg-white flex flex-col items-center shadow-xl shadow-black bg-opacity-10 rounded-lg animate__animated animate__bounceInUp"
                v-show="islogin">
                <p class="text-center leading-loose text-2xl mt-16 text-blue-100">进入群星之旅</p>
                <div class="mt-10 w-3/4">
                    <el-form :model="user" :rules="rule" show-message scroll-to-error ref="form">
                        <el-form-item prop="username">
                            <el-input placeholder="请输入账号" type="text" class="my-1 h-10" v-model="user.username"
                                autofocus="true" :prefix-icon="UserFilled">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input placeholder="请输入密码" class="my-1 h-10" showPassword v-model="user.password"
                                :prefix-icon="Lock">
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <p class=" text-blue-500 font-semibold underline pr-2 overflow-hidden text-sm float-right inline cursor-pointer hover:text-blue-200"
                    @click="dialogVisible = true">忘记密码</p>
                </div>
               
                <el-button class="w-3/5 mt-2" type="primary" @click="onLogin(form)" :loading="loading">登录</el-button>
                <p class="text-slate-400 text-sm mt-6">——其他方式登录——</p>
                <div class="my-6">
                    <span class="iconfont icon-QQ rounded-full bg-blue-700 p-2 text-2xl mx-2 cursor-pointer"></span>
                    <span
                        class="iconfont icon-weixing rounded-full bg-blue-700 p-2 text-2xl mx-2 cursor-pointer"></span>
                </div>
                <p class="my-4 text-slate-400">没有账号？立即<span
                        class="text-blue-600 cursor-pointer font-semibold hover:text-blue-200"
                        @click="islogin = !islogin; form.resetFields()">注册</span></p>
            </div>
            <el-dialog v-model="dialogVisible" title="Tips" width="30%">
                <el-form>

                </el-form>
                <template #footer>
                    <span>
                        <el-button @click="dialogVisible = false">Cancel</el-button>
                        <el-button type="primary" @click="dialogVisible = false">
                            Confirm
                        </el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script setup>
import { UserFilled, Lock } from '@element-plus/icons-vue'
import { register, login } from '../http/api'
import { ElMessage } from 'element-plus';

const store = useStore()
const islogin = ref(true)
const loading = ref(false)
const dialogVisible = ref(false)
const form = ref()
const router = useRouter()
const user = reactive({
    username: '',
    password: '',
    password2: ''
})
const checkPas = (rule, value, callback) => {
    if (value === '')
        callback(new Error('请确认密码'))
    else {
        if (value !== user.password)
            callback('两次密码不一致')
        else
            callback()
    }
}
const rule = reactive({
    username: [{ required: true, message: '请输入用户名', trigger: 'change' }, { min: 3, max: 12, message: '用户名长度需要在3-12之间', trigger: 'change' }],
    password: [{ required: true, message: '请输入密码', trigger: 'change' }, { min: 6, max: 12, message: '密码长度需要在6-12之间', trigger: 'change' }],
    password2: [{ validator: checkPas, trigger: 'blur' }],
})
const onRegister = (form) => {
    form.validate((valid) => {
        if (valid) {
            let { username, password } = user
            loading.value = true
            register({ username, password }).then(res => {
                if (res.msg == '注册成功')
                    loading.value = false
                islogin.value = true
                ElMessage.info(res.msg)
            }).catch(err => { loading.value = false })
        }
    })
}
const onLogin = (form) => {
    form.validate((valid) => {
        if (valid) {
            let { username, password } = user
            loading.value = true
            login({ username, password }).then(res => {
                loading.value = false
                ElMessage.success(res.msg)
                if (res.msg == '登录成功') {
                    localStorage.setItem('token', res.token)
                    localStorage.setItem('userId', res.data)
                    store.userId = res.data
                    router.push('/blog')
                }
            }).catch(err=>loading.value=false)
        }
    })

}

</script>
<style lang="scss" scoped>

</style>