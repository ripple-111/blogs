import {defineStore} from 'pinia'

export const useStore=defineStore('user',{
    state:()=>{
        return{
            userId:localStorage.getItem('userId')||''
        }
    }
})