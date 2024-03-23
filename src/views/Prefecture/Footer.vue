<template>
    <el-footer class="footers">
        <div class="footerTs">
            <div class="footersLeft">
                <img class="userIcon" src="../../img/home/书.svg">
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
                    <img class="QRcode" src="../../img/home/广自.png"> <br>
                    <span>微信扫描二维码浏览</span>
                </div>
                <div>
                    <img class="QRcode" src="../../img/home/dy广自.png"> <br>
                    <span>抖音扫描二维码关注</span>
                </div>
            </div>
        </div>
    </el-footer>
</template>

<script setup>

</script>

<style lang="less" scoped>
body{
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
.userIcon{
    width: 40px;
}
</style>