<template>
      <el-scrollbar height="100vh">
        <div class="flex flex-wrap w-full min-h-screen content-start bg-blue-200">
        <div class=" bg-blue-400  w-full">
            <el-menu  mode="horizontal" router :default-active="'/blog'" :ellipsis="false" class="h-16" background-color="#84a2d4" text-color="#bbc8e6" active-text-color="#bb5548">
                <el-menu-item >LOGO</el-menu-item>
                <div class="flex-1"></div>
                    <el-menu-item index="/blog">
                        <el-icon :size="50"><HomeFilled /></el-icon>主页
                    </el-menu-item>
                    <el-menu-item index="/community">
                        <el-icon :size="50"><Promotion /></el-icon>社区
                    </el-menu-item>
                    <el-menu-item index="/edit">
                        <el-icon><EditPen /></el-icon>创作
                    </el-menu-item>
                    <el-menu-item index="/more">
                        <el-icon :size="50"><MoreFilled /></el-icon>更多
                    </el-menu-item>
                    <el-avatar :size="50" class="my-auto mx-2" :src="info.headImage" fit="fill" />
                        <el-dropdown class="my-auto mr-6">
                            <span class="text-black font-semibold">
                                <span class="align-middle">{{info.name}}</span>
                                <el-icon :size="20" class="align-middle">
                                <arrow-down />
                                </el-icon>
                            </span>
                            <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>账号管理</el-dropdown-item>
                                <el-dropdown-item>登录注册</el-dropdown-item>
                                <el-dropdown-item>Action 3</el-dropdown-item>
                                <el-dropdown-item>Action 4</el-dropdown-item>
                            </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                   
            </el-menu>
        </div>
        <div class="w-1/4 flex flex-col items-end pr-4">
            <div class="flex flex-col items-center w-3/4  my-8 bg-gradient-to-br from-blue-500 via-blue-300 to-blue-500 rounded-lg border-solid border-2 border-opacity-80 shadow-xl">
            <el-avatar :size="130"  src="../src/assets/headImage.jpeg" fit="fill" class="m-10 mb-0"/>
            <div class="text-2xl mt-4 font-semibold">{{info.name}}</div>
            <div class="text-base text-gray-500 mt-2">{{info.introduce}}</div>
            <div class="flex w-60 mt-4 text-center text-gray-700">
                <div class="w-1/3">
                    <p class="text-lg">文章数</p>
                    <p class="text-gray-500">{{info.article}}</p>
                </div>
                <div class="w-1/3">
                    <p class="text-lg">话题数</p>
                    <p class="text-gray-500">{{info.topic}}</p>
                </div>
                <div class="w-1/3">
                    <p class="text-lg">粉丝数</p>
                    <p class="text-gray-500">{{info.fan}}</p>
                </div>
            </div>
            <el-divider></el-divider>
            <div class="my-4">
                <el-button size="large" type="primary">现在关注</el-button>
            </div>
            </div>
            <div class="w-3/4 button">
                <el-button class="w-full" :class="path=='/blog'?'active':''" @click="router.push('/blog')"><el-icon :size="18" class="mr-4"><HomeFilled /></el-icon>回到首页</el-button>
                <el-button class="w-full" :class="path=='/kind'?'active':''" @click="router.push('/kind')"><el-icon :size="18" class="mr-4"><Tickets /></el-icon>文章归档</el-button>
                <el-button class="w-full" :class="path=='/friend'?'active':''" @click="router.push('/friend')"><el-icon :size="18" class="mr-4"><PhoneFilled /></el-icon>呼唤友人</el-button>
                <el-button class="w-full" :class="path=='/board'?'active':''" @click="router.push('/board')"><el-icon :size="18" class="mr-4"><DataBoard /></el-icon>留言板</el-button>
            </div>
            <div class="w-3/4 min-h-200 mt-8 bg-white bg-opacity-80 shadow-lg rounded-md pt-2">
                <el-tag size="large" class="m-2 cursor-pointer" effect="dark" round>#Tag 1</el-tag>
                <el-tag size="large" class="m-2 cursor-pointer" effect="dark" round type="info">Tag 1</el-tag>
                <el-tag size="large" class="m-2 cursor-pointer" effect="dark" round type="warning">Tag 1</el-tag>
                <el-tag size="large" class="m-2 cursor-pointer" effect="dark" round type="success">Tag 1</el-tag>
                <el-tag size="large" class="m-2 cursor-pointer" effect="dark" round type="warning">Tag 2222</el-tag>
                <el-tag size="large" class="m-2 cursor-pointer" effect="dark" round type="success">Tag 1</el-tag>
                
            </div>
            <div class="w-3/4 min-h-200 my-8 bg-white bg-opacity-80 py-2 px-2 text-lg text-gray-600 shadow-lg rounded-md">
                <p class="font-semibold text-xl text-blue-400 mb-4">文章归类</p>
                <div class="my-4 cursor-pointer">技术<text class="float-right text-blue-600 border-2 rounded-full p-1 text-sm">{{99}}</text></div>
                <div class="my-4">技术<text class="float-right text-blue-600 border-2 rounded-full p-1 text-sm">{{99}}</text></div>
            </div> 
        </div>
        <div class="flex-1">
           <div class=" mx-auto my-8 bg-blue-200">
            <div class="w-full bg-white border-2 rounded-md">
                <router-view></router-view>
            </div>
               
           </div>
        </div>
        
        <div class="w-1/5 pt-8 text-xl font-semibold ">
            <div class="w-3/4 h-40 bg-slate-200 mx-auto leading-40 text-center">
               {{time||'...'}}
            </div>
        </div>
        <el-backtop :right="200" :bottom="100" />
    </div>
</el-scrollbar>
</template>

<script setup>
import {userInfo} from '../http/api'
import {useStore} from '../../stores/index'

const store=useStore()
const router=ref(useRouter())
const path=computed(()=>router.value.currentRoute.path)
const time=ref('')
let info=ref({
    article:'999',
    fan:'999',
    topic:'999',
    name:'默认昵称',
    introduce:'...',
    headImage:'../src/assets/headImage.jpeg',
})
userInfo({id:store.userId}).then(res=>{
        info.value=res.data
        console.log(info.value)
})
onMounted(()=>{
    setInterval(()=>{
        let date=new Date()
        time.value=date.getMonth()+'月'+date.getDate()+'日'+'  '+date.getHours()+'.'+date.getMinutes()+'.'+(date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds())
    },1000)
})

</script>

<style lang="scss" scoped>
  .el-menu-item{
    font-size:22px
  }
  .el-divider{
    margin: 1px 0;
  }
  .el-backtop{
    background-color: antiquewhite;
  }
  .button .el-button{
    height: 50px;
    background-color: transparent;
    font-size:18px;
    border-radius:10px ;
    margin:0;
    margin-top:10px;
    border: 0;
    transition: all .3s ease-in;
    &:hover{
        opacity: .7;
        background-color: #61c3d0;
        color: white;
    }
  }
  .active.el-button{
    box-shadow:  0px 2px 12px #008899;
    background-color:  #008899;
    opacity: .8;
    color:white;
  }

</style>