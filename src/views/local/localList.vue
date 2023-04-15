<template>
  <div class="local-list">
    <el-button type="primary"  @click="showLocal=true,edit=false" style="float: right">添加</el-button>
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
          label="类型"
      >
        <template slot-scope="scope">
          <span>{{scope.row.tlevel===1?'二十景区':scope.row.tlevel===2?'四十景区':'六十景区'}}</span>
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
        <el-form-item label="类型" >
          <el-select v-model="localInfo.tlevel" placeholder="请选择" style="width: 100%">
            <el-option
                label="二十景区"
                :value="1">
            </el-option>
            <el-option
                label="四十景区"
                :value="2">
            </el-option>
            <el-option
                label="六十景区"
                :value="3">
            </el-option>

          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="showLocal = false">取 消</el-button>
    <el-button type="primary" @click="submitLocal">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>

import {addLocal, deleteLocal, editLocal, getLocalList} from "@/api/local";

export default {
  name: "Locallist",
  data() {
    return {
      localInfo: {},
      showLocal: false,
      edit: false,
      params: {
        page: 1,
        rows: 10,
        keyword: '',
        total: '',
        name:''
      },
      localList: []
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