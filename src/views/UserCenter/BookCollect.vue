<template>
    <div>
        <p class="Title">我的收藏</p>
        <hr>
        <div v-if="flgs">
            <el-button v-show="flg" class="update" @click="update()" type="primary">编辑</el-button>
            <div class="update" v-show="!flg">
                <el-button @click="noUpdate()" type="success">取消</el-button>
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
        <div v-if="!flgs">
            <el-empty description="您还没有收藏过书 ￣へ￣!!!!" />
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import { getCollectBook, delCollectBook } from '@/api/book'
import { useUserStore } from '@/store';

const userStore = useUserStore()
const router = useRouter()

let flg = ref(true)
let flgs = ref(true)
const checkboxGroup1 = ref([])

let goods = ref([])

watch(goods.value, (newVal, oldVal) => {
    if (goods.value.length == 0) {
        flgs.value = false
    }
})
// 获取收藏书籍
getBookData()
async function getBookData() {
    const userCollectBook = {
        userId: userStore.user.userId
    }
    const res = await getCollectBook(userCollectBook)
    goods.value = res.data
    if (goods.value.length == 0) {
        flgs.value = false
    }
}

// 编辑按钮
function update() {
    flg.value = false
}

// 取消编辑
function noUpdate() {
    flg.value = true
    checkboxGroup1.value = []
}

// 前往书籍详情
function bookDetailS(id) {
    console.log(id);
    router.push({
        path: '/bookDetails',
        query: {
            bookId: id
        }
    })
}

// 删除
async function del() {
    ElMessageBox.confirm(
        '确认删除吗?',
        '收藏书籍编辑',
        {
            confirmButtonText: '确认删除',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            ElMessage({
                type: 'success',
                message: '删除成功',
            }), dels()
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
        })

}
async function dels() {
    // 判断是否有数据
    if (checkboxGroup1.value.length > 0) {
        for (let i = 0; i < checkboxGroup1.value.length; i++) {
            let userCollectBook = {
                bookId: checkboxGroup1.value[i]
            }
            const res = await delCollectBook(userCollectBook)
        }
    }
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
    top: 30px;
    font-size: 18px;
    left: 32px;
}
</style>