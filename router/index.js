import { createRouter,createWebHashHistory} from "vue-router";
const routes=[
    {
        path:'/',
        redirect:'/login',
    },
    {
        path:'/edit',
        // meta:{keepAlive:true},
        component:()=>import('../src/pages/Edit.vue')
    },
    {
        path:'/index',
        component:()=>import('../src/components/Index.vue')
    },
    {
        path:'/login',
        component:()=>import('../src/pages/Login.vue')
    },
    {
        path:'/display',
        component:()=>import('../src/pages/Display.vue')
    },
    {
        path:'/community',
        component:()=>import('../src/pages/Community.vue')
    },
    {
        path:'/blog',
        component:()=>import('../src/pages/Blog.vue'),
        children:[
        {
            path:'',component:()=>import('../src/components/Article.vue')
        },
        {
            path:'kind',component:()=>import('../src/components/ArticleType.vue')
        },
        {
            path:'friend',component:()=>import('../src/components/Friend.vue')
        },
        {
            path:'board',component:()=>import('../src/components/Board.vue')
        }]
    },
]
const router=createRouter({
    history:createWebHashHistory(),
    mode:'hash',
    // base:process.env.BASE_URL,
    routes
})
export default router