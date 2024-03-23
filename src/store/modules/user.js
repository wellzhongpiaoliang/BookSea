import { defineStore } from 'pinia'
import { ref } from 'vue'

// 用户模块store 新增,删除token
export const useUserStore = defineStore('big-user',() => {
  // token
  const token = ref('')
  let user = ref({
    userId:-1,
    userName:'',
    userSignature:'',
    userImg:'',
    userGender:'',
    userEmail:'',
    userPassword:'',
    userPhone:'',
    userCreatedat:'',
    userUpdatedat:'',
    userStatus:'',
    userRole:'',
    userOuttime:'',
    userMoney:0
  })
  // 存入token
  const setToken = (newToken) => {
    token.value = newToken
  }
  const addUser = (newUser) => {
    user.value.userId = newUser.userId
    user.value.userName = newUser.userName
    user.value.userSignature = newUser.userSignature
    user.value.userImg = newUser.userImg
    user.value.userGender = newUser.userGender
    user.value.userPhone = newUser.userPhone
    user.value.userEmail = newUser.userEmail
    user.value.userPassword = newUser.userPassword
    user.value.userCreatedat = newUser.userCreatedat
    user.value.userUpdatedat = newUser.userUpdatedat
    user.value.userStatus = newUser.userStatus
    user.value.userRole = newUser.userRole
    user.value.userMoney = newUser.userMoney.toFixed(2)
    user.value.userOuttime = newUser.userOuttime
  }
  const DelUser = () => {
    user.value = {
      userId: -1,
      userName: '',
      userSignature: '',
      userImg: '',
      userGender: '',
      userEmail: '',
      userPassword: '',
      userPhone: '',
      userCreatedat: '',
      userUpdatedat: '',
      userStatus: '',
      userRole: '',
      userOuttime: '',
      userMoney: 0
    }
  }
  // 清空token
  const removeToken = () => {
    token.value = ''
  }
  return {
    user,
    token,
    addUser,
    DelUser,
    setToken,
    removeToken
  }
},
  {
    // persist设置为true表示一切按默认配置即可
    persist:true
  }
)