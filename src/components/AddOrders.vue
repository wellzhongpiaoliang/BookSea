<template>
    <!-- 订单详情页 -->
    <div>
        <div class="title">
            <img class="icon" src="../img/home/书海icon.png">
            <span class="sp">&reg;每一本书都是一个精彩的故事</span>
        </div>
        <div class="box">
            <div class="top">
                <img class="bookImg" :src="book.bookCoverimage">
                <p class="bookName">《&nbsp;{{ book.bookName }}&nbsp;》</p>
                <span class="affect">{{ book.bookEnd }}</span><span class="tag">{{ book.bookState }}</span>
                <p>单价:&nbsp;<span style="color: red;">{{ money }}元</span></p>
                <p>总价:&nbsp;<span style="color: red;">{{ AllMoney.toFixed(2) }}元</span></p>
                数量:&nbsp;<el-input-number size="small" class="num" v-model="num" :min="1" :max="99"
                    @change="handleChange" /> <br><br>
                <!-- 默认余额支付 -->
                支付方式:&nbsp;<el-select class="select" v-model="value" clearable placeholder="微信支付">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <p>下单时间:&nbsp;{{ Time }}</p>
            </div>
            <div class="low">
                <span class="address1">配送地址:&nbsp;{{ address }}</span><span class="address2">收件人:&nbsp;{{
                    userStore.user.userName }}&nbsp;</span><br>
                <el-input class="input" v-model="textarea" :rows="4" type="textarea"
                    placeholder="备注信息" />
                <el-button class="btn1" @click="addGoods()">确认购买</el-button><el-button class="btn2"
                    @click="back()">取消下单</el-button>
            </div>
        </div>
    </div>
    <br>
    <router-view />
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getBookDetails, addOrders } from '@/api/book'
import { getUserService, UpDateUser } from '@/api/user'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/store'
const userStore = useUserStore()
const textarea = ref('')
const router = useRouter()
const route = useRoute()
const bookId = route.query.bookId
const value = ref('微信支付')
const options = [
    {
        value: '微信支付',
        label: '微信支付',
    },
    {
        value: '支付宝支付',
        label: '支付宝支付',
    }, {
        value: '书币支付',
        label: '书币支付',
    }
]

// 获取时间
let yy = new Date().getFullYear();
let mm = new Date().getMonth() + 1;
let dd = new Date().getDate();
let hh = new Date().getHours();
let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
let Time = yy + "-" + mm + "-" + dd +" "+ hh + ":" + mf + ":" + ss

// 初始化数据
let num = ref(1)
let money = ref(0)
let AllMoney = ref(0)
let address = ref('广西省崇左市扶绥县空港大道29号广西自然资源职业技术学院')
let book = ref('')

const handleChange = (nums) => {
    num.value = nums - 0
    AllMoney.value = (num.value-0) * (money.value-0)
}

// 初始化数据
getBook()
async function getBook() {
    const res = await getBookDetails(bookId)
    book.value = res.data
    money.value = ((book.value.bookPrice)-0).toFixed(2)
    AllMoney.value = (num.value - 0) * (money.value - 0)
}
// 购买商品
async function addGoods() {
    ElMessageBox.confirm(
        '确认下单吗?',
        '购买书籍(您的余额'+ ((userStore.user.userMoney)-0).toFixed(2) +'元)',
        {
            confirmButtonText: '确认',
            cancelButtonText: '再想想',
            type: 'warning',
        }
    )
        .then(async () => {
            if((userStore.user.userMoney -0) - AllMoney.value >= 0){
                const orders = {
                    userId:userStore.user.userId,
                    bookId: bookId,
                    ordersDate: Time,
                    ordersPrice: AllMoney.value,
                    alipay: value.value,
                    address: address.value,
                    ordersMoney: AllMoney.value,
                    remark: textarea.value,
                    goodsNum: num.value,
                }
                const user = {
                    userId: userStore.user.userId,
                    userMoney: (userStore.user.userMoney - 0) - AllMoney.value
                }
                console.log(orders);
                console.log(user);
                const res = await addOrders(orders)
                const res1 = await UpDateUser(user)
                console.log(res.data,res1.data);
                // userStore.addUser(res1.data)
                ElMessage({
                    type: 'success',
                    message: '购买成功',
                })
                back1()
                const res2 = await getUserService(userStore.user.userId)
                userStore.addUser(res2.data)
            }
            if ((userStore.user.userMoney - 0) - AllMoney.value < 0) {
                ElMessage({
                    message: '购买失败,余额不足!!',
                    type: 'error',
                })
            }
        })
        .catch(() => {
        })
}

function back1() {
    router.go(-1)
}
// 取消购买
function back() {
    ElMessageBox.confirm(
        '确认取消吗?(订单将立即销毁)',
        '取消订单',
        {
            confirmButtonText: '确认',
            cancelButtonText: '再想想',
            type: 'warning',
        }
    )
        .then(() => {
            ElMessage({
                type: 'success',
                message: '取消成功',
            }), router.go(-1)
        })
        .catch(() => {

        })

}
</script>

<style lang="less" scoped>
.title {
    width: 100%;
    height: 50px;
    padding-bottom: 10px;
    border-bottom: 2px solid #ddd;
}

.icon {
    float: left;
    margin-left: 16%;
    height: 50px;
}

.sp {
    display: inline-block;
    width: 240px;
    height: 20px;
    margin-left: 30px;
    margin-top: 25px;
    font-size: 13px;
    color: #ccc;
}

.box {
    margin: 10px auto;
    width: 900px;
    height: 650px;
    border: 2px solid #eee;
    border-radius: 5px;
}

.bookImg {
    float: left;
    width: 260px;
    height: 387px;
    margin-left: 40px;
    margin-right: 30px;
    border-radius: 10px;
    border: 1px solid #eee;
}

.bookName {
    padding-top: 20px;
    font-size: 22px;
    font-weight: 500;
}

.select {
    width: 120px;
    color: black;
}

.affect {
    width: 50px;
    margin-right: 10px;
    text-align: center;
    font-size: 12px;
    color: #FDAE31;
    padding: 2px;
    border: 1px solid #FDAE31;
    border-radius: 5px;
}

.tag {
    width: 40px;
    margin-right: 10px;
    text-align: center;
    font-size: 12px;
    color: #ccc;
    padding: 2px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.num {
    width: 80px;
}

.top {
    width: 100%;
    height: 420px;
}

.low {
    box-sizing: border-box;
    padding-top: 20px;
    width: 100%;
    height: 220px;
    border-top: 2px solid #eee;
}

.input {
    width: 50%;
    margin-left: 40px;
}

.address1 {
    margin-left: 40px;
    display: inline-block;
    font-size: 16px;
    font-weight: 500;
    width: 540px;
    margin-bottom: 20px;
}

.address2 {
    margin-left: 40px;
    display: inline-block;
    font-size: 16px;
    width: 240px;
    margin-bottom: 20px;
    font-weight: 500;

}

.btn1 {
    width: 85px;
    height: 32px;
    margin-bottom: 0px;
    margin-left: 80px;
}

.btn2 {
    width: 85px;
    height: 32px;
    margin-bottom: 0px;
    margin-left: 30px;
}
</style>