<template>
  <div class="login_container">
    <div class="login_box">
      <el-form :model="form" :rules="rules" ref="loginFormRef" class="login_form" >
        <!--用户名-->
        <el-form-item prop="account">
          <el-input prefix-icon="el-icon-s-custom" v-model="form.account"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password" >
          <el-input prefix-icon="el-icon-s-promotion" v-model="form.password" type="password"></el-input>
        </el-form-item>
        <!--按钮区域-->
        <el-form-item class="buttons">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
        <button @click="register">没有账号？点我</button>
      </el-form>
    </div>
  </div>
</template>
import * as qryApi from '../api/login.js'
<script>
export default {
  data () {
    return {
      // 定义表单，绑定数据
      form: {
        account: 'admin',
        password: '123123'
      },
      // 定义表单校验规则
      rules: {
        account: [
          { required: true, message: '请输入学号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 引用element 中 form 方法resetFields 表单数据值变成默认值
    reset () {
      this.form = {}
    },
    login () {
      console.log(this.form.account)
      console.log(this.form.password)
      this.$refs.loginFormRef.validate((valid) => {
        this.$http.post('/login/userLogin', {
          account: this.form.account,
          password: this.form.password
        })
          .then(function (response) {
            console.log(response)
            if (response.data.code === '2000' || response.data.code === '10000') {
              console.log('success')
              window.sessionStorage.setItem('token', response.data.token)
              this.$router.push('/home')
            } else {
              console.log('error')
            }
          }.bind(this))
          .catch(function (error) {
            // this.$message.success('登录失败')
            console.log(error)
          })
      })
    },
    register () {
      this.$router.push('/register')
    }
  }
}
</script>

<style lang="less" scoped>
.login_container{
  background-color: darkgrey;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #ffffff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.buttons {
  display: flex;
  justify-content: center;
}
.login_form {
 position: absolute;
  bottom: 0;
  width: 100%;
  height: 75%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
