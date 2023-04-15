<template>
  <div class="order_list">
    <div class="action">


    </div>

    <el-table
        :data="orderList"
        stripe
        style="width: 100%">
      <el-table-column
          prop="reserveTime"
          label="预约时间"
         >
      </el-table-column>
      <el-table-column
          prop="reserveName"
          label="预约者"
         >
      </el-table-column>
      <el-table-column
          prop="idNum"
          label="身份证"
      >
      </el-table-column>
      <el-table-column
          prop="startTime"
          label="游玩时间"
          >
      </el-table-column>
      <el-table-column
          prop="ssName"
          label="景区名"
          >
      </el-table-column>

      <el-table-column
          label="操作"
          width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="deleteOrder(scope.row.objectId)">删除</el-button>
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
        :visible.sync="showOrder"
        width="30%"
        @close="closeOrder"
    >
      <el-form label-width="80px" :model="orderInfo">
        <el-form-item label="订单号">
          <el-input v-model="orderInfo.orderNo"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="orderInfo.key"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="orderInfo.password"></el-input>
        </el-form-item>
        <el-form-item label="大区">
          <el-input v-model="orderInfo.region"></el-input>
        </el-form-item>
        <el-form-item label="代练项目">
          <el-input v-model="orderInfo.daiProject"></el-input>
        </el-form-item>
        <el-form-item label="金额">
          <el-input v-model="orderInfo.money"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="orderInfo.remark"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="orderInfo.status"></el-input>
        </el-form-item>
        <el-form-item label="店铺名">
          <el-input v-model="orderInfo.shopName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="showOrder = false">取 消</el-button>
    <el-button type="primary" @click="submitOrder">确 定</el-button>
  </span>
    </el-dialog>


  </div>
</template>

<script>
import {addOrder, deleteOrder, editOrder, getOrderList} from "@/api/order";

export default {
  name: "orderList",
  data() {
    return {
      edit: false,
      showOrder: false,
      orderList: [''],
      params: {
        page: 1,
        rows: 10,
        keyword: '',
        total: ''

      },
      orderInfo: {}
    }
  },
  methods: {

    handleSizeChange(val) {
      this.params.pageSize = val
      this.getOrderList();
    },
    handleCurrentChange(val) {

      this.params.current = val
      this.getOrderList();
    },
    deleteOrder(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteOrder(id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.getOrderList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    closeOrder() {
      this.orderInfo = {}
    },
    submitOrder() {
      if (this.edit) {
        editOrder(this.orderInfo).then(res => {

        })
      } else {
        this.orderInfo.createUser = this.$store.state.userInfo.id
        addOrder(this.orderInfo).then(res => {
        })
      }
      this.showOrder = false
      this.getOrderList()
      this.orderInfo = {}
      this.getOrderList()
      this.$message.success('操作成功')
    },
    getOrderList() {
      getOrderList(this.params).then(res => {
        console.log(res)
        this.orderList = res.data.rows
        this.params.page = res.data.page
        this.params.rows = res.data.size
        this.params.total = res.data.total
      })
    }
  },
  created() {
    this.getOrderList()
  }
}
</script>

<style scoped>

</style>