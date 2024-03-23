<template>
    <div v-show="data" style="position: relative;">
        <!-- 样式设定 -->
        <ul :v-infinite-scroll="goods.length" class="infinite-list" style="overflow: auto">
            <template v-for="(item, index) in goods">
                <div @click="order(item.ordersId)" class="orderBox" @key="item.ordersId">
                    <img class="bookImg" :src="book[index].bookCoverimage">
                    <p style="font-weight: 600;">{{ book[index].bookName }}</p>
                    <p style="height: 60px;display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                    overflow: hidden;">{{ book[index].bookIntroduction }}</p>
                    <p><span style="color: red;">{{ item.ordersMoney.toFixed(2) }}</span>元</p>
                    <p>下单日期:&nbsp;<span style="color:#ccc">{{ item.ordersDate }}</span></p>
                </div>
            </template>
        </ul>
    </div>
    <div v-show="!data">
        <el-empty description="没有订单!!!" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getUserIdAndOrder } from '@/api/user'
import { getOrderIdAndBooks } from '@/api/book'
import { useUserStore } from '@/store';
const router = useRouter()
const userStore = useUserStore()
let data = ref(true)
let goods = ref([])
let book = ref([])
getGoods()
async function getGoods() {
    const users = {
        userId: userStore.user.userId
    }
    const res = await getUserIdAndOrder(users)
    
    let list = res.data
    if (list.length > 0) {
        for (let i = 0; i < list.length; i++) {
            const orders = {
                ordersId: list[i].ordersId
            }
            const res1 = await getOrderIdAndBooks(orders)
            book.value[i] = res1.data
        }
    }else{
        data.value = false
    }
    goods.value = res.data
}

function order(id) {
    router.push({
        path: '/home/userHome/order/order',
        query: {
            bookId: id
        }
    })
}
</script>

<style lang="less" scoped>
.infinite-list {
    height: 560px;
    padding: 0;
    margin: 0;
    list-style: none;
}

.orderBox {
    width: 80%;
    height: 200px;
    margin: 30px auto;
    border: 2px solid #ccc;
    overflow: hidden;
    border-radius: 10px;
}

.bookImg {
    float: left;
    margin-left: 30px;
    margin-top: 13px;
    width: 120px;
    height: 175px;
    border: 2px solid red;
    border-radius: 10px;
}

p {
    margin-left: 200px;
    width: 700px;
}
</style>