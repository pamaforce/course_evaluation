<template>
  <div class="name-card">
    <div class="top-div">
      <input class="title" v-model="title" />
      <input class="score" v-model="score" v-positive-integer disabled />
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
    };
  },
  methods: {},
  mounted() {
    const node = this.getNode();
    node.on("change:data", ({ current }) => {
      console.log(current);
      const { title, score } = current;
      this.title = title;
      this.score = score;
    });
    this.title = node.data.title;
    this.score = node.data.score;
    const zoom = this.getGraph().zoom();
    this.$nextTick(() => {
      const { width, height } = this.$el.getBoundingClientRect();
      node.prop("size", { width: width / zoom, height: height / zoom });
    });
  },
};
</script>
<style scoped>
.name-card {
  width: 240px;
  height: 64px;
  border-radius: 8px;
  overflow: hidden;
  background: linear-gradient(
    90deg,
    rgba(199, 241, 233, 0.6) 0%,
    rgba(199, 241, 233, 0.45) 0.01%,
    rgba(199, 241, 233, 0.55) 17.5%,
    rgba(199, 241, 233, 0.55) 83.12%,
    rgba(199, 241, 233, 0.45) 100%
  );
  backdrop-filter: blur(1px);
  border: 0.2px solid #333;
}
.top-div {
  background-color: #15c3a1;
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 10px;
}
.title {
  font-family: "Smiley Sans";
  font-style: italic;
  font-size: 16px;
  color: #000000;
  background-color: transparent;
  outline: none;
  border: none;
  box-sizing: border-box;
}
.score {
  padding: 0 4px;
  width: 36px;
  background-color: transparent;
  border-radius: 2px;
  text-align: center;
  border: 0.2px solid #333333;
  font-family: "Smiley Sans";
  font-style: italic;
  font-size: 8px;
  color: #000000;
  outline: none;
}
</style>