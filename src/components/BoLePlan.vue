<template>
    <img class="TimeImg" src="https://p3-novel.byteimg.com/origin/novel-static/ec250c4bcd6205cbd30a5d3f8876709e">
    <div class="box">
        <span class="title">伯乐计划, 你的作品都会发光发热 | 短故事限时激励活动</span>
        <p style="font-size: 14px;color: #ccc;">书海小说网 2023-12-20 03:32:21 阅读量:22.1w</p>
        <div class="box1">
            <p style="color: #999999;">你烟波诡谲，十面埋伏，方寸间腾越千里——你沉迷悬疑。</p>
            <p style="color: #999999;">你千般情愫，跃然纸上，呢喃里道尽旖旎——你歌颂爱情。</p>
            <p style="color: #999999;">你天马行空，龙吟凤舞，挥洒下漫天星河——你绘筑幻想。</p>
            <p style="color: #999999;">……</p>
            <p style="color: #999999;">妙极！</p>
            <p style="color: #999999;">那我茅庐三顾，研墨濡毫，邀你来写！</p>
        </div>
        <br>
        <p>截止目前——</p>
        <p style="font-weight: 600;">单篇短故事月稿费最高达20万+！</p>
        <p style="font-weight: 600;">单篇收益累计超3万元短故事80+篇！</p>
        <p style="font-weight: 600;">月稿费超1万元的作者200+位！</p>
        <br>
        <h2>活动时间：</h2>
        <p style="font-weight: 600;">2023 年 12月 18 日-2024 年 01月 30 日23点59分（以签约完成时间为准）</p>
        <h2>活动对象：</h2>
        <p style="font-weight: 600;">书海签约作者均可参加（23年 11 月 30 日23点59分前已签约作者）</p>
        <h2>活动规则|奖励：</h2>
        <p style="font-weight: 600;">1.活动期内作品签约并达标，则可获得当月稿费的额外高比例分成，达标1本即可锁定下一本额外激励的机会，多达标多得！</p>
        <p style="font-weight: 600;">2.活动期内作品一经签约，即可获得抖音/头条专属流量曝光，及集团内各平台海量推书达人直推机会，早签早推！多邀多赚！</p>
        <p style="font-weight: 600;">3.历史有成绩作者有机会申请保底，名额不设上限，通过的作品可获得最高千字 1000 元的保底合约。</p>
        <br>
        <h2>投稿方式</h2>
        <p style="font-weight: 600;">投稿方式：必须全文投稿，要求独家首发作品、字数不低于6000字，禁止一稿多投</p>
        <p style="font-weight: 600;">投稿邮箱：</p>
        <p style="font-weight: 500;margin-left: 20px;">编辑小毛：846152539@qq.com</p>
        <p style="font-weight: 500;margin-left: 20px;">编辑小黄：54353453@qq.com</p>
        <p style="font-weight: 500;margin-left: 20px;">编辑小韦：543244435@qq.com</p>
        <p style="font-weight: 500;margin-left: 20px;">编辑家湘：765675756@qq.com</p>
        <p style="font-weight: 500;margin-left: 20px;">编辑品德：337676575@qq.com</p>
        <br><br>
        <p>最终解释权归书海书城所有<router-link to="/home">返回主页</router-link></p>
   </div>
   <router-view/>
</template>

<script setup>
import { useRoute } from 'vue-router'
const router = useRoute()

let id = router.query.activity

</script>

<style lang="less" scoped>
.title{
    font-size: 26px;
    font-weight: 500;
}
.TimeImg{
    width: 100%;
}
.box{
    margin: 20px auto;
    width: 900px;
    height: 1300px;
}
.box1{
    width: 100%;
    height: 210px;
    box-sizing: border-box;
    padding-left: 20px;
    border-left: 2px solid #ccc;
}
</style>