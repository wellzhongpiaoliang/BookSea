<template>
    <div>
        活动
        <br>
        {{ id }}
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const router = useRoute()

let id = router.query.activity

</script>

<style lang="less" scoped>

</style>