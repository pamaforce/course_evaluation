<template>
  <div
    class="person-circle"
    :style="
      'background-color:' +
      color +
      ';transform:scale(' +
      scale +
      ');width:100px;height:100px'
    "
  >
    <p class="sno">{{ sno }}</p>
    <p class="name">{{ name }}</p>
  </div>
</template>

<script>
export default {
  inject: ["getNode", "getGraph"],
  data() {
    return {
      sno: "",
      name: "",
      color: "#C3C3C3",
      scale: 1,
    };
  },
  methods: {},
  mounted() {
    const node = this.getNode();
    node.on("change:data", ({ current }) => {
      console.log(current);
      const { sno, name, color, scale } = current;
      this.sno = sno || "";
      this.name = name || "";
      this.color = color || "#C3C3C3";
      this.scale = scale || 1;
    });
    this.sno = node.data.sno || "";
    this.name = node.data.name || "";
    this.color = node.data.color || "#C3C3C3";
    this.scale = node.data.scale || 1;
    // const zoom = this.getGraph().zoom();
    // this.$nextTick(() => {
    //   const { width, height } = this.$el.getBoundingClientRect();
    //   node.prop("size", { width: width / zoom, height: height / zoom });
    // });
  },
};
</script>
<style scoped>
.person-circle {
  border-radius: 50%;
  border: 1px solid #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Smiley Sans";
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