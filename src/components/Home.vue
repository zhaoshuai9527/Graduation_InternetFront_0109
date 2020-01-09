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
      <el-aside width="200px">
        <!-- 侧边栏菜单区   -->
        <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <!-- 一级菜单   -->
          <el-submenu index="1">
            <!-- 一级菜单模板区   -->
            <template slot="title">
              <!-- 图标   -->
              <i class="el-icon-location"></i>
              <!-- 文本   -->
              <span>导航一</span>
            </template>
            <!-- 二级菜单   -->
            <el-menu-item index="1-4-1">
              <template slot="title">
                <!-- 图标   -->
                <i class="el-icon-location"></i>
                <!-- 文本   -->
                <span>导航一</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 主区域   -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
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
</style>
