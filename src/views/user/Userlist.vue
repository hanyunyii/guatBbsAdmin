<template>
  <div class="user-list">
    <el-input v-model="params.name" placeholder="请输入姓名" style="width: 300px;margin:  0 auto"> </el-input>      <el-button type="primary"  @click="getUserList">搜索</el-button>

    <el-table
        :data="userList"
        style="margin:  0  auto">
      <el-table-column
          prop="cardCode"
          label="卡号"
      >
      </el-table-column>
      <el-table-column
          prop="password"
          label="密码"
      >
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名"
      >
      </el-table-column>
      <el-table-column
          prop="tel"
          label="电话"
      >
      </el-table-column>
      <el-table-column
          prop="idNum"
          label="身份证"
      >
      </el-table-column>
      <el-table-column
          prop="activateTime"
          label="激活时间"
      >
      </el-table-column>
      <el-table-column
          prop="endTime"
          label="过期时间"
      >
      </el-table-column>

      <el-table-column
          label="性别"
      >
        <template slot-scope="scope">
          <span>{{ roleFormat(scope.row.sex) }}</span>
        </template>
      </el-table-column>
      <el-table-column

          label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="deleteUser(scope.row.cardCode)">删除</el-button>
        </template>
      </el-table-column>


    </el-table>

    <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="params.total"
        :page-size="params.rows"
        :current-page.sync="params.page"
    >
    </el-pagination>


    <el-dialog
        :title="edit?'修改用户':'添加用户'"
        :visible.sync="showUser"
        width="30%"
        @close="userInfo={}"
    >
      <el-form label-width="80px" :model="userInfo">

        <el-form-item label="账号">
          <el-input v-model="userInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="userInfo.password"></el-input>
        </el-form-item>
        <el-form-item label="权限" v-if='userInfo.role!==3'>
          <el-select v-model="userInfo.role" placeholder="请选择">
            <el-option
                label="无权限"
                :value="0">
            </el-option>
            <el-option
                label="订单管理"
                :value="1">
            </el-option>
            <el-option
                label="租房管理"
                :value="2">
            </el-option>
            <el-option
                label="订单&租房"
                :value="5">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="showUser = false">取 消</el-button>
    <el-button type="primary" @click="submitUser">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>

import {deleteUser, getUserList} from "@/api/user";

export default {
  name: "Userlist",
  data() {
    return {
      userInfo: {},
      showUser: false,
      edit: false,
      params: {
        page: 1,
        rows: 10,
        keyword: '',
        total: '',
        name:''
      },
      userList: []
    }
  },
  created() {
    this.getUserList()
  },
  watch: {
    "this.params.current"() {
      this.getUserList()
    }
  },
  methods: {
    handleSizeChange(val) {
      this.params.pageSize = val
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.params.current = val
      this.getUserList();
    },
    deleteUser(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser(id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.getUserList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    submitUser() {
      if (this.edit) {
        updateUserApi(this.userInfo).then(res => {
          if (res.data.code === 0) {
            this.$message.success('修改成功')
            this.showUser = false
            this.getUserList()
          } else {
            this.$message.warning('修改失败')
          }
        })
      }
    },
    getUserList() {
      getUserList(this.params).then(res => {
        this.userList = res.data.rows
        this.params.page = res.data.page
        this.params.rows = res.data.size
        this.params.total = res.data.total
      })
    },
    roleFormat(role) {
      console.log(role)
      return role === 1 ? '男':'女'
    }
  },
  computed: {}
}
</script>

<style scoped>

</style>