<template>
  <!-- 信息展示 -->
  <div class="box" v-show="flg">
    <img class="userImg" :src="userDataS.userImg">
    <p>书海ID: {{ userDataS.userId }}</p>
    <p>昵称: {{ userDataS.userName }} <span class="member" style="color: red;" v-if="member">会员</span><span
        v-if="!member">普通用户</span></p>
    <p>性别: {{ userDataS.userGender }}</p>
    <p>书币: <span style="color: red;">{{ userStore.user.userMoney }}</span></p>
    <p>手机号: {{ userDataS.userPhone }}</p>
    <p>邮箱: {{ userDataS.userEmail }}</p>
    <p>个人简介: {{ userDataS.userSignature }}</p>
    <p>最后一次登录时间: {{ userDataS.userOuttime }}</p>
    <p>注册时间: {{ userDataS.userCreatedat }}</p>
    <el-button type="primary" plain @click="UppDate()">修改</el-button>
    <el-button type="warning" @click="out()">退出登录</el-button>
  </div>
  <!-- 修改信息 -->
  <div class="box" v-show="!flg">
    <div>
      <!-- :http-request="UserImgRequest" -->
      <el-upload class="upload-demo" title="选择后立即上传,请先修改好信息后再上传头像" action="http://localhost:8081/file/upload" :show-file-list="false" drag
        :on-success="successUpload" multiple accept=".jpg, .png">
        <!-- accept=".jpg, .png" 只能上传.jpg .png -->
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          <em v-show="flgs">点击上传头像</em>
          <em v-show="!flgs">已上传头像</em>
        </div>
      </el-upload>
    </div>
    <p class="upDataText">昵称:</p><el-input class="textInput" v-model="userData.userName"
      :placeholder="userDataS.userName" /><br>
    <p class="upDataText">性别:</p><el-input class="textInput" v-model="userData.userGender"
      :placeholder="userDataS.userGender" /><br>
    <p class="upDataText1">手机号:</p><el-input class="textInput" v-model="userData.userPhone"
      :placeholder="userDataS.userPhone" /><br>
    <p class="upDataText">邮箱:</p><el-input class="textInput" v-model="userData.userEmail"
      :placeholder="userDataS.userEmail" /><br>
    <p class="upDataText2">个人简介:</p><el-input class="textInput1" v-model="userData.userSignature" type="textarea"
      :rows="1" :placeholder="userDataS.userSignature" /><br>
    <el-button type="primary" class="btnUpDate" plain @click="AffirmUpDate()">确认修改</el-button>

    <el-button type="primary" plain @click="Back()">返回</el-button>
  </div>
</template>

<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import { useUserStore } from '@/store/index'
import { useRouter } from 'vue-router'
import { UpDateUser } from '@/api/user'
// import { UpdateFile } from '@/api/upFile'
const userStore = useUserStore()
const router = useRouter()

// 修改切换
let flg = ref(true)
let flgs = ref(true)
// 会员 / 普通切换 / 修改后的用户头像
let member = ref(false)
let userImgs = ref('')
// 判断是会员还是普通用户
if(userStore.user.userRole == 1){
  member.value = true
}
// 修改前的数据
let userDataS = ref({
  userId: userStore.user.userId,
  userName: userStore.user.userName,
  userGender: userStore.user.userGender,
  userImg: userStore.user.userImg,
  userPhone: userStore.user.userPhone,
  userEmail: userStore.user.userEmail,
  userSignature: userStore.user.userSignature,
  userOuttime: userStore.user.userOuttime,
  userCreatedat: userStore.user.userCreatedat,
  userUpdatedat:0
})
// 修改后的数据
let userData = ref({
  userName: '',
  userGender: '',
  userImg: '',
  userPhone: '',
  userEmail: '',
  userSignature: '',
})

// 修改
function UppDate() {
  flg.value = false
}

// 返回
function Back() {
  ElMessage({
    message: '取消修改' // 默认提示图标为灰色感叹号
  })
  flg.value = true
}

// 上传头像后返回头像的新名字
function successUpload(res){
  // console.log(res);
  flgs.value = false
  userImgs.value = res
}
// 确认修改
async function AffirmUpDate() {
  let a = 0
  // 判断是否有值  使用typeof (file.name)判断undefined
  if (typeof (userImgs.value) != "undefined" && userImgs.value!='') {
    a++
    // 设置头像的URL地址
    userDataS.value.userImg = "http://localhost:8081/img/user/"+ userImgs.value
  }
  if (userData.value.userName != '' && userData.value.userName.length <= 24) {
    a++
    // 赋值数据
    userDataS.value.userName = userData.value.userName
//     清空原数据
    userData.value.userName = ''
  }
  if (userData.value.userGender != '') {
    a++
    userDataS.value.userGender = userData.value.userGender
    userData.value.userGender = ''
  }
  if (userData.value.userPhone != '') {
    a++
    userDataS.value.userPhone = userData.value.userPhone
    userData.value.userPhone = ''
  }
  if (userData.value.userEmail != '') {
    a++
    userDataS.value.userEmail = userData.value.userEmail
    userData.value.userEmail = ''
  }
  if (userData.value.userSignature != '') {
    a++
    userDataS.value.userSignature = userData.value.userSignature
    userData.value.userSignature = ''
  }

  // 如果一个都没有修改则提示
  if (a == 0) {
    ElMessage({
      message: '您还一个都没有修改哦',
      type: 'error',
    })
  }
  if(a>0){
    userDataS.value.userUpdatedat = 1
    // 调用修改接口
    let res = await UpDateUser(userDataS.value)
    // 重新给userPinia赋值
    userStore.addUser(res.data)
    ElMessage({
      message: '修改成功',
      type: 'success',
    })
    // 清空图片缓存
    userImgs.value = ''
    // 返回信息页面
    flg.value = true
  }

}

// 退出登录
function out(){
   ElMessageBox.confirm(
    '确认退出登录吗?',
    {
      confirmButtonText: '确定',
      cancelButtonText: '再想想',
      type: 'error',
      center: true,
    },
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '退出成功',
      }), back()
    })
    .catch(() => {
      // ElMessage({
      //     message: '',
      // })
    })
}

// 退出登录
function back(){
  // 删除数据
  userStore.DelUser()
  userStore.removeToken()
  router.push("/login")
}
</script>
<style>
.el-upload-dragger{
  padding: 0px;
  height: 120px;
}
</style>
<style lang="less" scoped>
.upload-demo {
  margin-left: 75px;
  width: 120px;
  height: 120px;
  margin-bottom: 10px;
}

.el-icon--upload {
  width: 40px;
  padding: 0px;
  margin: 0px;
}

.el-upload__text {
  margin: 0px;
  font-size: 12px;
}

.userImg {
  width: 120px;
  height: 120px;
  background-color: #fff;
  border-radius: 50%;
  border: 3px solid #ccc;
}

.box {
  margin-left: 20px;
  width: 550px;
  height: 600px;
}

// 会员
.member {
  margin-left: 10px;
}

.textInput {
  width: 220px;
  margin-bottom: 10px;
}

.textInput1 {
  position: relative;
  top: -6px;
  width: 220px;
  margin-bottom: 10px;
}

.upDataText {
  display: inline-block;
  position: relative;
  font-size: 16px;
  margin-right: 5px;
  margin-left: 33px;
  top: -6px;
}

.upDataText1 {
  display: inline-block;
  position: relative;
  font-size: 16px;
  margin-right: 5px;
  margin-left: 17px;
  top: -6px;
}

.upDataText2 {
  display: inline-block;
  position: relative;
  font-size: 16px;
  margin-right: 5px;
  top: -6px;
}
.btnUpDate{
  margin-left: 72px;
}
</style>