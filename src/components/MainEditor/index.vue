<template>
  <div>
    <div id="svg"></div>
    <div id="editor">
      <AddButton @addNode="addNode"/>
      <el-button type="primary" class="make" @click="make">Make</el-button>
      <Node v-for="n in nodes"
      :nodeobj="n"
      :key="n.id"
      @redraw="draw"
      @startDrag="startDrag"
      @endDrag="endDrag"
      @removeLine="removeLine"
      @removeNode="removeNode"/>
    </div>
  </div>
</template>

<script>
import NodeObj from "./NodeObj.js";
import Node from "./Node.vue";
import AddButton from "./AddButton.vue";

import generate from "./StringBuilder";

import uuid from "uuid/v4";

import SVG from "svg.js";

export default {
  components: {
    Node,
    AddButton
  },
  mounted() {
    this.svg = SVG("svg").size("100%", "100%");
    this.draw();
  },
  methods: {
    draw() {
      this.svg.clear();
      this.lines.forEach(l => {
        // let line = this.svg.line(l.from.x, l.from.y, l.to.x, l.to.y)
        // line.stroke({ color: '#f06', width: 10, linecap: 'round' })

        // let pa = new SVG.PathArray(["M", l.from.x, l.from.y, "T", l.to.x, l.to.y]);
        // console.log(["M", l.from.x, l.from.y, "Q", 10, 10, l.to.x, l.to.y])
        let line = this.svg.path([
          "M",
          l.from.x,
          l.from.y,
          "Q",
          l.from.x + 100,
          l.from.y,
          (l.to.x + l.from.x) / 2,
          (l.to.y + l.from.y) / 2,
          "T",
          l.to.x,
          l.to.y
        ]);
        // let line = this.svg.path("M" + l.from.x + " " + l.from.y + "L" + l.to.x + " " + l.to.y)

        line.stroke({
          color: this.getColor(l.from.type),
          width: 5,
          linecap: "round"
        });
        line.attr({ "fill-opacity": 0 });
      });
    },
    startDrag(obj) {
      this.dragging = obj;
      window.addEventListener("mousemove", this.mouseMove, true);
      window.addEventListener("mouseup", this.mouseUp, false);
    },
    endDrag(obj) {
      if (Object.keys(this.dragging).length === 0) return;
      if (obj.type !== this.dragging.type) {
        this.$notify.error({
          title: "Error",
          message: "Input type does not match output type"
        });
      } else {
        this.lines = this.lines.filter((e, i) => {
          return e.to.id !== obj.id;
        });
        this.lines.push({
          from: this.dragging,
          to: obj
        });
      }
    },
    mouseMove(e) {
      this.draw();
      let line = this.svg.path([
        "M",
        this.dragging.x,
        this.dragging.y,
        "Q",
        this.dragging.x + 100,
        this.dragging.y,
        (e.x + this.dragging.x) / 2,
        (e.y + this.dragging.y) / 2,
        "T",
        e.x,
        e.y
      ]);
      line.stroke({
        color: this.getColor(this.dragging.type),
        width: 5,
        linecap: "round"
      });
      line.attr({ "fill-opacity": 0 });
    },
    mouseUp() {
      window.removeEventListener("mousemove", this.mouseMove, true);
      this.draw();
      // setTimeout(() => {
      //   this.dragging = {}
      // }, 5000)
    },
    getColor(type) {
      switch (type) {
        case "int":
          return "#3498db";
        case "bool":
          return "#2ecc71";
      }
    },
    removeLine(obj) {
      this.lines = this.lines.filter((e, i) => {
        return e.to.id !== obj.id;
      });
      this.draw();
    },
    addNode(obj) {
      this.nodes.push(obj);
    },
    removeNode(obj) {
      // console.log(obj)
      obj.inputs.forEach(i => {
        this.lines = this.lines.filter(e => {
          return e.to.id !== i.id;
        });
      });
      obj.outputs.forEach(o => {
        this.lines = this.lines.filter(e => {
          return e.from.id !== o.id;
        });
      });

      this.nodes = this.nodes.filter((e, i) => {
        return e.id !== obj.id;
      });

      this.draw();
    },
    make() {
      this.lines.forEach(e => {
        e.to.fid = e.from.id;
      });
      this.nodes.forEach(e => {
        e.outputsArr = []
        e.outputs.forEach(out => {
          e.outputsArr.push(out.id)
        })

        e.inputsArr = []
        e.inputs.forEach(out => {
          e.inputsArr.push(out.fid)
        })
      })
      console.log(generate(this.nodes));
    }
  },
  data() {
    return {
      nodes: [],
      lines: [],
      dragging: {}
    };
  }
};
</script>

<style scoped>
#svg {
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100;
  position: absolute;
  left: 0;
  top: 0;
}
#editor {
  width: 100%;
  height: 100%;
  z-index: 5;
}
.make {
  margin-left: 10px;
}
</style>
