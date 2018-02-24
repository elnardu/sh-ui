<template>
    <div class="el-card box-card node" :style="style">
      <div class="el-card__header" @mousedown="drag">
        <span>{{nodeobj.name}}</span>
      </div>
      <div class="el-card__body">
        <NodeInput v-for="i in nodeobj.inputs" :key="i.name" :obj="i" @endDrag="endDrag" @removeLine="removeLine"/>
        <div class="line" v-if="nodeobj.inputs.length != 0"></div>
        <NodeOutput v-for="o in nodeobj.outputs" :key="o.name" :obj="o" @startDrag="startDrag"/>
        <div class="line" v-if="nodeobj.outputs.length != 0"></div>
        <el-button type="secondary" icon="el-icon-close" size="mini" @click="removeNode" class="button"></el-button>
      </div>
    </div>
</template>

<script>
import NodeInput from "./NodeInput";
import NodeOutput from "./NodeOutput";
export default {
  props: ["nodeobj"],
  components: {
    NodeInput,
    NodeOutput
  },
  mounted() {
    window.addEventListener("mouseup", this.mouseUp, false);
  },
  methods: {
    drag() {
      window.addEventListener("mousemove", this.moveCard, true);
    },
    mouseUp() {
      window.removeEventListener("mousemove", this.moveCard, true);
    },
    moveCard(e) {
      this.nodeobj.x += e.movementX;
      this.nodeobj.y += e.movementY;

      this.nodeobj.inputs.forEach(o => {
        o.x += e.movementX;
        o.y += e.movementY;
      });
      this.nodeobj.outputs.forEach(o => {
        o.x += e.movementX;
        o.y += e.movementY;
      });
      this.$emit("redraw");
    },
    startDrag(obj) {
      this.$emit("startDrag", obj);
    },
    endDrag(obj) {
      this.$emit("endDrag", obj);
    },
    removeLine(obj) {
      this.$emit("removeLine", obj);
    },
    removeNode() {
      this.$emit("removeNode", this.nodeobj)
    }
  },
  computed: {
    style() {
      return {
        transform: `translate(${this.nodeobj.x}px, ${this.nodeobj.y}px)`
      };
    }
  }
};
</script>

<style scoped>
.node {
  position: absolute;
  z-index: 10;
}
.el-card__header {
  user-select: none;
  background-color: #34495e;
  color: white;
  padding: 10px 20px;
}
.el-card__body {
  padding: 5px;
}
.button {
  width: 100%;
}
.line {
  display: box;
  border-bottom: 1px solid #ebeef5;
  margin: 5px 0;
}
</style>
