<template>
    <el-carousel height="250px">
        <el-carousel-item v-for="item in carouseData" :key="item">
            <img style="height: 100%;width: 100%;" :src="item.url" alt="" />
        </el-carousel-item>
    </el-carousel>

    <div class="bookBodyRight">
        <p class="titleBookBody">书海小说出版向文学作品长期征稿</p>
        <div class="bookBodyRightS">
            <div class="bookBodyRightRight">
                <div class="bt">
                    <span class="span">书海小说网</span>&nbsp;&nbsp;
                    <span class="span">2023-12-12</span>
                </div>
                <div class="bt2">
                    <p>寻找字里行间有灵魂涌动的文字</p>
                    <p>将文字赋予纸张，出版实体书籍</p>
                    <p>为鼓励广大作者进行出版向文学作品创作，番茄小说网自即日起正式开启此次征稿启事，投稿作品均有机会获得丰厚保底签约奖励&amp;出版奖励</p>
                    <h2>1、征稿时间</h2>
                    <el-collapse v-model="activeNames" @change="handleChange">
                        <el-collapse-item title="长期有效" name="1">
                            <div>征稿时间从书海小说网创建至今长期有效</div>
                            <div>欢迎广大作家参与投稿</div>
                        </el-collapse-item>
                    </el-collapse>
                    <h2>2、征稿类型</h2>
                    <el-collapse v-model="activeNames" @change="handleChange">
                        <el-collapse-item title="类型一：散文/随笔题材要求" name="1">
                            <div>生活、叙事、人物、风景、情感等类型的作品，要求作品内容有真实感和代入感，具备文学独特性。例如蔡崇达《皮囊》、陈年喜《微尘》、故园风雨前《幸得诸君慰平生》、《巷里林泉》等</div>
                            <div>
                                <ul>
                                    <li><b>字数要求：</b>1500—3000字</li>
                                </ul>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="类型二：小说题材要求" name="2">
                            <div>
                                情感、都市、幻想、乡村、小人物等虚构/非虚构类型的作品，不包含科幻、悬疑、灵异、奇幻等架空题材。要求作品主题明确，逻辑清晰，故事完整，具备文学独特性。例如蔡崇达《命运》、陈春成《夜晚的潜水艇》等
                            </div>
                            <div>
                                <ul>
                                    <li><b>短篇字数要求：</b>8000—30000字</li>
                                    <li><b>长篇字数要求：</b>不少于90000字</li>
                                </ul>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                    <h2>3、投稿要求</h2>
                    <el-collapse v-model="activeNames" @change="handleChange">
                        <el-collapse-item title="投稿联系方式" name="1">
                            <div>
                                <ul>
                                    <li><b>投稿邮箱:qweqweqwe@bytedance.com</b></li>
                                    <li><b>邮件标题：作品名+作者名</b></li>
                                    <li><b>稿件内容：</b></li>
                                    <ul>
                                        <li>散文/随笔&短篇小说：作品全文+作者个人联系方式，作品以word格式放于邮件正文处</li>
                                        <li>长篇小说：一句话介绍作品+200-400字内容简介+3万字样章+作者个人联系方式，作品以word格式放于邮件正文处</li>
                                        <li>如作品已完稿请附全文内容若投稿后15日内未收到邮件回复，则视为作品未入选，作者可另行安排作品</li>
                                    </ul>
                                </ul>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                    <h2>4、征稿奖励</h2>
                    <el-collapse v-model="activeNames" @change="handleChange">
                        <el-collapse-item title="长期征稿，稳定奖励等你拿" name="1">
                            <div>
                                <ul>
                                    <li><b>保底签约奖励：150-650元/千字</b></li>
                                    <li><b>出版奖励：</b></li>
                                    <ul>
                                        <li>散文/随笔：优质作品一经过稿在签约同时可同番茄签署代理出版权，并优先推动版权开发，包括但不限于有声/长短剧/出版/动漫/游戏等</li>
                                        <li>小说：优质作品一经过稿在签约同时可同番茄签署代理出版权和影视版权，并优先推动版权开发，包括但不限于有声/长短剧/出版/动漫/游戏等</li>
                                    </ul>
                                </ul>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                    <h2>5、注意事项</h2>
                    <blockquote>
                        <p>参与征稿的作品需主题鲜明，内容积极，情节完整，可读性强，不可恶意断更，作品需体现人文情怀，拒绝导向低俗、含有违反国家法律法规的内容</p>
                        <p>投稿作品应首次在网络发表且作者拥有独立版权，如作品有任何侵权行为，将取消本次征稿获得的一切奖励</p>
                        <p>为保障番茄小说网作家的权益，维护原创文学自由、严谨的创作环境，违规作品平台有权随时终止参与征稿资格，以下行为将被平台认定为违规行为：</p>
                        <p>①作品出现违反国家规定的情况，例如涉黄、涉黑、涉政、侮辱英烈等国家明令禁止的剧情片段；</p>
                        <p>②作品出现抄袭、恶意水文、枪稿续写、旧稿挪用、恶意重复章节等明显违背作家职业道德的行为；</p>
                        <p>③作品合同期间，私自将签约作品的任何版权授权他人使用等；</p>
                        <p>本次征稿接受广大作家及读者监督，举报或意见反馈可发送至邮箱</p>
                        <p>original_articles@bytedance.com，或通过番茄小说网作家反馈通道与我们联系</p>
                        <p>投稿作品均需遵守番茄小说福利页注意事项</p>
                        <p>最终解释权归书海书城所有<router-link to="/home">返回主页</router-link></p>
                    </blockquote>
                </div>
            </div>
        </div>
    </div>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    <router-view/>
</template>

<script setup>
let carouseData = [
    {
        url:"https://p3-novel.byteimg.com/origin/novel-static/293a0b3fcb2d13aa790ba450728625f2"
    }
]
</script>

<style lang="less" scoped>
.bookBodyRight {
    width: 100%;
    height: 850px;
}


.titleBookBody {
    font-size: 24px;
    margin-top: 6px;
    margin-left: 38px;
    font-weight: bold;
}


.bookBodyRightRight {
    width: 100%;
    height: auto;
    display: flex;
    padding: 20px;
    flex-wrap: wrap;
    box-shadow: 0 10px 10px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, 0.05);
}



.span {
    color: rgb(107, 107, 107);
}

.bt {
    width: 100%;
    height: 30px;

}

.bt2 {
    margin-bottom: 10px;
}
</style>