<template>
    <div>
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
                        <el-input v-model="selectBody" @keyup.enter.native="select()"
                            class="navigation selectInput w-50 m-2" placeholder="请输入书名或者作者名..." suffix-icon="Search" />
                    </div>
                    <div class="imgs">
                        <img class="imgs" src="../img/YuanChuang/dr001.jpeg" alt="">
                    </div>
                </el-header>
                <router-view />
            </el-container>
            
        </div>
        <br>
        <div class="dr">
            <img src="../img/YuanChuang/dongri.jpg" alt="">
        </div>
        <p>最终解释权归书海书城所有<router-link to="/home">返回主页</router-link></p>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const router = useRoute()

let id = router.query.activity

</script>

<style lang="less" scoped>
* {
    margin: 0;
    padding: 0;
}

.dr>img {
    width: 100%;
    height: 1100px;
    margin-top: 220px;
}

.imgs {
    width: 100%;
    height: 220px;
}

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