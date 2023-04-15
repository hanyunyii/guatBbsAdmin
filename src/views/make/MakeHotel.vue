<template>
  <div class="list">
    <el-table
        :data="makeList"
        stripe
        style="width: 100%">
      <el-table-column
          prop="makeDate"
          label="预约时间"
      >
      </el-table-column>
      <el-table-column
          label="预约者"
      >
        <template slot-scope="scope">
          {{scope.row.member.name}}
        </template>
      </el-table-column>
      <el-table-column
          label="身份证"
      >
        <template slot-scope="scope">
          {{scope.row.member.idNum}}
        </template>
      </el-table-column>
      <el-table-column
          label="联系方式"
      >
        <template slot-scope="scope">
          {{scope.row.member.tel}}
        </template>
      </el-table-column>
      <el-table-column
          label="酒店名"
      >
        <template slot-scope="scope">
          {{scope.row.rmHotel.name}}
        </template>
      </el-table-column>
      <el-table-column
          label="房型"
      >
        <template slot-scope="scope">
          {{scope.row.rmHotelDetails.house}}
        </template>
      </el-table-column>
      <el-table-column
          label="价格"
      >
        <template slot-scope="scope">
          {{scope.row.rmHotelDetails.price}}
        </template>
      </el-table-column>
      <el-table-column
          prop="makeStartDate"
          label="入住时间"
      >
      </el-table-column>
      <el-table-column
          prop="makeEndDate"
          label="离店时间"
      >
      </el-table-column>
      <el-table-column
          label="状态"
      >
        <template slot-scope="scope">
          {{scope.row.state===0?'待入住':scope.row.state===1?'入住中':scope.row===2?'已完成':'已取消'}}
        </template>
      </el-table-column>



    </el-table>

    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="params.total"
        :page-size.sync="params.size"
        :current-page.sync="params.current"
    >
    </el-pagination>
  </div>
</template>

<script>
import {getMakeHotelPage} from "@/api/hotel";

export default {
  name: "MakeHotel",
  data() {
    return {
      params: {
        size: 10,
        current: 1,
        total: 0,
        name: ''
      },
      makeList: []
    }
  },
  methods: {
    deleteMake(id) {
    },
    handleSizeChange(val) {
      this.params.size = val
      this.getMakeList();
    },
    handleCurrentChange(val) {
      this.params.current = val
      this.getMakeList();
    },
    getMakeList() {
      getMakeHotelPage(this.params).then(res => {
        console.log(res)
        this.makeList = res.data.page.records
        this.params.current = res.data.page.current
        this.params.size = res.data.page.size
        this.params.total = res.data.page.total
        console.log(this.params)
      })
    },
  },
  created() {
    this.getMakeList()
  }
}
</script>

<style scoped>

</style>