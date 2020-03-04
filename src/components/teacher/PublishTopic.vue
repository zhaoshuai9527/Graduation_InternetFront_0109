<template>
  <div>
    <!--  面包屑导航  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>教师管理</el-breadcrumb-item>
      <el-breadcrumb-item>发题页面</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图区域    -->
    <el-card>
      <!--搜索区域    -->
      <el-row ref="TopicList" :gutter="20">
        <el-col :span="7">
          <!--搜索于添加区域 -->
          <el-input placeholder="请输入查询的题目内容" v-model="queryInfo.query" clearable @clear="getTopicList">
            <el-button slot="append" icon="el-icon-search" @click="getTopicList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">发布题目</el-button>
        </el-col>
      </el-row>
      <!--用户列表区    -->
      <el-table :data="topicList" border stripe>
        <el-table-column label="题目编号" prop="titleNo"></el-table-column>
        <el-table-column label="题目名称" prop="titleName"></el-table-column>
        <el-table-column label="题目需求" prop="titleRequire"></el-table-column>
        <el-table-column label="题目描述" prop="titleDescribe"></el-table-column>
        <el-table-column label="教师编号" prop="teacherNo"></el-table-column>
        <el-table-column label="录取情况" prop="admission"></el-table-column>
        <el-table-column label="选题限制人数" prop="limitNum"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="修改" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="showDeleteDialog(scope.row.titleNo)"></el-button>
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
    <!--发布题目的对话框    -->
    <el-dialog
      title="发布题目"
      :visible.sync="addDialogVisible"
      width="30%" @close="addDialogClosed">
      <!-- 内容主体区     -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="110px">
        <el-form-item label="题目编号" prop="titleNo">
          <el-input v-model="addForm.titleNo"></el-input>
        </el-form-item>
        <el-form-item label="题目名称" prop="titleName">
          <el-input v-model="addForm.titleName"></el-input>
        </el-form-item>
        <el-form-item label="题目需求" prop="titleRequire">
          <el-input  v-model="addForm.titleRequire"></el-input>
        </el-form-item>
        <el-form-item label="题目描述" prop="titleDescribe">
          <el-input  v-model="addForm.titleDescribe"></el-input>
        </el-form-item>
        <el-form-item label="教师编号" prop="teacherNo">
          <el-input v-model="addForm.teacherNo"></el-input>
        </el-form-item>
        <el-form-item label="录取情况" prop="admission">
          <el-input v-model="addForm.admission"></el-input>
        </el-form-item>
        <el-form-item label="选题限制人数" prop="limitNum">
          <el-input v-model="addForm.limitNum"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域     -->
      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addTopic">确 定</el-button>
  </span>
    </el-dialog>
    <!--修改题目的对话框    -->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="30%" @close="editDialogClosed">
      <!-- 内容主体区     -->
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="110px">
        <el-form-item label="题目编号" prop="titleNo">
          <el-input v-model="editForm.titleNo" disabled="false"></el-input>
        </el-form-item>
        <el-form-item label="题目名称" prop="titleName">
          <el-input v-model="editForm.titleName"></el-input>
        </el-form-item>
        <el-form-item label="题目需求" prop="titleRequire">
          <el-input v-model="editForm.titleRequire"></el-input>
        </el-form-item>
        <el-form-item label="题目描述" prop="titleDescribe">
          <el-input v-model="editForm.titleDescribe"></el-input>
        </el-form-item>
        <el-form-item label="教师编号" prop="teacherNo">
          <el-input v-model="editForm.teacherNo"></el-input>
        </el-form-item>
        <el-form-item label="录取情况" prop="admission">
          <el-input v-model="editForm.admission" disabled="false"></el-input>
        </el-form-item>
        <el-form-item label="选题限制人数" prop="limitNum">
          <el-input v-model="editForm.limitNum"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域     -->
      <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editTopic">确 定</el-button>
  </span>
    </el-dialog>
    <!--删除题目的对话框    -->
    <el-dialog
      title="删除用户"
      :visible.sync="deleteDialogVisible"
      width="30%">
      <span>是否确定删除此条数据，一经删除不可恢复！</span>
      <!-- 底部区域     -->
      <span slot="footer" class="dialog-footer">
    <el-button @click="deleteDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteTopic">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 获取列表参数
      queryInfo: {
        query: '',
        pageNum: 1,
        pageSize: 10
      },
      topicList: [],
      deleteDialogVisible: false,
      addDialogVisible: false,
      editDialogVisible: false,
      total: 0,
      // 添加用户的表单数据
      addForm: {
        titleNo: '',
        titleName: '',
        titleRequire: '',
        titleDescribe: '',
        teacherNo: '',
        admission: '',
        limitNum: ''
      },
      editForm: {
        titleNo: '',
        titleName: '',
        titleRequire: '',
        titleDescribe: '',
        teacherNo: '',
        admission: '',
        limitNum: ''
      },
      deleteForm: {
        titleNo: ''
      },
      // 添加表单验证规则
      addFormRules: {
        titleNo: [
          { required: true, message: '请输入题目编号', trigger: 'blur' }
        ],
        titleName: [
          { required: true, message: '请输入题目名称', trigger: 'blur' }
        ],
        titleRequire: [
          { required: true, message: '请输入题目需求', trigger: 'blur' }
        ],
        titleDescribe: [
          { required: true, message: '请输入题目描述', trigger: 'blur' }
        ],
        teacherNo: [
          { required: true, message: '请输入教师编号', trigger: 'blur' }
        ],
        admission: [
          { required: true, message: '请输入录取情况', trigger: 'blur' }
        ],
        limitNum: [
          { required: true, message: '请输入选题限制人数', trigger: 'blur' }
        ]
      },
      // 修改表单验证规则
      editFormRules: {
        titleName: [
          { required: true, message: '请输入题目名称', trigger: 'blur' }
        ],
        titleRequire: [
          { required: true, message: '请输入题目需求', trigger: 'blur' }
        ],
        titleDescribe: [
          { required: true, message: '请输入题目描述', trigger: 'blur' }
        ],
        teacherNo: [
          { required: true, message: '请输入教师编号', trigger: 'blur' }
        ],
        limitNum: [
          { required: true, message: '请输入选题限制人数', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getTopicList()
  },
  methods: {
    getTopicList() {
      this.$http.post('/topic/getTopicList', {
        query: this.queryInfo.query,
        pageNum: this.queryInfo.pageNum,
        pageSize: this.queryInfo.pageSize
      }).then(response => {
        console.log(response)
        this.topicList = response.data.body.list
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
      this.getTopicList()
    },
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    showDeleteDialog(data) {
      this.deleteDialogVisible = true
      this.deleteForm.titleNo = data
    },
    showEditDialog(data) {
      this.editDialogVisible = true
      this.editForm = data
    },
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    addTopic() {
      this.$http.post('/topic/publishTopic', {
        titleNo: this.addForm.titleNo,
        titleName: this.addForm.titleName,
        titleRequire: this.addForm.titleRequire,
        titleDescribe: this.addForm.titleDescribe,
        teacherNo: this.addForm.teacherNo,
        admission: this.addForm.admission,
        limitNum: this.addForm.limitNum
      }).then(response => {
        console.log(response)
        if (response.data.code === '2001') {
          this.$message.success('发布题目成功')
          this.addDialogVisible = false
          this.getTopicList()
        } else {
          this.$message.error('发布题目失败')
          this.addDialogVisible = false
        }
      }).catch(error => {
        this.$message.error('发布题目失败')
        this.addDialogVisible = false
        console.log(error)
      })
    },
    editTopic() {
      this.$http.post('/topic/editTopic', {
        titleNo: this.editForm.titleNo,
        titleName: this.editForm.titleName,
        titleRequire: this.editForm.titleRequire,
        titleDescribe: this.editForm.titleDescribe,
        teacherNo: this.editForm.teacherNo,
        admission: this.editForm.admission,
        limitNum: this.editForm.limitNum
      }).then(response => {
        console.log(response)
        if (response.data.code === '2001') {
          this.$message.success('修改题目成功')
          this.editDialogVisible = false
          this.getTopicList()
        } else {
          this.$message.error('修改题目失败')
          this.editDialogVisible = false
        }
      }).catch(error => {
        this.$message.error('修改题目失败')
        this.editDialogVisible = false
        console.log(error)
      })
    },
    deleteTopic() {
      console.log('asd' + this.deleteForm.titleNo)
      this.$http.post('/topic/deleteTopic', {
        titleNo: this.deleteForm.titleNo
      }).then(response => {
        if (response.data.code === '2001') {
          this.deleteDialogVisible = false
          this.$message.success('删除成功！')
          this.getTopicList()
        } else {
          this.$message.error('删除失败')
          this.deleteDialogVisible = false
        }
      }).catch(error => {
        this.$message.error('删除失败')
        this.deleteDialogVisible = false
        console.log(error)
      })
    }
  }
}
</script>
<style lang="less" scoped></style>
