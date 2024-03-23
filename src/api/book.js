import request from '@/utils/request'

// 获取新书书籍 共八条
export const NewBookService = () => request.get('/book/newBook')

// 传入书籍id获取书籍详情
export const getBookDetails = (bookId) => request.get('/book/getBookDetails?bookId='+bookId)

// 传入书籍名字获取书籍详情
export const getBookNameAndBook = (bookName) => request.get('/book/getBookNameAndBook?bookName=' + bookName)

// 传入书籍id获取书籍评论
export const getBookDetailsAndComments = (id) => request.get('/book/getBookDetailsAndComments?id='+id)

// 传入评论id获取书籍信息
export const getCommentsIdAndBook = (id) => request.get('/book/getCommentsIdAndBook?id=' + id)

// 传入作者id获取作者
export const getBookDetailsAndAuthors = (id) => request.get('/book/getBookDetailsAndAuthors?id='+id)

// 传入作者id获取作者粉丝
export const getBookByAuthorsFens = (id) => request.get('/book/getBookDetailsAndAuthors?id='+id)

// 传入书籍id获取书籍标签
export const getByBookIdAndCategories = (id) => request.get('/book/getByBookIdAndCategories?id=' + id)

// 添加评论
export const addCommentsService = (commentsId, userId, commentsText, commentsScore) => request.post('/book/addComm', { commentsId, userId, commentsText, commentsScore })

// 主编力荐
export const getByPublishers = () => request.get('/book/getByPublishers')

// 动态搜索
export const getBookDataService = (book) => request.post('/book/getBookData',book)

// 我的书架获取
export const getCollectBook = (userCollectBook) => request.post('/book/getCollectBook', userCollectBook)

// 书架添加(收藏的书)
export const addCollectBook = (userCollectBook) => request.post('/book/addCollectBook', userCollectBook)

// 书架删除
export const delCollectBook = (userCollectBook) => request.post('/book/delCollectBook', userCollectBook)

// 阅读记录获取
export const getReadBook = (userHistoryBook) => request.post('/book/getReadBook', userHistoryBook)

// 阅读记录添加
export const addReadBook = (userHistoryBook) => request.post('/book/addReadBook', userHistoryBook)

// 阅读记录删除
export const delReadBook = (userHistoryBook) => request.post('/book/delReadBook', userHistoryBook)

// 购买书籍
export const addOrders = (orders) => request.post('/book/addOrders', orders)

// 根据订单获取书籍
export const getOrderIdAndBooks = (orders) => request.post('/book/selectByOrderIdAndBooks', orders)

// 
export const upload = (file) => request.post('/file/upload', file)

