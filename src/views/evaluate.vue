<template>
  <div class="wrapper">
    <div
      :class="
        'progress' + ($route.path === '/evaluationResult' ? ' change' : '')
      "
      @click="toPath('/evaluationProcess')"
    >
      <div class="c-1">
        <p class="p-0">总体</p>
        <p class="p-1">1 每周汇报</p>
        <p class="p-2">1-1 课堂汇报</p>
        <p class="p-2">1-2 WIKI更新</p>
        <p class="p-2">1-3 每周个人总结</p>
        <p class="p-3">1-3-1 得分点1</p>
        <p class="p-3">1-3-2 得分点2</p>
        <p class="p-2">1-4 技术首次汇报</p>
        <p class="p-1">2 期末汇报</p>
        <p class="p-2">2-1 平台功能汇报</p>
        <p class="p-2">2-2 5页PPT</p>
        <p class="p-2">2-3 答辩</p>
        <p class="p-2">2-4 平台验收</p>
        <p class="p-2">2-5 组长评分</p>
      </div>
      <div class="c-2">
        <div class="l-1">
          <p class="t-1">选择环节级别</p>
          <div class="b-1">总体</div>
          <div class="b-1">一级</div>
          <div class="b-1">二级</div>
          <div class="b-1">三级</div>
        </div>
        <div class="l-2">
          <div class="kl">
            0
            <div></div>
          </div>
          <div class="kl">
            25
            <div></div>
          </div>
          <div class="kl">
            50
            <div></div>
          </div>
          <div class="kl">
            75
            <div></div>
          </div>
          <div class="kl">
            100%
            <div></div>
          </div>
        </div>
      </div>
    </div>
    <div class="result" @click="toPath('/evaluationResult')">
      <div class="c-1">
        <p class="p-0">总体</p>
        <p class="p-1">1 每周汇报</p>
        <p class="p-2">1-1 课堂汇报</p>
        <p class="p-2">1-2 WIKI更新</p>
        <p class="p-2">1-3 每周个人总结</p>
        <p class="p-3">1-3-1 得分点1</p>
        <p class="p-3">1-3-2 得分点2</p>
        <p class="p-2">1-4 技术首次汇报</p>
        <p class="p-1">2 期末汇报</p>
        <p class="p-2">2-1 平台功能汇报</p>
        <p class="p-2">2-2 5页PPT</p>
        <p class="p-2">2-3 答辩</p>
        <p class="p-2">2-4 平台验收</p>
        <p class="p-2">2-5 组长评分</p>
      </div>
      <div class="c-2">
        <div class="l-1">
          <p class="t-1">选择环节级别</p>
          <div class="b-1">总体</div>
          <div class="b-1">一级</div>
          <div class="b-1">二级</div>
          <div class="b-1">三级</div>
        </div>
        <div class="l-2">
          <div class="kl">
            &lt;60
            <div></div>
          </div>
          <div class="kl">
            65
            <div></div>
          </div>
          <div class="kl">
            70
            <div></div>
          </div>
          <div class="kl">
            75
            <div></div>
          </div>
          <div class="kl">
            80
            <div></div>
          </div>
          <div class="kl">
            85
            <div></div>
          </div>
          <div class="kl">
            90
            <div></div>
          </div>
          <div class="kl">
            95
            <div></div>
          </div>
          <div class="kl">
            100
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toPath(path) {
      this.$router.push(path);
    },
    handleBack() {
      this.$router.push("/courseDetail");
    },
  },
  mounted() {
    this.$bus.$on("back", this.handleBack);
  },
  beforeDestroy() {
    this.$bus.$off("back", this.handleBack);
  },
};
</script>

<style scoped>
.wrapper {
  padding: 120px 0;
  position: relative;
  display: flex;
  overflow-x: hidden;
  padding-bottom: 60px;
}
.progress {
  width: 1500px;
  height: calc(100vh - 180px);
  border-radius: 20px;
  margin: 0 75px;
  background: #fff;
  box-shadow: 0px 0px 37px 2px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  transition: all 0.3s ease-in-out;
  padding: 36px;
  display: flex;
  overflow-y: auto;
  padding-top: 0;
  padding-right: 52px;
}
.result {
  width: 1500px;
  height: calc(100vh - 180px);
  border-radius: 20px;
  margin: 0 75px;
  margin-left: 0;
  background: #fff;
  box-shadow: 0px 0px 37px 2px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  transition: all 0.3s ease-in-out;
  padding: 36px;
  display: flex;
  overflow-y: auto;
  padding-top: 0;
  padding-right: 52px;
}
.change {
  margin-left: calc(100% - 3150px);
}
.c-1 {
  width: 180px;
  display: flex;
  flex-direction: column;
  padding-top: 150px;
}
.c-1 p {
  color: #333;
  letter-spacing: 1px;
  margin: 0;
  line-height: 52px;
  flex-shrink: 0;
}
.p-0,
.p-1 {
  font-size: 18px;
}
.p-2 {
  font-size: 16px;
}
.p-3 {
  font-size: 14px;
}
.c-2 {
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  margin-left: 24px;
  height: calc(100% + 114px);
}
.l-1 {
  display: flex;
  align-items: center;
  height: 120px;
  flex-shrink: 0;
}
.t-1 {
  color: #000;
  font-size: 20px;
  font-weight: 700;
  margin-right: 24px;
}
.b-1 {
  padding: 8px 24px;
  background-color: #333;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  margin-right: 16px;
  cursor: pointer;
}
.l-2 {
  flex-grow: 2;
  display: flex;
  justify-content: space-between;
  height: 100%;
}
.kl {
  width: 30px;
  font-size: 13px;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}
.kl div {
  width: 1px;
  flex-grow: 2;
  background-color: #ddd;
  margin-top: 15px;
}
</style>