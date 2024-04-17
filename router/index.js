import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404'
    },
    // {
    //     path: '/static',
    //     component: () => import('@/components/IPFS.vue')
    // },
    {
        path: '/admin',
        component: () => import('@/pages/Admin.vue'),
        children:[{
            path: 'home',
            component: () => import('@/components/admin/Home.vue')
        },{
            path: 'data',
            component: () => import('@/components/admin/AdminDataBoard.vue')
        },{
            path: 'manage',
            component: () => import('@/components/admin/DataManage.vue')
        },{
            path: 'friend',
            component: () => import('@/components/admin/AdminFriend.vue')
        },{
            path: 'ipfs',
            component: () => import('@/components/admin/AdminIPFS.vue')
        }]
    },
    {
        path: '/edit',
        // meta:{keepAlive:true},
        component: () => import('@/pages/Edit.vue')
    },
    {
        path: '/index',
        component: () => import('@/components/Index.vue')
    },
    {
        path: '/login',
        component: () => import('@/pages/Login.vue')
    },
    {
        path: '/display',
        component: () => import('@/pages/Display.vue')
    },
    {
        path: '/community',
        component: () => import('@/pages/Community.vue')
    },
    {
        path: '/404',
        name: 'NotFound',
        component: () => import('@/pages/NotFound.vue')
    },
    {
        path: '/blog',
        component: () => import('@/pages/Blog.vue'),
        children: [
            {
                path: '', component: () => import('@/components/Article.vue')
            },
            {
                path: 'kind', component: () => import('@/components/ArticleType.vue')
            },
            {
                path: 'friend', component: () => import('@/components/Friend.vue')
            },
            {
                path: 'board', component: () => import('@/components/Board.vue')
            }]
    },
]
const router = createRouter({
    history: createWebHashHistory(),
    mode: 'hash',
    // base:process.env.BASE_URL,
    routes
})
export default router