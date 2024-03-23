<template>
    <div class="box">
        <!-- 书架 -->
        <template v-if="bookList != ''">
            <div class="bookBox" v-for="(item, index) in bookList" :key="item.bookId">
                <div @click="bookUrl(item.bookId)" class="book">
                    <img class="img" :src="item.bookCoverimage">
                    <p class="bookName">{{ item.bookName }}</p>
                    <p class="affect">{{ affect[index].names }}</p>
                </div>
            </div>
        </template>

        <div class="box1" v-if="bookList == ''">
            <el-empty :image-size="260" description="您还没有收藏过书!!!(试试点击加入书架)" />
        </div>
    </div>

    <br><br>
    <router-view />
</template>

<script setup>
import { ref } from 'vue'
import { getCollectBook, getBookDetailsAndAuthors } from '@/api/book'
import { useUserStore } from '@/store/index'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

let bookList = ref('')
// 需要是集合才能追加(.push()方法)数组  ref数组的使用affect.value[0]
let affect = ref([])
// 预渲染
onBeforeMount: {
    getBookData()
}
async function getBookData() {
    // 封装对象
    let userCollectBook = {
        userId: userStore.user.userId,
    }
    // 获取收藏的书籍信息
    const res = await getCollectBook(userCollectBook)
    // 遇到的问题之一
    // 先给获取的作者赋值
    // bookList.value = res.data 不能放前面
    for (let i = 0; i < res.data.length; i++) {
        const a = await getBookDetailsAndAuthors(res.data[i].authorsId)
        const names = a.data.authorsName
        // name需要先定义才能放到.push()里面
        affect.value.push({ names })
    }
    // 后在给收藏的书赋值 否则页面会提示没有定义的变量,虽然已经成功渲染,但还是会报错
    bookList.value = res.data
}
// 书籍详情
function bookUrl(id) {
    router.push({
        path: '/BookDetails',
        query: {
            bookId: id
        }
    })
}
</script>

<style lang="less" scoped>
p {
    margin: 0;
}

.box {
    margin: 20px auto;
    width: 1250px;
    display: flex;

    flex-wrap: wrap;
    min-height: 600px;
    // background-color: pink;
}

.bookBox {
    width: 280px;
    height: 280px;
    background-color: #f7f4f4;
    margin-left: 32px;
    justify-content: flex-start;
    margin-top: 20px;
    border-radius: 15px;
}

.bookBox:hover {
    cursor: pointer;
}

.book {
    margin: 10px auto;
    width: 260px;
    height: 260px;
}

.img {
    width: 140px;
    height: 206px;
    margin-left: 60px;
    border-radius: 5px;
    box-shadow: 2px 2px 10px #ccc;
}

.bookName {
    width: 260px;
    height: 24px;
    font-size: 20px;
    font-weight: 500;
    text-align: center;
}

.affect {
    margin-top: 10px;
    font-size: 14px;
    color: #c3c0c0;
    width: 260px;
    text-align: center;
}

.box1 {
    margin: 100px auto;
}
</style>