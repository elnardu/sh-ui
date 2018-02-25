<template>
<el-container class="main">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu active-text-color="#303133" @select="addNode" index="null">
      <el-menu-item class="make" @click="make" index="null1">
        <i class="el-icon-success"></i>
        <span slot="title">Make</span>
      </el-menu-item>
      <el-menu-item index="null4" @click="addArduino">Add Arduino</el-menu-item>
      <el-submenu index="null">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">Math</span>
        </template>
        <el-menu-item index="add">Addition</el-menu-item>
        <el-menu-item index="sub">Subtraction</el-menu-item>
        <el-menu-item index="mul">Multiplication</el-menu-item>
        <el-menu-item index="div">Division</el-menu-item>
      </el-submenu>
      <el-submenu index="null2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">Constants</span>
        </template>
        <el-menu-item index="int">Integer</el-menu-item>
        <el-menu-item index="booltrue">Boolean True</el-menu-item>
        <el-menu-item index="boolfalse">Boolean False</el-menu-item>
      </el-submenu>
      <el-submenu index="null3">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">Logic</span>
        </template>
        <el-menu-item index="and">AND</el-menu-item>
        <el-menu-item index="or">OR</el-menu-item>
        <el-menu-item index="not">NOT</el-menu-item>
      </el-submenu>
      <el-submenu index="null4">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">Comparisons</span>
        </template>
        <el-menu-item index="gt"> &gt; </el-menu-item>
        <el-menu-item index="gte"> &gt;= </el-menu-item>
        <el-menu-item index="lt"> &lt; </el-menu-item>
        <el-menu-item index="lte"> &lt;= </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
    <el-main>
      <div id="svg"></div>
      <div id="editor">
        <ArduinoNode v-for="n in arduinos"
        :nodeobj="n"
        :key="n.id"
        @redraw="draw"
        @startDrag="startDrag"
        @endDrag="endDrag"
        @removeLine="removeLine"
        @removeNode="removeNode"/>

        <Node v-for="n in nodes"
        :nodeobj="n"
        :key="n.id"
        @redraw="draw"
        @startDrag="startDrag"
        @endDrag="endDrag"
        @removeLine="removeLine"
        @removeNode="removeNode"/>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import NodeObj from "./NodeObj.js";
import Node from "./Node.vue";
import getObject from "./NodeTemplates";
import ArduinoNode from "./ArduinoNode";

import generate from "./StringBuilder";

import uuid from "uuid/v4";
let uuid1 = () => uuid().slice(0, 6);

import SVG from "svg.js";
import axios from "axios";

export default {
  props: ["id"],
  components: {
    Node,
    ArduinoNode
  },
  mounted() {
    axios
      .post("/api/group/getGroup", {
        token: this.$store.state.token,
        id: this.id
      })
      .then(res => {
        if (!res.data.success) {
          this.$notify({
            title: "Warning",
            message: res.data.error,
            type: "warning"
          });
          return;
        }
        this.groupData = res.data.group;
      });

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
    addNode(type) {
      if (type.includes("null")) return;
      this.nodes.push(getObject(type));
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
        e.outputsArr = [];
        e.outputs.forEach(out => {
          e.outputsArr.push(out.id);
        });

        e.inputsArr = [];
        e.inputs.forEach(out => {
          e.inputsArr.push(out.fid);
        });
      });
      console.log(generate(this.nodes));
    },
    addArduino() {
      this.arduinos.push({
        x: 50,
        y: 50,
        id: uuid1()
      });
    }
  },
  data() {
    return {
      nodes: [],
      lines: [],
      arduinos: [],
      dragging: {},
      groupData: {}
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
/* .make { */
/* background: #409EFF;
  color: white; */
/* } */
.main {
  height: 100%;
  width: 100%;
}
</style>
