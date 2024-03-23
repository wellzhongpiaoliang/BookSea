<template>
    <div class="box">
        <h1 class="h">你居然找到了这里,给你3秒回去</h1>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
setTimeout(() => {
    router.push("/home")
}, 3000)
</script>

<style lang="less" scoped>
.h{
    padding-top: 30px;
    margin: 20px auto;
    width: 450px;
    height: 30px;
}
.box{
    width: 100%;
    height: 720px;
    background-image: url("../img/home/404.png");
}
</style>