import { createRouter,createWebHistory} from "vue-router";
import Edit from '../src/components/Edit.vue'
const routes=[
    {
        path:'/',
        component:()=>import('../src/components/Home.vue')
    },
    {
        path:'/edit',
        meta:{keepAlive:true},
        component:Edit
    },
    {
        path:'/index',
        component:()=>import('../src/components/Index.vue')
    },
    {
        path:'/login',
        component:()=>import('../src/components/Login.vue')
    },
    {
        path:'/display',
        component:()=>import('../src/components/Display.vue')
    },
    {
        path:'/blog',
        component:()=>import('../src/components/Blog.vue'),
        children:[
        {
            path:'',component:()=>import('../src/components/Essay.vue')
        },
        {
            path:'/kind',component:()=>import('../src/components/Aritic.vue')
        },
        {
            path:'/friend',component:()=>import('../src/components/Friend.vue')
        },
        {
            path:'/board',component:()=>import('../src/components/Board.vue')
        }]
    }
]
const router=createRouter({
    history:createWebHistory(),
    routes
})
router.beforeEach(()=>{
    scrollTo({top:0,left:0,behavior:'smooth'})
})
export default router