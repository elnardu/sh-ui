<template>
  <div class="output" v-if="obj.inGroupEditor">
    <div>{{obj.name}}</div>
    <el-tooltip content="Pin" placement="left">
      <div class="circle" style="background-color: #d35400" ref="circle" @mousedown="startDrag"></div>
    </el-tooltip>
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
    methods: {
      startDrag() {
        this.$emit("startDrag", this.obj)
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
  justify-content: flex-end;
  flex-direction: row;
  font-size: 1em;
  padding: 3px;
  user-select: none;
}
.input {
  width: 50px;
}
</style>
