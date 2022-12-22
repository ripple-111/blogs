<script setup>

</script>

<template>

    <router-view v-slot="{ Component }">
        <keep-alive>
            <component :is="Component" v-if="$route.meta.keepAlive" />
        </keep-alive>
        <component :is="Component" v-if="!$route.meta.keepAlive" />
    </router-view>


</template>

<style lang="scss">
@import 'blog.css';
.el-divider{
    margin: 16px 0!important;
}
</style>
