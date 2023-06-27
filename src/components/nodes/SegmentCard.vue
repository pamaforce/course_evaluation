<template>
  <div class="name-card">
    <div class="top-div">
      <div
        class="color-div"
        :style="'width:' + (parseInt(score + '') + 10) + '%'"
      ></div>
      <input class="title" v-model="title" />
      <input class="score" v-model="score" v-positive-integer />
    </div>
    <div class="bottom-div">
      <div class="flex-line">
        <div class="icon-label">
          <img src="../../assets/dot.svg" />
          <el-select
            v-model="value"
            placeholder="请选择"
            size="mini"
            @change="updateSize"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="icon-label switch">
          <el-switch v-model="value1" :width="30"> </el-switch>
          <p
            @click="handleClick1"
            :style="value1 ? 'color:rgb(58, 182, 245);' : ''"
          >
            提交作业
          </p>
        </div>
        <div class="icon-label switch">
          <el-switch v-model="value2" :width="30" @change="handleValue2">
          </el-switch>
          <p
            @click="handleClick2"
            :style="value2 ? 'color:rgb(58, 182, 245);' : ''"
          >
            提交评语
          </p>
        </div>
      </div>
      <div class="icon-label" v-if="value === 1">
        <img src="../../assets/dot.svg" />
        <p class="margin-p-2">第</p>
        <el-select v-model="value11" placeholder="请选择" size="mini">
          <el-option
            v-for="item in options5"
            :key="item"
            :value="item"
            :label="item"
          >
          </el-option>
        </el-select>
        <p>次分组</p>
      </div>
      <div class="icon-label">
        <img src="../../assets/dot.svg" />
        <p class="margin-p">评价角色类型</p>
        <el-select
          v-model="value3"
          placeholder="请选择"
          size="mini"
          @change="handleValue3"
        >
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <img
          src="../../assets/add2.svg"
          class="icon-add"
          v-if="!add && value3 !== 1"
          @click="handleAdd"
        />
        <img
          src="../../assets/x.svg"
          class="icon-x"
          v-if="add"
          @click="handleX"
        />
      </div>
      <div class="icon-label multi-select" v-if="value3 === 0">
        <img src="../../assets/people.svg" />
        <p class="margin-p">评价成员</p>
        <el-select
          v-model="value6"
          placeholder="请选择"
          size="mini"
          multiple
          @change="multiChange"
        >
          <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="icon-label multi-select" v-else-if="value3 === 2">
        <img src="../../assets/people.svg" />
        <p class="margin-p">评价成员</p>
        <el-select
          v-model="value7"
          placeholder="请选择"
          size="mini"
          multiple
          @change="multiChange"
        >
          <el-option
            v-for="item in options4"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="flex-line-2" v-else>
        <div class="icon-label switch">
          <el-switch v-model="value4" :width="30"> </el-switch>
          <p
            @click="handleClick4"
            :style="value4 ? 'color:rgb(58, 182, 245);' : ''"
          >
            评价本{{ value === 0 ? "生" : "组" }}
          </p>
        </div>
        <div
          class="icon-label switch"
          :style="!value2 ? 'cursor:not-allowed' : ''"
        >
          <el-switch v-model="value5" :width="30" :disabled="!value2">
          </el-switch>
          <p
            @click="handleClick5"
            :style="
              value2
                ? value5
                  ? 'color:rgb(58, 182, 245);'
                  : ''
                : 'opacity:0.6'
            "
          >
            组长评价
          </p>
        </div>
      </div>
      <div class="icon-label" v-if="add">
        <img src="../../assets/dot.svg" />
        <p class="margin-p">评价角色类型</p>
        <el-select
          v-model="value8"
          placeholder="请选择"
          size="mini"
          @change="handleValue8"
        >
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <img
          src="../../assets/add2.svg"
          class="icon-add"
          v-if="!add && value8 !== 1"
          @click="handleAdd"
        />
        <img
          src="../../assets/x.svg"
          class="icon-x"
          v-if="add"
          @click="handleX(true)"
        />
      </div>
      <div class="icon-label multi-select" v-if="add && value8 === 0">
        <img src="../../assets/people.svg" />
        <p class="margin-p">评价成员</p>
        <el-select
          v-model="value9"
          placeholder="请选择"
          size="mini"
          multiple
          @change="multiChange"
        >
          <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="icon-label multi-select" v-else-if="add && value8 === 2">
        <img src="../../assets/people.svg" />
        <p class="margin-p">评价成员</p>
        <el-select
          v-model="value10"
          placeholder="请选择"
          size="mini"
          multiple
          @change="multiChange"
        >
          <el-option
            v-for="item in options4"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["getNode", "getGraph"],
  data() {
    return {
      title: "",
      score: 0,
      add: false,
      options: [
        {
          value: 0,
          label: "个人分",
        },
        {
          value: 1,
          label: "小组分",
        },
      ],
      options2: [
        {
          value: 0,
          label: "教师",
        },
        {
          value: 1,
          label: "学生",
        },
        {
          value: 2,
          label: "专家",
        },
      ],
      options3: [
        {
          value: 0,
          label: "教师0",
        },
        {
          value: 1,
          label: "教师1",
        },
        {
          value: 2,
          label: "教师2",
        },
        {
          value: 3,
          label: "教师3",
        },
        {
          value: 4,
          label: "教师4",
        },
      ],
      options4: [
        {
          value: 0,
          label: "专家0",
        },
        {
          value: 1,
          label: "专家1",
        },
        {
          value: 2,
          label: "专家2",
        },
        {
          value: 3,
          label: "专家3",
        },
        {
          value: 4,
          label: "专家4",
        },
      ],
      options5: [1, 2, 3, 4, 5],
      value: 0,
      value1: 0,
      value2: 0,
      value3: 1,
      value4: 0,
      value5: 0,
      value6: [],
      value7: [],
      value8: 0,
      value9: [],
      value10: [],
      value11: "",
      node: null,
    };
  },
  methods: {
    handleAdd() {
      this.add = true;
      this.value8 = 2 - this.value3;
      this.updateSize();
    },
    handleX(val = false) {
      if (val !== true) {
        this.value3 = this.value8;
        this.value6 = this.value9;
        this.value7 = this.value10;
      }
      this.add = false;
      setTimeout(() => {
        this.updateSize();
      }, 50);
    },
    multiChange() {
      setTimeout(() => {
        this.updateSize();
      }, 50);
    },
    handleClick1() {
      this.value1 = !this.value1;
    },
    handleClick2() {
      this.value2 = !this.value2;
    },
    handleValue2(val) {
      if (!val) {
        this.value5 = false;
      }
    },
    handleValue3() {
      this.value6 = [];
      this.value7 = [];
      this.value5 = 0;
      this.value4 = 0;
      if (this.value3 === 1) {
        this.add = false;
      }
      this.updateSize();
    },
    handleValue8(val) {
      if (val === 1) {
        this.add = false;
        this.value3 = 1;
        this.value5 = 0;
        this.value4 = 0;
      }
      this.updateSize();
    },
    handleClick4() {
      this.value4 = !this.value4;
    },
    handleClick5() {
      if (this.value2) {
        this.value5 = !this.value5;
      }
    },
    updateSize() {
      this.$nextTick(() => {
        const zoom = this.getGraph().zoom();
        const { width, height } = this.$el.getBoundingClientRect();
        this.node.prop("size", { width: width / zoom, height: height / zoom });
      });
    },
  },
  mounted() {
    this.node = this.getNode();
    this.node.on("change:data", ({ current }) => {
      console.log(current);
      const { title, score } = current;
      this.title = title;
      this.score = score;
    });
    this.title = this.node.data.title;
    this.score = this.node.data.score;
    this.updateSize();
  },
};
</script>
<style scoped>
.name-card {
  width: 380px;
  height: max-content;
  border-radius: 8px;
  overflow: hidden;
  background: linear-gradient(
    90deg,
    rgba(217, 217, 217, 0.6) 0%,
    #d9d9d9 17.5%,
    #d9d9d9 81.56%,
    rgba(217, 217, 217, 0.6) 100%
  );
}
.top-div {
  background-color: #c3c3c3;
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 5px;
  position: relative;
}
.bottom-div {
  margin-top: 25px;
  width: 100%;
  position: relative;
  padding: 0 calc(8% - 7px);
}
.flex-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.flex-line-2 {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.flex-line-2 .switch {
  margin-right: 12px !important;
}
.icon-label {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}
.icon-label img {
  width: 14px;
  height: 14px;
  margin-right: 6px;
}
.icon-label p {
  margin: 0;
  font-size: 10px;
}
.icon-label .el-select {
  width: 100px;
}
.icon-label .el-switch {
  transform: scale(0.6);
}
.icon-add {
  margin-left: 6px;
  width: 12px !important;
  height: 12px !important;
  cursor: pointer;
}
.icon-x {
  margin-left: 6px;
  width: 12px !important;
  height: 12px !important;
  cursor: pointer;
}
.switch {
  cursor: pointer;
}
.margin-p {
  margin-right: 5px !important;
}
.margin-p + .el-select {
  width: 80px !important;
}
.multi-select .margin-p + .el-select {
  width: unset !important;
}
.margin-p-2 + .el-select {
  width: 70px !important;
  margin: 0 5px;
}
.color-div {
  position: absolute;
  height: 100%;
  left: 0;
  top: 0;
  background: linear-gradient(
    92.65deg,
    #6a6a6a 4.77%,
    rgba(106, 106, 106, 0) 76.55%
  );
  z-index: 1;
}
.title {
  font-family: "Smiley Sans";
  font-style: italic;
  font-size: 16px;
  color: #ffffff;
  background-color: transparent;
  outline: none;
  border: none;
  box-sizing: border-box;
  z-index: 2;
}
.score {
  padding: 0 4px;
  width: 36px;
  background-color: transparent;
  border-radius: 2px;
  text-align: center;
  border: 0.2px solid white;
  font-family: "Smiley Sans";
  font-style: italic;
  font-size: 8px;
  color: #e7e7e7;
  outline: none;
  z-index: 3;
}
</style>