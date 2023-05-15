<template>
  <div class="wrapper">
    <p class="title">我的课程</p>
    <div class="top-line">
      <el-cascader
        class="mr-20"
        v-model="value_1"
        :options="options_1"
        @change="handleChange"
        placeholder="开课学期"
      ></el-cascader>
      <el-select v-model="value_2" placeholder="开课班级">
        <el-option
          v-for="item in options_2"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <div class="slider">
        <el-slider
          v-model="value_3"
          range
          :marks="marks"
          :max="6"
          :show-tooltip="false"
        >
        </el-slider>
      </div>
    </div>
    <div class="card-view">
      <div
        class="course"
        v-for="(item, i) in courseList"
        :key="i"
        @click.stop="toDetail(i)"
      >
        <p class="num">选课人数：{{ item.num }}</p>
        <div class="course-info">
          <div class="name-line">
            <p>{{ item.name }}</p>
            <img src="../assets/edit.svg" />
          </div>
          <p class="more-info">{{ item.term }} | {{ item.class }}</p>
        </div>
        <img
          src="../assets/delete.svg"
          class="delete"
          @click.stop="toDelete(i)"
        />
      </div>
      <div class="add">
        <img src="../assets/add.svg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      courseList: [
        {
          num: 65,
          name: "展示展览设计",
          term: "212202",
          class: "2019级宣怀1班",
        },
        {
          num: 65,
          name: "展示展览设计",
          term: "212202",
          class: "2019级宣怀1班",
        },
        {
          num: 65,
          name: "展示展览设计",
          term: "212202",
          class: "2019级宣怀1班",
        },
        {
          num: 65,
          name: "展示展览设计",
          term: "212202",
          class: "2019级宣怀1班",
        },
        {
          num: 65,
          name: "展示展览设计",
          term: "212202",
          class: "2019级宣怀1班",
        },
      ],
      value_1: [],
      value_2: "",
      options_1: [],
      options_2: [
        {
          label: "2019级宣怀1班",
          value: 0,
        },
        {
          label: "2018级宣怀1班",
          value: 1,
        },
        {
          label: "2019级工业设计1班",
          value: 2,
        },
        {
          label: "2019级工业设计2班",
          value: 3,
        },
        {
          label: "2018级工业设计1班",
          value: 4,
        },
        {
          label: "2018级工业设计2班",
          value: 5,
        },
      ],
      value_3: [0, 4],
      marks: {
        0: "2022",
        1: {
          label: this.$createElement("strong", "2023"),
        },
        2: "2024",
        3: "2025",
        4: "2026",
        5: "2027",
        6: "2028",
      },
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    toDelete(i) {
      console.log(this.courseList[i]);
    },
    toDetail(i) {
      this.$router.push({ path: "/courseDetail" });
      console.log(this.courseList[i]);
    },
  },
  created() {
    this.options_1 = [];
    for (let i = 0; i <= 13; i++) {
      this.options_1.push({
        value: 2022 + i,
        label: `${2022 + i}-${2022 + i + 1}`,
        children: [
          {
            value: 0,
            label: "学期1",
          },
          {
            value: 1,
            label: "学期2",
          },
        ],
      });
    }
  },
};
</script>

<style scoped>
.wrapper {
  padding: 60px 112px;
}
.title {
  font-weight: 700;
  font-size: 26px;
  color: #010101;
}
.top-line {
  display: flex;
}
.slider {
  flex-grow: 1;
  margin: 0 40px;
  margin-right: 10px;
}
.card-view {
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(4, 394px);
  justify-content: space-between;
  row-gap: 32px;
}
.add {
  width: 100%;
  height: 260px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d9d9d9;
  border-radius: 21px;
}
.add img {
  width: 100px;
  height: 100px;
}
.course {
  width: 100%;
  height: 260px;
  background: #d9d9d9;
  border-radius: 21px;
  background-image: url("../assets/back.svg");
  background-size: 100% 100%;
  padding: 14px 24px;
  padding-bottom: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  overflow: hidden;
  position: relative;
}
.delete {
  position: absolute;
  right: -80px;
  transition: all 0.3s;
  top: 0;
  width: 80px;
  height: 100%;
}
.course:hover .delete {
  right: 0;
}
.num {
  font-family: "Smiley Sans";
  font-size: 16px;
  color: #ffffff;
  margin: 0;
  font-style: italic;
}
.course-info {
  display: flex;
  flex-direction: column;
}
.name-line {
  display: flex;
  align-items: center;
  margin-bottom: 7px;
}
.name-line p {
  font-size: 20px;
  color: #333333;
  margin: 0;
  margin-right: 8px;
}
.name-line img {
  width: 24px;
  height: 24px;
  cursor: pointer;
}
.more-info {
  margin: 0;
  font-size: 14px;
  color: #c0c0c0;
}
</style>