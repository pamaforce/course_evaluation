<template>
  <div class="login">
    <img src="../assets/bg.svg" class="login-bg" />
    <div class="box">
      <p class="title">天津大学课程评价系统</p>
      <!-- <p class="label">账号</p> -->
      <el-input
        v-model="account"
        class="account"
        placeholder="teacher1或student1或expert1"
      ></el-input>
      <!-- <p class="label">密码</p> -->
      <el-input
        v-model="password"
        class="password"
        type="password"
        placeholder="默认为password"
        show-password
        @keydown.enter.native="toLogin"
      ></el-input>
      <el-button
        auto-insert-space
        type="primary"
        class="btn"
        @click="toLogin"
        :loading="loading"
        >登 录</el-button
      >
    </div>
  </div>
</template>

<script>
import { setToken } from "../utils/auth";
import { setData } from "../utils/data";
import { login } from "../api/index";
export default {
  data() {
    return {
      account: "",
      password: "",
      loading: false,
      authMap: {
        teacher1: 1,
        student1: 2,
        expert1: 3,
      },
    };
  },
  methods: {
    toLogin() {
      if (!this.account) {
        this.$message.warning("请输入您的账号");
        return;
      }
      if (!this.password) {
        this.$message.warning("请输入您的密码");
        return;
      }
      this.loading = true;
      login({
        username: this.account,
        password: this.password,
      })
        .then((res) => {
          console.log(res);
          if (res.err_code === 0) {
            this.$message.success("登录成功");
            this.loading = false;
            setToken(res.data[1].original.access_token);
            setData("info", res.data[0]);
            this.$router.push("/myCourse");
          } else {
            this.$message.error(res.message);
            this.loading = false;
          }
        })
        .catch(() => {
          this.$message.error("登录失败，请检查服务器状态~");
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: flex-end;
  background-color: #000000;
}
.login-bg {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
}
.box {
  position: relative;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 50%;
}
.account,
.password {
  width: 350px;
  height: 45px;
  margin-bottom: 70px;
  font-size: 20px;
}
.account :deep(.el-input__inner),
.password :deep(.el-input__inner) {
  text-align: center;
}
.account :deep(.el-input__wrapper),
.password :deep(.el-input__wrapper) {
  border-radius: 10px;
  border: 1px solid #818181;
}
.title {
  margin: 0;
  font-size: 36px;
  font-weight: 700;
  color: #15c3a1;
  margin-bottom: 100px;
}
.label {
  width: 350px;
  font-size: 20px;
  margin-bottom: 15px;
  color: #15c3a1;
}
.copyright {
  font-size: 16px;
  color: #014b88;
  position: absolute;
  bottom: 24px;
  right: 50%;
  transform: translateX(50%);
}
.btn {
  padding: 12px 60px;
  font-weight: 700;
  font-size: 20px;
  border-radius: 30px;
  background-color: #15c3a1;
  border: none;
}
</style>