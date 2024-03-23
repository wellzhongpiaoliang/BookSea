import { createRouter, createWebHashHistory } from 'vue-router'
import BookHome from '@/components/BookHome'
import UserLogin from '@/components/UserLogin'
import DemoView from '@/components/DemoView'
import AuthorPrefecture from '@/components/AuthorPrefecture'
import HotPrefecture from '@/components/HotPrefecture'
import CopyrightPrefecture from '@/components/CopyrightPrefecture'
import { useUserStore } from '@/store/index'

const routes = [
  // ' / ' 重定向登录页面
  { path: "/", name: 'login', redirect: "/login" },
  {
    // 主页
    path: "/home",
    component: BookHome,
    children: [
      // 默认前往主页
      { path: '', redirect: "/home/booksHome" },
      // 主页
      {
        path: "booksHome",
        component: () => { return import('@/views/Prefecture/BooksHome') },
        children: [
          // 默认前往主页
          { path: '', redirect: "/home/booksHome/a" },
          // 主页
          {
            path: "a",
            component: () => { return import('@/views/Prefecture/Footer') }
          },]
      },
      // 用户主页
      {
        path: "userHome",
        component: () => { return import('@/views/Prefecture/UserHome') },
        children: [
          { path: '', redirect: '/home/userHome/userData' },
          { // 个人资料
            path: "userData",
            component: () => { return import('@/views/UserCenter/UserData') }
          },
          { // 修改密码
            path: "updatePwd",
            component: () => { return import('@/views/UserCenter/UpdatePwd') }
          },
          { // 充值
            path: "topUp",
            component: () => { return import('@/views/UserCenter/TopUp') }
          },
          { // 订单
            path: "order",
            component: () => { return import('@/views/UserCenter/Order') },
            children: [
              { path: '', redirect: '/home/userHome/order/orders' },
              {
                path: "orders",
                component: () => { return import('@/views/UserCenter/Orders/Orders') }
              },
              {
                path: "address",
                component: () => { return import('@/views/UserCenter/Orders/Address') }
              },
              {
                path: "order",
                component: () => { return import('@/views/UserCenter/Orders/Order') }
              }
            ]
          },
          { // 阅读记录
            path: "record",
            component: () => { return import('@/views/UserCenter/Record') }
          },
          { // 收藏的书
            path: "bookCollect",
            component: () => { return import('@/views/UserCenter/BookCollect') }
          },
          { // 历史阅读
            path: "readRecord",
            component: () => { return import('@/views/UserCenter/ReadRecord') }
          },
          { // 我的评论
            path: "myComment",
            component: () => { return import('@/views/UserCenter/MyComment') }
          },
        ]
      },
      // 书库
      {
        path: "bookData",
        name: 'BookData',
        component: () => { return import('@/views/Prefecture/BookData') },
        children: [
          // 默认前往书库
          { path: '', redirect: "/home/bookData/s" },
          // 主页
          {
            path: "s",
            component: () => { return import('@/views/Prefecture/Footer') }
          },]
      },
      // 书架
      {
        path: "bookShelf",
        component: () => { return import('@/views/Prefecture/BookShelf') },
        children: [
          // 默认前往主页
          { path: '', redirect: "/home/bookShelf/n" },
          // 主页
          {
            path: "n",
            component: () => { return import('@/views/Prefecture/Footer') }
          },]
      },
      // 原创榜
      {
        path: "originalList",
        component: () => { return import('@/views/Prefecture/OriginalList') },
        children: [
          // 默认前往主页
          { path: '', redirect: "/home/originalList/n" },
          // 主页
          {
            path: "n",
            component: () => { return import('@/views/Prefecture/Footer') }
          },]
      },
      // 漫画专区
      {
        path: "copyrightZone",
        component: () => { return import('@/views/Prefecture/CopyrightZone') },
        children: [
          // 默认前往主页
          { path: '', redirect: "/home/copyrightZone/n" },
          // 主页
          {
            path: "n",
            component: () => { return import('@/views/Prefecture/Footer') }
          },]
      },
      // 搜索(毛开增)
      {
        path: "selectBook",
        component: () => { return import('@/views/Prefecture/SelectBook') },
        children: [
          // 默认前往主页
          { path: '', redirect: "/home/selectBook/v" },
          // 主页
          {
            path: "v",
            component: () => { return import('@/views/Prefecture/Footer') }
          },]
      },
    ]
  },
  // 登录路由
  { path: "/login", component: UserLogin },
  // 测试页面
  { path: "/demo", component: DemoView },
  // 作者专区
  { path: "/authorPrefecture", component: AuthorPrefecture },
  // 热门专区 
  { path: "/hotPrefecture", component: HotPrefecture },
  // 版权专区
  { path: "/copyrightPrefecture", component: CopyrightPrefecture },
  // 订单页
  {
    path: "/addOrders", component: () => { return import('@/components/AddOrders') },
    children: [
      // 默认前往主页
      { path: '', redirect: "/addOrders/g" },
      // 主页
      {
        path: "g",
        component: () => { return import('@/views/Prefecture/Footer') }
      },]
  },
  // 书籍详情
  {
    path: "/bookDetails", component: () => { return import('@/components/BookDetails') },
    children: [
      // 默认前往主页
      { path: '', redirect: "/bookDetails/footer" },
      // 主页
      {
        path: "footer",
        component: () => { return import('@/views/Prefecture/Footer') }
      },]
  },
  // 冬日训练营(黄柏富)
  { path: "/winterTrainingCamp", component: () => { return import('@/components/WinterTrainingCamp') }, },
  // 收集,出版向文学作品(韦品德)
  {
    path: "/workCollection", component: () => { return import('@/components/WorkCollection') },
    children: [
      // 默认前往主页
      { path: '', redirect: "/workCollection/footer" },
      // 主页
      {
        path: "footer",
        component: () => { return import('@/views/Prefecture/Footer') }
      },]
  },
  // 冬日限时创作挑战(韦富)
  { path: "/winterCreation", component: () => { return import('@/components/WinterCreation.vue') }, },
  // 凌云计划(黄家湘)
  { path: "/cloudProject", component: () => { return import('@/components/CloudProject') }, },
  // 伯乐计划(毛开增)
  {
    path: "/boLePlan", component: () => { return import('@/components/BoLePlan') },
    children: [
      // 默认前往主页
      { path: '', redirect: "/boLePlan/n" },
      // 主页
      {
        path: "n",
        component: () => { return import('@/views/Prefecture/Footer') }
      },]
  },

  //返回漫画主页
  { path: "/manhuaxiangqing", component: () => { return import('@/views/Prefecture/CopyrightZone') } },
  // 黄柏富 漫画详情路由
  { path: "/info/:id", component: () => { return import('@/views/ManHuaCunFang/info') }, props: true },
  // 404页
  { path: '/:pathMatch(.*)', component: () => { return import('@/components/View404') } },
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 可以监听路由拦截，比如权限验证。
//导航守卫
router.beforeEach((to, from, next) => {
  // 放通登录页面和主页
  if (to.path == '/login') return next();
  if (to.path == '/home/booksHome/a') return next();
  const userStore = useUserStore()
  const tokenStr = userStore.token
  if (!tokenStr) return next('/login')
  next()
})

export default router
