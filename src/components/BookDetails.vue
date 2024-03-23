<template>
    <!-- 书籍详情 -->
    <div class="Top">
        <div class="TopBox">
            <p @click="back()" class="title">&lt;&lt;返回</p>
            <div class="top">
                <div class="Left">
                    <img class="bookImg" :src="BookDetails.bookCoverimage">
                    <p class="bookName">{{ BookDetails.bookName }}</p>
                    <span class="affect">{{ BookDetails.bookEnd }}</span><span class="tag">{{ Categories.categoriesName
                    }}</span><span class="label">{{ BookDetails.bookState }}</span>
                    <p class="bookNum">{{ BookDetails.bookNum }}<span
                            class="sp">万字</span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{{ BookDetails.bookRead }}<span
                            class="sp">点击量</span></p>
                    <p class="time">出版时间:&nbsp;{{ BookDetails.publishDate }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价格:&nbsp;<span style="color: red;">{{ ((BookDetails.bookPrice)-0).toFixed(2) }}</span>元</p>
                    <el-button type="primary" @click="addBook()">购买</el-button><el-button @click="AddBook()" type="success"
                        v-show="flg">加入书架</el-button><el-button @click="DelBook()" type="danger"
                        v-show="!flg">已加入</el-button>
                    <el-button class="btnS" type="info" plain @click="read()">立即阅读</el-button>
                </div>
                <div class="Right">
                    <img class="AImg" :src="Authors.authorsImg">
                    <p>{{ Authors.authorsName }}</p>
                    <p>职业:&nbsp;{{ Authors.authorsOccupation }}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="Body">
        <div class="bodyTop">
            <p class="bookTitle">作品简介</p>
            <hr class="hr">
            <p class="bookText">{{ BookDetails.bookIntroduction }}</p>
        </div>

        <div class="bodyTop">
            <p class="bookTitle">评论</p>
            <hr class="hr">
            <div class="a">
                <div class="aLeft">
                    <el-input :rows="2" v-model="text" autosize type="textarea" placeholder="输入评论点击发布" />
                </div>
                <el-rate v-model="score" show-score text-color="#ff9900" score-template="" />
                <div class="aRight">
                    <el-button class="btn" @click="add()">发布</el-button>
                </div>
            </div>
            <p class="bookTexts" v-for="(item, index) in list">
                <img class="userImg" :src="commName[index].img">
                <span class="name">{{ commName[index].name }}</span>:&nbsp;<span class="texts">{{ item.commentsText }}</span>
            <p class="p"><el-rate v-model="item.commentsScore" disabled show-score text-color="#ff9900"
                    score-template="" />&nbsp;&nbsp;&nbsp;&nbsp;{{ item.commentsTime }}</p>
            </p>
        </div>
    </div>
    <br>
    <router-view />
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus'
import { getBookDetails, getBookDetailsAndComments, getBookDetailsAndAuthors, getByBookIdAndCategories, addCommentsService, delCollectBook, addCollectBook, getCollectBook, addReadBook, getReadBook } from '@/api/book'
import { getUserService } from '@/api/user'
import { useUserStore } from '@/store/index'

// 重置滚动条
window.scrollTo(0, 0)

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

let flg = ref(true)
// if(){
//     flg.value = false
// }
// 评论
let text = ref('')
// 评分
let score = ref(0)

// 书籍详情 / 评论 / 作者 / 传过来的书籍id / 发布的评论
let BookDetails = ref({})
let list = ref({})
let Authors = ref({})
let Categories = ref({})
let commName = ref([])
let id = ref()
id = route.query.bookId
// <评论>变量 临时作为传bookId
let commentsId = id
let userId = userStore.user.userId
let commentsText = ''
let commentsScore = 0

// 预渲染
onBeforeMount: {
    getBookData()
}

async function getBookData() {
    // 封装对象
    let userCollectBook = {
        userId: userStore.user.userId,
    }
    let book1 = []
    // 获取书籍详情
    const bookData = await getBookDetails(id)
    // 获取评论数据
    const commList = await getBookDetailsAndComments(id)
    // 获取作者
    const authors = await getBookDetailsAndAuthors(bookData.data.authorsId)
    // 获取分类
    const categories = await getByBookIdAndCategories(id)
    // 获取书架信息
    const getCollect = await getCollectBook(userCollectBook)
    book1 = getCollect.data
    // console.log(getCollect.data);
    // 循环获取评论名
    for (let i = 0; i < commList.data.length; i++) {
        // 获取评论者名
        const getUser = await getUserService(commList.data[i].userId)
        // 获取对象
        const name = getUser.data.userName
        const img = getUser.data.userImg
        // 添加到评论者名数组
        commName.value.push({ name, img })
    }
    // 循环查询该书是否在书架里
    if (book1.length > 0) {
        for (let i = 0; i < book1.length; i++) {
            // 如果该书已经收藏,则将按钮改为false
            if (book1[i].bookId == id) {
                flg.value = false
            }
        }
    }

    // 赋值
    BookDetails.value = bookData.data
    list.value = commList.data
    Authors.value = authors.data
    Categories.value = categories.data
}

// 返回
function back() {
    router.go(-1)
}

// 加入书架
async function AddBook() {
    let userCollectBook = {
        userId: userStore.user.userId,
        bookId: id
    }
    const res = await addCollectBook(userCollectBook)
    if (res.data == "添加成功") {
        flg.value = false
        ElMessage({
            message: '加入成功',
            type: 'success',
        })
        return
    }

}

// 拿出书架
async function DelBook() {
    let userCollectBook = {
        bookId: id
    }
    const res = await delCollectBook(userCollectBook)
    if (res.data == "删除成功") {
        flg.value = true
        ElMessage({
            message: '取出成功',
            type: 'success',
        })
    }
}

// 评论
async function add() {
    // 获取时间
    let yy = new Date().getFullYear();
    let mm = new Date().getMonth() + 1;
    let dd = new Date().getDate();
    let commentsTime = yy + "-" + mm + "-" + dd
    commentsText = text.value
    commentsScore = score.value
    if (text.value == '') {
        ElMessage.error('评论不能为空')
        return
    }
    if (score.value == 0) {
        ElMessage.error('评分不能为空')
        return
    }
    if (text.value != '') {
        let res = await addCommentsService(commentsId, userId, commentsText, commentsScore)
        const name = userStore.user.userName
        const img = userStore.user.userImg

        // 添加到评论者名数组
        commName.value.push({ name, img })
        list.value.push({ commentsText, commentsScore, commentsTime })
        ElMessage({
            message: '发表成功',
            type: 'success',
        })
        text.value = ''
        score.value = 0
    }
}

// 购买
function addBook() {
    router.push({
        path: '/addOrders',
        query: {
            bookId: id
        }
    })
    // ElMessage({
    //     message: '购买失败,请联系客服',
    //     type: 'warning',
    // })
}

// 阅读
async function read() {

    let userHistoryBook = {
        userId: userStore.user.userId,
        bookId: id
    }
    const res1 = await getReadBook(userHistoryBook)
    // 定义是否阅读的判断
    let a = 0
    if (res1.data.length != 0) {
        for (let i = 0; i < res1.data.length; i++) {
            if (res1.data[i].bookId == id) {
                console.log("已经被阅读，不再添加到阅读记录");
                // 全部遍历过,如果已经存在则a = 1
                a = 1
            }
        }
    }
    // 如果上面遍历都没有阅读过则a不变
    if (a == 0) {
        // 添加阅读记录的同时也增阅读量
        const res2 = await addReadBook(userHistoryBook)
    }
    // 目前无法阅读,给予反馈
    ElMessage({
        message: '目前无法阅读，该行为已被记录',
        type: 'error',
    })
    getBookData()
}
</script>

<style lang="less" scoped>
.Top {
    margin-top: 20px;
    width: 100%;
    min-height: 300px;
    background-color: #F6F6F6;
}

.TopBox {
    margin: 0 auto;
    width: 1200px;
    height: 280px;

}

.title {
    margin: 0 10px 10px 10px;
    padding-top: 10px;
    font-size: 18px;
}

.top {
    display: flex;
}

.Left {
    width: 70%;
    height: 280px;
}

.bookImg {
    width: 180px;
    height: 256px;
    float: left;
    margin-right: 30px;
    border-radius: 10px;
}

.bookName {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 15px;
}

span {
    display: inline-block;
}

.affect {
    width: 50px;
    margin-right: 10px;
    text-align: center;
    font-size: 13px;
    color: #FDAE31;
    padding: 2px;
    border: 1px solid #FDAE31;
    border-radius: 5px;
}

.tag {
    width: 40px;
    margin-right: 10px;
    text-align: center;
    font-size: 13px;
    color: #ccc;
    padding: 2px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.label {
    width: 40px;
    text-align: center;
    font-size: 13px;
    color: #ccc;
    padding: 2px;
    border: 1px solid #ccc;
    border-radius: 5px;
}


.bookNum {
    font-size: 24px;
    font-weight: 400;
}

.sp {
    font-size: 14px;
    font-weight: 300;
    margin-left: 5px;
    color: #999999;
}

.a {
    margin: 10px auto;
    width: 1000px;
    min-height: 30px;
    display: flex;
}

.aLeft {
    width: 72%;
    margin-right: 35px;
}

.aRight {
    width: 10%;
}

.btn {
    width: 100px;
    margin-left: 20px;
}

.time {
    font-size: 14px;
}

.AImg {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.userImg {
    float: left;
    margin-left: 10px;
    margin-top: 10px;
    width: 50px;
    border-radius: 50%;
}

.name {
    display: inline-block;
    font-size: 20px;
    min-width: 20px;
    margin-top: 10px;
    margin-left: 30px;
}

.texts {
    display: inline-block;
    font-size: 20px;
}

.p {
    margin: 5px 0 0 760px;
}

.Right {
    margin-top: 50px;
    box-sizing: border-box;
    padding-left: 70px;
    padding-top: 20px;
    width: 28%;
    height: 180px;
    border-left: 1px solid #ccc;
}

.Body {
    margin: 30px auto;
    width: 1200px;
    box-sizing: border-box;
    padding: 20px;
    min-height: 800px;
    box-shadow: 0px 0px 10px #F0F0F0;
}

.hr {
    color: #F0F0F0;
}

.bookTitle {
    font-size: 24px;
    font-weight: bold;
}

.bookText {
    margin: 10px auto;
    width: 1000px;
    height: 80px;
    text-indent: 2em;
}

.bookTexts {
    margin: 20px auto;
    width: 1000px;
    height: 80px;
    border-bottom: 1px solid #ccc;
}

.btnS {
    height: 35px;
}</style>