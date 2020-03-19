<template>
  <div>
    <!--  面包屑导航  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生管理</el-breadcrumb-item>
      <el-breadcrumb-item>学生选题</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图区域    -->
    <el-card>
      <!--搜索区域    -->
      <el-row ref="TopicList" :gutter="20">
        <el-col :span="7">
          <!--搜索于添加区域 -->
          <el-input placeholder="根据教师名称搜索题目" v-model="queryInfo.query" clearable @clear="getTopicList">
            <el-button slot="append" icon="el-icon-search" @click="getTopicList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!--已选题目列表    -->
      <span class="spanStyle">已选题目列表</span>
      <el-table :data="finishTopicList" border stripe>
        <el-table-column label="题目编号" prop="titleNo"></el-table-column>
        <el-table-column label="题目名称" prop="titleName"></el-table-column>
        <el-table-column label="题目需求" prop="titleRequire"></el-table-column>
        <el-table-column label="题目描述" prop="titleDescribe"></el-table-column>
        <el-table-column label="教师姓名" prop="teacherName"></el-table-column>
        <el-table-column label="教师职称" prop="teachTitle"></el-table-column>
        <el-table-column label="操作" width="70px">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-delete" size="mini" @click="showDeleteDialog(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--预选题列表    -->
      <span class="spanStyle">预选题列表</span>
      <el-table :data="topicList" border stripe>
        <el-table-column label="题目编号" prop="titleNo"></el-table-column>
        <el-table-column label="题目名称" prop="titleName"></el-table-column>
        <el-table-column label="题目需求" prop="titleRequire"></el-table-column>
        <el-table-column label="题目描述" prop="titleDescribe"></el-table-column>
        <el-table-column label="教师编号" prop="teacherNo"></el-table-column>
        <el-table-column label="录取情况" prop="admission"></el-table-column>
        <el-table-column label="选题限制人数" prop="limitNum"></el-table-column>
        <el-table-column label="剩余名额" prop="count">
          <template slot-scope="scope">
            <div :class="scope.row.count=='0'? 'changColor' :''"> {{ scope.row.count }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="70px" prop="caoZuo">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="选择" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-check" size="mini" @click="showCheckDialog(scope.row)"
                         :disabled="scope.row.count =='0'?true:false"></el-button>
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
      finishTopicList: [],
      cancelDialogVisible: false,
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
        limitNum: '',
        count: ''
      },
      editForm: {
        titleNo: '',
        titleName: '',
        titleRequire: '',
        titleDescribe: '',
        teacherNo: '',
        admission: '',
        limitNum: '',
        count: ''
      },
      cancelForm: {
        titleNo: ''
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
      this.$http.post('/topic/getTopicListByTeacherName', {
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
    showCheckDialog(data) {
      this.editDialogVisible = true
      this.editForm = data
      this.checkTopic()
    },
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    checkTopic() {
      console.log(window.sessionStorage.getItem('token') + '=====')
      console.log(sessionStorage.getItem('token') + '---')
      this.$http.post('/topic/selectTopic', {
        titleNo: this.editForm.titleNo,
        titleName: this.editForm.titleName,
        titleRequire: this.editForm.titleRequire,
        titleDescribe: this.editForm.titleDescribe,
        teacherNo: this.editForm.teacherNo,
        admission: this.editForm.admission,
        limitNum: this.editForm.limitNum,
        count: this.editForm.count
      }).then(response => {
        console.log(response)
        if (response.data.code === '1001') {
          this.$message.success(response.data.message)
          this.getTopicList()
        } else if (response.data.code === '2001') {
          this.$message.error(response.data.message)
        } else if (response.data.code === '3001') {
          this.$message.error(response.data.message)
          this.getTopicList()
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(error => {
        this.$message.error('选择题目失败')
        // this.editDialogVisible = false
        console.log(error)
      })
    },
    cancelTopic() {
      console.log('asd' + this.cancelForm.titleNo)
      this.$http.post('/topic/cancelTopic', {
        titleNo: this.cancelForm.titleNo
      }).then(response => {
        if (response.data.code === '2001') {
          this.cancelDialogVisible = false
          this.$message.success('删除成功！')
          this.getTopicList()
        } else {
          this.$message.error('删除失败')
          this.cancelDialogVisible = false
        }
      }).catch(error => {
        this.$message.error('删除失败')
        this.cancelDialogVisible = false
        console.log(error)
      })
    },
    statusStyle({ row, column, rowIndex, columnIndex }) {
      if (this.data[rowIndex].count === '0') {
        return 'color:#ED3F14'
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .changColor {
    background: red;
  }
  .spanStyle {
    background: aquamarine;
  }
</style>
