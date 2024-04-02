<template>
    <div>

    </div>
</template>

<script  setup>
import { useHeliaKey } from '../HeliaApi/useHeliaKey';
import { useHeliaStore } from '../HeliaApi/useHeliaStore'
import { createHelia } from 'helia'
import { ipns } from '@helia/ipns'
import { strings } from '@helia/strings'

import { json } from '@helia/json';
import { inject, onMounted } from 'vue';

const key = inject('heliaKey')
const { cid, addBlog, getIpns, result, getBlog } = useHeliaStore(key)

console.log(await getIpns())
// createHelia().then(async helia=>{
//     let node = ipns(helia)
//     const keyInfo = await helia.libp2p.services.keychain.createKey('ripple1','RSA')
//     const peerId = await helia.libp2p.services.keychain.exportPeerId(keyInfo.name)
//     const str = strings(helia)
//     let cid = await str.add('hello world')
//     console.log(peerId.toString())
//     // await node.publish(peerId,cid)
//     try{
//         const result = await node.resolve(peerId)
//         console.log(1)
//         console.log(result)
//     }catch(err){
//         console.log(err)
//         console.log(1111)
//         const jsonHelia = json(helia)
//         let cid = await jsonHelia.add([])
//         await node.publish(peerId,cid)
//         const result = await node.resolve(peerId)
//         console.log(result,cid)
//         console.log(await jsonHelia.get(result.cid))
//     }
    
   
//     console.log(cid)
// })

</script>

<style lang="scss" scoped>

</style>