<template>
  <el-container>
    <el-main>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="10" :lg="6">
          <el-form :model="registerData" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="Fullname" prop="name">
              <el-input v-model="registerData.name"></el-input>
            </el-form-item>
            <el-form-item label="Username" prop="name">
              <el-input v-model="registerData.username"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="pass">
              <el-input v-model="registerData.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" native-type="submit" @click="submitForm">Register</el-button>
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
      registerData: {
        name: "",
        username: "",
        password: ""
      }
    };
  },
  methods: {
    submitForm() {
      axios
        .post("/auth/register", {
          username: this.registerData.username,
          password: this.registerData.password,
          name: this.registerData.name
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
