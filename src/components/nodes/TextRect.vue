<template>
  <div class="text-rect" :style="'width:' + width + 'px;height: 40px'">
    {{ text }}
  </div>
</template>

<script>
export default {
  inject: ["getNode", "getGraph"],
  data() {
    return {
      text: "",
      width: 100,
    };
  },
  methods: {},
  mounted() {
    const node = this.getNode();
    node.on("change:data", ({ current }) => {
      const { text, width } = current;
      this.text = text || "";
      this.width = width || 100;
    });
    this.text = node.data.text || "";
    this.width = node.data.width || 100;
  },
};
</script>
<style scoped>
.text-rect {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Smiley Sans";
  color: #333333;
  font-size: 24px;
  pointer-events: none;
}
</style>