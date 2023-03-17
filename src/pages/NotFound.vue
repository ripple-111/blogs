<template>
    <div class="h-screen bg-slate-200">
    <el-empty description="似乎来到了一个没有任何光芒的荒野" image="https://codyhouse.co/assets/img/404.png" :image-size="500">
        <p class="text-4xl mb-4 font-semibold text-gray-700">404 - Page Not Found</p>
        <el-button type="primary" @click="router.go(-1)">回到群星</el-button>
    </el-empty>
</div>
</template>

<script setup>
const router=useRouter()
</script>