import { getAllArticle,getArticle, } from "../src/http/api";
import { defineStore } from "pinia";
export const useHomeStore = defineStore('home',{
    persist: {
        enabled: true, // 开启缓存  默认会存储在本地localstorage
        strategies:[{storage:sessionStorage,paths:['articles']}]
    },
    state:()=>{
        return{
            tags:['综合','关注','前端','后端','大数据','人工智能','IOS'], //主页文章标签
            authors:[],
            articles:[],
            currentArt:{},
            currentTag:null,
            total:0,  //文章总数
            loading:false,
        }
    },
    actions:{
        async getAllArticle(currentPage,search=null){
            this.loading=true
            const res=await getArticle({currentPage,tags:this.currentTag,search})
            this.articles=res.data.rows
            this.total=res.data.count
            this.loading=false
            
            // const res=await getAllArticle()
            // this.articles=res.data
        },    
        async getArticleInfo(id){
            const res=await getArticleInfo(id)
            this.currentArt=res.data.data
            console.log(this.currentArt)
            this.currentArt.tags=this.currentArt.tags.split(',')
        },
        async getBestAuthors(){
            const res=await getBestAuthors()
            this.authors=res.data
        }
    }
})