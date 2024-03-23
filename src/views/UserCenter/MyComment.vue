<template>
    <div>
        <p class="Title">我的评论</p>
        <hr>
        <div class="record" v-if="flg">
            <ul :v-infinite-scroll="list.length" class="infinite-list" style="overflow: auto">
                <li v-for="(item, index) in list" :key="item.bookId" class="li">
                    <div>
                        <template v-if="book !=[]">
                            <img class="img" :src="book[index].img">
                            <p class="name">{{ book[index].name }}</p>
                            <p class="comment">{{ item.commentsText }}</p>
                            <p class="time">评论时间:&nbsp;{{ item.commentsTime }}</p>
                            <p @click="toBook(book[index].bookId)" class="sussed">点击前往该书</p>
                        </template>
                    </div>
                </li>
            </ul>
        </div>
        <div v-if="!flg">
            <el-empty description="您还没有评论过书 ￣へ￣!!!!" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getUserIdAndComments } from '@/api/user'
import { getCommentsIdAndBook } from '@/api/book'
import { useUserStore } from '@/store/index'

const userStore = useUserStore()
const router = useRouter()

let book = ref([])
let list = ref([])
let flg = ref(true)
getCommentsList()
async function getCommentsList() {
    const res = await getUserIdAndComments(userStore.user.userId)
    if(res.data.length == 0){
        flg.value = false
        return
    }
    for (let i = 0; i < res.data.length; i++) {
        const res1 = await getCommentsIdAndBook(res.data[i].commentsId)
        const img = res1.data.bookCoverimage
        const name = res1.data.bookName
        const bookId = res1.data.bookId
        book.value.push({img,name, bookId })
    }
    list.value = res.data

}

// 评论的书
function toBook(id) {
    router.push({
        path: '/bookDetails',
        query: {
            bookId: id
        }
    })
}
</script>

<style lang="less" scoped>
li {
    list-style: none;
}

p {
    padding: 0;
    margin: 0;
    display: inline-block;
}

.Title {
    font-weight: bold;
    padding: 15px 0 15px 0;
}

.infinite-list {
    height: 590px;
    padding: 0;
    margin: 0;
    list-style: none;
}

.li {
    margin-bottom: 20px;
    width: 1000px;
    height: 180px;
    border: 2px solid #ccc;
    border-radius: 10px;
}

.record {
    margin-left: 80px;
}

.img {
    float: left;
    width: 120px;
    height: 168px;
    margin-top: 5px;
    margin-left: 20px;
    border-radius: 5px;
}

.sussed {
    text-align: center;
    width: 140px;
    line-height: 180px;
}

.sussed:hover {
    text-decoration: underline;
    color: aqua;
}

.time {
    text-align: center;
    width: 260px;
    line-height: 180px;
    border-right: 2px solid #ccc;
    border-left: 2px solid #ccc;
}

.comment {
    text-align: center;
    display: inline-block;
    box-sizing: border-box;
    padding: 10px;
    width: 230px;
    height: 100px;
}

.name {
    width: 200px;
    line-height: 180px;
    text-align: center;
    margin-left: 20px;
    border-right: 2px solid #ccc;
    border-left: 2px solid #ccc;
}
</style>