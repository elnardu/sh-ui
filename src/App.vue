<template>
  <el-container id="app">
    <el-header>
      <el-menu mode="horizontal" :default-active="$route.path" :router="true" class="el-menu-demo menu">
        <img src="./assets/icon.png" alt="" class="img">
        <!-- <el-menu-item index="/editor" v-if="$store.state.logged">Editor</el-menu-item> -->
        <el-menu-item index="/groups" v-if="$store.state.logged">Groups</el-menu-item>
        <el-menu-item index="/login" v-if="!$store.state.logged">Login</el-menu-item>
        <el-menu-item index="/register" v-if="!$store.state.logged">Register</el-menu-item>
        <!-- <el-menu-item index="/about">About</el-menu-item> -->

      </el-menu>
    </el-header>
    <router-view/>
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
  justify-content: flex-start;
}
.img {
  height: 60px;
  margin: auto 20px;
}
</style>
