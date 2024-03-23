<template>
    <div class="Box">
        <div>
            <p class="text" v-show="flg1">作者</p>
            <div class="top" v-show="flg1">
                <template v-for="item in autList">
                    <div class="aut">
                        <img class="autImg" :src="item.authorsImg">
                        <span class="autName">{{ item.authorsName }}</span>
                    </div>
                </template>
            </div>
            <p class="text" v-show="flg2">书籍</p>
            <div class="low" v-show="flg2">
                <template v-for="item in bookList">
                    <div class="book" @click="bookUrl(item.bookId)">
                        <img class="bookImg" :src="item.bookCoverimage">
                        <span class="book1">{{ item.bookName }}</span><br>
                        <span class="book2">{{ item.bookEnd }}</span><span class="book3">{{ item.bookState }}</span><br>
                        <span class="book4">{{ item.bookIntroduction }}</span><br>
                        <span class="book5">2023-01-01</span>
                    </div>
                </template>
            </div>
            <br>
        </div>
        <div v-show="flg3">
            <el-empty description="没有找到您找的书QAQ!!!" :image-size="260" />
        </div>
    </div>
    <router-view />
</template>

<script setup>
import { ref } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import { getBookNameAndBook } from '@/api/book'
import { getAutName } from '@/api/user'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
// 作者显示
let flg1 = ref(true)
// 书籍显示
let flg2 = ref(true)
// 所有数据显示
let flg3 = ref(false)
let autList = ref([])
let bookList = ref([])
// 要查询的数据
let name = route.query.selectData
getUserAndBook()
async function getUserAndBook() {
    // if()
    const res1 = await getAutName(name)
    const res2 = await getBookNameAndBook(name)
    if (res1.data.length == 0) {
        flg1.value = false
    }
    if (res1.data.length != 0) {
        autList.value = res1.data
    }

    if (res2.data.length == 0) {
        flg2.value = false
    }
    if (res1.data.length == 0 && res2.data.length == 0) {
        ElMessage({
            message: '暂无数据',
            type: 'error',
        })
        flg3.value = true
    }
    if (res2.data.length != 0) {
        
        bookList.value = res2.data
    }
}

// 书籍详情
function bookUrl(id){
    router.push({
        path: '/bookDetails',
        query: {
            bookId: id
        }
    })
}
</script>

<style lang="less" scoped>
.Box {
    margin: 20px auto;
    width: 1200px;
    min-height: 660px;
}

.top {
    width: 1200px;
    min-height: 100px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.low {
    width: 1200px;
    min-height: 100px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.aut {
    width: 136px;
    height: 180px;
    margin-left: 32px;
    margin-top: 10px;
    border: 1px solid #eee;
    background-color: #F7F4F4;
    border-radius: 10px;
}

.book {
    margin-left: 35px;
    margin-top: 20px;
    width: 360px;
    height: 220px;
}

.book:hover {
    cursor: pointer;
}

.aut:hover {
    cursor: pointer;
}

.text {
    line-height: 35px;
    font-size: 22px;
    font-weight: 700;
    padding-left: 10px;
    border-left: 3px solid black;
}

.autImg {
    float: left;
    width: 120px;
    height: 120px;
    margin-left: 8px;
    border-radius: 50%;
}

.autName {
    display: inline-block;
    min-width: 30px;
    height: 20px;
    margin-top: 20px;
    margin-left: 50px;
}

.bookImg {
    float: left;
    width: 140px;
    height: 208px;
    margin-top: 5px;
    margin-right: 10px;
    border-radius: 10px;
    border: 1px solid #ccc;
}

.book1 {
    margin-top: 5px;
    font-size: 18px;
}

.book2 {
    margin-top: 5px;
    font-size: 13px;
    color: #ccc;
}

.book3 {
    font-size: 13px;
    margin-left: 20px;
    color: #ccc;
}

.book4 {
    display: inline-block;
    margin-top: 5px;
    width: 200px;
    font-size: 13px;
    overflow: hidden;
    color: #ccc;
    height: 135px;
}

.book5 {
    display: inline-block;
    color: #ccc;
    font-size: 13px;
    margin-top: 5px;
}</style>