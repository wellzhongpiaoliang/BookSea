<template>
    <div class="common-layout">
        <el-container>
            <el-header class="headers">
                <div class="routerLeft">
                    <img class="iconImg" src="../img/home/书海icon.png">
                </div>
                <div class="routerRight">
                    <router-link class="navigation" to="/home/booksHome">首页</router-link>
                    <router-link class="navigation" to="/home/bookData">书库</router-link>
                    <router-link class="navigation" to="/home/bookShelf">书架</router-link>
                    <router-link class="navigation" to="/home/originalList">原创榜</router-link>
                    <router-link class="navigation" to="/home/copyrightZone">漫画专区</router-link>
                    <el-input v-model="selectBody" @keyup.enter.native="select()" class="navigation selectInput w-50 m-2"
                        placeholder="请输入书名或者作者名..." suffix-icon="Search" />
                    <template v-if="!sq">
                        <router-link class="navigation" to="/login">登录</router-link>
                    </template>
                    <template v-if="sq">
                        <router-link class="navigation" to="/home/userHome">{{ userStore.user.userName }}</router-link>
                        <img class="userIcon" @click="userHome()" :src="userStore.user.userImg" alt="头像">
                    </template>
                </div>
            </el-header>
            <router-view />
        </el-container>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useUserStore } from '@/store/index'
import { useRouter } from 'vue-router';

const router = useRouter()
const userStore = useUserStore()

let selectBody = ref('')

// 已登录 / 未登录
// let sq = ref(true)
let sq = ref(false)

// 如果用户id为空则显示登录
if (userStore.user.userId != -1) {
    // 已登录 / 未登录
    // let sq = ref(true)
    sq.value = ref(true)
}

// 跳转用户主页
function userHome() {
    router.push("/home/userHome")
}

// 搜索
function select() {

    if (selectBody.value == '') {
        ElMessage({
            message: '搜索框不能为空',
            type: 'warning',
        })
        return
    }
    if (selectBody.value != '') {
        router.push({
            path: "/home/selectBook",
            query: {
                selectData: selectBody.value
            }
        })
        
        ElMessage({
            message: '搜索成功',
            type: 'success',
        })
        selectBody.value= null
    }

}

</script>

<style lang="less" scoped>
.headers {
    // background-color: aqua;
    height: 60px;
}

.iconImg {
    width: 120px;
    margin-left: 100px;
}

.userIcon {
    margin-top: 10px;
    width: 45px;
    height: 45px;
    border-radius: 50%;
}

.routerLeft {
    float: left;
    width: 200px;
    height: 60px;
}

.routerRight {
    display: flex;
    float: right;
    width: 900px;
    height: 60px;

    .navigation {
        display: inline-block;

        text-decoration: none;
        font-size: 16px;
        font-weight: bold;
        color: black;
        margin-right: 35px;
        align-self: center;
    }

}


.selectInput {
    width: 260px;
    border-radius: 15px;
}
</style>