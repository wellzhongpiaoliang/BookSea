<template>
    <div class="common-layout">

        <el-container>
            <el-aside class="left"></el-aside>
            <el-main class="right">
                <div>
                    <img class="shuHai" src="../img/login/书海.png">
                    <!-- 登录 -->
                    <div class="loginBox" v-show="flg === 0">
                        <p>欢迎您!请登录</p>
                        <div class="loginEmailAndPwd">
                            <span>邮箱: </span><el-input class="loginInput" v-model="loginEmail" placeholder="请输入邮箱"
                                clearable /><br>
                            <span>密码: </span><el-input class="loginInput" v-model="loginPwd" type="password"
                                placeholder="请输入密码" show-password />
                        </div>
                        <div class="check">
                            <el-checkbox v-model="checked1" label="保存密码" size="large" />
                            <el-checkbox v-model="checked2" label="同意协议" size="large" />
                        </div>
                        <el-button class="loginBtn" type="success" @click="Enter()">登录</el-button>
                        <el-button class="registerBtn" type="primary" @click="Login()">没有账号?注册→</el-button>
                    </div>
                    <!-- 注册 -->
                    <div class="loginBox" v-show="flg === 1">
                        <p>您好,请注册</p>
                        <el-input class="loginInput registerInput" v-model="fromModule.registerUserName" placeholder="昵称"
                            clearable />
                        <el-input class="loginInput registerInput" v-model="fromModule.registerEmail" placeholder="邮箱"
                            clearable />
                        <el-input class="loginInput registerInput" v-model="fromModule.registerPwd" type="password"
                            placeholder="密码" show-password />
                        <el-input class="loginInput registerInput" v-model="fromModule.newRegisterPwd" type="password"
                            placeholder="再次输入密码" show-password />
                        <el-button class="register1" type="primary" @click="RegisterUp()">立即注册</el-button>
                        <el-button class="register2" type="primary" @click="Register()">返回</el-button>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { userLoginService, UpDateUser, userRegisterService, getByEmailAndUser } from '@/api/user'
import { useUserStore } from '@/store/index'

const userStore = useUserStore()

// let userStore = ref(useUserStore().user)
const router = useRouter()
// 登录邮箱, 密码
let loginEmail = ref('')
let loginPwd = ref('')
// 保存密码 / 同意协议
let checked1 = ref(false)
let checked2 = ref(false)

// 登录/注册切换
let flg = ref(0)

// 注册邮箱 ,
let fromModule = ref({
    registerUserName: '',
    registerEmail: '',
    registerPwd: '',
    newRegisterPwd: ''
})

// 登录切换
function Login() {
    flg.value = 1
    fromModule.value = []
}

// 注册切换
function Register() {
    flg.value = 0
    loginPwd.value = ''
}

// 登录方法
async function Enter() {

    // 获取时间
    let yy = new Date().getFullYear();
    let mm = new Date().getMonth() + 1;
    let dd = new Date().getDate();
    let Time = yy + "-" + mm + "-" + dd
    // 登录api
    const res = await userLoginService(loginEmail.value, loginPwd.value)
    // 获取data
    const data = res.data.data
    if (!checked2.value) {
        ElMessage({
            message: '您必须同意协议才能登录',
            type: 'error',
        })
        return
    }

    if (res.data.code != 200) {
        ElMessage({
            message: '账号或者密码错误',
            type: 'error',
        })
        return
    }
    if (res.data.code == 200) {
        let user = {
            userId: res.data.data.userId,
            userOuttime: Time
        }
        // 修改用户最后一次登录的时间
        const time = await UpDateUser(user)
        // 登录成功后设置token
        userStore.setToken(data.token)
        // 将用户数据存入pinia 
        userStore.addUser(data)
        ElMessage({
            message: '登录成功',
            type: 'success', // 提示icon
        })
        router.push('/home')
    }
}

// 立即注册
async function RegisterUp() {
    // 用户名邮箱密码不能尾款
    if ((fromModule.value.registerEmail == null || fromModule.value.registerEmail == '') && (fromModule.value.registerUserName == null || fromModule.value.registerUserName == '') && (fromModule.value.registerPwd == null || fromModule.value.registerPwd == '')) {
        ElMessage({
            message: '用户名和密码不能为空!!!',
            type: 'error',
        })
        return
    }
    // 判断两次密码是否相同
    if (fromModule.value.registerPwd != fromModule.value.newRegisterPwd) {
        ElMessage({
            message: '两次输入的密码要一致',
            type: 'error',
        })
        return
    }
    if ((fromModule.value.registerEmail != null || fromModule.value.registerEmail != '') && (fromModule.value.registerUserName != null || fromModule.value.registerUserName != '') && (fromModule.value.registerPwd != null || fromModule.value.registerPwd != '')) {
        const re = await getByEmailAndUser(fromModule.value.registerEmail)
        console.log();
        if (typeof(re.data.userId) == "undefined") {
            let res = await userRegisterService(fromModule.value.registerUserName, fromModule.value.registerEmail, fromModule.value.registerPwd)
            ElMessage({
                message: '注册成功',
                type: 'success',
            })
            flg.value = 0
        }else{
            ElMessage({
                message: '注册失败,该邮箱已经注册过',
                type: 'error',
            })
            return
        }
    }

}
</script>

<style lang="less" scoped>
body {
    background-color: #eee;
}

span {
    position: relative;
    font-size: 18px;
    font-weight: bold;
    top: -7px;
    // border: 1px solid red;
}

p {
    margin-top: 30px;
    margin-left: 105px;
    font-size: 13px;
    color: #48838E;
}

.shuHai {
    margin: 40px auto;
    display: block;
    width: 160px;
    height: 100%;
}

.left {
    background-image: url('@/img/login/loginLeft.png');
    background-repeat: no-repeat;
    background-size: 100%;
    height: 734px;
    width: 50.5%;
}

.right {
    background-color: #A9A8CC;
    width: 49.5%;
}

.loginBox {
    margin: 50px auto;
    width: 500px;
    height: 340px;
    border: 2px dashed #48838E;
    border-radius: 15px;
}

.loginBtn {
    width: 160px;
    height: 44px;
    margin-left: 160px;
    margin-top: 10px;
}

.register1 {
    position: relative;
    top: 45px;
    left: -280px;
}

.register2 {
    position: relative;
    top: 6px;
    left: 309px;
}

.loginInput {
    // display: block;
    width: 280px;
    margin-bottom: 20px;
    height: 36px;
}

.registerInput {
    margin-left: 100px;
    margin-bottom: 10px;
}

.loginEmailAndPwd {
    margin-top: 30px;
    margin-left: 60px;
}

.registerBtn {
    position: relative;
    top: 55px;
    left: 15px;
}

.check {
    margin-left: 125px;
}
</style>