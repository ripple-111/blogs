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
#edit{
    @apply text-white text-lg mb-20 leading-loose px-6 tracking-wide;
    h1,h2,h3,h4,h5{
        @apply my-4 text-teal-600
    }
    h1{
        font-size:30px;
        @apply text-center font-extrabold  
        after:w-full after:block after:h-border after:bg-black after:my-4;
    }
    h2{
        font-size: 25px;
        @apply font-bold 
    }
    h3{
        font-size: 20px;
        @apply font-semibold 
    }
    h4,h5{
        font-size: 18px; 
    }
    p,pre{
        font-size: 18px;
        margin: 2px;
    }
    strong{
        @apply mx-1 text-amber-600 my-2
    }
    em{
        @apply mx-1
    }
    blockquote{
        @apply bg-slate-600 leading-10 w-full border-l-4 border-gray-400 shadow-xl pl-2;
        p{
            @apply opacity-80 
        }
    }
    ul,ol{
        @apply list-square  text-blue-400 leading-loose text-base font-semibold ml-6;    
    }
    ol{
        @apply  list-decimal;
    }
    code{
        @apply p-px px-1 bg-gray-800 shadow-sm text-gray-400
    }
    pre:has(>code){
        @apply  p-2 bg-gray-800 shadow-2xl;
        &::before{
            content: '\1F534\1F7E1\1F7E2';
        }
        code{
        @apply w-full block  min-h-200
    }}
    p:has(>code){
        @apply  p-2 bg-gray-800 shadow-2xl rounded-lg; 
    }
    table{
        @apply w-full border-2;
        thead{
            @apply bg-slate-500;
        }
        tr{
            @apply border-y-2;
        }
    }
    hr{
        @apply my-4 border-teal-700
    }
    img{
        @apply min-h-150 object-cover object-center  my-4 mx-auto max-h-96
    }
    p:has(>a){
        @apply  text-center;
        a{
            @apply underline text-blue-400 hover:text-red-300  text-center 
        }
    }
    a{
            @apply underline text-blue-400 hover:text-red-400  text-center 
        }
}
</style>
