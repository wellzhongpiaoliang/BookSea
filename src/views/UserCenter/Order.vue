<template>
    <div>
        <p class="Title">订单管理</p>
        <router-link to="/home/userHome/order/address"   v-show="flg" @click="address()"><el-button type="primary" style="float: right;margin-top: 10px;margin-right: 2px;">修改地址</el-button></router-link>
        <router-link to="/home/userHome/order/orders" v-show="!flg" @click="order()"><el-button type="danger" style="float: right;margin-top: 10px;margin-right: 2px;">返回订单</el-button></router-link>
        <hr>
    </div>
    <router-view/>
</template>

<script setup>
import {ref} from 'vue'
// import router from 'vue-router'
let flg = ref(true)

function order(){
    flg.value = true
}

function address() {
    flg.value = false
}
</script>

<style lang="less" scoped>
.Title {
    font-weight: bold;
    display: inline-block;
}
</style>