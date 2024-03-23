<template>
    <div>
        凌云计划(黄家湘)
        <br>
        活动id:{{ id }}
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const router = useRoute()

let id = router.query.activity

</script>

<style lang="less" scoped></style>