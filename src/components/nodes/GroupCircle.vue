<template>
  <div
    class="group-circle"
    :style="'transform:scale(' + scale + ');width:500px;height:500px'"
  ></div>
</template>

<script>
export default {
  inject: ["getNode", "getGraph"],
  data() {
    return {
      name: "",
      color: "#C3C3C3",
      scale: 1,
    };
  },
  methods: {},
  mounted() {
    const node = this.getNode();
    node.on("change:data", ({ current }) => {
      const { scale } = current;
      this.scale = scale || 1;
    });
    this.scale = node.data.scale || 1;
  },
};
</script>
<style scoped>
.group-circle {
  border-radius: 50%;
  border: 1px dashed #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Smiley Sans";
  transform-origin: left top;
  background-color: #edf3f0;
  color: #333333;
}
.sno {
  font-size: 10px;
  margin: 0;
}
.name {
  font-size: 24px;
  margin: 0;
}
</style>