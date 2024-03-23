<template>
    <!-- 主页 -->
    <div>
        <el-carousel height="240px" direction="horizontal" style="border-radius: 5px;" :autoplay="true">
            <el-carousel-item height="240px" v-for="item in bookCarousel" :key="item.id">
                <img @click="bookActivity(item.id)" class="booksCarousel" :src="item.books">
            </el-carousel-item>
        </el-carousel>
        <!-- 活动链接 -->
        <div class="ActivityBody">
            <div class="ActivityBody1" @click="AuthorPrefecture()">
                <div class="ActivityBody11">
                    <p style="margin-bottom: 5px;padding: 0;">作家专区</p>
                    <p class="p1">作家们的聚集地</p>
                </div>
                <div class="ActivityBodyS">
                    <p><el-icon>
                            <ArrowRightBold />
                        </el-icon></p>
                </div>
            </div>
            <div class="ActivityBody1" @click="CopyrightPrefecture()">
                <div class="ActivityBody11">
                    <p style="margin-bottom: 5px;padding: 0;">版权专区</p>
                    <p class="p1">书海旗下的优质书籍</p>
                </div>
                <div class="ActivityBodyS">
                    <p><el-icon>
                            <ArrowRightBold />
                        </el-icon></p>
                </div>
            </div>
            <div class="ActivityBody1" @click="HotPrefecture()">
                <div class="ActivityBody11">
                    <p style="margin-bottom: 5px; padding: 0;">热门专区</p>
                    <p class="p1">好看的作品都在这里!!</p>
                </div>
                <div class="ActivityBodyS">
                    <p><el-icon>
                            <ArrowRightBold />
                        </el-icon></p>
                </div>
            </div>
        </div>
        <!-- 书籍展示 -->
        <div class="bookBody">
            <div class="bookBodyLeft">
                <p class="titleBookBody1">新书热榜</p>
                <ul class="uls" v-if="booksList != ''">
                    <template v-for="items in booksList" :key="items.bookId">
                        <li class="Lis" @click="bookUrl(items.bookId)">
                            <span class="liText">{{ items.bookName }}</span>
                            <span class="lisRight"><el-icon>
                                    <ArrowRight />
                                </el-icon></span>
                        </li>
                    </template>
                </ul>
                <router-link to="/home/bookData"><span class="ActivityMore">更多>></span></router-link>
            </div>
            <div class="bookBodyRight">
                <p class="titleBookBody">主编力荐</p>
                <div class="bookBodyRightS" v-if="publishers !=''">
                    <div class="bookBodyRightLeft" @click="bookUrl(publishers[0].bookId)">
                        <img class="bookBodyRightLeftImg" src="../../img/demo/胰脏物语.jpg">
                        <p class="bookName">{{ publishers[0].bookName }}</p>
                        <p class="activityName">{{ Authors.authorsName }}</p>
                        <p class="contentText">{{ publishers[0].bookIntroduction }}</p>
                    </div>
                    <div class="bookBodyRightRight" v-if="publishers != ''">
                        <template  v-for="item in publishers">
                            <div  @click="bookUrl(item.bookId)" class="bookBodyRightRightBody">
                                <img class="bookBodyRightRightBodyImg" :src="item.bookCoverimage" alt=""> <br>
                                <span class="booksName">{{ item.bookName }}</span> <br>
                                <span class="activitySName">{{ item.authorName }}</span>
                            </div>
                        </template>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <br><br><br>
    <router-view />
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { NewBookService, getByPublishers, getBookDetailsAndAuthors } from '@/api/book'
const router = useRouter()
// 重置滚动条
window.scrollTo(0, 0)
// 书籍
let booksList = ref('')
let publishers = ref('')
let Authors = ref('')

// 初始化数据
getNewBook()

let bookCarousel = reactive([
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
]
)

// 直接调用

async function getNewBook(){
    // 初始化数据
    const l = await NewBookService()
    const o = await getByPublishers()
    console.log(o.data);
        // 获取作者
    const authors = await getBookDetailsAndAuthors(o.data[0].authorsId)
    publishers.value = o.data
    booksList.value = l.data
    Authors.value = authors.data
}
// 书籍活动
function bookActivity(id) {
    if(id == 0){
        router.push({
            path: '/winterTrainingCamp',
            query: {
                activity: id
            }
        })
    }

    if (id == 1) {
        router.push({
            path: '/winterCreation',
            query: {
                activity: id
            }
        })
    }
    if (id == 2) {
        router.push({
            path: '/cloudProject',
            query: {
                activity: id
            }
        })
    }
    if (id == 3) {
        router.push({
            path: '/workCollection',
            query: {
                activity: id
            }
        })
    }
        if (id == 4) {
        router.push({
            path: '/boLePlan',
            query: {
                activity: id
            }
        })
    }
}

// 作家专区
function AuthorPrefecture() {
    router.push('/AuthorPrefecture')
}

// 版权专区

function CopyrightPrefecture() {
    router.push('/copyrightPrefecture')
}

//热门专区
function HotPrefecture() {
    router.push('/hotPrefecture')
}

// 书籍详情
function bookUrl(id) {
    router.push({
        path: '/BookDetails',
        query: {
            bookId: id
        }
    })
}
</script>

<style lang="less" scoped>
.booksCarousel {
    width: 100%;
    height: 100%;
}

.ActivityBody {
    margin: 0 auto;
    width: 100%;
    height: 90px;
    display: flex;
    justify-content: space-around;
}

.ActivityBody1 {
    float: left;
    width: 240px;
    height: 100px;

    .p1 {
        margin: 0;
        font-size: 13px;
        color: #ccc;
    }
}

.ActivityBodyS {
    position: relative;
    top: -55px;
    width: 50px;
    height: 100px;
    float: right;

    p {
        float: right;
        margin-top: 24px;
        font-size: 20px;
        font-weight: bold;
    }
}

.bookBody {
    margin: 0 auto;
    display: flex;
    width: 1200px;
    height: 500px;
}

.bookBodyLeft {
    width: 28%;
    height: 500px;
    overflow: hidden;
}

.uls {
    padding: 0px;
    width: 320px;
    height: 380px;
}

.Lis {
    list-style: none;
    padding-top: 6px;
    width: 300px;
    height: 42px;
    margin-bottom: 2px;
    margin-left: 10px;
    align-content: center;
}

.liText {
    display: inline-block;
    width: 280px;
    font-weight: 200;
    overflow: hidden;
}

.liText:hover {
    text-decoration: underline;
}

.lisRight {
    float: right;
}

.ActivityMore {
    display: inline-block;
    margin-left: 10px;
    color: #ccc;
    text-align: center;
    cursor: pointer;
    align-content: center;
}

.ActivityMore:hover {
    text-decoration: underline;
}

.bookBodyRight {
    width: 72%;
    height: 500px;
}

.bookBodyRightS {
    width: 100%;
    display: flex;
    height: 448px;
}

.bookBodyRightLeft {
    width: 33%;
    height: 448px;
    background-color: #FAFAFA;
    border-radius: 10px;
}

.titleBookBody1 {
    font-size: 24px;
    margin-top: 6px;
    margin-left: 14px;
    font-weight: bold;
}

.titleBookBody {
    font-size: 24px;
    margin-top: 6px;
    margin-left: 38px;
    font-weight: bold;
}

.bookBodyRightLeftImg {
    width: 73%;
    height: 310px;
    margin-left: 38px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.bookBodyRightLeftImg:hover {
    cursor: pointer;
}

.bookName {
    margin-top: 10px;
    margin-left: 33px;
    margin-bottom: 4px;
    font-size: 22px;
    font-weight: 700;
}

.activityName {
    margin-top: 0px;
    margin-left: 33px;
    margin-bottom: 0px;
    font-size: 15px;
    color: #969696;
}

.contentText {
    margin-top: 10px;
    margin-left: 33px;
    margin-bottom: 0px;
    
    font-size: 13px;
    width: 213px;
    height: 55px;
    overflow: hidden;
    text-overflow: ellipsis;
    // white-space:nowrap;
    -webkit-line-clamp:2; //显示的行
    color: #969696;
}

.bookBodyRightRight {
    width: 67%;
    height: 448px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.bookBodyRightRightBody {
    width: 144px;
    height: 220px;
}

.bookBodyRightRightBodyImg {
    width: 83%;
    height: 176px;
    margin-left: 12px;
}

.bookBodyRightRightBodyImg:hover {
    cursor: pointer;
}

.booksName {
    display: inline-block;
    width: 120px;
    height: 22px;
    margin-left: 10px;
    text-align: center;
    font-size: 14px;
}

.activitySName {
    margin-left: 10px;
    font-size: 13px;
    color: #969696;
}
</style>