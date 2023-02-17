/**
 * @desc  函数防抖---“立即执行版本” 和 “非立即执行版本” 的组合版本
 * @param  func 需要执行的函数
 * @param  wait 延迟执行时间（毫秒）
 * @param  immediate---true 表立即执行，false 表非立即执行
 **/
export default function debounce(fn,wait=200,immediate=false){
    let timer
    return function(){
        let context=this
        let args=arguments
        if(timer)
        clearTimeout(timer)
        if(immediate){
            var callNow=!timer
            timer=setTimeout(()=>timer=null,wait)
            if(callNow)
            fn.apply(context,args)
        }
        else{
            timer=setTimeout(()=>fn.apply(context,args),wait)
        }
    }
}