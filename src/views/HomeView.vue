<template>

  <div class="index">
    <el-container>
      <el-header>
        <my-header v-if="$route.path!=='/login'"></my-header>
        <el-divider v-if="$route.path!=='/login'"></el-divider>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              :router="true"
          >


            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item index="orderList">订单列表</el-menu-item>


            </el-submenu>

            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-s-home"></i>
                <span>景区管理</span>
              </template>
              <el-menu-item index="ticketList">景区列表</el-menu-item>


            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item index="userList">用户列表</el-menu-item>


            </el-submenu>
            <el-submenu index="6">
              <template slot="title">
                <i class="el-icon-s-ticket"></i>
                <span>卡号管理</span>
              </template>
              <el-menu-item index="localList">卡号列表</el-menu-item>


            </el-submenu>

            <el-submenu index="7">
              <template slot="title">
                <i class="el-icon-set-up"></i>
                <span>小程序管理</span>
              </template>
              <el-menu-item index="banner">首页轮播图</el-menu-item>
              <el-menu-item index="hotel">酒店管理</el-menu-item>


            </el-submenu>

            <el-submenu index="8">
              <template slot="title">
                <i class="el-icon-house"></i>
                <span>酒店预约管理</span>
              </template>
              <el-menu-item index="makeHotel">预约列表</el-menu-item>


            </el-submenu>


          </el-menu>
        </el-aside>
        <el-main>

          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>


import MyHeader from "@/common/MyHeader";
import {isLogin} from "@/api/user";

export default {
  name: "index",
  components: {MyHeader},
  methods: {},
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (this.userInfo === null) {

      this.$message.warning("请先登录")
      this.$router.push('/login')
      return;
    }

  }
}
</script>

<style scoped>

</style>