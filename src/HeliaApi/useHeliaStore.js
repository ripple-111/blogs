/* eslint-disable no-console */

import { inject, ref } from 'vue'
import { CID } from 'multiformats/cid'

export const useHeliaStore = (key) => {
    const { loading, error, stringsHelia, ipnsHelia, jsonHelia} = inject('HeliaProvider')
    const cid = ref()
    const result = ref([])
    const addBlog = async (blog) => {
        if (error.value.length === 0 && !loading.value) {
            try {
                if(!result.value)
                await getIpns()
                let CID = await jsonHelia.value.add(blog) 
                cid.value = CID.toString()
                
                if(!Array.isArray(result.value?.[blog.id])){
                    result.value[blog.id] = []
                }
                if(!result.value?.[blog.id].includes(cid.value)){
                    result.value?.[blog.id].push(cid.value)
                }
                console.log(result.value)
                let cids = await jsonHelia.value.add(result.value)
                await ipnsHelia.value.publish(key.value,cids)

                const peer = await ipnsHelia.value.resolve(key.value)
                console.log(peer)
                result.value = await jsonHelia.value.get(peer.cid)
                console.log(result.value,11111111)
            } catch (e) {
                console.error(e)
            }
        } else {
            setTimeout(()=>{
                addBlog()
            },1000)
            console.log('please wait for helia to start')
        }
    }
    const getIpns = async () =>{
        if (error.value.length === 0 && !loading.value && key.value) {
        try{    
            console.log(222222222)
            const peer = await ipnsHelia.value.resolve(key.value)
            console.log(peer)
            result.value = await jsonHelia.value.get(peer.cid)
          
            console.log(result.value,11111111)
        }
        catch(err){
            console.log(err)
            // getIpns()
            result.value = []
        }
        }
        else{
            setTimeout(()=>{
                getIpns()
            },1000)
        }
    }
    const getBlog = async (cid) =>{
        if (error.value.length === 0 && !loading.value) {
        try{
            let blog = await jsonHelia.value.get(CID.parse(cid))
            return blog
        }
        catch(err){
            console.log(err)
        }
        }
        else{
            setTimeout(()=>{
                getBlog(cid)
            },1000)
        }
    }
    return { cid, addBlog, getIpns, result, getBlog }
}