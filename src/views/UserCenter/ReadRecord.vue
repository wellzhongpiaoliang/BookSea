<template>
    <div>
        <p class="Title">阅读历史</p>
        <hr>
        <div v-if="flgs1">
            <el-button v-show="flg" type="success" class="update" @click="update()">编辑</el-button>
            <div class="update" v-show="!flg">
                <el-button @click="noUpdate()" type="success">取消</el-button>
                <el-button @click="all()" type="danger" v-show="flgs">全选</el-button>
                <el-button @click="NoAll()" type="warning" v-show="!flgs">反选</el-button>
                <el-button @click="del()" type="danger">删除</el-button>
            </div>
            <el-checkbox-group v-model="checkboxGroup1" size="small">
                <ul :v-infinite-scroll="goods.length" class="infinite-list" style="overflow: auto">
                    <li v-for="item in goods" :key="item.bookId" class="infinite-list-item">
                        <el-checkbox class="check" v-show="!flg" :label="item.bookId" border>&nbsp;</el-checkbox>
                        <div @click="bookDetailS(item.bookId)">
                            <img class="img" :src="item.bookCoverimage">
                            <el-text class="text">{{ item.bookName }}</el-text>
                        </div>
                    </li>
                </ul>
            </el-checkbox-group>
        </div>
        <div v-if="!flgs1">
            <el-empty description="你居然没看过一本书（｀へ´）!!!!" />
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getReadBook, addReadBook, delReadBook } from '@/api/book'
import { useUserStore } from '@/store/index'
const userStore = useUserStore()
const router = useRouter()

let flg = ref(true)
let flgs = ref(true)
let flgs1 = ref(true)
let checkboxGroup1 = ref([])

let goods = ref([])

watch(goods.value, (newVal, oldVal) => {
    if (goods.value.length == 0) {
        flgs1.value = false
    }
})

getBookData()
// 获取
async function getBookData() {
    let userHistoryBook = {
        userId: userStore.user.userId
    }
    const res = await getReadBook(userHistoryBook)
    goods.value = res.data
    if (goods.value.length == 0) {
        flgs1.value = false
    }
}

// 修改
function update() {
    flg.value = false
}
// 取消修改
function noUpdate() {
    flg.value = true
    checkboxGroup1.value = []
}
// 书籍详情
function bookDetailS(id) {
    console.log(id);
    router.push({
        path: '/bookDetails',
        query: {
            bookId: id
        }
    })
}

// 侦听全选,反选
watch(checkboxGroup1, (newVal, oldVal) => {
    if (checkboxGroup1.value.length + 1 >= goods.value.length) {
        console.log(checkboxGroup1.value);
        flgs.value = false
    }
    if (checkboxGroup1.value.length < goods.value.length) {
        flgs.value = true
    }
    if (goods.value.length == 0) {
        {
            flgs.value = true
        }
    }
})

// 全选
function all() {
    flgs.value = false
    checkboxGroup1.value = []
    for (let i = 0; i < goods.value.length; i++) {
        checkboxGroup1.value.push(goods.value[i].bookId)
    }
    console.log(checkboxGroup1.value);
}
// 反选
function NoAll() {
    flgs.value = true
    checkboxGroup1.value = []
}
// 删除
async function del() {
    if (checkboxGroup1.value.length != 0) {
        for (let i = 0; i < checkboxGroup1.value.length; i++) {
            let userHistoryBook = {
                bookId: checkboxGroup1.value[i]
            }
            const res = await delReadBook(userHistoryBook)
        }
    }

    // 删除后重置选择框
    checkboxGroup1.value = []
    getBookData()
}
</script>

<style lang="less" scoped>
.Title {
    font-weight: bold;
    display: inline-block;
}

.infinite-list {
    display: flex;
    height: 510px;
    padding: 0;
    margin: 0;
    // justify-content: space-around;
    flex-wrap: wrap;
    list-style: none;
}

.infinite-list-item {
    position: relative;
    width: 280px;
    margin-left: 15px;
    height: 360px;
    margin-top: 40px;
    border-bottom: 2px solid #ccc;
    border-radius: 0 0 10px 10px;
}

.check {
    position: absolute;
    top: 315px;
    right: 20px;
}

.img {
    float: left;
    width: 200px;
    height: 298px;
    margin-left: 35px;
    border: 2px solid #ccc;
    border-radius: 10px;
}

.update {
    margin-bottom: 20px;
}

.text {
    position: relative;
    display: inline-block;
    text-align: center;
    width: 200px;
    top: 40px;
    left: 32px;
}
</style>