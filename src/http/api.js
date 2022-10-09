import {get,post,uploader,del,put} from './http'
export const register = (data) => post('/userService/register',data)
export const login = (data) => get('/userService/login',data)
export const userInfo = (data) => get('/userService/getUserInfo',data)
export const USER_LIST_ID = (params) => get(`service-core/user_list/${params.id}`)
export const UPLOAD_USER_CARD = (params) => uploader('service-core/user_upload_card', params)
export const DELETE_BOOK = (params) => del(`service-core/book_list/${params.id}`)