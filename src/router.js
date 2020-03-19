import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Home from './components/Home.vue'
import Welcome from './components/Welcome.vue'
import User from './components/user/User.vue'
import PublishTopic from './components/teacher/PublishTopic.vue'
import TeacherSelectStudent from './components/teacher/TeacherSelectStudent.vue'
import StudentSelectTopic from './components/student/StudentSelectTopic.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', name: 'Welcome', component: Welcome },
        { path: '/user', name: 'User', component: User },
        { path: '/publishTopic', name: 'PublishTopic', component: PublishTopic },
        { path: '/studentSelectTopic', name: 'StudentSelectTopic', component: StudentSelectTopic },
        { path: '/teacherSelectStudent', name: 'TeacherSelectStudent', component: TeacherSelectStudent }
      ]
    }
  ]
})

// 防止用户直接访问/home页面
// 挂在路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 从哪个路径跳转而来
  // next（）放行   next（'/login'）强制跳转
  if (to.path === '/login') return next()
  if (to.path === '/register') return next()
  // 获取token
  // const tokenStr = window.sessionStorage.getItem('token')
  // console.log('赵帅')
  // if (!tokenStr) return next('/login')
  // console.log('帅')
  next()
})

// 暴露router
export default router
