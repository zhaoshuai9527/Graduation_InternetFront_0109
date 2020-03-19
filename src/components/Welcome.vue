<template>
  <div>
    <!--卡片视图区域    -->
    <el-card>
      <!--添加公告区域    -->
      <el-row ref="MessageList" :gutter="20">
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加公告</el-button>
        </el-col>
      </el-row>
      <!--公告列表区    -->
      <el-table :data="messageList" border stripe>
        <el-table-column label="公告名称" prop="title"></el-table-column>
        <el-table-column label="主要内容" prop="message"></el-table-column>
        <el-table-column label="发布人" prop="people"></el-table-column>
        <el-table-column label="发布时间" prop="time"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="showDeleteDialog(scope.row.title)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--添加公告的对话框    -->
    <el-dialog
      title="添加公告"
      :visible.sync="addDialogVisible"
      width="30%" @close="addDialogClosed">
      <!-- 内容主体区     -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="90px">
        <el-form-item label="公告名称" prop="title">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item label="主要内容" prop="message">
          <el-input type="textarea" v-model="addForm.message"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域     -->
      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addHomeMessage">添 加</el-button>
  </span>
    </el-dialog>
    <!--修改公告的对话框    -->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="30%" @close="editDialogClosed">
      <!-- 内容主体区     -->
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="90px">
        <el-form-item label="公告名称" prop="title">
          <el-input v-model="editForm.title"></el-input>
        </el-form-item>
        <el-form-item label="主要内容" prop="message">
          <el-input type='textarea' v-model="editForm.message"></el-input>
        </el-form-item>
        <el-form-item label="发布人" prop="people">
          <el-input v-model="editForm.people" disabled="false"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域     -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editHomeMessage">修 改</el-button>
     </span>
    </el-dialog>
    <!--删除公告的对话框    -->
    <el-dialog
      title="删除公告"
      :visible.sync="deleteDialogVisible"
      width="30%">
      <span>是否确定删除此条公告，一经删除不可恢复！</span>
      <!-- 底部区域     -->
      <span slot="footer" class="dialog-footer">
    <el-button @click="deleteDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteHomeMessage">删 除</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      messageList: [],
      addDialogVisible: false,
      editDialogVisible: false,
      deleteDialogVisible: false,
      editForm: {
        title: '',
        people: '',
        time: '',
        message: ''
      },
      addForm: {
        title: '',
        people: '',
        time: '',
        message: ''
      },
      editFormRules: {
        title: [
          { required: true, message: '请输公告名称', trigger: 'blur' }
        ],
        message: [
          { required: true, message: '请输公告内容', trigger: 'blur' }
        ]
      },
      addFormRules: {
        title: [
          { required: true, message: '请输公告名称', trigger: 'blur' }
        ],
        message: [
          { required: true, message: '请输公告内容', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getMessageList()
  },
  methods: {
    getMessageList() {
      this.$http.post('/login/homeMessage', {
      }).then(response => {
        this.messageList = response.data.body
      }).catch(error => {
        this.$message.error('查询失败')
        console.log(error)
      })
    },
    addHomeMessage() {

    },
    editHomeMessage() {

    },
    deleteHomeMessage() {},
    showEditDialog(data) {
      this.editDialogVisible = true
      this.editForm = data
    },
    showDeleteDialog(data) {
      this.deleteDialogVisible = true
      this.deleteForm.userNo = data
    },
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    }
  }
}
</script>
<style lang="less" scoped></style>
