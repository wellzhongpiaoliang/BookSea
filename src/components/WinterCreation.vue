
<template>
    <div class="box">
        <h1>{{ book.title }}</h1>
        <p>{{ book.description }}</p>
        <div>
            <h2>活动详情</h2>
            <p>{{ activity.description }}</p>
            <p>日期：{{ activity.date }}</p>
            <el-button v-if="!registrationClosed" @click="register">报名参与</el-button>
            <p v-else>您已报名</p>
        </div>
        <p>最终解释权归书海书城所有<router-link to="/home">返回主页</router-link></p>
    </div>
    
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
    data() {
        return {
            book: {
                title: '《Vue 精通》',
                description: '深入学习Vue.js的最佳选择。',
            },
            activity: {
                description: '加入我们，共同探讨《Vue 精通》的精华内容。',
                date: '2023-12-31',
                registrationClosed: false,
            },
        };
    },
    computed: {
        registrationClosed() {
            return this.activity.registrationClosed;
        },
    },
    methods: {
        register() {
            // 实现报名逻辑，可以根据需要进行更改
            ElMessage({
                type: 'success',
                message: '报名成功',
            })
            this.activity.registrationClosed = true
        },
        updateRegistrationStatus() {
            // 可以根据需要实现报名截止日期的逻辑
            const now = new Date();
            const eventDate = new Date(this.activity.date);

            this.activity.registrationClosed = now > eventDate;
        },
    },
    mounted() {
        // 检查并更新报名状态
        this.updateRegistrationStatus();
    },
};
</script>

<style scoped>
.box{
    margin: 20px auto;
    width: 400px;
    height: 500px;
}
</style>