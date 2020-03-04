<template>
  <el-container class="home_container">
    <!-- 头部区域   -->
    <el-header>
      <div>
        <img src="../assets/2.jpg" height="80px" width="80px" alt="毕业设计选题系统">
        <span>毕业设计选题系统</span>
      </div>
      <el-button type="info" @click="logout">退出登录</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏   -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区   -->
        <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
                 :collapse="isCollapse" :collapse-transition="false" :router="true"
                 :default-active="index">
          <!-- 一级菜单   -->
          <el-menu-item index='/home'>
            <i class="el-icon-location"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <!-- 一级菜单模板区   -->
            <template slot="title">
              <!-- 图标   -->
              <i class="el-icon-menu"></i>
              <!-- 文本   -->
              <span>教师管理</span>
            </template>
            <!-- 二级菜单模板区   -->
            <el-menu-item index='/publishTopic'>
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>教师发题</span>
              </template>
            </el-menu-item>
            <el-menu-item index='/teacherSelectStudent'>
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>教师反选</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <!-- 一级菜单模板区   -->
            <template slot="title">
              <!-- 图标   -->
              <i class="el-icon-menu"></i>
              <!-- 文本   -->
              <span>学生管理</span>
            </template>
            <!-- 二级菜单模板区   -->
            <el-menu-item index='/studentSelectTopic'>
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>学生选题</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <!-- 一级菜单模板区   -->
            <template slot="title">
              <!-- 图标   -->
              <i class="el-icon-menu"></i>
              <!-- 文本   -->
              <span>用户管理</span>
            </template>
            <!-- 二级菜单模板区   -->
            <el-menu-item index='/user' @click="saveActivePath('/user')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>用户列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <!-- 一级菜单模板区   -->
            <template slot="title">
              <!-- 图标   -->
              <i class="el-icon-menu"></i>
              <!-- 文本   -->
              <span>系统管理</span>
            </template>
            <!-- 二级菜单模板区   -->
            <el-menu-item index='/role'>
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>角色管理</span>
              </template>
            </el-menu-item>
            <!-- 二级菜单模板区   -->
            <el-menu-item index='/power'>
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>权限管理</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主区域   -->
      <el-main>
      <!--路由占位符 -->
      <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: ''
    }
  },
  created() {
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    toggleCollapse () {
      this.isCollapse = !(this.isCollapse)
    },
    saveActivePath (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>
<style lang="less" scoped>
.home_container {
  height: 100%;
}
.el-header {
  background-color: cornsilk;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: black;
  font-size: 25px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #545c64;
}
.el-main {
  background-color: aliceblue;
}
.toggle-button {
  background-color: #545c64;
  font-size: 10px;
  line-height: 24px;
  color: #ffffff;
  text-align: center;
  letter-spacing: 0.3em;
  cursor: pointer;
}
</style>
