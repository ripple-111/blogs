<script setup>
import UserInfo from './components/UserInfo.vue';
</script>

<template>
    <UserInfo/>
    <router-view v-slot="{ Component }">
        <keep-alive>
            <component :is="Component" v-if="$route.meta.keepAlive" />
        </keep-alive>
        <component :is="Component" v-if="!$route.meta.keepAlive" />
    </router-view>


</template>

<style lang="scss">
@import 'blog.css';

</style>
