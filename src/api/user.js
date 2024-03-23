import request from '@/utils/request'

// 登录接口
export const userLoginService = (userEmail, userPassword) => request.post('/user/login', { userEmail, userPassword })

// 注册接口
export const userRegisterService = (userName, userEmail, userPassword) => request.post('/user/register', { userName, userEmail, userPassword })

// 获取全部用户
export const getAllUserService = (userId) => request.get('/user/selectAll', { userId })

// 根据用户id查询用户
export const getTopUp = (id) => request.get('/user/getTopUp?id=' + id)

// 根据用户邮箱查询用户
export const getByEmailAndUser = (email) => request.get('/user/getByEmailAndUser?email=' + email)

// 根据用户名查询用户
export const getUserNameAndUser = (userName) => request.get('/user/getUserNameAndUser?name=' + userName)

// 根据作者名查询作者
export const getAutName = (name) => request.get('/user/getAutName?name=' + name)

// 修改用户
export const UpDateUser = (user) => request.post('/user/update', user)

// 修改用户
export const UpdatePwd = (user) => request.post('/user/updatePwd', user)

// 充值
export const topUpMoney = (user) => request.post('/user/topUpMoney', user)

// 消费
export const delMoney = (user) => request.post('/user/delMoney', user)

// 充值记录
export const getUserService = (id) => request.get('/user/getUser?id=' + id)

// 传入用户id获取书籍评论
export const getUserIdAndComments = (id) => request.get('/user/getUserIdAndComments?id=' + id)

// 根据用户id查询订单
export const getUserIdAndOrder = (users) => request.post('/user/selectByUserIdAndOrder', users)

// 根据订单id查询订单
export const getOrderIdAndOrder = (id) => request.get('/user/selectById?id=' + id)

// 确认收货
export const delOrder = (orders) => request.post('/user/delOrder', orders)


