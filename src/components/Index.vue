<template>
    <el-scrollbar height="100vh">
        <div class="w-screen min-h-screen bg-black">
            <div class="fixed top-0 left-32 w-full z-10 m-4">
                <el-menu :default-active="'/index'" mode="horizontal" background-color="transprant" text-color="gray"
                    active-text-color="white" router >
                    <el-menu-item index="/index">首页</el-menu-item>
                    <el-sub-menu index="/" >
                        <template #title>博客</template>
                        <el-menu-item index="/login">登录/注册</el-menu-item>
                        <el-menu-item index="2-2">。。。</el-menu-item>
                        <el-menu-item index="2-3">。。。</el-menu-item>
                    </el-sub-menu>
                    <el-menu-item index="4">开发日志</el-menu-item>
                </el-menu>
            </div>
            <div class="h-screen w-full relative">
                <!-- <video autoplay loop muted src='../assets/plant.mp4' poster="../assets/plant.png"
                    class="object-cover h-screen"></video> -->
                <div class="absolute bottom-10 left-32 text-white">
                    <h1 class="tracking-widest text-6xl leading-20 my-10">加入群星</h1>
                    <el-button plain id="button" class="text-xl text-white bg-transparent p-6 font-bold">Get Start</el-button>
                </div>
            </div>


        </div>
    </el-scrollbar>
</template>
<script setup>



</script>
<style lang="scss" scoped>
.el-menu--horizontal{
    border:none;
}
:deep(.el-sub-menu__title){
    font-size:16px!important;
    user-select:none;
}
:deep(.el-menu-item){
    font-size:16px!important;
    user-select:none;
}
:deep(.el-menu--popup-container){
    background-color:rgba(0,0,0,0.05)!important
}
.el-menu-item.is-active{
    background-color:rgba(0,0,0,0.05)!important;
}
.el-menu-item:hover,.el-sub-menu:hover{
    background-color:rgba(255 ,245 ,245 ,0.05)!important;
    color:white!important;
}
:deep(.el-sub-menu__title:hover){
    background-color:rgba(0,0,0,0.05)!important;
    color:white!important;
}
</style>