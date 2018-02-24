<template>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        Add<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="empty">Empty</el-dropdown-item>
        <el-dropdown-item command="add" divided>Addition</el-dropdown-item>
        <el-dropdown-item command="sub">Subtraction</el-dropdown-item>
        <el-dropdown-item command="mul">Multiplication</el-dropdown-item>
        <el-dropdown-item command="div">Division</el-dropdown-item>
        <el-dropdown-item command="int" divided>Integer</el-dropdown-item>
        <el-dropdown-item command="bool">Boolean</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
import getObject from "./NodeTemplates"
export default {
  methods: {
    handleCommand(command) {
      this.$emit("addNode", getObject(command))
    }

  }
}
</script>

<style scoped>

</style>
