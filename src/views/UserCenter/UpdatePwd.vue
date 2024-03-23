<template>
    <div>
        <p class="upDataText">原密码:</p><el-input show-password class="textInput" v-model="pwd1" placeholder="oldPassword" /> <br>
        <p class="upDataText">新密码:</p><el-input show-password class="textInput" v-model="pwd2" placeholder="newPassword" /> <br>
        <p class="upDataText">确认新密码:</p><el-input show-password class="textInput1" v-model="pwd3" placeholder="affirmNewPassword" /> <br>
        <el-button class="button" type="primary" plain @click="AffirmUpDate()"> 确认修改</el-button>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { UpdatePwd } from '@/api/user'
import { useUserStore } from '@/store/index';
import { useRouter } from 'vue-router';
import { ref } from 'vue'

const router = useRouter()
const userStore = useUserStore()
let pwd1 = ref('')
let pwd2 = ref('')
let pwd3 = ref('')
// 确认修改
async function AffirmUpDate() {

    // 密码不得为空
    if(pwd1.value == '' || pwd2.value == '' || pwd3.value == ''){
         ElMessage.error('密码不得为空')
         return
    }
    // 密码长度不得小于6,不得大于18
    if (pwd3.value.length >= 18 || pwd2.value.length >= 18 || pwd1.value.length >= 18 || pwd1.value.length <6 || pwd2.value.length < 6 || pwd3.value.length < 6 ) {
        ElMessage.error('密码长度在6-18之间')
        return
    }
    // 判断两次密码是否相同
    if (pwd1.value != '' && pwd2.value != '' && pwd3.value != '') {
        if(pwd2.value != pwd3.value){
            ElMessage.error('第一次密码和第二次密码不一致')
            return
        }
        if(pwd1.value != userStore.user.userPassword){
            console.log("密码不对");
            ElMessage.error('旧密码错误,请检查')
            return
        }
        // 封装要修改的用户id和密码
        const user = {
            userId: userStore.user.userId,
            userPassword: pwd3.value
        }
        // 执行密码修改
        const pwd = await UpdatePwd(user)
        if(pwd.data == "修改成功"){
            ElMessage({
                message: '修改成功',
                type: 'success',
            })
            // 修改密码后让用户重新登录
            ElMessage.error('检测到密码修改,请重新登录')
            // 删除数据
            userStore.DelUser()
            userStore.removeToken()
            router.push("/login")
        }
        if(pwd.data == "修改失败"){
            ElMessage.error(pwd.data)
            return
        }
    }

     
}
</script>

<style lang="less" scoped>
.upDataText {
    display: inline-block;
    position: relative;
    font-size: 16px;
    margin-right: 5px;
    margin-left: 33px;
    top: -6px;
}

.textInput {
    margin-left: 31px;
    width: 220px;
    margin-bottom: 10px;
}
.textInput1 {
    width: 220px;
    margin-bottom: 10px;
}
.button{
    margin-top: 10px;
    margin-left: 121px;
}
</style>