<template>
  <div class="user-list">
    <div class="search">

      <el-select style="width: 121px" v-model="search" placeholder="搜索方式" @change="changeSearchType">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        >
        </el-option>
      </el-select>

      <el-input v-model="searchInput" style="width: 222px"></el-input>
      <el-button type="primary" @click="searchFn">搜索</el-button>
    </div>
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
          label="登录密码"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.loginPassword }}</span>
        </template>
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
          <el-button type="text" size="small" @click="showUserFn(scope.row)">修改</el-button>
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
        :title="'修改用户'"
        :visible.sync="showUser"
        width="80%"
        @close="userInfo={}"
    >
      <el-form label-width="80px" :model="userInfo">

        <el-form-item label="姓名">
          <el-input v-model="userInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="userInfo.tel"></el-input>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="userInfo.idNum"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="showUser = false,userInfo={}">取 消</el-button>
    <el-button type="primary" @click="submitUser">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>

import {deleteUser, getUserList, updateUser} from "@/api/user";

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
        name:'',
        searchType:'',
        searchKey:''
      },
      userList: [],
      search: '',
      searchInput: '',
      options: [
        {label: '姓名', value: 'name'}, {label: '手机号', value: 'tel'},{label: '卡号', value: 'card'}
      ],
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
    showUserFn(user){
      this.userInfo=user
      this.showUser=true

    },
    changeSearchType(res) {
      console.log(this.search)
    },
    searchFn(){
      this.params.searchType=this.search
      this.params.searchKey=this.searchInput
      this.getUserList()
    },
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
      this.userInfo.activateTime=null
      this.userInfo.endTime=null

      updateUser(this.userInfo).then(res=>{
        this.$message.success('修改成功')
        this.showUser=false
        this.userInfo={}
        this.getUserList()
      }).catch(()=>{
        this.$message.error('修改失败')
      })
      // console.log(this.userInfo)
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