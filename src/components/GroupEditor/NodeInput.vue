<template>
  <div class="input" v-if="obj.inGroupEditor">
    <!-- <el-tooltip :content="tooltiptext" placement="right"> -->
      <div class="circle" :style="style" ref="circle" @mouseup="endDrag" @click="click"></div>
    <!-- </el-tooltip> -->
    {{obj.name}}
  </div>
</template>

<script>
  export default {
    props: ['obj'],
    mounted() {
      if (this.obj.inGroupEditor) {
        this.obj.x = this.$refs.circle.getBoundingClientRect().x + 10
        this.obj.y = this.$refs.circle.getBoundingClientRect().y + 10
      }
    },
    data() {
      return {
        lastClickTime: 0
      }
    },
    computed: {
      style() {
        let color = ""
        switch(this.obj.type) {
          case "int":
            color = "#3498db"
            break
          case "pin":
            color = "rgb(211, 84, 0)"
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
      endDrag() {
        this.$emit("endDrag", this.obj)
      },
      click() {
        if (Date.now() - this.lastClickTime < 1500) {
          this.$emit("removeLine", this.obj)
        } else this.lastClickTime = Date.now()
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
  margin-right: 10px;
  transition: all ease 0.5s;
}
.circle:hover {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.5);
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
</style>
