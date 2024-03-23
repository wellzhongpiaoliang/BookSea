<template>
    <div :style="{ backgroundColor: bgColor }">
        <div class="box">
            <div class="box1">
                <div class="box2">
                    <img class="img" :src="`http://localhost:8081/img/manhua/${comic.comicImgs}`">
                </div>

                <div class="box3">
                    <h1 class="HH1">{{ comic.comicName }}
                        <router-link to="/manhuaxiangqing" class="a1">返回主页</router-link>
                    </h1>
                    <p1 class="aaa">{{ comic.press }}</p1>
                    <p2 class="P2">{{ comic.comicType }}</p2>
                    <p2 class="P2">{{ comic.updateTime }}</p2>
                    <p2 class="P2">{{ comic.updateQuantity }}</p2>
                    <h4 class="aaa1">{{ comic.introduction }}</h4>
                    <div>
                        <el-row class="mb-4">
                            <el-button type="primary" style="height: 50px;width: 200px;">
                                <h3>开始阅读 第 000 话</h3>
                            </el-button>
                            <el-button style="width: 150px; height: 50px;">
                                <h3>
                                    <span class="iconfont icon-ai64"></span>
                                    追漫
                                </h3>
                            </el-button>
                        </el-row>
                    </div>
                </div>
            </div>

            <div class="box4">
                <div class="box04">
                    <!-- 章节列表 -->
                    <h1 class="box5">章节列表
                        <el-row class="mb-4">
                            <el-button class="el1" type="warning">批量购买</el-button>
                        </el-row>
                    </h1>
                    <!-- 空盒子占位 -->
                    <!-- <div class="kongge"></div> -->
                    <div class="box6">
                        <a class="A1" href="#" v-for="(item, index) in items01" :key="index">
                            <button class="Button">{{ item }}
                            </button>
                        </a>
                    </div>
                    <!-- 漫画章节 -->
                    <div class="box7">
                        <a href="#" v-for="(item, index) in items" :key="index">
                            <button class="Button1">
                                <p1 class="p1" title="">{{ item }}</p1>
                            </button>
                        </a>
                    </div>

                    <div class="box8">
                        <h1>推荐漫画</h1>
                        <div class="box10" v-for="item in recommend" :key="item.comicId">
                            <div class="box9">
                                <p @click="jump(`http://localhost:8080/#/info/${item.comicId}`)">
                                    <img class="img1" :src="`http://localhost:8081/img/manhua/${item.comicImgs}`">
                                </p>
                            </div>
                            <div class="box12">
                                <h1 class="H1">{{ item.comicName }}</h1>
                                <p class="p2">{{ item.comicType }}</p>
                                <p class="p2">{{ item.comicStyle }}</p>
                                <p class="p2">{{ item.updateQuantity }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: ['id'],
    //全局背景颜色
    data() {
        return {
            bgColor: "rgb(250, 249, 249)",  // 这里是您想要的颜色代码
            comic: {},
            recommend: [],
            items: [
                "000 序章", "001 话", "002 话", "003 话",
                "004 话", "番外 ", "005 话", "006 话",
                "007 话", "008 话", "009 话", "010 话",
                "011 话", "012 话", "013 话", "014 话",
                "015 话", "016 话", "017 话", "018 话",
                "019 话", "020 话", "021 话", "022 话",
                "023 话", "024 话", "025 话", "026 话",
                "027 话", "028 话", "029 话", "030 话",
                "031 话", "032 话", "033 话", "034 话",
                "035 话", "036 话", "037 话", "038 话",
                "039 话", "040 话", "041 话", "042 话",
                "043 话", "044 话", "045 话", "046 话",
                "047 话", "048 话",
            ],
            items01: [
                "1 - 50",
                "51 - 100",
                "101 - 150",
                "151 - 200",
                "201 - 250",
                "251 - 300",
                "301 - 350",
                "351 - 400",
                "401 - 450",
                "451 - 500",
                "501 - 550",
            ],
        };
    },
    methods: {
        getComic() {
            console.log("id", this.id);
            axios.get(`http://localhost:8081/comic/info?id=${this.id}`).then((res) => {
                this.comic = res.data
                console.log("获取1", this.comic);
            })
        },
        getRecommend() {
            axios.get("http://localhost:8081/comic/recommend").then((res) => {
                this.recommend = res.data
                console.log("获取2", this.recommend);
            })
        },
        jump(path) {
            location.replace(path)
            this.getComic()
            this.getRecommend()
        }

    },
    mounted() {
        this.getComic()
        this.getRecommend()
    }
};
</script>

<style lang="less" scoped>
.a1 {
    position: absolute;
    // display: inline-block;
    font-size: 20px;
    margin-left: 480px;
    top: 20px;
    text-decoration: none;
    color: black;
}

.box {
    display: flex;
    display: block;
    width: 100%;
    height: auto;
    // border: 1px solid black;
    margin: auto;
}

.box1 {
    display: flex;
    margin-top: 100px;
    border-radius: 20px;
    margin: auto;
    width: 1250px;
    height: 450px;
    background-color: rgb(255, 255, 255);
}

.box2 {

    width: 260px;
    height: 400px;
    // border: 1px solid black;
    margin: 20px 30px;
    transform: translateY(20px);

}

// 图片
.img {
    width: 100%;
    height: 100%;
}

.img1 {
    // display: inline-block;
    width: 100%;
    height: 100%;
    margin: -20px 0;
}

.router-link {
    display: block;
}

//图片

.box3 {
    position: relative;
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    transform: translateY(10px);
    width: 900px;
    height: 400px;
}

//书名和作者
.aaa {
    margin: 35px 0;
    color: rgb(143, 143, 143);
}

.aaa1 {

    color: rgb(123, 123, 123);
}

.P2 {
    // margin-top: 20px;
    color: rgb(154, 157, 157);
}

.H1 {
    font-size: 20px;
    font-family: Georgia, 'Times New Roman', Times, serif;
    margin: 6px 0;
}

.HH1 {
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

.p2 {
    font-size: 13px;
    color: rgb(133, 131, 131);
    margin: 10px 0;
}

.box4 {
    display: flex;
}

.box04 {
    //想对定位
    position: relative;
    display: flex;
    display: inline-block;
    width: 1250px;
    height: 1300px;
    margin: 20px auto;
    border-radius: 20px;
    background-color: rgb(255, 255, 255);
}

.box5 {
    // display: inline-block;
    width: 170px;
    margin-left: 25px;
    // border: 1px solid black;
    height: 50px;
    margin-top: 11px;
}

//批量购买按钮
.el1 {
    // display: flex;
    background-color: orange;
    height: 26px;
    margin-top: -32px;
    margin-left: 139px;

}

.box6 {
    // border: 1px solid black;
    margin: 25px;
    width: 900px;
    height: auto;
    flex-wrap: wrap-reverse;
}

.box7 {
    width: 900px;
    height: 800px;
    margin: 25px;
    // border: 1px solid black;
    flex-wrap: wrap-reverse; //自动换行
}

.box8 {
    // box04的想对定位,往顶部
    display: flex;
    position: absolute;
    top: 10px;
    margin-left: 940px;
    width: 300px;
    height: auto;
    // background-color: rgb(246, 244, 244);
    //换行
    flex-wrap: wrap-reverse;
    display: inline-block;
}

.box9 {
    display: flex;
    display: block;
    width: 100px;
    height: 130px;
    margin: 10px;
    border-radius: 10px;
}

.box10 {
    display: flex;
    width: 300px;
    height: 150px;
    // border: 1px solid black;
    // margin: 5px;
}

.box11 {
    width: 100px;
    height: 130px;
    border-radius: 10px;
    border: none;
}

.box12 {
    // display: flex;
    //换行
    flex-wrap: wrap-reverse;
    margin-left: 0;
    margin-top: 5px;
    width: 170px;
    height: 140px;
    // border: 1px solid black;
}

// 章节按钮
.Button {
    background-color: rgb(235, 241, 245);
    margin: 10px;
    width: 80px;
    height: 35px;
    border-radius: 16px;
    border: none; //隐藏按钮边框
    cursor: pointer;
}

.Button1 {
    margin: 10px;
    width: 200px;
    height: 40px;
    border-radius: 6px;
    background-color: rgb(246, 246, 246);
    /* 默认的按钮颜色 */
    color: white;
    /* 默认的文字颜色 */
    overflow: hidden; // 超出文字隐藏
    white-space: nowrap;
    /* 文字将在一行内显示，不会换行 */
    border: 1px solid rgb(216, 227, 229);
}

.p1 {
    //章节按钮里面的字体颜色
    color: black;
    // padding-right: 50%;
    font-size: 17px; //字体大小
    font-family: Arial, Helvetica, sans-serif; //字体样式
}

.Button1:hover {
    background-color: rgb(216, 227, 229);
}
</style>