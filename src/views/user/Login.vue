<template>
  <div class="login">
    <div class="login-info">
      <h2 style="text-align: center">登录</h2>
      <el-input
          style="width: 500px"
          placeholder="请输入账号"
          v-model="user.username"
          clearable>
      </el-input>
      <el-input style="width: 500px;margin-top: 30px" placeholder="请输入密码" v-model="user.password" show-password
                clearable></el-input>

      <el-button type="primary" style="width: 500px;margin-top: 30px" @click.native="login">登录</el-button>
    </div>

  </div>
</template>

<script>
import {login} from "@/api/user";

export default {
  name: "login",
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      login(this.user).then(res => {

        this.$message.success(res.data.msg)
        if (res.data.code === 500) {
          this.$message.warning(res.data.msg)

          return
        }
        this.$message.success(res.data.msg)
        console.log(res)
        localStorage.setItem('token', res.data.res.token)
        localStorage.setItem('userInfo', JSON.stringify(res.data.res.admin))

        this.$router.push('/')
        this.$router.go(0)
      }).catch(err => {
        this.$message.error(err)
      })
    }
  }
}
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-direction: column;
  justify-items: center;
  height: 100vh;

  background: url("../../imges/bargound.jpg");

  background-position: center center;

  background-repeat: no-repeat;

  background-attachment: fixed;
  background-size: cover;


}

.login-info {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 15px;
  align-items: center;
  width: 600px;
  min-height: 300px;

}
</style>