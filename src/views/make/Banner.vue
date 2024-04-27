<script setup>
export default {
  name: "Locallist",
  data() {
    return {
      bannerList:[]
    }
  }
}
</script>

<template>
  <div class="banner">

    <el-table
        :data="bannerList"
        stripe
        style="width: 100%">
      <el-table-column
          prop="id"
          label="编号"
      >
      </el-table-column>


      <el-table-column
          prop="type"
          label="类型"
      >
      </el-table-column>


      <el-table-column
          label="操作"
          width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="updatePushOrSure(scope.row)">修改</el-button>
        </template>
      </el-table-column>


    </el-table>
  </div>
</template>

<style scoped>

</style>