<template>
    <div class="w-full flex flex-col items-center p-2 pt-0">
        <div
            class="flex flex-col items-center w-full bg-gradient-to-br from-blue-500 via-blue-300 to-blue-500 rounded-lg border-solid border-2 border-opacity-80 shadow-xl relative">
            <el-avatar :size="130" src="../public/headImage.jpeg" fit="fill" class="m-10 mb-0" />
            <div class="text-2xl mt-4 font-semibold">{{isPerson.username}}</div>
            <div class="text-base text-gray-500 mt-2">{{isPerson.introduce}}</div>
            <div class="flex w-60 mt-4 text-center text-gray-700 justify-evenly">
                <div>
                    <p class="text-lg">文章数</p>
                    <p class="text-gray-500">{{isPerson.article}}</p>
                </div>
                <div>
                    <p class="text-lg">粉丝数</p>
                    <p class="text-gray-500">{{isPerson.fan}}</p>
                </div>
            </div>
            <el-divider></el-divider>
            <div class="my-4">
                <el-button size="large" type="primary" @click="followOne" :disabled="!id||id==store.userId">{{isFollow?'取消关注':'现在关注'}}</el-button>
            </div>
        </div>
        <div class="w-full button">
            <el-button class="w-full" :class="path=='/blog'?'active':''"
                @click="router.push(id?`/blog?id=${id}`:'/blog');store.clear(id)"><el-icon :size="18" class="mr-4">
                    <HomeFilled />
                </el-icon>回到首页</el-button>
            <el-button class="w-full" :class="path=='/blog/kind'?'active':''" @click="router.push(id?`/blog/kind?id=${id}`:'/blog/kind')"><el-icon
                    :size="18" class="mr-4">
                    <Tickets />
                </el-icon>文章归档</el-button>
            <el-button class="w-full" :class="path=='/blog/friend'?'active':''" @click="router.push(id?`/blog/friend?id=${id}`:'/blog/friend')"><el-icon
                    :size="18" class="mr-4">
                    <PhoneFilled />
                </el-icon>关注列表</el-button>
            <el-button class="w-full" :class="path=='/blog/board'?'active':''" @click="router.push(id?`/blog/board?id=${id}`:'/blog/board')"><el-icon
                    :size="18" class="mr-4">
                    <DataBoard />
                </el-icon>留言板</el-button>
        </div>
        <div class="w-full min-h-200 mt-8 bg-white/80 shadow-lg rounded-md pt-2 ">
            <el-check-tag size="large" class="m-2 cursor-pointer min-w-[65px] text-center" effect="plain" v-for="tag in tags" :key="tag" :checked="store.currentTag==tag"
                @change="currentTag=currentTag!=tag?tag:''" :style="tagStyles[tag]" >{{'#'+tag}}</el-check-tag>
        </div>
        <div class="w-full min-h-200 my-8 bg-white/80 bg-opacity-80 p-4 text-lg text-gray-600 shadow-lg rounded-md overflow-auto">
            <p class="font-semibold text-xl text-blue-400 mb-4 ml-4">文章归类</p>
            <div class="my-4 cursor-pointer hover:bg-slate-200 flex justify-between items-center px-4" :class="currentType==item.type?'bg-slate-300':''"
                v-for="item in store.type" :key="item.type" @click="currentType=currentType!=item.type?item.type:''">
                {{item.type}}
                <span
                    class=" text-blue-600 border px-1 rounded content-center text-sm bg-blue-100">{{item.count}}</span>
            </div>
        </div>
    </div>

</template>

<script setup>

const store=useStore()
const route=useRoute()
const router=ref(useRouter())
const path=computed(()=>router.value.currentRoute.path)
let {otherinfo,info,currentTag,currentType,tags}=storeToRefs(store)

watch([currentTag,currentType],()=>{
    store.getArticle({id:id.value})
})

const followOne=()=>{
    if(!isFollow.value)
    follow(id.value).then(res=>{
        if(res.code==200){
        ElMessage.success('关注成功')
        store.getAllFollowees()
        isPerson.value.fan++
        } 
    })
    else
    unfollow(id.value).then(res=>{
        if(res.code==200){
        ElMessage.success('取关成功')
        store.getAllFollowees()
        if(isPerson.value.fan>0)
        isPerson.value.fan--
        }
        
    })
}
const id=computed(()=>route.query.id)
const isFollow=computed(()=>store.followers.findIndex(i=>i.id==id.value)!=-1)
const isPerson=computed(()=>id.value?otherinfo.value:info.value)
const tagStyles = computed(() => {
      return [...tags.value].reduce((acc, tag) => {
        acc[tag] = randomBackgroundColor()
        return acc
      }, {})
    })
const randomBackgroundColor =() => {
      // 生成随机的 RGB 颜色
      const red = Math.floor(Math.random() * 156) + 100
      const green = Math.floor(Math.random() * 156) + 100
      const blue = Math.floor(Math.random() * 156) + 100
    return {  
        backgroundColor: `rgb(${red}, ${green}, ${blue})`,
        borderRadius: '5px',
        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
        padding: '10px',
        color:'white',
        display: 'inline-block',
        filter:'contrast(80%) brightness(.8) opacity(.8)',
    }
    }
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
  .el-check-tag.is-checked{
    filter: contrast(1) brightness(1) !important;
  }
  .el-check-tag:hover{
    filter: contrast(1) brightness(1) !important;
  }
</style>