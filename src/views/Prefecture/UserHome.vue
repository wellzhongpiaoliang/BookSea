<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="Left" width="200px">
        <div class="box1">
          <p class="UserData">个人资料</p>
          <ul class="UserDataUl">
            <router-link to="/home/userHome/userData">
              <li class="UserDataLi">个人资料 </li>
            </router-link>
            <router-link to="/home/userHome/updatePwd">
              <li class="UserDataLi">修改密码</li>
            </router-link>
          </ul>
        </div>
        <div class="box2">
          <p class="UserData">充值相关</p>
          <ul class="UserDataUl">
            <router-link to="/home/userHome/topUp">
              <li class="UserDataLi">充值</li>
            </router-link>
            <router-link to="/home/userHome/order">
              <li class="UserDataLi">订单管理</li>
            </router-link>
            <router-link to="/home/userHome/record">
              <li class="UserDataLi">记录</li>
            </router-link>
          </ul>
        </div>
        <div class="box3">
          <p class="UserData">书籍信息</p>
          <ul class="UserDataUl">
            <router-link to="/home/userHome/bookCollect">
              <li class="UserDataLi">收藏の书 </li>
            </router-link>
            <router-link to="/home/userHome/readRecord">
              <li class="UserDataLi">阅读记录</li>
            </router-link>
            <router-link to="/home/userHome/myComment">
              <li class="UserDataLi">我的评论</li>
            </router-link>
          </ul>
        </div>
      </el-aside>
      <el-main class="Right"><router-view /></el-main>
    </el-container>
  </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
ul {
  padding: 0px;
  margin: 0px;
}

li {
  list-style: none;
}

li:hover {
  background-color: #efefef;
}

p {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}

.common-layout {
  width: 100%;
  margin: 0 auto;
}

.Left {
  width: 260px;
  height: 668px;
}

.Right {
  border-left: 2px solid black;
  // width: calc(); // 计算属性
}

.box1 {
  width: 260px;
  height: 160px;
}

.box2 {
  width: 260px;
  height: 220px;
}

.box3 {
  width: 260px;
  height: 230px;
}

.UserData {
  box-sizing: border-box;
  padding-left: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 22px;
  border-left: 3px solid black;
}

.UserDataLi {
  line-height: 50px;
  box-sizing: border-box;
  color: black;
  padding-left: 95px;
  height: 50px;
}
.UserDataLi:hover {
  color:#969CD0;
}
// 969CD0
</style>