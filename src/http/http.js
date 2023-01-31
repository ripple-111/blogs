import axios from "axios";
let baseUrl='http://127.0.0.1:3000/api'
let timer
axios.defaults.baseURL=baseUrl
axios.defaults.timeout=50000 
axios.defaults.withCredentials = true //自动携带cookie
axios.interceptors.request.use(
    config => {
    if (localStorage && localStorage.getItem('token')) {
      const token = localStorage.getItem('token')
      token && (config.headers.Authorization = `Bearer ${token}`)
    }
    return config }, 
    error => {
    // 可以安装elementui等ui组件，将错误信息输出到界面。
    console.log(error)
    return Promise.error(error)
  })
  // 响应拦截器
  axios.interceptors.response.use(res=> {
    if (res.status === 200) {
          return Promise.resolve(res.data)
          // store.commit('clearUserInfo')  // 使用vuex存储过用户信息，这里需要清空一下。
      } 
    else{
        return Promise.reject(res)
    }
  },(err)=>{
    if(err.response?.status==401){
        if(timer)
        clearTimeout(timer)
        timer=setTimeout(()=>{
            window.location.hash = '/login'
            ElMessage.error(err.response.data.msg)
        },800)
        
    }
  }
  )
  
  // 2、封装请求方式
  // @param url 接口地址
  // @param data 携带参数
  // @param file 上传文件对象
  // @param auth 是否携带token
  // get请求
  export function get (url, data) {
    return axios.get(url, {params:data})
  }
  // post请求
  export function post (url, data) {
    return axios.post(url, data)
  }
  // put请求
  export function put (url, data) {
    return axios.put(url, data)
  }
  // delete 请求
  export function del (url, data) {
    return axios.delete(url, data)
  }
  // upload 请求
  export function uploader (url, file) {
    let params = new FormData()
    params.append('file', file)
    return axios.post(url, params)
  }