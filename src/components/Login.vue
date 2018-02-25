<template>
  <el-container>
    <el-main>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="10" :lg="6">
          <el-form :model="loginData" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="Username" prop="name">
              <el-input v-model="loginData.username"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="pass">
              <el-input v-model="loginData.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" native-type="submit" @click="submitForm">Login</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loginData: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    submitForm() {
      axios
        .post("/auth/login", {
          username: this.loginData.username,
          password: this.loginData.password
        })
        .then(res => {
          if (!res.data.success) {
            this.$notify({
              title: "Warning",
              message: res.data.error,
              type: "warning"
            })
            return
          }
          this.$store.commit('login', res.data.token)
          this.$router.push('/group')
        })
    }
  }
};
</script>

<style scoped>

</style>
