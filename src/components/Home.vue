<template>
    <div class="flex flex-wrap" >
    <div class="w-1/6 bg-gray-900"></div>
    <div class="h-full w-full flex-1 bg-star bg-local bg-center bg-no-repeat bg-cover  min-h-screen">
        <TopMenu />
        <h1 class="absolute text-3xl text-white top-2/3 font-semibold leading-loose tracking-title select-none animate-rotate p-5 text-right bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-yellow-500">
            <el-icon color="rgba(213, 165, 22, 0.797)" class="animate-bounce">
                <Moon />
            </el-icon>
            扮成土星的月亮 :）<br/>
            <span class="text-base ">--2022年8月30日</span>
        </h1>
        <canvas id="canvas" class="h-screen w-full fixed -top-1/4 left-0 pointer-events-none" ></canvas>
        <div class="h-screen"></div>
        <div class="h-screen relative">
            <div class="absolute top-16 p-5">
                <h2 class="text-2xl text-white text-opacity-60 tracking-wider after:block after:h-1 after:mt-4 after:animate-ripple font-semibold ">
                    你好， 这里是
                    <span class="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">ripple</span>
                    的个人网页博客!
                </h2>
                <p class="italic text-base text-white mt-8">那么你的博客是用来干嘛的呢？<span>（观众友情提问）</span></p>
                <div class="text-base mt-5 text-white text-opacity-60 tracking-widest">
                    <span class="bg-red-400 h-4 w-4 inline-block rounded-full mr-1 animate-bounce"></span>
                    <span class="bg-yellow-400 h-4 w-4 inline-block rounded-full mr-1 animate-bounce"></span>
                    <span class="bg-green-400 h-4 w-4 inline-block rounded-full mr-1 animate-bounce"></span>
                    <p class="mt-5">根据大爆炸理论，地球上所看到来自其它宇宙星系的光,都经历了无数光年的距离,
                    跨越了时间才来到地球迎来你眼里的一瞬间,<br/>所以为了记录那些过去时间的光芒,才有了这个博客记录我大学期间的学习与生活</p>
                </div>
                <div class="text-base text-white tracking-wider font-semibold mt-16 flex flex-wrap justify-evenly">
                    <h2 class="text-2xl w-full  mb-20 after:block after:h-1 after:mt-4 after:bg-blue-500 after:w-6">project Center</h2>
                    <div class="w-1/4 h-16 leading-16 relative text-center hover:animate-shake hover:opacity-100 hover:-translate-y-2 group cursor-pointer">
                        <div class="bg-red-500 h-px absolute z-0 bg-opacity-50 bottom-0 w-full group-hover:h-full transition-all duration-100 group-hover:bg-opacity-80 group-hover:rounded" ></div>
                        <div class="z-10 relative">car search</div>
                    </div>
                    <div class="w-1/4 h-16 leading-16 relative text-center hover:animate-shake hover:opacity-100 hover:-translate-y-2 group cursor-pointer">
                        <div class="bg-yellow-500 h-px absolute z-0 bg-opacity-50 bottom-0 w-full group-hover:h-full transition-all duration-100 group-hover:bg-opacity-80 group-hover:rounded" ></div>
                        <div class="z-10 relative">low code</div>
                    </div>
                    <div class="w-1/4 h-16 leading-16 relative text-center hover:animate-shake hover:opacity-100 hover:-translate-y-2 group cursor-pointer">
                        <div class="bg-green-500 h-px absolute z-0 bg-opacity-50 bottom-0 w-full group-hover:h-full transition-all duration-100 group-hover:bg-opacity-80 group-hover:rounded" ></div>
                        <div class="z-10 relative">开发中...</div>
                    </div>
                </div>
              
            </div>
        </div>
    </div>
    <div class="w-1/6 bg-gray-900 relative">
        
        <div class="text-4xl text-white fixed top-3/4 w-1/6 flex  justify-evenly items-center flex-wrap">
        <div class="text-2xl text-gray-300 w-full text-center italic animate-bounce">scroll</div>
        <el-icon @click="scrollTop"><ArrowUp /></el-icon>
        <el-icon @click="scrollBottom"><ArrowDown /></el-icon>
        </div>
    </div>
    <div class="h-20 text-gray-500 text-base text-center bg-gray-900  bottom-0 w-full leading-loose">
        <h3 class="font-bold">记录似流星的时年</h3>
        <h3 class="text-xs">Made By Ripple <span class="italic text-blue-200 cursor-pointer underline" @click="sendEmail">1615641126@qq.com</span></h3>
    </div>
</div>
</template>

<script setup>
    import init from '../assets/star'
    onMounted(()=>{
        init(document.getElementById('canvas')) //启动流星动画
    })
    function scrollBottom(e){
        window.scroll({top:window.innerHeight,left:0,behavior:'smooth' }); //向下滚动
    }
    function scrollTop(e){
        window.scroll({top:-window.innerHeight,left:0,behavior:'smooth' }); //向上滚动
    }
    function sendEmail(){
        window.open('https://mail.qq.com/')
    }
</script>

<style>
</style>