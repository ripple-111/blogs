<template>
    <div class="flex justify-between sticky top-0 w-full items-center z-50 contain"  style="-webkit-app-region:drag">
        <div class="flex items-center">
            <div class="bg-red-500 ball"></div>
            <div class="bg-yellow-500 ball"></div>
            <div class="bg-green-500 ball"></div>
        </div>
        <div class="absolute left-1/2 font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-slate-500">
            群星
        </div>
        <div class="flex items-center">
            <div @click="min" class="button">
                <el-icon><SemiSelect /></el-icon>
            </div>
            <div @click="fullScreen" class="button">
                <el-icon><FullScreen /></el-icon>
            </div>
            <div @click="close" class="button">
                <el-icon><CloseBold /></el-icon>
            </div>
        </div>
    </div>
</template>

<script setup>
const { ipcRenderer } = require('electron')
const min = ()=>{
    ipcRenderer.send('min')
}
const close = ()=>{
    ipcRenderer.send('close')
}
const fullScreen = ()=>{
    ipcRenderer.send('fullScreen')
}
</script>
<style lang="scss" scoped>

    .ball {
        @apply rounded-full h-5 w-5 animate-bounce m-2
    }
    .button{
        @apply m-2 hover:bg-slate-200 h-full;
        -webkit-app-region:no-drag
    }
    .contain{
        width: 100vw;
        height: 40px;
        background: linear-gradient(-45deg, #7bb9d6, #7592cf, #8dcaee, #baddcf);
        animation: gradientBG 10s ease infinite;
        background-size:200% 200%;
    }
    /* 动画，控制背景 background-position */
    @keyframes gradientBG {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
</style>