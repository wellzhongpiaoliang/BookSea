<template>

    <!-- 韦品德 -->
    <!-- 版权专区 -->
    <el-container>
        <el-header class="headers">
            <div class="sy">
                <router-link class="sy2" to="/home">返回首页</router-link>
            </div>
        </el-header>
    </el-container>

    <!-- 动态消息 -->
    <div class="flex-e1">

        <div class="container">
            <div class="left-bar">
                <h1>动态消息</h1>
                <div class="lf">
                    <ul>
                        <li>
                            <a href="" target="_blank">书海小说网自有渠道言情控正式起航！</a>
                        </li>
                        <li>
                            <a href="" target="_blank">书海小说自有渠道言情控正式起航！</a>
                        </li>
                        <li>
                            <a href="" target="_blank">书海小说自有渠道言情控正式起航！</a>
                        </li>
                        <li>
                            <a href="" target="_blank">书海小说自有渠道言情控正式起航！</a>
                        </li>
                        <li>
                            <a href="" target="_blank">书海小说自有渠道言情控正式起航！</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div style="border-left: 2px solid #969696;"></div>
            <div class="main">
                <p>
                    书海网创建于2009年12月，是集创作、阅读、作品加工、IP运营为一体的中文小说阅读综合平台。
                    目前书海网全球alexa排名一万名左右，中文网站排名一千内。PC端、WAP站、APP每日流量超过50万人次，PV超过1000万。和近30家平台进行合作，月均全渠道销售额超过1600万。每月有超过2000本作品在红薯网连载，稿费发放总数超500万。
                </p>
                <el-button type="warning">作者免费入驻</el-button>
                <el-button type="success">版权绿色通道</el-button>
            </div>
        </div>
    </div>

    <!-- 版权作品 -->
    <div class="bookBodyRight">
        <p class="titleBookBody">版权作品推荐</p>
        <div class="bookBodyRightS">
            <div class="bookBodyRightRight">
                <div v-for="item in hotBook" class="bookBodyRightRightBody">
                    <img class="bookBodyRightRightBodyImg" :src="item.books" alt=""> <br>
                    <span class="booksName">{{ item.bookName }}</span> <br>
                    <span class="activitySName">{{ item.authorName }}</span>
                </div>
            </div>
        </div>
    </div>

    <!-- 入驻大神作者 -->
    <div class="flex-e2">
        <h1>入驻大神</h1>
        <section>
            <div class="card">
                <div class="box">
                    <div class="img-box">
                        <img src="../../src/img/zuoze/1.jpg" alt="">
                    </div>
                    <div class="con-box">
                        <div>
                            <h2>美越</h2>
                            <p>自2011年入驻红薯，先后创作了《美人计：妖后十七岁》《誓不为妃：腹黑王爷太难缠》《只宠小小妖妃》《天价宠儿：霸道总裁宠妻记》四部作品，涉及古言、现言、仙侠等题材，其中，《天价宠儿：霸道总裁宠妻记》长期霸占各大渠道榜单，现已经签约影视版权，半年内即将开机。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="box">
                    <div class="img-box">
                        <img src="../../src/img/zuoze/3.jpg" alt="">
                    </div>
                    <div class="con-box">
                        <div>
                            <h2>拈花惹笑</h2>
                            <p>红薯中文网当红作家，拥有众多书迷。微博粉丝两万多人。 长篇巨著《邪王轻点爱：枭宠医妃》《名门挚爱》在各大渠道点击过亿，在各大榜单名列前茅，新书《一诺倾城》已签约漫画改编</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="box">
                    <div class="img-box">
                        <img src="../../src/img/zuoze/2.jpg" alt="">
                    </div>
                    <div class="con-box">
                        <div>
                            <h2>六道</h2>
                            <p>原名谢景龙，网络大神作家，以《坏蛋是怎样炼成的》一书成名，作者塑造的主角谢文东是一个时代的偶像，掀起了一股热潮，是名副其实的都市热血第一巨著，霸占当年百度风云小说榜前3名！</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <br><br><br>
        <!-- 底部 -->
        <el-footer class="footers">
            <div class="footerTs">
                <div class="footersLeft">
                    <img class="userIcon" src="../../src/img/home/书.svg">
                    <p class="shuHai">书海小说网</p><br>
                    <router-link to="/demo">书海小说用户协议</router-link> <br>
                    <router-link to="/demo">书海小说隐私政策</router-link> <br>
                    <p class="pCopy">&copy;&nbsp;2023 广西自然资源职业技术学院</p>
                </div>
                <div class="footersCenter">
                    <p>桂ICP备XXXXXX号-X</p>
                    <p>营业执照 出版物经营许可证 广西自然资源职业技术学院</p> <br>
                    <p>广告投放:&nbsp;<a href="https://www.gxnrvtc.edu.cn/">www.gxnrvtc.edu.cn</a></p>
                    <p>不良信息举报:54839725@qq.com</p>
                    <p>意见邮箱:&nbsp;shuhai680@163.com</p>
                </div>
                <div class="footersRight">
                    <div>
                        <img class="QRcode" src="../../src/img/home/广自.png"> <br>
                        <span>微信扫描二维码关注</span>
                    </div>
                    <div>
                        <img class="QRcode" src="../../src/img/home/dy广自.png"> <br>
                        <span>抖音扫描二维码关注</span>
                    </div>
                </div>
            </div>
        </el-footer>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

let bookCarousel = ref([
    {
        id: 0,
        books: "https://p3-novel.byteimg.com/img/novel-static/ef64c3c3069652e2d706659143011ac9~0x0.jpeg"
    },
    {
        id: 1,
        books: "https://p6-novel.byteimg.com/origin/novel-static/7551b5460642e2bc0b6b0c78547c2673"
    },
    {
        id: 2,
        books: "https://p3-novel.byteimg.com/large/novel-static/fead927bcc807dc15b4b90d6e1214df4"
    },
    {
        id: 3,
        books: "https://p3-novel.byteimg.com/origin/novel-static/293a0b3fcb2d13aa790ba450728625f2"
    },
    {
        id: 4,
        books: "https://p3-novel.byteimg.com/origin/novel-static/ec250c4bcd6205cbd30a5d3f8876709e"
    },
])
let hotBook = ref([
    {
        id: 0,
        bookName: "书名",
        authorName: "作者名",
        books: "https://img2.doubanio.com/view/subject/s/public/s29486581.jpg"
    },
    {
        id: 1,
        bookName: "书名",
        authorName: "作者名",
        books: "https://img2.doubanio.com/view/subject/s/public/s29486581.jpg"
    },
    {
        id: 2,
        bookName: "书名",
        authorName: "作者名",
        books: "https://img2.doubanio.com/view/subject/s/public/s29486581.jpg"
    },
    {
        id: 3,
        bookName: "书名",
        authorName: "作者名",
        books: "https://img2.doubanio.com/view/subject/s/public/s29486581.jpg"
    },
    {
        id: 4,
        bookName: "书名",
        authorName: "作者名",
        books: "https://img2.doubanio.com/view/subject/s/public/s29486581.jpg"
    },

])

</script>

<style lang="less" scoped>
.bookBodyRight {
    width: 100%;
    height: 500px;
}

.bookBodyRightS {
    width: 100%;
    display: flex;
    height: 448px;
}


.titleBookBody {
    font-size: 24px;
    margin-top: 6px;
    margin-left: 38px;
    font-weight: bold;
}


.bookBodyRightRight {
    width: 100%;
    height: 350px;
    display: flex;
    padding: 20px;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    box-shadow: 0 10px 10px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, 0.05);
}

.bookBodyRightRightBody {
    width: 144px;
    height: 220px;
    padding: 40px;
}

.bookBodyRightRightBodyImg {
    width: 100%;
    margin-left: 10px;
}

.bookBodyRightRightBodyImg:hover {
    cursor: pointer;
}

.booksName {
    margin-left: 10px;
    font-size: 14px;
}

.activitySName {
    margin-left: 10px;
    font-size: 13px;
    color: #969696;
}

.headers {
    height: 60px;
}

.userIcon {
    margin-top: 10px;
    width: 45px;
    height: 45px;
}

.flex-e1 {
    width: 100%;
    height: 300px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}

.flex-e1 .container {
    flex: auto;
    display: flex;
    flex-direction: row;
}

.flex-e1 .container .left-bar {
    width: 50%;
    flex: none;
}

.flex-e1 .container .main {
    flex: auto;
}

.flex-e1 .container .left-bar .lf {
    width: 50%;
    flex: none;
    list-style: none;
    margin: 0 auto;
}

.flex-e1 .container .left-bar .lf a {
    color: #969696;
    text-decoration: none;
}

.flex-e1 .container .left-bar .lf a:hover {
    color: rgb(255, 66, 66);
}

.flex-e1 .container .main p {
    padding: 40px;
    font-size: 15px;
    line-height: 1.5;
    color: #969696;
}

// 底部
.body {
    width: 100vw;
    height: 100vh;
    background-color: var(--background-color);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
}

.footers {
    background-color: #F1F1F1;
    height: 260px;
}

.footerTs {
    width: 1200px;
    height: 200px;
    margin: 20px auto;
    display: flex;
    // background-color: #fff;

    .footersLeft {
        width: 300px;
        height: 200px;
        // background-color: #fff;

        a {
            margin-left: 10px;
            font-size: 13px;
            color: black;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        .shuHai {
            position: relative;
            top: -13px;
            left: 5px;
            display: inline-block;
            font-size: 21px;
            font-weight: bold;
            margin-bottom: 10px;

        }

        .pCopy {
            font-size: 13px;
            margin-top: 35px;
        }
    }

    .footersCenter {
        margin-left: 40px;
        width: 360px;
        height: 200px;
        // background-color: beige;

        p {
            font-size: 13px;
        }

        a {
            text-decoration: none;
            color: black;
        }

        a:hover {
            text-decoration: underline;
        }

        p {
            margin-top: 10px;
        }
    }

    .footersRight {
        display: flex;
        justify-content: space-between;
        margin-left: 260px;
        margin-top: 95px;
        width: 260px;
        height: 100px;
        // background-color: beige;

        .QRcode {
            padding-left: 18px;
            padding-right: 10px;
            width: 75px;
            height: 75px;
            // margin-left: 50px;
        }

        span {
            font-size: 13px;
        }
    }
}

.sy {
    display: flex;
    float: left;
    height: 60px;
}

.sy2 {
    text-decoration: none;
    font-size: 20px;
    color: rgb(89, 89, 89);
    margin-right: 40px;
    align-self: center;
}

//版权作者
.flex-e2 {
    width: 100%;
    height: 500px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    border-radius: 4px;
}

//版权作者
* {
    /* 初始化 */
    margin: 0;
    padding: 0;
}

body {
    /* 100%窗口高度 */
    min-height: 100vh;
    /* 弹性布局 水平+垂直居中 */
    display: flex;
    justify-content: center;
    align-items: center;
    /* 渐变背景 */
    background: linear-gradient(200deg, #fff1eb, #ace0f9);
}

section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    /* 开启3D效果 */
    transform-style: preserve-3d;
}

.card {
    /* 相对定位 */
    position: relative;
    width: 320px;
    height: 320px;
    margin: 20px;
    /* 开启3D效果 */
    transform-style: preserve-3d;
    /* 视距 */
    perspective: 1000px;
}

.card .box {
    /* 绝对定位 */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    /* 设置过渡 */
    transition: 1s ease;
}

.card .box .img-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.card .box .img-box img {
    width: 100%;
    height: 100%;
    /* 保持原有的尺寸比例，裁切长边 */
    object-fit: cover;
}

.card .box .con-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    /* 隐藏旋转div元素的背面 */
    backface-visibility: hidden;
    transform-style: preserve-3d;
    /* 默认沿Y轴旋转180度（在背面） */
    transform: rotateY(180deg);
}

.card .box .con-box div {
    color: #fff;
    padding: 20px;
    /* 渐变背景 */
    background: linear-gradient(30deg, #514a9d, #24c6dc);
    /* 默认沿Z轴偏移100px */
    transform: translateZ(100px);
}

.card .box .con-box div h2 {
    font-size: 20px;
    letter-spacing: 2px;
}

.card .box .con-box div p {
    font-size: 15px;
    text-align: justify;
    margin-top: 5px;
}

.card:hover .box {
    /* 鼠标移入，盒子旋转180度 */
    transform: rotateY(180deg);
}
</style>