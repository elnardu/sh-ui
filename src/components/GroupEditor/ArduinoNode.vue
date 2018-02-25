<template>
  <div class="el-card box-card node" :style="style">
      <div class="el-card__header" @mousedown="drag">
        <span>Arduino [{{nodeobj.id}}]</span>
      </div>
      <div class="el-card__body">
        <el-row>
          <el-col :span="12">
            <div class="input" v-for="pin in pinsLeft" :key="pin.name">
              <el-tooltip content="Analog pin" placement="right">
                <div class="circle"></div>
              </el-tooltip>
              {{pin.name}}
            </div>
          </el-col>
          <el-col :span="12">
            <NodeOutput v-for="pin in pinsRight" :key="pin.name" :obj="pin" @startDrag="startDrag"/>
          </el-col>
        </el-row>
        <div class="line"></div>
        <el-button-group style="width: 100%">
          <el-button type="secondary" icon="el-icon-zoom-in" size="mini" @click="openEditor" class="button"></el-button>
          <el-button type="secondary" icon="el-icon-close" size="mini" @click="removeArduino" class="button"></el-button>
        </el-button-group>
      </div>
    </div>
</template>

<script>
import NodeInput from "./NodeInput";
import NodeOutput from "./NodeOutput";
import axios from "axios";

export default {
  props: ["nodeobj", "groupId"],
  components: {
    NodeInput,
    NodeOutput
  },
  data() {
    return {
      pinsLeft: [
        {
          name: "A0"
        },
        {
          name: "A1"
        },
        {
          name: "A2"
        },
        {
          name: "A3"
        },
        {
          name: "A4"
        },
        {
          name: "A5"
        }
      ],
      pinsRight: [
        {
          type: "pin",
          id: this.nodeobj.id,
          inGroupEditor: true,
          name: "13"
        },
        {
          type: "pin",
          id: this.nodeobj.id,
          inGroupEditor: true,
          name: "12"
        },
        {
          type: "pin",
          id: this.nodeobj.id,
          inGroupEditor: true,
          name: "~11"
        },
        {
          type: "pin",
          id: this.nodeobj.id,
          inGroupEditor: true,
          name: "~10"
        },
        {
          type: "pin",
          id: this.nodeobj.id,
          inGroupEditor: true,
          name: "~9"
        },
        {
          type: "pin",
          id: this.nodeobj.id,
          inGroupEditor: true,
          name: "8"
        },
        {
          type: "pin",
          id: this.nodeobj.id,
          inGroupEditor: true,
          name: "7"
        },
        {
          type: "pin",
          id: this.nodeobj.id,
          inGroupEditor: true,
          name: "~6"
        },
        {
          type: "pin",
          id: this.nodeobj.id,
          inGroupEditor: true,
          name: "~5"
        },
        {
          type: "pin",
          id: this.nodeobj.id,
          inGroupEditor: true,
          name: "4"
        },
        {
          type: "pin",
          id: this.nodeobj.id,
          inGroupEditor: true,
          name: "~3"
        },
        {
          type: "pin",
          id: this.nodeobj.id,
          inGroupEditor: true,
          name: "2"
        },
        {
          type: "pin",
          id: this.nodeobj.id,
          inGroupEditor: true,
          name: "1"
        },
        {
          type: "pin",
          id: this.nodeobj.id,
          inGroupEditor: true,
          name: "0"
        }
      ]
    };
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

      this.pinsRight.forEach(o => {
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
      this.$emit("removeNode", this.nodeobj);
    },
    openEditor() {
      this.$emit("save");
      if (this.nodeobj.dataId)
        this.$router.push(`/editor/${this.nodeobj.dataId}`);
      else {
        axios
          .post("/api/data/createData", {
            token: this.$store.state.token,
            group: this.groupId,
            arduinoid: this.nodeobj.id
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
            this.nodeobj.dataId = res.data.id;
            this.$emit("save");
            this.$router.push(`/editor/${this.nodeobj.dataId}`)
          });
      }
    },
    removeArduino() {
      this.$emit("removeArduino", this.nodeobj.id);
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
.circle {
  border-radius: 50%;
  display: block;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  height: 20px;
  width: 20px;
  /* transform: translateX(-30px); */
  margin-right: 10px;
  transition: all ease 0.5s;
  background: #e67e22;
}
.circle:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
}
.input {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  font-size: 1em;
  padding: 3px;
  user-select: none;
}
.node {
  position: absolute;
  z-index: 10;
  width: 200px;
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
  width: 50%;
}
.line {
  display: box;
  border-bottom: 1px solid #ebeef5;
  margin: 5px 0;
}
</style>
