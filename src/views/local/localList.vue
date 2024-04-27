<template>
  <div class="local-list">
    <div class="search" style="float: left">
      <el-input  style="width: 220px" v-model="params.memberId" placeholder="请输入卡号"></el-input>
      <el-button type="primary"  @click="getLocalList">搜索</el-button>

    </div>
    <el-button type="primary" style="float: right" @click="exportModel">导出模板</el-button>
    <!-- <el-button type="primary" style="float: right;margin-right: 7px" @click="batchDelete">批量删除</el-button>  !-->

    <el-button type="primary"  @click="showLocal=true,edit=false" style="float: right;margin-right: 10px">添加</el-button>

    <el-upload
        style="float: right"
        class="upload-demo"
        :on-success="handleBatchSaveSuccess"
        :on-error="handleBatchSaveError"
        action="https://lxhz123.com:10000/api/member/upload">
      <el-button  type="primary" style="float: right">批量添加</el-button>
    </el-upload>
    <el-table
        :data="localList"
        style="margin:  0  auto">
      <el-table-column
          prop="memberId"
          label="卡号"
      >
      </el-table-column>
      <el-table-column
          prop="passWord"
          label="密码"
      >
      </el-table-column>
      <el-table-column
          label="是否过期"
      >
        <template slot-scope="scope">
          <span>{{scope.row.isOverdue==='0'?'未过期':'已过期'}}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="状态"
      >
        <template slot-scope="scope">
          <span>{{scope.row.activateState===1?'已激活':'未激活'}}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="套卡所属等级"
      >
        <template slot-scope="scope">
          <span>{{scope.row.tlevel}}</span>
        </template>
      </el-table-column>
      <el-table-column

          label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="showLocal=true,localInfo=scope.row,edit=true">修改</el-button>
          <el-button type="text" size="small" @click="deleteLocal(scope.row.id)">删除</el-button>
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
        :title="edit?'修改会员卡':'添加会员卡'"
        :visible.sync="showLocal"
        width="30%"
        @close="localInfo={}"
    >
      <el-form label-width="80px" :model="localInfo">

        <el-form-item label="卡号">
          <el-input v-model="localInfo.memberId"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="localInfo.passWord"></el-input>
        </el-form-item>
        <el-form-item label="套卡所属等级" >

          <el-input v-model="localInfo.tlevel"></el-input>


        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="showLocal = false">取 消</el-button>
    <el-button type="primary" @click="submitLocal">确 定</el-button>
  </span>
    </el-dialog>



    <el-dialog
        title="批量删除卡号"
        :visible.sync="batchDeleteState"
        width="30%"
       >
      <el-input v-model="batchDeleteBody.startCard" placeholder="请输入开始卡号"></el-input>
      <el-input v-model="batchDeleteBody.endCard" placeholder="请输入结束卡号"></el-input>
      <span slot="footer" class="dialog-footer">

    <el-button @click="batchDeleteState = false">取 消</el-button>
    <el-button type="primary" @click="batchDeleteFn">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>

import {addLocal, batchDeleteLocalMember, deleteLocal, editLocal, getLocalList} from "@/api/local";

export default {
  name: "Locallist",
  data() {
    return {
      localInfo: {},
      batchDeleteState:false,
      showLocal: false,
      edit: false,
      params: {
        page: 1,
        rows: 10,
        keyword: '',
        total: '',
        name:'',
        memberId:''

      },
      localList: [],
      batchDeleteBody:{
        startCard:'',
        endCard:''
      }
    }
  },

  created() {
    this.getLocalList()
  },
  watch: {
    "this.params.current"() {
      this.getLocalList()
    }
  },
  methods: {
    batchDeleteFn(){
      batchDeleteLocalMember(this.batchDeleteBody)
    },
    batchDelete(){
    this.batchDeleteState=true
    },
    handleBatchSaveSuccess(){
      this.$message({
        type: 'success',
        message: '上传成功!'
      });
      this.getLocalList()
    },
    handleBatchSaveError(){
      this.$message({
        type: 'error',
        message: '上传失败!'
      });
    },

    exportModel(){
      window.open('https://lxhz123.com:10000/api/member/export')
    },
    handleSizeChange(val) {
      this.params.pageSize = val
      this.getLocalList();
    },
    handleCurrentChange(val) {
      this.params.current = val
      this.getLocalList();
    },
    deleteLocal(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteLocal(id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.getLocalList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    submitLocal() {
      if (this.edit) {
        editLocal(this.localInfo).then(res => {
          if (res.data.code === 0) {
            this.$message.success('修改成功')
            this.showLocal = false
            this.getLocalList()
          } else {
            this.$message.warning('修改失败')
          }
        })
      }else{
        addLocal(this.localInfo).then(res=>{
          if(res.data.code===0){
            this.showLocal = false
            this.getLocalList()
            this.$message.success('添加成功')
          }else{
            this.$message.warning(res.data.msg)
          }


        })
      }
    },
    getLocalList() {
      getLocalList(this.params).then(res => {
        this.localList = res.data.res.records

        this.params.page = res.data.res.current
        this.params.rows = res.data.res.size
        this.params.total = res.data.res.total
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