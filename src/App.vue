<template>
  <div id="app">
    <MainHeader />
    <router-view></router-view>
  </div>
</template>

<script>
import MainHeader from "./components/MainHeader.vue";
export default {
  name: "App",
  components: {
    MainHeader,
  },
  data() {
    return {};
  },
};
</script>

<style>
@font-face {
  font-family: "PingFangSC";
  src: url("./assets/font/PingFangSC.ttf");
}
@font-face {
  font-family: "Smiley Sans";
  src: url("./assets/font/SmileySans.otf");
}
* {
  font-family: "PingFangSC";
  box-sizing: border-box;
}
.el-dialog {
  --el-dialog-title-font-size: 36px !important;
  --el-dialog-font-line-height: unset !important;
  display: flex;
  display: -ms-flex;
  flex-direction: column;
  -ms-flex-direction: column;
  margin: 0 !important;
  padding: 0 30px !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
  width: max-content !important;
  border-radius: 8px !important;
}

.el-dialog .el-dialog__body {
  max-height: 100%;
  flex: 1;
  -ms-flex: 1 1 auto;
  overflow-y: auto;
  overflow-x: hidden;
  text-align: center;
}
::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 5px;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 5px;
  background: #ececec;
  transition: color 0.2s ease;
}
.mr-20 {
  margin-right: 20px;
}
img {
  -webkit-user-drag: none;
  user-select: none;
}
.x6-widget-selection-box {
  border: 3px dashed #3ab6f5;
}

.x6-widget-selection-inner {
  border: 2px solid #3ab6f5;
}
.x6-widget-snapline-vertical,
.x6-widget-snapline-horizontal {
  stroke: #3ab6f5;
  stroke-width: 1px;
}
</style>