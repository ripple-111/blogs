import {get,post} from './http'
/**
 * @function 用户注册
 * @param  {Object} data
 * @arg {string} data.username 用户名
 * @arg {string} data.password 用户密码
 */
export const register = data => post('/userService/register',data)
/**
 * @function 用户登录
 * @param  {Object} data
 * @arg {string} data.username 用户名
 * @arg {string} data.password 用户密码
 *  注册结果
 */
export const login = data => get('/userService/login',data)
/**
 * @function 获取用户信息
 * @param {number} 用户的id
 */
export const userInfo = id => get(`/userService/getUserInfo?id=${id}`)
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
 */
export const BlogUpload = data => post('/blogService/upload',data)
/**
 * @function 获取文章
 * @param {Object} data
 * @arg {number} [data.currentPage] 文章页数
 * @arg {string} [data.search] 文章搜索词
 * @arg {string} [data.type] 文章类型
 * @arg {Array} [data.tags] 文章标签
 */
export const getArticle=data=>get('/blogService/getArticle',data)
/**
 * @function 获取文章信息
 */
export const getArticleInfo=id=>get(`/blogService/getArticleInfo?id=${id}`)
/**
 * @function 获取用户文章类型和标签
 */
export const getType=(uid)=>get(`/blogService/getType?uid=${uid}`)
/**
 * @function 用户留言
 * @param {Object} data 
 * @arg {string} data.message 留言内容
 * @arg {string} data.uid 留言人的用户id
 */
export const sendMessage=data=>post('/messageService/sendMessage',data)
/**
 * @function 获取用户的留言
 */
export const getMessage=data=>get('/messageService/getMessage',data)
/**
 * @function 删除博客
 * @param {Object} data
 * @arg {string} data.id 删除的文章id 
 */
export const deleteBlog=data=>post('/blogService/deleteBlog',data)
/**
 * @function 更改用户信息
 * @param {Object} data 
 * @arg {string} data.type 对应修改值
 */
export const changeUserInfo=(data)=>post('/userService/setUserInfo',data)

/**
 * @function 获取所有文章分类标签
 * 
 */
export const getTags=()=>get('/blogService/getTags')
/**
 * @function 获取作者榜
 */
export const getBestAuthors=()=>get('/blogService/getBestAuthors')
/** 
 * @function 获取所有文章
*/
export const getAllArticle=()=>get('/blogService/getAllBlog')
/**
 * @function 关注某个用户
 */
export const follow=(uid)=>post('/fanService/follow',{followeeId:uid})
/**
 * @function 取消关注
 */
export const unfollow=(uid)=>post('/fanService/unfollow',{followeeId:uid})
/**
 * @function 获取用户所有关注列表
 */
export const getAllFollowers=(id)=>post('/fanService/getAllFollowers',{id})
/**
 * @function 获取用户所有粉丝
 */
export const getAllFollowees=(id)=>post('/fanService/getAllFollowees',{id})
/**
 * @function 文章点赞
 * @param {Number} 文章id
 */
export const goodArticle=(id)=>post('/blogService/goodArticle',{id})
/**
 * @function 文章观看
 * @param {Number} 文章id
 */
export const watchArticle=(id)=>post('/blogService/watchArticle',{id})