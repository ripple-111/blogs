<template>
    <div class="absolute top-14 right-0  w-72">
        <el-calendar v-model="date">
            <template #header="{ date }">
                <span>{{ date }}</span>
            </template>
        </el-calendar>
        <div class="bg-white py-4 px-6 my-4">
            <p>🎖️作者榜</p>
            <el-divider />
            <ul class="my-4 max-h-60">
                <li v-for="i in authors" :key="i.uid" class="flex mb-4 items-center hover:bg-slate-100 hover:cursor-pointer hover:text-lg" @click="router.push(`/blog?id=${i.uid}`)">
                    <el-avatar :src="i.headImage" :size="50" fit="fill" class="mr-4" />
                    <div class="max-w-[200px]">
                        <p class="truncate">{{ i.username }}</p>
                        <p class="text-gray-400 text-sm truncate">{{ i.description }}</p>
                    </div>
                </li>
            </ul>
            <el-divider />
            <el-button plain type="primary" class="mx-auto mt-2 !block">完整榜单 ></el-button>
        </div>

    </div>
</template>

<script setup>
const { authors } = storeToRefs(useHomeStore())
const date = ref(new Date())
const router=useRouter()
</script>
<style lang="scss" scoped></style>