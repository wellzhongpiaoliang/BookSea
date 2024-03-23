<template>
    <div>
        <div class="order">
            <div class="img">
                <img class="bookImg" :src="book.bookCoverimage">
            </div>
            <div class="right">
                <p class="orderId">订单id:&nbsp;{{ orders.ordersId }}</p>
                <p class="orderName">{{ userStore.user.userName }}</p> <br>
                <p class="bookName">{{ book.bookName }}</p><br>
                <p class="create">订单日期:&nbsp;{{ orders.ordersDate }}</p>
                <p class="price">单价: <span style="color: red;">{{ book.bookPrice }}元</span></p>
                <p class="num">共:&nbsp;{{ orders.goodsNum }}&nbsp;本</p><br>
                <p class="priceS">{{ orders.alipay }}</p>
                <p class="priceNum">共计:<span style="color: red;">{{ orders.ordersMoney }}元</span></p><br>
                <p class="orderState">订单状态:&nbsp;{{ orders.ordersStatus }}</p><br>
                <p class="DisMode">配送地址:&nbsp;{{ orders.address }}</p><br>
                <p class="remark">备注信息:&nbsp;{{ orders.remark }}</p>
                <div v-if="flgs" class="ods">
                    <el-button @click="delOrders()" type="danger" v-if="flg">取消订单</el-button>
                    <el-button @click="outGoods()" type="danger" v-if="!flg">退货</el-button>
                </div>
                <el-button class="ods" @click="edwa()" type="success" v-if="!flgs">确认收货</el-button>
                <router-link to="/home/userHome/order/orders"><el-button class="btn" type="success">返回</el-button></router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { getOrderIdAndOrder, delOrder } from '@/api/user'
import { getOrderIdAndBooks } from '@/api/book'
import { useUserStore } from '@/store'
import { ref } from 'vue'
// useRoute获取传过来的参数,useRouter定义连接
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

let bookId = ref()
let book = ref([])
let flg = ref(true)
let flgs = ref(false)
bookId.value = route.query.bookId
let orders = ref('')

if (bookId.value == 1) {
    flgs.value = true
}

if(bookId.value == 2){
    flgs.value = true,
    flg.value = false

}
getOrder()
async function getOrder(){
    const res = await getOrderIdAndOrder(bookId.value)
    const order = {
        ordersId: bookId.value
    }
    const res1 = await getOrderIdAndBooks(order)
    book.value = res1.data
    orders.value = res.data
    console.log(orders.value, book.value);
}

function delOrders() {
    ElMessageBox.confirm(
        '取消订单?',
        {
            confirmButtonText: '确定取消',
            cancelButtonText: '返回',
            type: 'error',
            center: true,
        },
    )
        .then(() => {
            ElMessage({
                type: 'success',
                message: '取消成功',
            }), back()
        })
        .catch(() => {
            // ElMessage({
            //     message: '',
            // })
        })

}

function outGoods() {
    ElMessageBox.confirm(
        '是否退货?',
        {
            confirmButtonText: '确定',
            cancelButtonText: '返回',
            type: 'error',
            center: true,
        },
    )
        .then(() => {
            ElMessage({
                type: 'success',
                message: '退货成功',
            }), back()
        })
        .catch(() => {
            // ElMessage({
            //     message: '',
            // })
        })
}

async function getDelOrder(){
    const Orders = {
        ordersId: bookId.value
    }
    const res = await delOrder(Orders)
}

function edwa(){
    ElMessageBox.confirm(
        '确认收货?',
        {
            confirmButtonText: '确定',
            cancelButtonText: '返回',
            type: 'success',
            center: true,
        },
    )
        .then(() => {
            ElMessage({
                type: 'success',
                message: '收货成功',
            })
            getDelOrder()
            back()
        })
        .catch(() => {
            // ElMessage({
            //     message: '',
            // })
        })
}

function back() {
    // router.push('/home/userHome/order/orders')
    router.push('/home')
}
</script>

<style lang="less" scoped>
p {
    font-size: 16px;
    margin: 0px;
    display: inline-block;
}

.img {
    width: 40%;
    height: 500px;
    margin-top: 25px;
}

.bookImg {
    width: 350px;
    height: 500px;
    border: 2px solid #ccc;
    border-radius: 15px;
}

.right {
    margin-top: 25px;
    width: 60%;
    box-sizing: border-box;
    padding-left: 20px;
    height: 500px;
    border: 2px solid #eee;
    border-radius: 10px;
}

.order {
    margin: 10px auto;
    display: flex;
    width: 90%;
    height: 550px;
}

.orderId {
    width: 160px;
    margin-top: 20px;
    color: #ccc;
}

.orderName {
    margin-left: 60px;
    width: 100px;
    font-weight: 700;
}

.bookName {
    width: 200px;
    font-weight: 600;
    margin-top: 20px;
    font-size: 20px;
}

.create {
    margin-top: 30px;
    font-size: 14px;
}

.price {
    width: 140px;
    margin-left: 20px;
}

.num {
    width: 100px;
    margin-left: 20px;
}

.priceS {
    padding: 1px;
    margin-top: 15px;
    color: #67C23A;
    border: 1px solid #67C23A;
    border-radius: 3px;
}

.priceNum {
    margin-left: 20px;
}

.orderState {
    width: 160px;
    margin-top: 15px;

}

.DisMode {
    margin-top: 10px;
    line-height: 25px;
    width: 400px;
}

.remark {
    margin-top: 50px;
    width: 400px;
}

.ods {
    margin-top: 60px;
    margin-left: 20px;
}
.btn{
    position: relative;
    top:30px;
    left:20px;
}
</style>