<template>
    <div class="fixed rounded-full bg-white cursor-pointer z-40" :style="style" @click="scrollTo()">
        <el-icon :size="30" color="#409EFC">
            <CaretBottom v-show="!isScroll" />
            <CaretTop v-show="isScroll" />
        </el-icon>
    </div>
</template>

<script setup>
const props=defineProps({
    right:{
        type:Number,
        default:160
    },
    bottom:{
        type:Number,
        default:80
    }
})
const {right,bottom}=toRefs(props)
const style=computed(()=>{
    return{right:right.value+'px',
        bottom:bottom.value+'px',
        height:'30px'}
})
const scroll=inject('scroll')
const isScroll=inject('isScroll')
function scrollTo() { //滚动一个窗口
    isScroll.value?scroll.scrollTo({ top: 0, left: 0, behavior: 'smooth' }):scroll.scrollTo({ top: window.innerHeight, left: 0, behavior: 'smooth' })
}
</script>
<style lang="scss" scoped>
</style>