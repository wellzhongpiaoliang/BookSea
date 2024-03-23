<template>
    <!-- 轮播条 -->
    <div class="div" style="width: 100%;">
        <el-carousel :interval="4000" type="card" height="400px" style="margin: 20px; ">
            <el-carousel-item v-for="item in arrImg" :key="item">
                <el-image style="height: 100%;width: 100%;" :src="item"></el-image>
            </el-carousel-item>
        </el-carousel>
    </div>
    <!-- 分类 -->
    <div class="test">
        <router-link to="#" v-for="item in items" :key="item.id">
            <p style="padding: 3px; display: inline-block;">
                {{ item.name }}
            </p>
        </router-link>
    </div>

    <!-- 推荐漫画栏 -->
    <div class="box2">
        <h1 class="H1">为你推荐</h1>
        <div class="common-layout">
            <div class="box1" v-for="(item, index) in comicList.slice(0, 12)" :key="item.comicId">
                <router-link class="a" :to="`/info/${item.comicId}`">
                    <img :src="require(`@/img/manhua/${item.comicImgs}`)" alt="" style="height: 300px;width: 100%;">
                    <div class="zhi">
                        <h3>{{ item.comicName }}</h3>
                    </div>
                    <p1 class="p2">{{ item.comicType }}</p1>
                    <!-- <p1 class="p1">{{ item.comicStyle }}</p1> -->
                </router-link>
            </div>
        </div>
    </div>
    <!-- 下半部份分类 -->
    <div class="div1">
        <h1 class="H1">奇幻世界</h1>
        <div class="common-layout">
            <div class="box1" v-for="(item, index) in comicList.slice(12, 18)" :key="item.comicId">
                <router-link class="a" :to="`/info/${item.comicId}`">
                    <img :src="require(`@/img/manhua/${item.comicImgs}`)" alt="" style="height: 300px;width: 100%;">
                    <div class="zhi">
                        <h3>{{ item.comicName }}</h3>
                    </div>
                    <p1 class="p2">{{ item.comicType }}</p1>
                    <!-- <p1 class="p1">{{ item.comicStyle }}</p1> -->
                </router-link>
            </div>
        </div>
    </div>
    <!-- 下半部份分类2 -->
    <div class="div1">
        <h1 class="H1">武侠仙侠</h1>
        <div class="common-layout">
            <div class="box1" v-for="(item, index) in comicList.slice(18, 24)" :key="item.comicId">
                <router-link class="a" :to="`/info/${item.comicId}`">
                    <img :src="require(`@/img/manhua/${item.comicImgs}`)" alt="" style="height: 300px;width: 100%;">
                    <div class="zhi">
                        <h3>{{ item.comicName }}</h3>
                    </div>
                    <p1 class="p2">{{ item.comicType }}</p1>
                    <!-- <p1 class="p1">{{ item.comicStyle }}</p1> -->
                </router-link>
            </div>
        </div>
    </div>
    <!-- 下半部份分类2 -->
    <div class="div1">
        <h1 class="H1">都市生活</h1>
        <div class="common-layout">
            <div class="box1" v-for="(item, index) in comicList.slice(24, 30)" :key="item.comicId">
                <router-link class="a" :to="`/info/${item.comicId}`">
                    <img :src="require(`@/img/manhua/${item.comicImgs}`)" alt="" style="height: 300px;width: 100%;">
                    <div class="zhi">
                        <h3>{{ item.comicName }}</h3>
                    </div>
                    <p1 class="p2">{{ item.comicType }}</p1>
                    <!-- <p1 class="p1">{{ item.comicStyle }}</p1> -->
                </router-link>
            </div>
        </div>
    </div>
    <!-- 底部 -->
    <div class="bottom">
        <div class="D1">
            <div class="D2">
                <div class="imgs">
                    <img src="../../img/manhua/bika.jpg" style="width: 100%;height: 90px;border-radius: 15px;">
                </div>
                <span class="bottom-title">Pic Acg</span>
            </div>
            <div class="D3">
                <div class="D6"><a href="#" class="link">关于我们</a></div>
                <div class="D6"><a href="#" class="link">联系我们</a></div>
                <div class="D6"><a href="#" class="link">友情链接</a></div>
                <div class="D6"><a href="#" class="link">加入我们</a></div>
            </div>
            <div style="height: 90px;width: 1px;margin-right: 90px;
             background-color: rgb(164, 163, 163);
             margin-top: 40px;"></div>
            <div class="D4">
                <div class="D7">
                    <img src="../../img/manhua/bika1.jpg" alt="" class="bottom-img">
                    <span class="SP">哔咔官方</span>
                </div>
                <div class="D7">
                    <el-tooltip placement="top">
                        <template #content>
                            <img style="width: 200px; height: 200px;border: 1px;" src="../../img/manhua/QRcode.png" />
                        </template>
                        <img src="../../img/manhua/X.png" alt="" class="bottom-img">
                    </el-tooltip>
                    <span class="SP">twtter</span>
                </div>
                <div class="D7">
                    <el-tooltip placement="top">
                        <template #content>
                            <img style="width: 200px; height: 200px;border: 1px;" src="../../img/manhua/QRcode.png" />
                        </template>
                        <img src="../../img/manhua/download.png" alt="" class="bottom-img">
                    </el-tooltip>
                    <span class="SP">下载</span>
                </div>
            </div>
        </div>
        <div class="D5">
            <div class="D5-1">
                <img class="D5-1img" src="../../img/manhua/JMcomic.jpg" alt="">
            </div>
            <div class="D5-2">
                <p style="width: 400px;">友情链接:&nbsp;&nbsp;<a href="https://www.gxnrvtc.edu.cn/" style="color: gray;
                    text-decoration: none;">https://www.gxnrvtc.edu.cn/</a></p>
                <p style="width: 400px;">书海&nbsp;&nbsp;版权所有&nbsp;&nbsp;未经许可&nbsp;&nbsp;严禁转载</p>
                <p style="width: 400px;">18comicoriginal&nbsp;&copy;&nbsp;jmcomic.me</p>
                <p style="width: 400px;">123456热线&nbsp;|&nbsp;地球不良举报中心</p>
                <p style="width: 400px;">书海科技有限公司&nbsp;|&nbsp;地址:地球里&nbsp;|&nbsp;电话:001022305</p>
            </div>
        </div>
    </div>
</template>

<script >
import router from '@/router';
import axios from 'axios'
// 轮播图片
export default {
    data() {
        return {
            arrImg: [
                require("../../img/manhua/01.jpg"),
                require("../../img/manhua/lzu.jpg"),
                require("../../img/manhua/ygmd.jpeg"),
                require("../../img/manhua/sxkx.jpg"),
                require("../../img/manhua/High-School-DxD.jpg"),
                require("../../img/manhua/dxc.jpg")
            ],
            items: [
                { id: 1, name: "玄幻" },
                { id: 2, name: "奇幻" },
                { id: 3, name: "都市" },
                { id: 4, name: "悬疑" },
                { id: 5, name: "后宫" },
                { id: 6, name: "末世" },
                { id: 7, name: "穿越" },
                { id: 8, name: "科幻" },
                { id: 9, name: "休闲" },
                { id: 10, name: "更多" }
            ],
            comicList: [],
            basepath: "@/img/manhua/",

        }
    },
    methods: {
        GetComic() {
            axios.get("http://localhost:8081/comic").then((res) => {
                this.comicList = res.data
            })
        }
    },
    mounted() {
        this.GetComic()

    },

}

</script>
<!-- 轮播样式 -->
<style lang="less" scoped>
.H1 {
    font-size: 40px;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    margin: -10px auto;
    margin-top: 20px;
    margin-left: 80px;
}

.el-carousel__item h3 {
    color: rgb(79, 84, 93);
    width: 100%;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #515356;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #555658;
}

.div {

    background-color: rgb(51, 48, 49);
    height: 450px;
}

.test {
    background-color: rgb(51, 48, 49);
    height: 60px;
    text-align: center;
    // padding: 20px 20px;
}

.a {
    text-decoration: none;
}

p {
    width: 80px;
    color: rgb(162, 165, 168);
}

// =======================================
// 推荐漫画样式
.common-layout {
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

.box1 {
    align-items: center;
    width: 200px;
    height: 300px;
    background-color: pink;
    margin: 40px 15px;
}

.box2 {

    width: 70%;
    height: auto;
    margin: auto;
}

.zhi {
    color: black;
    transform: translateY(-20px);
}

.p1 {
    color: #9d9fa3;
    display: inline-block;
    transform: translateY(-35px);
}

.p2 {
    display: block;
    color: #9d9fa3;
    transform: translateY(-35px);
}

.div1 {
    width: 70%;
    height: 100%;
    margin: auto;
    margin-top: 80px;

}

.bottom {
    width: 100%;
    height: 480px;
    margin-top: 80px;
    background-color: rgb(54, 53, 53);
}

.D1 {
    display: flex;
    width: 70%;
    height: 90px;
    margin: auto;
    margin-top: 70px;
}

.D2 {
    //定位
    position: relative;
    width: 27%;
    height: 90px;
    top: 40px;
}

.imgs {
    width: 150px;
    height: 100px;
}

.bottom-title {
    //定位父元素
    position: absolute;
    margin-left: 160px;
    top: 20px;
    width: 200px;
    height: 50px;
    text-align: center;
    font-size: 40px;
    color: #acadb0;
}

.D3 {
    width: 20%;
    height: 90px;
    margin: 0 10px;
    margin-top: 40px;
    //换行
    flex-wrap: wrap-reverse;
}

.D4 {
    display: flex;
    width: 40%;
    height: 120px;
    margin-left: 40px;
    top: 30px;
    //定位
    position: relative;
}

.D5 {
    //定位
    position: relative;
    width: 70%;
    height: 280px;
    margin: auto;
    margin-top: 100px;

}

.D5-1 {
    position: absolute;
    width: 150px;
    height: 90px;
    top: 60px;
}

.D5-2 {
    position: absolute;
    width: 600px;
    height: 200px;
    top: 20px;
    margin-left: 400px;
}

.D5-1img {
    width: 100%;
    height: 100%;
    border-radius: 15px;
}

.D6 {
    display: inline-block;
    text-align: center;
    width: 140px;
    height: 30px;
    margin: 6px 0;
    margin-left: 15px;
}

.link {
    color: rgb(204, 197, 197);
    text-decoration: none;
}

.image {
    width: 100px;
    height: 100px;
}

.D7 {
    width: 90px;
    height: 120px;
    margin: 0 40px;
}

.bottom-img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
}

.SP {
    display: block;
    text-align: center;
    color: rgb(204, 197, 197);
}
</style>