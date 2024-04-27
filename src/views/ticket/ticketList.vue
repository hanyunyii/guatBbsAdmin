<template>
  <div class="ticket_list">



    <el-input v-model="params.key" placeholder="请输入景区名" style="width: 300px;margin:  0 auto"> </el-input>
    <el-button type="primary"  @click="getTicketList">搜索</el-button>
    <el-input v-model="beforeDay" style="width: 60px;margin:  0 auto"> </el-input>
    <el-button type="primary"  @click="batchDay">修改提前预约天数</el-button>
    <el-button type="primary" style="float: right" @click="exportModel">导出模板</el-button>
    <el-button type="primary" style="float: right" @click="showTicket=true,edit=false">添加</el-button>
    <el-upload
        style="float: right"
        class="upload-demo"
        :on-success="handleBatchSaveSuccess"
        :on-error="handleBatchSaveError"
        action="https://lxhz123.com:10000/api/ticket/upload">
      <el-button  type="primary" style="float: right">批量添加</el-button>
    </el-upload>
    <div class="action">


    </div>

    <el-table
        :data="ticketList"
        stripe
        style="width: 100%">

      <el-table-column
          prop="ssLevel"
          label="星级"
      >
      </el-table-column>
      <el-table-column
          label="类型"
      >
        <template slot-scope="scope">
          <span>{{scope.row.tlevel}}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="状态"
      >
        <template slot-scope="scope">
          {{ scope.row.ssState === 1 ? '正常' : '暂停' }}

        </template>
      </el-table-column>
      <el-table-column
          prop="ssName"
          label="景区名"
      >
      </el-table-column>
      <el-table-column
          prop="needBefore"
          label="提前预约/天"
      >
      </el-table-column>
      <el-table-column
          prop="tlevel"
          label="版本"
      >
      </el-table-column>
      <el-table-column
          label="照片"
          width="300"
          style="height: 200px">
        <template slot-scope="scope">
          <el-image :src="scope.row.productPic"></el-image>

        </template>
      </el-table-column>
      <el-table-column
          prop="price"
          label="价格"
      >

      </el-table-column>
      <el-table-column
          label="是否热门景区"

      > <template slot-scope="scope">
        <el-switch
            v-model="scope.row.hot"
            active-color="#13ce66"
            :active-value="1"
            :inactive-value="0"
            inactive-color="#ff4949"
            @change="changeHot(scope.row)">
        </el-switch>
      </template>


      </el-table-column>

      <el-table-column
          prop="ssAddress"
          label="描述"
      >
      </el-table-column>
      <el-table-column
          label="操作"
          width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit=true,ticketInfo=scope.row,showTicket=true">修改</el-button>
          <el-button type="text" size="small" @click="deleteTicket(scope.row.objectId)">删除</el-button>
        </template>
      </el-table-column>


    </el-table>

    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="params.total"
        :page-size.sync="params.rows"
        :current-page.sync="params.page"
    >
    </el-pagination>
    <el-dialog
        :title="edit?'修改订单':'添加订单'"
        :visible.sync="showTicket"
        width="30%"
        @close="closeTicket"
    >
      <el-form label-width="80px" :model="ticketInfo">
        <el-form-item label="星级">
          <el-input v-model="ticketInfo.ssLevel"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="ticketInfo.ssState" placeholder="请选择" style="width: 100%">
            <el-option


                label="正常"
                :value="1">
            </el-option>
            <el-option


                label="暂停"
                :value="2">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="需要提前预约天数">
          <el-input v-model="ticketInfo.needBefore"></el-input>
        </el-form-item>
        <el-form-item label="景区名">
          <el-input v-model="ticketInfo.ssName"></el-input>
        </el-form-item>
        <el-form-item label="照片地址">
          <el-input v-model="ticketInfo.productPic"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="ticketInfo.price"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="ticketInfo.ssAddress"></el-input>
        </el-form-item>
        <el-form-item label="景区介绍">

          <el-input type="textarea" v-model="ticketInfo.remark"></el-input>
        </el-form-item>
        <el-form-item label="套卡所属等级">
          <el-input v-model="ticketInfo.tlevel"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="showTicket = false">取 消</el-button>
    <el-button type="primary" @click="submitTicket">确 定</el-button>
  </span>
    </el-dialog>


  </div>
</template>

<script>
import {addTicket, batchEditBeforeDay, deleteTicket, editTicket, getTicketList, updateOrSave} from "@/api/ticket";

export default {
  name: "ticketList",
  data() {
    return {
      edit: false,
      showTicket: false,
      ticketList: [''],
      params: {
        page: 1,
        rows: 10,
        key: '',
        total: '',
        level: 3

      },
      ticketInfo: {},
      beforeDay:2
    }
  },
  methods: {
    batchDay(){
      batchEditBeforeDay(this.beforeDay).then(res=>{
        this.$message.success('修改成功')
      })
    },
    changeHot(row){
      this.ticketInfo=row
      this.submitTicket()
    },
    handleBatchSaveSuccess(){
      this.$message({
        type: 'success',
        message: '上传成功!'
      });
      this.getTicketList()
    },
    handleBatchSaveError(){
      this.$message({
        type: 'error',
        message: '上传失败!'
      });
    },

    exportModel(){
      window.open('https://lxhz123.com:10000/api/ticket/export')
    },
    handleSizeChange(val) {
      this.params.pageSize = val
      this.getTicketList();
    },
    handleCurrentChange(val) {

      this.params.current = val
      this.getTicketList();
    },
    deleteTicket(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTicket(id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.getTicketList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    closeTicket() {
      this.ticketInfo = {}
    },
    submitTicket() {
      console.log(this.ticketInfo)
      updateOrSave(this.ticketInfo)
      this.showTicket = false
      // this.getTicketList()
      this.ticketInfo = {}
      // this.getTicketList()
      this.$message.success('操作成功')
    },
    getTicketList() {
      getTicketList(this.params, this.params.level).then(res => {
        this.ticketList = res.data.rows
        this.params.page = res.data.page
        this.params.rows = res.data.size
        this.params.total = res.data.total
        this.beforeDay=res.data.rows[0].needBefore
      })
    }
  },
  created() {
    this.getTicketList()
  }
}
</script>

<style scoped>

</style>