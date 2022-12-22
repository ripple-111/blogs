<template>
      <el-scrollbar height="100vh" ref="scroll" class="scroll">
        <div class="bg-water fixed w-full h-screen z-underer" ></div>
        
        <div class="flex flex-wrap w-full min-h-screen content-start">
        <NavBar/>
        <div class="w-full flex justify-center h-screen items-center relative">
            <div class="w-80">
                <p class="font-blod text-5xl text-center mb-4 text-transparent" style="background-clip: text;-webkit-background-clip: text;background-image:linear-gradient(60deg,#64b3f4 0%, #c2e59c 100%)">The Star</p>
                <el-input
                v-model="search"
                placeholder="输入你想搜索的文章名字"
                prefix-icon="Search"
                style="height:40px;--el-input-bg-color:#eef1f5"
                class="mb-2"
                @input="(search)=>store.getArticle({search})"
                @change="scrollTo()"
                >
                </el-input>
                <p class="font-blod text-lg text-center mb-4 text-white mt-4">开启你的去中心博客之旅</p>
            </div> 
            <div class="absolute right-40 bottom-20 rounded-full bg-white" style="height:30px" @click="scrollTo()">
            <el-icon :size="30" color="#409EFC"><CaretBottom /></el-icon>
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
              
            </div>
        </div>
        
    </div>
</el-scrollbar>
        <el-drawer
            v-model="pageStore.drawer"
            title="个人中心"
            direction="ltr"
            size="30%"
            >
            <span>Hi, there!</span>
            <el-card class="mt-10">
                <div class="mb-4">{{'个人介绍：'+info.introduce}}</div>
                <div class="mb-4">{{'个人介绍：'+info.introduce}}</div>
            </el-card>
        </el-drawer>
</template>

<script setup>
import {useStore} from '../../stores/user'
import {usePageStore} from '../../stores/page'
import NavBar from '../components/TopNavBar.vue';
const store=useStore()
const router=ref(useRouter())
const path=computed(()=>router.value.currentRoute.path)
const pageStore=usePageStore()
let {info}=storeToRefs(store)
const search=ref()
store.userInfo()
store.getArticle({})
store.getType()
const scroll=ref()
function scrollTo(){ //滚动一个窗口
    scroll.value.scrollTo({top:window.innerHeight,left:0,behavior:'smooth' })
}
</script>

<style lang="scss" scoped>
  .el-menu-item{
    font-size:20px
  }
  .el-divider{
    margin: 1px 0;
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