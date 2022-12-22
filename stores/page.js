import { defineStore } from "pinia";
export  const usePageStore=defineStore('page',{
    state:()=>{
        return{
            drawer:false
            }
    }
})