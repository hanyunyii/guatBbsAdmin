<template>
  <div class="order_list">
    <div class="left">
      <div style="min-width: 222px">
        <el-input placeholder="请输入预定时间(天)" style="width: 77px" v-model.number="day"></el-input>
        <el-button type="primary" @click="updateDay">/天 修改预定时间</el-button>
      </div>


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
      <div class="action">
        <el-date-picker
            v-model="exportDay"
            placeholder="选择游玩日期以导出"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
        >
        </el-date-picker>
        <el-button type="primary"  @click="exportDayFn">导出</el-button>
      </div>
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
          prop="tel"
          label="手机号"
      >
      </el-table-column>
      <el-table-column
          prop="id"
          label="卡号"
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
import {addOrder, deleteOrder, editOrder, editOrderDay, exportOrderByDay, getOrderDay, getOrderList} from "@/api/order";

export default {
  name: "orderList",
  data() {
    return {
      exportDay: '',
      edit: false,
      showOrder: false,
      orderList: [''],
      params: {
        page: 1,
        rows: 10,
        keyword: '',
        total: '',
        searchType:'',
        searchKey:''

      },
      options: [
        {label: '姓名', value: 'name'}, {label: '手机号', value: 'tel'}
      ],
      day: '',
      orderInfo: {},
      search: '',
      searchInput: ''
    }
  },
  methods: {
    searchFn(){
       this.params.searchType=this.search
       this.params.searchKey=this.searchInput
      this.getOrderList()
    },
    changeSearchType(res) {
      console.log(this.search)
    },
    getOrderDay() {
      getOrderDay().then(res => {
        this.day = res.data.res
      })
    },
    updateDay() {
      if (!this.day) return this.$message.error('请输入天数')
      this.$confirm('此操作将修改预定时间, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        editOrderDay(this.day).then(res => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        });
      });
    },
    exportDayFn() {

      if (!this.exportDay) return this.$message.error('请选择日期')
      this.$confirm('此操作将导出该日期的订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.open('https://lxhz123.com:10000/api/order/export/order?day='+this.exportDay[0]+'&endDay='+this.exportDay[1])
        // window.open('https://127.0.0.1:9997/api/order/export/order?day=' + this.exportDay[0] + '&endDay=' + this.exportDay[1])
1
        // this.$message({
        //   type: 'success',
        //   message: '导出成功!'
        // });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消导出'
        });
      });
    },
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
    this.getOrderDay()
  }
}
</script>

<style scoped>
.action {
  float: right;
}

.left {
  max-height: 150px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  flex-wrap: wrap;
}

.search {
  display: flex;
  min-width: 333px;
}
</style>