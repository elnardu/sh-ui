<template>
  <div class="output" v-if="!obj.inGroupEditor">
    <div v-if="basic">{{obj.name}}</div>
    <el-input v-if="this.obj.name === 'int'" placeholder="Integer" class="input" v-model.number="obj.payload"></el-input>
    <el-tooltip :content="tooltiptext" placement="left">
      <div class="circle" :style="style" ref="circle" @mousedown="startDrag"></div>
    </el-tooltip>
  </div>
</template>

<script>
  export default {
    props: ['obj'],
    mounted() {
      if (this.obj.name === "int") {
        this.obj.payload = 0
        this.basic = false
      }

      if (!this.obj.inGroupEditor) {
        this.obj.x = this.$refs.circle.getBoundingClientRect().x + 10
        this.obj.y = this.$refs.circle.getBoundingClientRect().y + 10
      }
    },
    data() {
      return {
        basic: true
      }
    },
    computed: {
      style() {
        let color = ""
        switch(this.obj.type) {
          case "int":
            color = "#3498db"
            break
          case "bool":
            color = "#2ecc71"
            break
        }

        return {
          "background-color": color
        }
      },
      tooltiptext() {
        switch(this.obj.type) {
          case "int":
            return "Integer value"
            break
          case "bool":
            return "Boolean value"
            break
        }
      }
    },
    methods: {
      startDrag() {
        this.$emit("startDrag", this.obj)
      },
      setTrue() {
        this.obj.payload = true
      },
      setFalse() {
        this.obj.payload = false
      }
    }
  }
</script>

<style scoped>
.circle {
  border-radius: 50%;
  display: block;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  height: 20px;
  width: 20px;
  /* transform: translateX(-30px); */
  margin-left: 10px;
  transition: all ease 0.5s;
}
.circle:hover {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.5);
}
.output {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  font-size: 1em;
  padding: 3px;
  user-select: none;
}
.input {
  width: 50px;
}
</style>
