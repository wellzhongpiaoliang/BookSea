<template>
    <div class="top">
        <!-- 读者 -->
        <div>
            <div>
                <p>读者:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <el-radio-group v-model="radio1">
                    <el-radio label="1" border>全部</el-radio>
                    <el-radio label="899999" border>男生</el-radio>
                    <el-radio label="90000000" border>女生</el-radio>
                </el-radio-group>
            </div>
        </div>
        <!-- 分类 -->
        <div>
            <div>
                <p>分类:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <el-radio-group v-model="radio2">
                    <el-radio label="1" border>全部</el-radio>
                    <el-radio label="10010" border>情节</el-radio>
                    <el-radio label="10011" border>角色</el-radio>
                    <el-radio label="10004" border>传记</el-radio>
                </el-radio-group>
            </div>
        </div>
        <div>
            <div>
                <p>状态:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <el-radio-group v-model="radio3">
                    <el-radio label="1" border>全部</el-radio>
                    <el-radio label="已完结" border>已完结</el-radio>
                    <el-radio label="连载中" border>连载中</el-radio>
                </el-radio-group>
            </div>
        </div>
        <div>
            <div>
                <p>字数:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <el-radio-group v-model="radio4">
                    <el-radio label="1" border>全部</el-radio>
                    <el-radio label="18" border>20万以下</el-radio>
                    <el-radio label="30" border>20万-50万</el-radio>
                    <el-radio label="80" border>50万-100万</el-radio>
                    <el-radio label="150" border>100万-200万</el-radio>
                    <el-radio label="201" border>200万以上</el-radio>
                </el-radio-group>
            </div>
        </div>
    </div>
    <div v-show="flgs" class="body">
        <template v-for="item in books">
            <div @click="bookUrl(item.bookId)" class="bookBox">
                <div class="left">
                    <img class="img" :src="item.bookCoverimage">
                </div>
                <div class="right">
                    <p class="bookName">{{ item.bookName }}</p>
                    <span>{{ item.bookEnd }}</span><span>{{ item.bookState }}</span>
                    <p class="text">{{ item.bookIntroduction }}</p>
                    <p class="time">2023-11-25</p>
                </div>
            </div>
        </template>

    </div>
    <div v-show="!flgs">
        <el-empty description="没有数据"/>
    </div>
    <div v-show="flgs" class="Fen">
        <el-pagination @current-change="currentChange" background layout="prev, pager, next" v-model='pageSize'
            :default-page-size="18" :total="bookList.length" />
    </div>
    <div>
        <router-view></router-view>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router';
import { getBookDataService } from '@/api/book'
const router = useRouter()

let radio1 = ref('1')
let radio2 = ref('1')
let radio3 = ref('1')
let radio4 = ref('1')

let pageSize = ref()
let flgs = ref(true)
// 分页后的数据
let books = ref()

// 总数据
const bookList = ref('')
// let bookList = ref([
//     {
//         id: 0,
//         bookName: "书名1",
//         authorName: "作者名",
//         bookImg: "https://img2.doubanio.com/view/subject/s/public/s29486581.jpg",
//         bookEnd: '已完结',
//         bookIntroduction: '一个活在自己世界中的孤僻少年，与一个活泼明媚得像一缕阳光的少女樱良在某种奇异的状况下相遇了。二者相遇的故事就像老套的电视情节，少女得了绝症，将自己的情况写在日记里，日记被少年捡到，二人的生活自此有了交集。然而随着情节的发展，故事不再老套，情节发生了剧变……',
//         booksNum: '26万',
//         bookTime: '2023-11-20'
//     },
//     {
//         id: 1,
//         bookName: "书名2",
//         authorName: "作者名",
//         bookImg: "https://img2.doubanio.com/view/subject/s/public/s29486581.jpg",
//         bookEnd: '已完结',
//         bookIntroduction: '一个活在自己世界中的孤僻少年，与一个活泼明媚得像一缕阳光的少女樱良在某种奇异的状况下相遇了。二者相遇的故事就像老套的电视情节，少女得了绝症，将自己的情况写在日记里，日记被少年捡到，二人的生活自此有了交集。然而随着情节的发展，故事不再老套，情节发生了剧变……',
//         booksNum: '26万',
//         bookTime: '2023-11-20'
//     },
//     {
//         id: 2,
//         bookName: "书名3",
//         authorName: "作者名",
//         bookImg: "https://img2.doubanio.com/view/subject/s/public/s29486581.jpg",
//         bookEnd: '已完结',
//         bookIntroduction: '一个活在自己世界中的孤僻少年，与一个活泼明媚得像一缕阳光的少女樱良在某种奇异的状况下相遇了。二者相遇的故事就像老套的电视情节，少女得了绝症，将自己的情况写在日记里，日记被少年捡到，二人的生活自此有了交集。然而随着情节的发展，故事不再老套，情节发生了剧变……',
//         booksNum: '26万',
//         bookTime: '2023-11-20'
//     },
//     {
//         id: 3,
//         bookName: "书名4",
//         authorName: "作者名",
//         bookImg: "https://img2.doubanio.com/view/subject/s/public/s29486581.jpg",
//         bookEnd: '已完结',
//         bookIntroduction: '一个活在自己世界中的孤僻少年，与一个活泼明媚得像一缕阳光的少女樱良在某种奇异的状况下相遇了。二者相遇的故事就像老套的电视情节，少女得了绝症，将自己的情况写在日记里，日记被少年捡到，二人的生活自此有了交集。然而随着情节的发展，故事不再老套，情节发生了剧变……',
//         booksNum: '26万',
//         bookTime: '2023-11-20'
//     },
//     {
//         id: 4,
//         bookName: "书名5",
//         authorName: "作者名",
//         bookImg: "https://img2.doubanio.com/view/subject/s/public/s29486581.jpg",
//         bookEnd: '已完结',
//         bookIntroduction: '一个活在自己世界中的孤僻少年，与一个活泼明媚得像一缕阳光的少女樱良在某种奇异的状况下相遇了。二者相遇的故事就像老套的电视情节，少女得了绝症，将自己的情况写在日记里，日记被少年捡到，二人的生活自此有了交集。然而随着情节的发展，故事不再老套，情节发生了剧变……',
//         booksNum: '26万',
//         bookTime: '2023-11-20'
//     },
//     {
//         id: 5,
//         bookName: "书名6",
//         authorName: "作者名",
//         bookImg: "https://img2.doubanio.com/view/subject/s/public/s29486581.jpg",
//         bookEnd: '已完结',
//         bookIntroduction: '一个活在自己世界中的孤僻少年，与一个活泼明媚得像一缕阳光的少女樱良在某种奇异的状况下相遇了。二者相遇的故事就像老套的电视情节，少女得了绝症，将自己的情况写在日记里，日记被少年捡到，二人的生活自此有了交集。然而随着情节的发展，故事不再老套，情节发生了剧变……',
//         booksNum: '26万',
//         bookTime: '2023-11-20'
//     },
//     {
//         id: 6,
//         bookName: "书名7",
//         authorName: "作者名",
//         bookImg: "https://img2.doubanio.com/view/subject/s/public/s29486581.jpg",
//         bookEnd: '已完结',
//         bookIntroduction: '一个活在自己世界中的孤僻少年，与一个活泼明媚得像一缕阳光的少女樱良在某种奇异的状况下相遇了。二者相遇的故事就像老套的电视情节，少女得了绝症，将自己的情况写在日记里，日记被少年捡到，二人的生活自此有了交集。然而随着情节的发展，故事不再老套，情节发生了剧变……',
//         booksNum: '26万',
//         bookTime: '2023-11-20'
//     },
//     {
//         id: 7,
//         bookName: "书名8",
//         authorName: "作者名",
//         bookImg: "https://img2.doubanio.com/view/subject/s/public/s29486581.jpg",
//         bookEnd: '已完结',
//         bookIntroduction: '一个活在自己世界中的孤僻少年，与一个活泼明媚得像一缕阳光的少女樱良在某种奇异的状况下相遇了。二者相遇的故事就像老套的电视情节，少女得了绝症，将自己的情况写在日记里，日记被少年捡到，二人的生活自此有了交集。然而随着情节的发展，故事不再老套，情节发生了剧变……',
//         booksNum: '26万',
//         bookTime: '2023-11-20'
//     },
//     {
//         id: 8,
//         bookName: "书名9",
//         authorName: "作者名",
//         bookImg: "https://img2.doubanio.com/view/subject/s/public/s29486581.jpg",
//         bookEnd: '已完结',
//         bookIntroduction: '一个活在自己世界中的孤僻少年，与一个活泼明媚得像一缕阳光的少女樱良在某种奇异的状况下相遇了。二者相遇的故事就像老套的电视情节，少女得了绝症，将自己的情况写在日记里，日记被少年捡到，二人的生活自此有了交集。然而随着情节的发展，故事不再老套，情节发生了剧变……',
//         booksNum: '26万',
//         bookTime: '2023-11-20'
//     },
//     {
//         id: 9,
//         bookName: "书名10",
//         authorName: "作者名",
//         bookImg: "https://img2.doubanio.com/view/subject/s/public/s29486581.jpg",
//         bookEnd: '已完结',
//         bookIntroduction: '一个活在自己世界中的孤僻少年，与一个活泼明媚得像一缕阳光的少女樱良在某种奇异的状况下相遇了。二者相遇的故事就像老套的电视情节，少女得了绝症，将自己的情况写在日记里，日记被少年捡到，二人的生活自此有了交集。然而随着情节的发展，故事不再老套，情节发生了剧变……',
//         booksNum: '26万',
//         bookTime: '2023-11-20'
//     },
//     {
//         id: 10,
//         bookName: "书名11",
//         authorName: "作者名",
//         bookImg: "https://img2.doubanio.com/view/subject/s/public/s29486581.jpg",
//         bookEnd: '已完结',
//         bookIntroduction: '一个活在自己世界中的孤僻少年，与一个活泼明媚得像一缕阳光的少女樱良在某种奇异的状况下相遇了。二者相遇的故事就像老套的电视情节，少女得了绝症，将自己的情况写在日记里，日记被少年捡到，二人的生活自此有了交集。然而随着情节的发展，故事不再老套，情节发生了剧变……',
//         booksNum: '26万',
//         bookTime: '2023-11-20'
//     },
//     {
//         id: 11,
//         bookName: "书名12",
//         authorName: "作者名",
//         bookImg: "https://img2.doubanio.com/view/subject/s/public/s29486581.jpg",
//         bookEnd: '已完结',
//         bookIntroduction: '一个活在自己世界中的孤僻少年，与一个活泼明媚得像一缕阳光的少女樱良在某种奇异的状况下相遇了。二者相遇的故事就像老套的电视情节，少女得了绝症，将自己的情况写在日记里，日记被少年捡到，二人的生活自此有了交集。然而随着情节的发展，故事不再老套，情节发生了剧变……',
//         booksNum: '26万',
//         bookTime: '2023-11-20'
//     },
//     {
//         id: 12,
//         bookName: "书名13",
//         authorName: "作者名",
//         bookImg: "https://img2.doubanio.com/view/subject/s/public/s29486581.jpg",
//         bookEnd: '已完结',
//         bookIntroduction: '一个活在自己世界中的孤僻少年，与一个活泼明媚得像一缕阳光的少女樱良在某种奇异的状况下相遇了。二者相遇的故事就像老套的电视情节，少女得了绝症，将自己的情况写在日记里，日记被少年捡到，二人的生活自此有了交集。然而随着情节的发展，故事不再老套，情节发生了剧变……',
//         booksNum: '26万',
//         bookTime: '2023-11-20'
//     },
//     {
//         id: 13,
//         bookName: "书名14",
//         authorName: "作者名",
//         bookImg: "https://img2.doubanio.com/view/subject/s/public/s29486581.jpg",
//         bookEnd: '已完结',
//         bookIntroduction: '一个活在自己世界中的孤僻少年，与一个活泼明媚得像一缕阳光的少女樱良在某种奇异的状况下相遇了。二者相遇的故事就像老套的电视情节，少女得了绝症，将自己的情况写在日记里，日记被少年捡到，二人的生活自此有了交集。然而随着情节的发展，故事不再老套，情节发生了剧变……',
//         booksNum: '26万',
//         bookTime: '2023-11-20'
//     },
//     {
//         id: 14,
//         bookName: "书名15",
//         authorName: "作者名",
//         bookImg: "https://img2.doubanio.com/view/subject/s/public/s29486581.jpg",
//         bookEnd: '已完结',
//         bookIntroduction: '一个活在自己世界中的孤僻少年，与一个活泼明媚得像一缕阳光的少女樱良在某种奇异的状况下相遇了。二者相遇的故事就像老套的电视情节，少女得了绝症，将自己的情况写在日记里，日记被少年捡到，二人的生活自此有了交集。然而随着情节的发展，故事不再老套，情节发生了剧变……',
//         booksNum: '26万',
//         bookTime: '2023-11-20'
//     },
//     {
//         id: 15,
//         bookName: "书名16",
//         authorName: "作者名",
//         bookImg: "https://img2.doubanio.com/view/subject/s/public/s29486581.jpg",
//         bookEnd: '已完结',
//         bookIntroduction: '一个活在自己世界中的孤僻少年，与一个活泼明媚得像一缕阳光的少女樱良在某种奇异的状况下相遇了。二者相遇的故事就像老套的电视情节，少女得了绝症，将自己的情况写在日记里，日记被少年捡到，二人的生活自此有了交集。然而随着情节的发展，故事不再老套，情节发生了剧变……',
//         booksNum: '26万',
//         bookTime: '2023-11-20'
//     },
//     {
//         id: 16,
//         bookName: "书名17",
//         authorName: "作者名",
//         bookImg: "https://img2.doubanio.com/view/subject/s/public/s29486581.jpg",
//         bookEnd: '已完结',
//         bookIntroduction: '一个活在自己世界中的孤僻少年，与一个活泼明媚得像一缕阳光的少女樱良在某种奇异的状况下相遇了。二者相遇的故事就像老套的电视情节，少女得了绝症，将自己的情况写在日记里，日记被少年捡到，二人的生活自此有了交集。然而随着情节的发展，故事不再老套，情节发生了剧变……',
//         booksNum: '26万',
//         bookTime: '2023-11-20'
//     },
//     {
//         id: 17,
//         bookName: "书名18",
//         authorName: "作者名",
//         bookImg: "https://img2.doubanio.com/view/subject/s/public/s29486581.jpg",
//         bookEnd: '已完结',
//         bookIntroduction: '一个活在自己世界中的孤僻少年，与一个活泼明媚得像一缕阳光的少女樱良在某种奇异的状况下相遇了。二者相遇的故事就像老套的电视情节，少女得了绝症，将自己的情况写在日记里，日记被少年捡到，二人的生活自此有了交集。然而随着情节的发展，故事不再老套，情节发生了剧变……',
//         booksNum: '26万',
//         bookTime: '2023-11-20'
//     },
//     {
//         id: 18,
//         bookName: "书名19",
//         authorName: "作者名",
//         bookImg: "https://img2.doubanio.com/view/subject/s/public/s29486581.jpg",
//         bookEnd: '已完结',
//         bookIntroduction: '一个活在自己世界中的孤僻少年，与一个活泼明媚得像一缕阳光的少女樱良在某种奇异的状况下相遇了。二者相遇的故事就像老套的电视情节，少女得了绝症，将自己的情况写在日记里，日记被少年捡到，二人的生活自此有了交集。然而随着情节的发展，故事不再老套，情节发生了剧变……',
//         booksNum: '26万',
//         bookTime: '2023-11-20'
//     },
//     {
//         id: 19,
//         bookName: "书名20",
//         authorName: "作者名",
//         bookImg: "https://img2.doubanio.com/view/subject/s/public/s29486581.jpg",
//         bookEnd: '已完结',
//         bookIntroduction: '一个活在自己世界中的孤僻少年，与一个活泼明媚得像一缕阳光的少女樱良在某种奇异的状况下相遇了。二者相遇的故事就像老套的电视情节，少女得了绝症，将自己的情况写在日记里，日记被少年捡到，二人的生活自此有了交集。然而随着情节的发展，故事不再老套，情节发生了剧变……',
//         booksNum: '26万',
//         bookTime: '2023-11-20'
//     },
//     {
//         id: 20,
//         bookName: "书名21",
//         authorName: "作者名",
//         bookImg: "https://img2.doubanio.com/view/subject/s/public/s29486581.jpg",
//         bookEnd: '已完结',
//         bookIntroduction: '一个活在自己世界中的孤僻少年，与一个活泼明媚得像一缕阳光的少女樱良在某种奇异的状况下相遇了。二者相遇的故事就像老套的电视情节，少女得了绝症，将自己的情况写在日记里，日记被少年捡到，二人的生活自此有了交集。然而随着情节的发展，故事不再老套，情节发生了剧变……',
//         booksNum: '26万',
//         bookTime: '2023-11-20'
//     },
//     {
//         id: 21,
//         bookName: "书名22",
//         authorName: "作者名",
//         bookImg: "https://img2.doubanio.com/view/subject/s/public/s29486581.jpg",
//         bookEnd: '已完结',
//         bookIntroduction: '一个活在自己世界中的孤僻少年，与一个活泼明媚得像一缕阳光的少女樱良在某种奇异的状况下相遇了。二者相遇的故事就像老套的电视情节，少女得了绝症，将自己的情况写在日记里，日记被少年捡到，二人的生活自此有了交集。然而随着情节的发展，故事不再老套，情节发生了剧变……',
//         booksNum: '26万',
//         bookTime: '2023-11-20'
//     },
//     {
//         id: 22,
//         bookName: "书名23",
//         authorName: "作者名",
//         bookImg: "https://img2.doubanio.com/view/subject/s/public/s29486581.jpg",
//         bookEnd: '已完结',
//         bookIntroduction: '一个活在自己世界中的孤僻少年，与一个活泼明媚得像一缕阳光的少女樱良在某种奇异的状况下相遇了。二者相遇的故事就像老套的电视情节，少女得了绝症，将自己的情况写在日记里，日记被少年捡到，二人的生活自此有了交集。然而随着情节的发展，故事不再老套，情节发生了剧变……',
//         booksNum: '26万',
//         bookTime: '2023-11-20'
//     },
//     {
//         id: 23,
//         bookName: "书名24",
//         authorName: "作者名",
//         bookImg: "https://img2.doubanio.com/view/subject/s/public/s29486581.jpg",
//         bookEnd: '已完结',
//         bookIntroduction: '一个活在自己世界中的孤僻少年，与一个活泼明媚得像一缕阳光的少女樱良在某种奇异的状况下相遇了。二者相遇的故事就像老套的电视情节，少女得了绝症，将自己的情况写在日记里，日记被少年捡到，二人的生活自此有了交集。然而随着情节的发展，故事不再老套，情节发生了剧变……',
//         booksNum: '26万',
//         bookTime: '2023-11-20'
//     },
//     {
//         id: 24,
//         bookName: "书名25",
//         authorName: "作者名",
//         bookImg: "https://img2.doubanio.com/view/subject/s/public/s29486581.jpg",
//         bookEnd: '已完结',
//         bookIntroduction: '一个活在自己世界中的孤僻少年，与一个活泼明媚得像一缕阳光的少女樱良在某种奇异的状况下相遇了。二者相遇的故事就像老套的电视情节，少女得了绝症，将自己的情况写在日记里，日记被少年捡到，二人的生活自此有了交集。然而随着情节的发展，故事不再老套，情节发生了剧变……',
//         booksNum: '26万',
//         bookTime: '2023-11-20'
//     },
//     {
//         id: 25,
//         bookName: "书名26",
//         authorName: "作者名",
//         bookImg: "https://img2.doubanio.com/view/subject/s/public/s29486581.jpg",
//         bookEnd: '已完结',
//         bookIntroduction: '一个活在自己世界中的孤僻少年，与一个活泼明媚得像一缕阳光的少女樱良在某种奇异的状况下相遇了。二者相遇的故事就像老套的电视情节，少女得了绝症，将自己的情况写在日记里，日记被少年捡到，二人的生活自此有了交集。然而随着情节的发展，故事不再老套，情节发生了剧变……',
//         booksNum: '26万',
//         bookTime: '2023-11-20'
//     },
//     {
//         id: 26,
//         bookName: "书名27",
//         authorName: "作者名",
//         bookImg: "https://img2.doubanio.com/view/subject/s/public/s29486581.jpg",
//         bookEnd: '已完结',
//         bookIntroduction: '一个活在自己世界中的孤僻少年，与一个活泼明媚得像一缕阳光的少女樱良在某种奇异的状况下相遇了。二者相遇的故事就像老套的电视情节，少女得了绝症，将自己的情况写在日记里，日记被少年捡到，二人的生活自此有了交集。然而随着情节的发展，故事不再老套，情节发生了剧变……',
//         booksNum: '26万',
//         bookTime: '2023-11-20'
//     },
// ])

onBeforeMount: {
    // 初始化分页
    getBookData()
}

watch((radio1),
    (newVal, oldVal) => {
        getBookData()
    }
)
watch((radio2),
    (newVal, oldVal) => {
        getBookData()
    }
)
watch((radio3),
    (newVal, oldVal) => {
        getBookData()
    }
)
watch((radio4),
    (newVal, oldVal) => {
        getBookData()
    }
)

async function getBookData(){
    let a = radio1.value
    let b = radio2.value
    let c = radio3.value
    let d = radio4.value
    if(radio1.value == "1"){
        a = null
    }
    if (radio2.value == "1") {
        b = null
    }
    if (radio3.value == "1") {
        c = null
    }
    if (radio4.value == "1") {
        d = null
    }
    const book ={
        bookRead:a,
        bookCategory:b,
        bookEnd:c,
        bookNum:d
    }
    const res = await getBookDataService(book)
    bookList.value = res.data
    books.value = bookList.value.slice(0 * 18, 1 * 18)
    if(bookList.value.length == 0){
        flgs.value = false
    }
    if (bookList.value.length != 0) {
        flgs.value = true
    }
}

// 书籍详情
function bookUrl(id){
    router.push({
        path: '/BookDetails',
        query:{
            bookId:id
        }
    })
}

function currentChange(val) {
    // 切换分页触发
    books.value = bookList.value.slice((val - 1) * 18, val * 18)
}

pageSize = bookList.value.length
</script>

<style lang="less" scoped>
p {
    display: inline-block;
}

.top {
    width: 1200px;
    margin: 50px auto;
}

.body {
    margin: 0 auto;
    width: 1300px;
    min-height: 0px;
    display: flex;
    flex-wrap: wrap;

}

.bookBox {
    margin-top: 20px;
    margin-left: 50px;
    width: 380px;
    display: flex;
    height: 180px;
}

.left {
    width: 120px;
    height: 180px;
}

.img {
    width: 120px;
    height: 178px;
    border-radius: 8px;
}

.right {
    margin-left: 10px;
    width: 280px;
    height: 170px;
}

.bookName {
    display: block;
    margin: 10px 0 0 0;
    font-size: 16px;
}

span {
    font-size: 13px;
    color: #999999;
    margin-right: 20px;
}

.text {
    margin: 0;
    display: block;
    font-size: 13px;
    overflow: hidden;
    color: #999999;
    width: 280px;
    height: 87px;
}

.bookBox:hover{
    cursor: pointer;
}

.time {
    margin: 10px 0 0 0;
    display: block;
    width: 280px;
    color: #999999;
    font-size: 13px;
}

.Fen {
    min-width: 100px;
    height: 50px;
    margin: 10px auto;
}
</style>