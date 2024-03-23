<template>
    <div>
        <p class="Title">记录</p>
        <hr>
        <div class="record" v-if="flgs1">
            <ul :v-infinite-scroll="list.length" class="infinite-list" style="overflow: auto">
                <li v-for="item in list" :key="item.topupId" class="li">
                    <p class="id">充值ID:&nbsp;{{ item.topupId }}</p>
                    <p class="username">{{ userStore.user.userName }}</p>
                    <p class="money">金额:<span style="color: red;">{{ item.money }}</span>元</p>
                    <p class="time">充值时间:{{ item.topupTime }}</p>
                    <p class="sussed">状态:{{ item.succeed }}</p>
                </li>
            </ul>
        </div>
        <div v-if="!flgs1">
                <el-empty description="您没有充值记录" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { getTopUp } from '@/api/user'
import { useUserStore } from '@/store/index'
const userStore = useUserStore()
let list = ref([])
let flgs1 = ref(true)
getTopUps()
async function getTopUps(){
    let res = await getTopUp(userStore.user.userId)
    list.value = res.data
    // 判断是用充值记录
    if(list.value.length == 0){
        flgs1.value = false
    }
    if (list.value.length != 0) {
        flgs1.value = true
    }
}
</script>

<style lang="less" scoped>
li {
    list-style: none;
}
li:nth-child(2n-1)
{
    background-color: #efefef;
}
p {
    padding: 0;
    margin: 0;
    display: inline-block;
}

.Title {
    font-weight: bold;
}

.infinite-list {
    height: 560px;
    padding: 0;
    margin: 0;
    list-style: none;
}

.li {
    margin-bottom: 20px;
    width: 1000px;
    height: 100px;
    border: 2px solid #ccc;
    border-radius: 10px;
}

.record {
    margin-left: 80px;
}

.id {
    text-align: center;
    width: 200px;
    line-height: 100px;
    border-right: 2px solid #ccc;
}

.sussed {
    text-align: center;
    width: 140px;
    line-height: 100px;
}
.time{
    text-align: center;
    width: 260px;
    line-height: 100px;
    border-right: 2px solid #ccc;
}
.money{
    text-align: center;
    width: 230px;
    line-height: 100px;
    border-right: 2px solid #ccc;
}
.username{
    width: 160px;
    line-height: 100px;
    text-align: center;
    border-right: 2px solid #ccc;
}
</style>