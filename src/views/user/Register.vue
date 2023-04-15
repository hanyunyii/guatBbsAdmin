<template>
  <div class="login">
    <div class="login_boder">
      <div class="login_item">

        <!-- <i class="el-icon-user"></i> -->
        <el-input
            placeholder="请输入账号"
            v-model="login.username"
            class="inp"
        ></el-input>
        <!-- <i class="el-icon-lock"></i> -->
        <el-input
            placeholder="请输入密码"
            type="password"
            v-model="login.password"
            class="inp"
            show-password
        >
        </el-input>

        <el-button class="inp" @click="submitRegister">注册</el-button>
        <span style="float: right;margin-top: 10px;font-size: 19px" @click="$router.push('/login')">已有账号,立刻登录</span>
        <!--        <el-button style="width: 400px;margin-top: 30px" @click="$router.push('/register')">注册</el-button>-->
      </div>
    </div>
  </div>
</template>

<script>
import {register} from "@/api/user";

export default {
  name: "Login2",
  data() {
    return {
      login: {
        username: "",
        password: "",
      },
    };
  },
  methods: {

    submitRegister() {
      if (this.login.username===''|| this.login.password==='') {
        this.$message.warning('必填项不能为空')
        return;
      }

      register(this.login).then(res=>{
        if (res.data.code===0){
          this.$message.success(res.data.msg)
          this.$router.push('/login')
        }else{
          this.$message.warning(res.data.msg)
        }
      })
    },
  },
};
</script>

<style scoped>
.login {
  justify-items: center;
  width: 100%;
  min-height: 1000px;
  position: relative;
  background-image: linear-gradient(
      60deg,
      #3d3393 0%,
      #2b76b9 37%,
      #2cacd1 65%,
      #35eb93 100%
  );
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.login::before {
  content: "";
  width: 180px;
  height: 50px;
  display: block;
  position: absolute;
  left: 35px;
  top: 35px;

  background-repeat: no-repeat;
  background-size: 100%;
}

.login_item {
  position: relative;
  width: 400px;
  height: 210px;
}

.el-icon-user,
.el-icon-lock {
  position: absolute;
  display: block;
  width: 20px;
  height: 20px;
  top: 41px;
  left: 6px;
  color: #666;
  font-size: 16px;
  z-index: 999;
  margin-right: 20px;
}

.el-icon-lock {
  top: 111px;
}

.inp {
  width: 400px;
  margin-top: 30px;
}

.el-input__inner {
  background-color: black;
  padding-left: 30px;
}
</style>