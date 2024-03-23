<template>
    <div class="bookstore">
        <h1>黄家湘</h1>
        <h1>作家专区</h1>
        <ul>
            <li v-for="writer in writers" :key="writer.id" @click="navigateToBook(writer.books[0])">
                <div class="writer-info">
                    <img :src="writer.cover" alt="作者封面" @click="highlightCover(writer)">
                    <h2>{{ writer.name }}</h2>
                    <p>作品数量：{{ writer.books.length }}</p>
                </div>
                <ul class="books-list">
                    作品列表
                    <div style="display: flex;">
                        <li v-for="books in writer.books" :key="book" @click="navigateToBook(book)">
                            <img :src="books.cover" alt="封面">
                            <span style="display: block; margin-top: 10px;">{{ books.title }}</span>
                        </li>
                    </div>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        const writers = [
            {
                id: 1,
                name: '张三',
                cover: 'https://img2.doubanio.com/view/subject/s/public/s29486581.jpg',
                books: [
                    { title: '小说1', cover: 'https://img2.doubanio.com/view/subject/s/public/s29486581.jpg' },
                    { title: '小说2', cover: 'https://img2.doubanio.com/view/subject/s/public/s29486581.jpg' },
                ],
            },
            {
                id: 2,
                name: '李四',
                cover: 'https://img2.doubanio.com/view/subject/s/public/s29486581.jpg',
                books: [
                    { title: '小说3', cover: 'https://img2.doubanio.com/view/subject/s/public/s29486581.jpg' },
                    { title: '小说4', cover: 'https://img2.doubanio.com/view/subject/s/public/s29486581.jpg' },
                    { title: '小说4', cover: 'https://img2.doubanio.com/view/subject/s/public/s29486581.jpg' },
                    { title: '小说4', cover: 'https://img2.doubanio.com/view/subject/s/public/s29486581.jpg' },
                ],
            },
            {
                id: 3,
                name: '王五',
                cover: 'https://img2.doubanio.com/view/subject/s/public/s29486581.jpg',
                books: [
                    { title: '小说5', cover: 'https://img2.doubanio.com/view/subject/s/public/s29486581.jpg' },
                    { title: '小说6', cover: 'https://img2.doubanio.com/view/subject/s/public/s29486581.jpg' },
                    { title: '小说6', cover: 'https://img2.doubanio.com/view/subject/s/public/s29486581.jpg' },
                    { title: '小说6', cover: 'https://img2.doubanio.com/view/subject/s/public/s29486581.jpg' },
                    { title: '小说6', cover: 'https://img2.doubanio.com/view/subject/s/public/s29486581.jpg' },
                    { title: '小说6', cover: 'https://img2.doubanio.com/view/subject/s/public/s29486581.jpg' },
                ],
            },
        ];

        const highlightedWriter = ref(null);

        function navigateToBook(book) {
            window.location.href = `/book/${book}`;
        }

        function highlightCover(writer) {
            if (highlightedWriter.value === writer) {
                highlightedWriter.value = null;
            } else {
                highlightedWriter.value = writer;
            }
        }

        return {
            writers,
            highlightedWriter,
            navigateToBook,
            highlightCover,
        };
    },
};
</script>

<style scoped>
.bookstore {
    width: 80%;
    margin: 0 auto;
}

h1 {
    text-align: center;
    margin-bottom: 20px;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    background-color: #f9f9f9;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
}

.writer-info {
    display: flex;
    align-items: center;
}

img {
    width: 50px;
    height: 75px;
    margin-right: 10px;
    transition: transform 0.3s;
}

img:hover {
    transform: scale(1.1);
}

h2 {
    margin-right: 10px;
}

.books-list {
    list-style: none;
    padding: 0;
    margin-top: 10px;
}

li {
    margin-bottom: 5px;
    cursor: pointer;
}
</style>
