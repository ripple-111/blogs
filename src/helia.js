/* eslint-disable no-console */

import { json } from '@helia/json'
import { strings } from '@helia/strings'
import { ipns } from '@helia/ipns'
import { createHelia } from 'helia'
import { ref } from 'vue'
import { createFromJSON } from '@libp2p/peer-id-factory'
const pidJSON = {'id':'QmbFaSyy5vjrzNccMFaTc4DvCokjSTSXQRnK2g6TtDZi4S','pubKey':'CAASogEwgZ8wDQYJKoZIhvcNAQEBBQADgY0AMIGJAoGBAMppJ+cvvpeVF6PkB4r0Q++Fz9mVMZXQ+5KLZ4TINHdGR8K5JYh8irAbPyktAfwrmxy0C6FiIX7Ti0q9ytvWbDqlYNK+dfANs0UnUmOnfZwUNW+qPAVirVLVFcl6qO5eFTVL3uWCIUEnsoKQQzrhAiNWcw11E9kkMtCC1WvY3n1hAgMBAAE=','privKey':'CAAS4AQwggJcAgEAAoGBAMppJ+cvvpeVF6PkB4r0Q++Fz9mVMZXQ+5KLZ4TINHdGR8K5JYh8irAbPyktAfwrmxy0C6FiIX7Ti0q9ytvWbDqlYNK+dfANs0UnUmOnfZwUNW+qPAVirVLVFcl6qO5eFTVL3uWCIUEnsoKQQzrhAiNWcw11E9kkMtCC1WvY3n1hAgMBAAECgYEAixmE8J2hDy7Iljqo7Fc9MKf21QJwlxKNMIJY26lyVN2ZhzoRjyB3dtripvtlN9UHvcwFihyUBEKAoRaZCEbtDI+ORcE4cHub3i5N1JQAkCHOzlBWb6dluDK9cY7CK4LE/L1/2QjaI7Dqk6+9d9SLF2oKHrtBh/LlTCi0okkTXgECQQDpZOGbZPhsRkoxVhcFQDysmvKzWz5+9NpUq56bpbwjnBzs6xLh+RvVfX9paCXDXbH3SQEzSBdw4OmGYagus2mxAkEA3gQHVJ565g2rs3KRoM/uMsJDw7p0b+TPFDy3PoeLAi+0fMGm5k2cuflqubb33YsXkWz04zj5qeCUCzzZsqmKsQJAQDlEY7BrM9A7xku8VfORPqX8tyIalnDmS3pWUNpQZTQmOYOOVKRp5lt8XhMMoS/9MuDh9ayW1rbtS88/qmowYQJASzxwQ4PFQCrH0fL0WNu96+ObVTvdc4HFjyUYMA980wvZjSGO7qLEht14BmFz09br8LNMtae8K45YfQps97eusQJAYAFadvdux0Iaq1K/lL12VyJn8jc7dnE4ZhDJ2IBDmSMTaele4akwall7fuw43jwqFCciJCpH4NDBkhbNkRQxig=='}
const pId = await createFromJSON(pidJSON)
export const HeliaProviderPlugin = {
  install: async (app) => {
    const loading = ref(true)
    const error = ref('')
    const helia = ref()
    const jsonHelia = ref()
    const ipnsHelia = shallowRef()
    const stringsHelia = ref()
    app.provide('HeliaProvider', {
      loading,
      error,
      helia,
      jsonHelia,
      ipnsHelia,
      stringsHelia
    })
    try {
      const instance = await createHelia({
        libp2p:{
          peerId:pId
        },
        addresses: {
          listen: ['/ip4/127.0.0.1/tcp/5001'],
        },
      })
      loading.value = false
      helia.value = instance
      jsonHelia.value = json(instance)
      ipnsHelia.value = ipns(instance)
      stringsHelia.value = strings(instance)
    } catch (e) {
      console.error(e)
      error.value = e.toString()
      loading.value = false
    }
  }
}