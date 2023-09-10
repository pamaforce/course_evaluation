<template>
  <div>
    <div class="header">
      <div class="logo" @click="$router.push('/')">
        <img src="../assets/logo.png" alt="logo" />
        <p>天津大学课程评价系统</p>
      </div>
      <div
        class="backBtn"
        @click="handleBack"
        v-if="$route.path != '/myCourse'"
      >
        返回
      </div>
      <div class="user">
        <img src="../assets/avatar.png" alt="logo" />
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            您好，{{ authType[getToken().split("_")[0]] }}用户{{
              getToken().split("_")[1]
            }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="nav" v-if="showNav">
      <div
        :class="'nav-item' + (activeItem === 0 ? ' active' : '')"
        @click="changeActiveItem(0)"
      >
        评价进程
      </div>
      <div
        :class="'nav-item' + (activeItem === 1 ? ' active' : '')"
        @click="changeActiveItem(1)"
      >
        评价结果
      </div>
      <div :class="'capsule active' + activeItem"></div>
    </div>
  </div>
</template>

<script>
import { getToken, removeToken } from "@/utils/auth";
export default {
  data() {
    return {
      activeItem: 0,
      showNav: false,
      authType: {
        1: "教师",
        2: "学生",
        3: "专家",
      },
    };
  },
  watch: {
    $route(val) {
      if (val.name === "evaluationProcess" || val.name === "evaluationResult") {
        this.activeItem = 0;
        if (val.name === "evaluationResult") this.activeItem = 1;
        this.showNav = true;
      } else this.showNav = false;
    },
  },
  methods: {
    handleBack() {
      this.$bus.$emit("back");
    },
    getToken() {
      return getToken() || "_";
    },
    handleCommand(val) {
      switch (val) {
        case "logout":
          this.toLogout();
          break;
      }
    },
    toLogout() {
      removeToken();
      this.$message.success("退出登录成功");
      this.$router.push("/login");
    },
    changeActiveItem(index) {
      this.activeItem = index;
      if (index === 0) {
        this.$router.push("/evaluationProcess");
      } else {
        this.$router.push("/evaluationResult");
      }
    },
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 66px;
  background-color: #2c2c2c;
  padding: 0 112px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  z-index: 98;
  border-bottom: 1px solid #15c3a1;
}
.logo {
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 18px;
  color: #ffffff;
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
  color: #fff;
}
.el-dropdown {
  color: #fff;
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
.nav {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 66px;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 98;
}
.nav-item {
  width: 140px;
  height: 60px;
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 20px;
  color: #ffffff;
  cursor: pointer;
  z-index: 99;
}
.active {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
  color: #15c3a1;
}
.capsule {
  height: 2px;
  width: 40px;
  background: #068a70;
  position: absolute;
  left: 50%;
  bottom: -2px;
  border-radius: 4px;
  transform: translateX(calc(-50% - 70px));
  transition: all 0.3s;
}
.active0 {
  transform: translateX(calc(-50% - 70px));
}
.active1 {
  transform: translateX(calc(-50% + 70px));
}
.backBtn {
  position: absolute;
  cursor: pointer;
  left: 380px;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  z-index: 99;
}
</style>