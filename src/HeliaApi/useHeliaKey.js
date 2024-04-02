/* eslint-disable no-console */

import { inject, ref } from 'vue'

export const useHeliaKey = (name) => {
    const { loading, error, helia} = inject('HeliaProvider')
    const key = ref()
    const getHeliaKey = async () => {
        if (error.value.length === 0 && !loading.value) {
            try {
                try{
                    const keyInfo = await helia.value.libp2p.services.keychain.findKeyByName(name)
                    const peerId = await helia.value.libp2p.services.keychain.exportPeerId(keyInfo.name)
                    key.value = peerId
                }
                catch(e){
                    const keyInfo = await helia.value.libp2p.services.keychain.createKey(name,'RSA')
                    const peerId = await helia.value.libp2p.services.keychain.exportPeerId(keyInfo.name)
                    key.value = peerId
                }
            } catch (e) {
                console.error(e)
            }
        } else {
            setTimeout(()=>{
                console.log('please wait for helia to start')
                getHeliaKey()
            },1000)
            
        }
    }
    return { key, getHeliaKey }
}