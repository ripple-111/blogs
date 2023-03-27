import {defineStore} from 'pinia'
import {getArticle,getType,userInfo} from '../src/http/api'
export const useStore=defineStore('user',{
    persist: {
        enabled: true, // 开启缓存  默认会存储在本地localstorage
        strategies:[{storage:sessionStorage,paths:['info']}]
    },
    state:()=>{
        return{
            userId:localStorage.getItem('userId')||'',
            articles:[],
            tags:[],
            type:[],
            currentType:'',
            currentTag:'',
            total:0,
            fans:[],
            followers:[],
            info:sessionStorage.getItem('user')||{
                article:'999',
                fan:'999',
                topic:'999',
                username:'默认昵称',
                introduce:'...',
                headImage:'../public/headImage.jpeg',
                ipfs:""
            },
            otherinfo:{}
        }
    },
    actions:{
        getArticle({currentPage=1,search,id=this.userId}){
            getArticle({currentPage,search,type:this.currentType,tags:this.currentTag,id}).then(res=>{
                // this.articles=res.data.rows.map(item=>{item.user=item.user.username;return item})
                this.articles=res.data.rows
                this.total=res.data.count
            })
        },
        async getAllFollowers(id){
            const res=await getAllFollowers(id||this.userId)
            this.fans=res.data
        },
        //获取所有关注者
        async getAllFollowees(id){
            const res=await getAllFollowees(id||this.userId)
            this.followers=res.data
        },
        getType(uid){
            getType(uid||this.userId).then(res=>{
                this.tags=new Set(res.data.tags.reduce((pre,current)=>pre.concat(current.tags.split(',')),[]))
                this.type=res.data.types
             })
        },
        clear(uid){
            this.currentType='',
            this.currentTag='',
            uid?this.getArticle({id:uid}):this.getArticle({})
        },
        userInfo(uid){
            userInfo(this.userId).then(res=>{     
                this.info=res.data
            })
            if(uid)
            userInfo(uid).then(res=>{
                this.otherinfo=res.data
            })
        }    
    }
})
