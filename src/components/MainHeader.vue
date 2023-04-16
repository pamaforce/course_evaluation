<template>
  <div class="header">
    <div class="logo" @click="$router.push('/')">
      <img src="../assets/logo.svg" alt="logo" />
      <p>天津大学课程评价系统</p>
    </div>
    <div class="user">
      <img src="../assets/logo.svg" alt="logo" />
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          您好，教师用户TJU2503<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出登录</el-dropdown-item>
          <el-dropdown-item>切换设置端</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.header {
  width: 100%;
  height: 66px;
  background-color: #d9d9d9;
  padding: 0 112px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}
.logo {
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 18px;
  color: #010101;
  cursor: pointer;
}
.logo img {
  width: 35px;
  height: 35px;
  margin-right: 12px;
}
.user {
  display: flex;
  align-items: center;
}
.user img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 12px;
}
.el-dropdown-link {
  cursor: pointer;
}
</style>