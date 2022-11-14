<template>
      <el-scrollbar height="100vh" ref="scroll" class="scroll">
        <div class="bg-water fixed w-full h-screen z-under" ></div>
        <div class="flex flex-wrap w-full min-h-screen content-start ">
        
        <div class="w-full fixed z-50">
            <el-menu  mode="horizontal" router :default-active="'/blog'" :ellipsis="false" class="h-12" background-color="rgba(7,21,58,.5)" style="backdrop-filter: blur(4px);--el-menu-hover-text-color:white;--el-menu-hover-bg-color:#ffffff1a" text-color="rgba(233,233,233,.6)">
                <el-menu-item >LOGO</el-menu-item>
                <div class="flex-1"></div>
                    <el-menu-item index="/blog">
                        <el-icon :size="40"><HomeFilled /></el-icon>主页
                    </el-menu-item>
                    <el-menu-item index="/community">
                        <el-icon :size="40"><Promotion /></el-icon>社区
                    </el-menu-item>
                    <el-menu-item index="/edit">
                        <el-icon><EditPen /></el-icon>创作
                    </el-menu-item>
                    <el-menu-item index="/more">
                        <el-icon :size="40"><MoreFilled /></el-icon>更多
                    </el-menu-item>
                    <el-avatar :size="40" class="my-auto mx-2" :src="info.headImage" fit="fill" />
                        <el-dropdown class="my-auto mr-6">
                            <span class="text-white font-semibold">
                                <span class="align-middle">{{info.username}}</span>
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
        <div class="w-full flex justify-center h-screen items-center">
            <div class="w-80">
                <p class="font-blod text-5xl text-center mb-4 text-transparent" style="background-clip: text;-webkit-background-clip: text;background-image:linear-gradient(60deg,#64b3f4 0%, #c2e59c 100%)">The Star</p>
                <el-input
                v-model="search"
                placeholder="输入你想搜索的文章名字"
                prefix-icon="Search"
                style="height:40px;--el-input-bg-color:#eef1f5"
                class="mb-2"
                @change="change()"
                >
                </el-input>
                <p class="font-blod text-lg text-center mb-4 text-white mt-4">开启你的去中心博客之旅</p>
            </div> 
        </div>
        <div class="w-1/4 flex flex-col items-end pr-4 bg-blue-200">
            <div class="flex flex-col items-center w-3/4  my-8 bg-gradient-to-br from-blue-500 via-blue-300 to-blue-500 rounded-lg border-solid border-2 border-opacity-80 shadow-xl relative">
            <el-avatar :size="130"  src="../public/headImage.jpeg" fit="fill" class="m-10 mb-0"/>
            <div class="text-2xl mt-4 font-semibold">{{info.username}}</div>
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
                <el-button class="w-full" :class="path=='/blog'?'active':''" @click="router.push('/blog');store.clear()"><el-icon :size="18" class="mr-4"><HomeFilled /></el-icon>回到首页</el-button>
                <el-button class="w-full" :class="path=='/kind'?'active':''" @click="router.push('/kind')"><el-icon :size="18" class="mr-4"><Tickets /></el-icon>文章归档</el-button>
                <el-button class="w-full" :class="path=='/friend'?'active':''" @click="router.push('/friend')"><el-icon :size="18" class="mr-4"><PhoneFilled /></el-icon>呼唤友人</el-button>
                <el-button class="w-full" :class="path=='/board'?'active':''" @click="router.push('/board')"><el-icon :size="18" class="mr-4"><DataBoard /></el-icon>留言板</el-button>
            </div>
            <div class="w-3/4 min-h-200 mt-8 bg-white bg-opacity-80 shadow-lg rounded-md pt-2">
                <el-tag size="large" class="m-2 cursor-pointer" effect="dark" round v-for="tag in store.tags" :key="tag" @click="store.currentTag=tag; store.getAll({})">{{'#'+tag}}</el-tag>
                
            </div>
            <div class="w-3/4 min-h-200 my-8 bg-white bg-opacity-80 py-2 text-lg text-gray-600 shadow-lg rounded-md">
                <p class="font-semibold text-xl text-blue-400 mb-4 ml-4">文章归类</p>
                <div class="my-4 cursor-pointer hover:bg-slate-200 flex justify-between items-center px-4"   v-for="item in store.type" :key="item.type" 
                @click="store.currentType=item.type;store.getAll({})">
                {{item.type}}
                <span class=" text-blue-600 border px-1 rounded content-center text-sm bg-blue-100">{{item.count}}</span>
                </div>
            </div> 
        </div>
        <div class="flex-1 bg-blue-200" >
           <div class=" mx-auto my-8 bg-blue-200">
            <div class="w-full">
                <router-view></router-view>
            </div>
               
           </div>
        </div>
        
        <div class="w-1/5 pt-8 text-xl font-semibold bg-blue-200">
            <div class="w-3/4 h-40 mx-auto leading-40 text-center" style="background-image:linear-gradient(120deg,#a1c4fd 0%, #c2e9fb 100%)">
               {{time||'...'}}
            </div>
           
        </div>
        
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
    username:'默认昵称',
    introduce:'...',
    headImage:'../public/headImage.jpeg',
    ipfs:""
})
userInfo().then(res=>{
        info.value=res.data.user
})
onMounted(()=>{
    setInterval(()=>{
        let date=new Date()
        time.value=date.getMonth()+'月'+date.getDate()+'日'+'  '+date.getHours()+'.'+date.getMinutes()+'.'+(date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds())
    },1000)
})
const search=ref()

store.getAll({})
store.getAllType()
const scroll=ref()
function change(){
    scroll.value.scrollTo({top:window.innerHeight,left:0,behavior:'smooth' })
    store.getAll({search:search.value})
}
</script>

<style lang="scss" scoped>
  .el-menu-item{
    font-size:20px
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