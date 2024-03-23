<template>
    <div class="hot-prefecture">
        <!-- 韦富 -->
        <!-- 热门专区 -->
        <h1>热门书籍</h1>
        <p>欢迎来到书的世界</p>
        <p>以下是我们现有的一些热门书籍：</p>
        <ul>
            <li v-for="(book, index) in books" :key="index">
                {{ book.title }} - {{ book.author }} - {{ book.sunnary }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            books: [
                { title: '三国演义', author: '罗贯中', sunnary: '《三国演义》是中国古代小说四大名著之一，描写了三国时期的历史和英雄人物。' },
                { title: '红楼梦', author: '曹雪芹', sunnary: '《红楼梦》是中国古代小说四大名著之一，被誉为中国古代小说的巅峰之作。' },
                { title: '西游记', author: '吴承恩', sunnary: '《西游记》是中国古代小说四大名著之一，讲述了孙悟空等人取经之旅。' },
                { title: '水浒传', author: '施耐庵', sunnary: '《水浒传》是中国古代小说四大名著之一，描绘了108位好汉的英雄事迹。' }
            ]
        }
    }
}
</script>

<style lang="less" scoped>
.hot-prefecture {
    background-color: #f0f0f0;
    padding: 20px;
    text-align: center;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin-bottom: 20px;
}
</style>