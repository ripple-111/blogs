import { defineStore } from "pinia";
export const useHomeStore=defineStore('home',{
    state:()=>{
        return{
            tags:['综合','关注','前端','后端','大数据','人工智能','IOS'], //主页文章标签
            authors:[{
                id:'1',
                url:'../public/headImage.jpeg',
                name:'狂炫沙糖桔',
                description:'小萌新'
            },{
                id:'1',
                url:'../public/headImage.jpeg',
                name:'狂炫沙糖桔',
                description:'小萌新'
            },{
                id:'1',
                url:'../public/headImage.jpeg',
                name:'狂炫沙糖桔',
                description:'小萌新'
            },
            {
                id:'1',
                url:'../public/headImage.jpeg',
                name:'狂炫沙糖桔',
                description:'小萌新'
            },]
        }
    }
})