import {get,post} from './http'
/**
 * @function 用户注册
 * @param  {Object} data
 * @arg {string} data.username 用户名
 * @arg {string} data.password 用户密码
 * @returns {Promise} 注册结果
 */
export const register = data => post('/userService/register',data)
/**
 * @function 用户登录
 * @param  {Object} data
 * @arg {string} data.username 用户名
 * @arg {string} data.password 用户密码
 * @returns {Promise} 注册结果
 */
export const login = data => get('/userService/login',data)
/**
 * @function 获取用户信息
 * @returns {Promise} 用户信息
 */
export const userInfo = () => get('/userService/getUserInfo')
/**
 * @function 上传博客
 * @param {Object} data 
 * @arg {string} data.md 博客内容
 * @arg {Object} data.article 博客信息
 * @arg {string} data.article.title 博客标题
 * @arg {string} data.article.type 博客类型
 * @arg {Array} data.article.tags 博客标签
 * @arg {string} data.article.image 博客封面
 * @arg {string} data.article.expla 博客介绍
 * @arg {string} [data.article.id] 博客id
 * @returns {Promise}
 */
export const BlogUpload = data => post('/blogService/upload',data)
/**
 * @function 获取文章
 * @param {Object} data
 * @arg {number} [data.currentPage] 文章页数
 * @arg {string} [data.search] 文章搜索词
 * @arg {string} [data.type] 文章类型
 * @arg {Array} [data.tags] 文章标签
 * @returns {Promise}
 */
export const getArticle=data=>get('/blogService/getArticle',data)
/**
 * @function 获取用户文章类型和标签
 * @returns {Promise}
 */
export const getType=()=>get('/blogService/getType')
/**
 * @function 用户留言
 * @param {Object} data 
 * @arg {string} data.message 留言内容
 * @arg {string} data.uid 留言人的用户id
 * @returns {Promise}
 */
export const sendMessage=data=>post('/messageService/sendMessage',data)
/**
 * @function 获取用户的留言
 * @returns {Promise}
 */
export const getMessage=data=>get('/messageService/getMessage',data)
/**
 * @function 删除博客
 * @param {Object} data
 * @arg {string} data.id 删除的文章id 
 * @returns {Promise}
 */
export const deleteBlog=data=>post('/blogService/deleteBlog',data)
/**
 * @function 更改用户信息
 * @param {Object} data 
 * @arg {string} data.type 对应修改值
 * @returns {Promise}
 */
export const changeUserInfo=(data)=>post('/userService/setUserInfo',data)
