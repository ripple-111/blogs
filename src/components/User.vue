<template>
    <div class="w-full flex flex-col items-center p-2 pt-0">
        <div
            class="flex flex-col items-center w-full bg-gradient-to-br from-blue-500 via-blue-300 to-blue-500 rounded-lg border-solid border-2 border-opacity-80 shadow-xl relative">
            <el-avatar :size="130" src="../public/headImage.jpeg" fit="fill" class="m-10 mb-0" />
            <div class="text-2xl mt-4 font-semibold">{{info.username}}</div>
            <div class="text-base text-gray-500 mt-2">{{info.introduce}}</div>
            <div class="flex w-60 mt-4 text-center text-gray-700 justify-evenly">
                <div>
                    <p class="text-lg">文章数</p>
                    <p class="text-gray-500">{{info.article}}</p>
                </div>
                <!-- <div class="w-1/3">
                    <p class="text-lg">话题数</p>
                    <p class="text-gray-500">{{info.topic}}</p>
                </div> -->
                <div>
                    <p class="text-lg">粉丝数</p>
                    <p class="text-gray-500">{{info.fan}}</p>
                </div>
            </div>
            <el-divider></el-divider>
            <div class="my-4">
                <el-button size="large" type="primary">现在关注</el-button>
            </div>
        </div>
        <div class="w-full button">
            <el-button class="w-full" :class="path=='/mine'?'active':''"
                @click="router.push('/mine');store.clear()"><el-icon :size="18" class="mr-4">
                    <HomeFilled />
                </el-icon>回到首页</el-button>
            <el-button class="w-full" :class="path=='/kind'?'active':''" @click="router.push('/kind')"><el-icon
                    :size="18" class="mr-4">
                    <Tickets />
                </el-icon>文章归档</el-button>
            <el-button class="w-full" :class="path=='/friend'?'active':''" @click="router.push('/friend')"><el-icon
                    :size="18" class="mr-4">
                    <PhoneFilled />
                </el-icon>呼唤友人</el-button>
            <el-button class="w-full" :class="path=='/board'?'active':''" @click="router.push('/board')"><el-icon
                    :size="18" class="mr-4">
                    <DataBoard />
                </el-icon>留言板</el-button>
        </div>
        <div class="w-full min-h-200 mt-8 bg-white bg-opacity-80 shadow-lg rounded-md pt-2">
            <el-tag size="large" class="m-2 cursor-pointer" effect="dark" round v-for="tag in store.tags" :key="tag"
                @click="store.currentTag=tag; store.getArticle({})">{{'#'+tag}}</el-tag>

        </div>
        <div class="w-full min-h-200 my-8 bg-white bg-opacity-80 p-4 text-lg text-gray-600 shadow-lg rounded-md">
            <p class="font-semibold text-xl text-blue-400 mb-4 ml-4">文章归类</p>
            <div class="my-4 cursor-pointer hover:bg-slate-200 flex justify-between items-center px-4"
                v-for="item in store.type" :key="item.type" @click="store.currentType=item.type;store.getArticle({})">
                {{item.type}}
                <span
                    class=" text-blue-600 border px-1 rounded content-center text-sm bg-blue-100">{{item.count}}</span>
            </div>
        </div>
    </div>

</template>

<script setup>
const store=useStore()
const router=ref(useRouter())
const path=computed(()=>router.value.currentRoute.path)

let {info}=storeToRefs(store)
</script>
<style lang="scss" scoped>
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