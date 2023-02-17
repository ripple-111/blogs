import {defineStore} from 'pinia'
import {getArticle,getType,userInfo} from '../src/http/api'
export const useStore=defineStore('user',{
    persist: {
        enabled: true, // 开启缓存  默认会存储在本地localstorage
        storage: sessionStorage, // 缓存使用方式
        paths:[] // 需要缓存键 
    },
    state:()=>{
        return{
            userId:localStorage.getItem('userId')||'',
            articles:JSON.parse(localStorage.getItem('article'))||[],
            tags:[],
            type:[],
            currentType:'',
            currentTag:'',
            total:0,
            info:{
                article:'999',
                fan:'999',
                topic:'999',
                username:'默认昵称',
                introduce:'...',
                headImage:'../public/headImage.jpeg',
                ipfs:""
            }
        }
    },
    actions:{
        getArticle({currentPage=1,search}){
            getArticle({currentPage,search,type:this.currentType,tags:this.currentTag}).then(res=>{
                console.log(res.data)
                this.articles=res.data.article.rows.map(item=>{item.name=res.data.user;item.headImage=res.data.headImage;return item})
                // localStorage.setItem('article',JSON.stringify(this.articles))
                this.total=res.data.article.count
            })
        },
        getType(){
            getType().then(res=>{
                this.tags=new Set(res.data.tags.reduce((pre,current)=>pre.concat(current.tags.split(',')),[]))
                this.type=res.data.types
             })
        },
        clear(){
            this.currentType='',
            this.currentTag='',
            this.getArticle({})
        },
        userInfo(){
            userInfo().then(res=>{
                this.info=res.data.user
            })
        }
       
    
        
    }
})