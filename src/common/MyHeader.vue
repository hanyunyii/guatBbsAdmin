<template>
  <div class="my-header">

    <span style="font-size: 20px;margin-right: 20px">{{ $store.state.userInfo.username }}</span>
    <el-button type="info" icon="el-icon-switch-button" @click.native="logout" size="mini" circle
               title="退出登录"></el-button>

  </div>
</template>

<script>
import {isLogin} from "@/api/user";

export default {
  name: "MyHeader",
  data() {
    return {
      userInfo: this.$store.state.userInfo
    }
  },
  methods: {
    isLogin() {
      isLogin().then(res => {
        console.log(res)
        if (res.data.code===500){
          this.$message.warning("请先登录")
          this.$router.push('/login')
          localStorage.removeItem('userInfo')
          localStorage.removeItem('token')

        }
      }).catch(() => {
        this.$message.warning("请先登录")
        this.$router.push('/login')
        localStorage.removeItem('userInfo')
        localStorage.removeItem('token')
      })
    },
    logout() {
      this.$confirm('退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        logout().then(() => {
          localStorage.removeItem('userInfo')
          localStorage.removeItem('token')

          this.$message.success('退出成功')
          this.$router.push('/login')
        }).catch(() => {
          localStorage.removeItem('userInfo')
          localStorage.removeItem('token')

          this.$message.success('退出成功')
          this.$router.push('/login')
        })
        //退出登录
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (this.userInfo === null) {

      this.$message.warning("请先登录")
      this.$router.push('/login')
      return;
    }
    this.isLogin()
  }
}
</script>

<style scoped>
.my-header {
  height: 50px;
  text-align: right;
  line-height: 45px;
}
</style>