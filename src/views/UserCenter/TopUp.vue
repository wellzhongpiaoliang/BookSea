<template>
    <div>
        <p class="Title">充值</p>
        <hr>
        <p>充值账户:&nbsp;{{ userStore.user.userName }}</p>
        <p>账户余额: &nbsp;{{ money }}元</p>
        <span>充值方式</span>
        <div class="topUp">
            <el-radio-group v-model="radio1">
                <el-radio label="1" size="large" border>支付宝支付</el-radio>
                <el-radio label="2" size="large" border>微信支付</el-radio>
            </el-radio-group>
        </div>
        <br>
        <span>充值金额</span><div class="topUp">
                <el-radio-group v-model="radio2">
                    <el-radio label="6" size="large" border>6元</el-radio>
                    <el-radio label="15" size="large" border>15元</el-radio>
                    <el-radio label="30" size="large" border>30元</el-radio>
                    <el-radio label="50" size="large" border>50元</el-radio>
                    <el-radio label="100" size="large" border>100元</el-radio>
                    <el-radio label="150" size="large" border>150元</el-radio>
                    <el-radio label="200" size="large" border>200元</el-radio>
                </el-radio-group>
            </div>
            <br>
        <p>说明: &nbsp;实体书籍支持退货,电子书不支持退货</p>
        <el-button type="danger" @click="topUp()">充值</el-button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store'
import { topUpMoney, delMoney, getUserService } from '@/api/user' 
const userStore = useUserStore()

const radio1 = ref('1')
const radio2 = ref('6')

let money = ref(0)
money.value = userStore.user.userMoney

// 充值
async function topUp(){
    const user = {
        userId:userStore.user.userId,
        userMoney: radio2.value - 0
    }
    const res = await topUpMoney(user)
    console.log(res.data);
     ElMessage({
        message: '充值成功',
        type: 'success',
    })
   const res1 = await getUserService(userStore.user.userId)
   userStore.addUser(res1.data)
   money.value = userStore.user.userMoney
}


</script>


<style lang="less" scoped>
.Title {
    font-weight: bold;
}

.topUp {
    margin-left: 20px;
    display: inline-block;
    margin-bottom: 10px;
}
</style>