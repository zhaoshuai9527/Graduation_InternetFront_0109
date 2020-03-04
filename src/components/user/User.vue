<template>
  <div>
    <!--  面包屑导航  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图区域    -->
    <el-card>
      <!--搜索区域    -->
      <el-row ref="UserList" :gutter="20">
        <el-col :span="7">
          <!--搜索于添加区域 -->
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!--用户列表区    -->
      <el-table :data="userList" border stripe>
        <el-table-column label="用户ID" prop="userNo"></el-table-column>
        <el-table-column label="用户名" prop="userName"></el-table-column>
        <el-table-column label="电话" prop="userPhone"></el-table-column>
        <el-table-column label="邮箱" prop="userEmail"></el-table-column>
        <el-table-column label="身份" prop="identity"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="showDeleteDialog(scope.row.userNo)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="waring" icon="el-icon-setting" size="mini" @click="showUpdateDialog(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--  分页区域    -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[10]"
        :page-size="queryInfo.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <!--添加用户的对话框    -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="30%" @close="addDialogClosed">
      <!-- 内容主体区     -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="账号" prop="userNo">
          <el-input v-model="addForm.userNo"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="addForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="addForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="identity">
          <el-input v-model="addForm.identity"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域     -->
      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
    </el-dialog>
    <!--修改用户的对话框    -->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="30%" @close="editDialogClosed">
      <!-- 内容主体区     -->
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="账号" prop="userNo">
          <el-input v-model="editForm.userNo" disabled="false"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="editForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="identity">
          <el-input v-model="editForm.identity" disabled="false"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
          <el-input v-model="editForm.userEmail"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="userPhone">
          <el-input v-model="editForm.userPhone"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域     -->
      <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editUser">确 定</el-button>
  </span>
    </el-dialog>
    <!--删除用户的对话框    -->
    <el-dialog
      title="删除用户"
      :visible.sync="deleteDialogVisible"
      width="30%">
      <span>是否确定删除此条数据，一经删除不可恢复！</span>
      <!-- 底部区域     -->
      <span slot="footer" class="dialog-footer">
    <el-button @click="deleteDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteUser">确 定</el-button>
  </span>
    </el-dialog>
    <!--分配用户角色的对话框    -->
    <el-dialog
      title="分配用户角色"
      :visible.sync="updateDialogVisible"
      width="30%" @close="updateDialogClosed">
      <el-form :model="updateForm" :rules="updateFormRules" ref="updateFormRef" label-width="70px">
        <el-form-item label="账号" prop="userNo">
          <el-input v-model="updateForm.userNo" disabled="false"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="updateForm.userName" disabled="false"></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="identity">
          <el-input v-model="updateForm.identity"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
          <el-input v-model="updateForm.userEmail" disabled="false"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="userPhone">
          <el-input v-model="updateForm.userPhone" disabled="false"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域     -->
      <span slot="footer" class="dialog-footer">
    <el-button @click="updateDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateUser">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    // 校验邮箱规则
    var checkEmail = (rules, value, callback) => {
      // 验证邮箱的正则
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        // 合法邮箱
        return callback()
      }
      callback(new Error('请输入合法的邮箱'))
    }
    // 校验手机号规则
    var checkMobile = (rules, value, callback) => {
      // 验证手机号的正则
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法的手机号'))
    }
    // 校验密码规则
    var checkPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.addForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 获取用户列表参数
      queryInfo: {
        query: '',
        pageNum: 1,
        pageSize: 10
      },
      userList: [],
      total: 0,
      addDialogVisible: false,
      editDialogVisible: false,
      deleteDialogVisible: false,
      updateDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        userNo: '',
        userName: '',
        password: '',
        checkPass: '',
        identity: '',
        email: '',
        mobile: ''
      },
      editForm: {
        userNo: '',
        userName: '',
        identity: '',
        userEmail: '',
        userPhone: ''
      },
      deleteForm: {
        userNo: ''
      },
      updateForm: {
        userNo: '',
        userName: '',
        identity: '',
        userEmail: '',
        userPhone: ''
      },
      // 添加表单验证规则
      addFormRules: {
        userNo: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 6, max: 12, message: '账号的长度在6~12个字符之间', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        identity: [
          { required: true, message: '请输入身份', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        checkPass: [
          { validator: checkPass, trigger: 'blur' }
        ]
      },
      // 添加表单验证规则
      editFormRules: {
        userNo: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 6, max: 12, message: '账号的长度在6~12个字符之间', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        identity: [
          { required: true, message: '请输入身份', trigger: 'blur' }
        ],
        userEmail: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        userPhone: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      console.log('pageSize' + this.queryInfo.pageSize)
      console.log('pageNum' + this.queryInfo.pageNum)
      this.$http.post('/login/getUserList', {
        query: this.queryInfo.query,
        pageNum: this.queryInfo.pageNum,
        pageSize: this.queryInfo.pageSize
      }).then(response => {
        console.log(response)
        this.userList = response.data.body.list
        this.total = response.data.body.total
      }).catch(error => {
        this.$message.error('查询失败')
        console.log(error)
      })
    },
    // 监听pageNum改变的事件
    handleCurrentChange(newPageNum) {
      console.log(newPageNum)
      this.queryInfo.pageNum = newPageNum
      this.getUserList()
    },
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    addUser() {
      this.$http.post('/login/addUser', {
        userNo: this.addForm.userNo,
        userName: this.addForm.userName,
        password: this.addForm.password,
        identity: this.addForm.identity,
        mobile: this.addForm.mobile,
        email: this.addForm.email
      }).then(response => {
        this.$message.success('增加成功！')
        this.addDialogVisible = false
        this.getUserList()
        console.log(response)
      }).catch(error => {
        this.$message.error('增加失败')
        console.log(error)
      })
    },
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    updateDialogClosed() {
      this.$refs.updateFormRef.resetFields()
    },
    showEditDialog(data) {
      this.editDialogVisible = true
      this.editForm = data
    },
    editUser() {
      this.$http.post('/login/editUser', {
        userNo: this.editForm.userNo,
        userName: this.editForm.userName,
        identity: this.editForm.identity,
        userPhone: this.editForm.userPhone,
        userEmail: this.editForm.userEmail
      }).then(response => {
        console.log(response.data.code)
        if (response.data.code === '2001') {
          this.$message.success('修改成功！')
          this.editDialogVisible = false
          this.getUserList()
        } else {
          this.$message.error('修改失败')
        }
      }).catch(error => {
        this.$message.error('修改失败')
        console.log(error)
      })
    },
    showDeleteDialog(data) {
      this.deleteDialogVisible = true
      this.deleteForm.userNo = data
    },
    deleteUser() {
      this.$http.post('/login/deleteUser', {
        userNo: this.deleteForm.userNo
      }).then(response => {
        if (response.data.code === '2001') {
          this.deleteDialogVisible = false
          this.$message.success('删除成功！')
          this.getUserList()
        } else {
          this.deleteDialogVisible = false
          this.$message.error('删除失败')
        }
      }).catch(error => {
        this.$message.error('删除失败')
        this.deleteDialogVisible = false
        console.log(error)
      })
    },
    showUpdateDialog(data) {
      this.updateDialogVisible = true
      this.updateForm = data
    },
    updateUser() {
      console.log(this.updateForm.userNo)
      this.$http.post('/login/updateUser', {
        identity: this.updateForm.identity,
        userNo: this.updateForm.userNo
      }).then(response => {
        if (response.data.code === '2001') {
          this.updateDialogVisible = false
          console.log('分配用户角色操作')
          console.log(response)
          this.$message.success('分配用户角色成功！')
          this.getUserList()
        } else {
          this.$message.error('分配用户角色失败')
          this.getUserList()
        }
      }).catch(error => {
        this.$message.error('分配用户角色失败')
        this.getUserList()
        console.log(error)
      })
    }
  }
}
</script>
<style lang="less" scoped></style>
