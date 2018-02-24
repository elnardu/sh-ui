<template>
  <el-container id="app">
    <el-header>
      <el-menu mode="horizontal" :default-active="$route.path" :router="true" class="el-menu-demo menu">
        <el-menu-item index="/">Editor</el-menu-item>
        <el-menu-item index="/about">About</el-menu-item>
      </el-menu>
    </el-header>
    <el-main class="main">
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
body, html {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
}
.menu {
  display: flex;
  justify-content: flex-end;
}
.main {
  height: 100%;
  width: 100%;
}
</style>
