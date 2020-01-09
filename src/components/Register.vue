<template>
  <div class="register_container">
    <div class="register_box">
      <el-form :model="form" :rules="rules" ref="registerFormRef" class="register_form" label-width="80px" size="mini">
        <!--注册身份-->
        <el-form-item label="注册身份" prop="region">
          <el-select v-model="form.region" placeholder="请选择注册身份">
            <el-option label="教师" value="teacher"></el-option>
            <el-option label="学生" value="student"></el-option>
          </el-select>
        </el-form-item>
        <!--用户名-->
        <el-form-item label="账号" prop="account">
          <el-input prefix-icon="el-icon-s-custom" v-model="form.account"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item label="密码" prop="password" >
          <el-input prefix-icon="el-icon-s-promotion" v-model="form.password" type="password"></el-input>
        </el-form-item>
        <!--确认密码-->
        <el-form-item label="确认密码" prop="checkPassword" >
          <el-input prefix-icon="el-icon-s-promotion" v-model="form.checkPassword" type="password"></el-input>
        </el-form-item>
        <!--性别-->
        <el-form-item label="性别" prop="sex" >
          <el-input prefix-icon="el-icon-s-promotion" v-model="form.sex"></el-input>
        </el-form-item>
        <!--民族-->
        <el-form-item label="民族" prop="nation" >
          <el-input prefix-icon="el-icon-s-promotion" v-model="form.nation"></el-input>
        </el-form-item>
        <!--籍贯-->
        <el-form-item label="籍贯" prop="native" >
          <el-input prefix-icon="el-icon-s-promotion" v-model="form.native"></el-input>
        </el-form-item>
        <!--出生年月-->
        <el-form-item label="出生年月" prop="birth" >
          <el-date-picker type="date" placeholder="选择日期" v-model="form.birth" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <!--按钮区域-->
        <el-form-item class="buttons">
          <el-button type="primary" @click="register">注册</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.checkPassword !== '') {
          this.$refs.ruleForm.validateField('checkPassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        region: '',
        account: '',
        password: '',
        checkPassword: '',
        sex: '',
        nation: '', // 民族
        native: '', // 籍贯
        birth: '', // 出生日期
        school: '',
        depart: '', // 院系
        major: '', // 专业
        class: '',
        phone: '',
        email: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginPage () {
      this.$router.push('/')
    },
    reset () {
      this.form = {}
    }
  }
}
</script>

<style lang="less" scoped>
  .register_container{
    background-color: darkgrey;
    height: 100%;
    width: 100%;
  }
  .register_box {
    width: 450px;
    height: 600px;
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
  .register_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
</style>
