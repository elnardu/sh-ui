<template>
<el-container class="main">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu active-text-color="#303133" @select="addNode" index="null">
      <!-- <el-menu-item class="make" @click="make" index="null1">
        <i class="el-icon-success"></i>
        <span slot="title">Make</span>
      </el-menu-item> -->
      <el-menu-item class="make" @click="save" index="null5">
        <i class="el-icon-upload2"></i>
        <span slot="title">Save</span>
      </el-menu-item>
      <el-menu-item index="null4" @click="addArduino">Add Arduino</el-menu-item>
      <el-submenu index="null">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">Inputs</span>
        </template>
        <!-- <el-menu-item index="button">Button</el-menu-item> -->
        <el-menu-item index="switch">Switch</el-menu-item>
      </el-submenu>
      <el-submenu index="null2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">Outputs</span>
        </template>
        <el-menu-item index="speaker1">Speaker 350</el-menu-item>
        <el-menu-item index="speaker2">Speaker 392</el-menu-item>
        <el-menu-item index="speaker3">Speaker 440</el-menu-item>
        <el-menu-item index="speaker4">Speaker 494</el-menu-item>
        <el-menu-item index="lamp">Lamp</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
    <el-main>
      <div id="svg"></div>
      <div id="editor">
        <ArduinoNode v-for="n in groupData.arduinos"
        :nodeobj="n"
        :key="n.id"
        @redraw="draw"
        @startDrag="startDrag"
        @endDrag="endDrag"
        @removeLine="removeLine"
        @removeNode="removeNode"
        @save="save"
        @removeArduino="removeArduino"
        :groupId="groupData._id"
        />

        <Node v-for="n in groupData.inputs"
        :nodeobj="n"
        :key="n.id"
        @redraw="draw"
        @startDrag="startDrag"
        @endDrag="endDrag"
        @removeLine="removeLine"
        @removeNode="removeNode"/>

        <Node v-for="n in groupData.outputs"
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
        // this.lines = this.groupData.lines
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
          color: "rgb(211, 84, 0)",
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
      if (obj.speaker && this.dragging.name[0] !== '~') {
        this.$notify.error({
          title: "Error",
          message: "Speakers can be only connected to pins starting with '~'"
        });
        return
      }
      if (obj.type !== this.dragging.type) {
        this.$notify.error({
          title: "Error",
          message: "Input type does not match output type"
        });
      } else {
        // this.lines = this.lines.filter((e, i) => {
        //   return e.to.id !== obj.id;
        // });
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
        color: "rgb(211, 84, 0)",
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
      if (type.includes("switch")) this.groupData.inputs.push(getObject(type));
      if (type.includes("speaker") || type.includes("lamp")) this.groupData.outputs.push(getObject(type));
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

      this.groupData.inputs = this.groupData.inputs.filter((e, i) => {
        return e.id !== obj.id;
      });

      this.groupData.outputs = this.groupData.outputs.filter((e, i) => {
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
      this.groupData.arduinos.push({
        x: 50,
        y: 50,
        id: uuid1()
      });
    },
    removeArduino(id) {
      this.groupData.arduinos = this.groupData.arduinos.filter(e => {
        return e.id !== id
      })
    },
    save() {
      this.groupData.lines = this.lines

      this.lines.forEach(e => {
        if (e.to.type === "pin") {
          e.to.pinnumber = e.from.name[0] == "~" ? e.from.name.slice(1) : e.from.name;
          e.to.arduinoid = e.from.id;
        }
      })

      axios
      .post("/api/group/updateGroup", {
        token: this.$store.state.token,
        group: this.groupData
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
        this.$notify({
            title: "Info",
            message: "Saved",
            type: "info"
          });
      });
    }
  },
  data() {
    return {
      nodes: [],
      lines: [],
      arduinos: [],
      dragging: {},
      groupData: {
        arduinos: [],
        inputs: []
      }
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
