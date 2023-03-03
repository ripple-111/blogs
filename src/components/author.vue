<template>

    <div class="p-2 px-4 bg-white my-4">
        <div class="m-2">
        <el-avatar :size="50"  :src="headImage||'https://picb.zhimg.com/v2-52ce0e6e9154a9f742a3a44dad3d3fd9_r.jpg?source=1940ef5c'" fit="fill"  class="align-middle"/>
        <span class="ml-6 text-lg font-semibold">{{username}}</span>
        </div>
        <div class="flex justify-center my-2">
        <el-button type="primary" class="w-1/2 relative mx-auto my-0 block"> 关注</el-button>
        </div>
        <el-divider></el-divider>
        <div class="font-normal text-sm">
        <p class="flex items-center leading-10">
            <svg data-v-bdf6e7fa="" data-v-71f2d09e="" class="mr-4" xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26"><g data-v-bdf6e7fa="" data-v-71f2d09e="" fill="none" fill-rule="evenodd" transform="translate(0 .57)"><ellipse data-v-bdf6e7fa="" data-v-71f2d09e="" cx="12.5" cy="12.57" fill="#E1EFFF" rx="12.5" ry="12.57"></ellipse><path data-v-bdf6e7fa="" data-v-71f2d09e="" fill="#7BB9FF" d="M8.596 11.238V19H7.033C6.463 19 6 18.465 6 17.807v-5.282c0-.685.483-1.287 1.033-1.287h1.563zm4.275-4.156A1.284 1.284 0 0 1 14.156 6c.885.016 1.412.722 1.595 1.07.334.638.343 1.687.114 2.361-.207.61-.687 1.412-.687 1.412h3.596c.38 0 .733.178.969.488.239.317.318.728.21 1.102l-1.628 5.645a1.245 1.245 0 0 1-1.192.922h-7.068v-7.889c1.624-.336 2.623-2.866 2.806-4.029z"></path></g></svg>
            <span>获得点赞：{{like||0}} </span>
            </p>
        <p class="flex items-center leading-10">
            <svg data-v-bdf6e7fa="" data-v-71f2d09e="" class="mr-4" width="25" height="25" viewBox="0 0 25 25"><g data-v-bdf6e7fa="" data-v-71f2d09e="" fill="none" fill-rule="evenodd"><circle data-v-bdf6e7fa="" data-v-71f2d09e="" cx="12.5" cy="12.5" r="12.5" fill="#E1EFFF"></circle><path data-v-bdf6e7fa="" data-v-71f2d09e="" fill="#7BB9FF" d="M4 12.5S6.917 7 12.75 7s8.75 5.5 8.75 5.5-2.917 5.5-8.75 5.5S4 12.5 4 12.5zm8.75 2.292c1.208 0 2.188-1.026 2.188-2.292 0-1.266-.98-2.292-2.188-2.292-1.208 0-2.188 1.026-2.188 2.292 0 1.266.98 2.292 2.188 2.292z"></path></g></svg>
            <span>文章阅读量：{{read||0}}</span></p>
        </div>
    </div>

</template>

<script setup>
const {user}=defineProps(['user'])
const {username,headImage,read,like}=user
</script>
<style lang="scss" scoped>

</style>