<template>
    <div ref="bg">
        <canvas class="fixed w-full h-full top-0 left-0 z-under bg-[#d4eaee]" id="evanyou"></canvas>
        <TopNavBar/>
        <div class="flex flex-wrap w-screen min-h-screen content-start">
            <div class="mx-auto flex px-2 pt-10 flex-wrap md:w-[1200px]">
            <div class="md:order-2 w-full md:w-3/4">
                <router-view></router-view>
            </div>   
            <div class="md:pr-4 w-full md:w-1/4">
            <User />
            </div>
            </div>    
        </div>
    </div>
</template>

<script setup>
import User from '../components/User.vue';
import TopNavBar from '../components/TopNavBar.vue';
import CanvasNest from 'canvas-nest.js';
import evan from '../assets/evan.js'
const bg = ref()
let cn
onMounted(() => {
    cn = new CanvasNest(bg.value, {
        color:'17,96,164',
        count:300,
        opacity:0.8
    });
    evan()
})
onBeforeUnmount(() => {
    cn.destroy();  // destroy
})
const store=useStore()
const route=useRoute()
// store.userInfo(route.query.id)
// store.getArticle({id:route.query.id})
// store.getType(route.query.id)
store.getAllFollowees()
store.getAllFollowers()
</script>

<style lang="scss" scoped>
.el-menu-item {
    font-size: 20px
}

.el-divider {
    margin: 1px 0;
}
</style>