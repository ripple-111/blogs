import {defineStore} from 'pinia'
import {getArticle,getType} from '../src/http/api'
export const useStore=defineStore('user',{
    state:()=>{
        return{
            userId:localStorage.getItem('userId')||'',
            articles:JSON.parse(localStorage.getItem('article'))||[],
            tags:[],
            type:[],
            currentType:'',
            currentTag:'',
            total:0
        }
    },
    actions:{
        getAll({currentPage=1,search}){
            getArticle({currentPage,search,type:this.currentType,tags:this.currentTag}).then(res=>{
                this.articles=res.data.article.rows.map(item=>{item.name=res.data.user;item.headImage=res.data.headImage;return item})
                localStorage.setItem('article',JSON.stringify(this.articles))
                this.total=res.data.article.count
            })
        },
        getAllType(){
            getType().then(res=>{
                this.tags=new Set(res.data.tags.reduce((pre,current)=>pre.concat(current.tags.split(',')),[]))
                this.type=res.data.types
             })
        },
        clear(){
            this.currentType='',
            this.currentTag='',
            this.getAll({})
        }
    }
})