<template>
<el-container>
  <el-main>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="15">
        <el-dialog title="Create new group" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="Name" label-width="120px">
              <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="submit">Confirm</el-button>
          </span>
        </el-dialog>

        <el-table
          :data="groups"
          style="width: 100%">
          <el-table-column
            label="Name"
            width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Last Updated"
            width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.updatedAt }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Operations">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleOpen(scope.$index, scope.row)">Open</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-button type="primary" @click="dialogFormVisible = true" style="margin-top: 10px;">Create</el-button>
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
      groups: [],
      dialogFormVisible: false,
      form: {
        name: ""
      }
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      axios
        .post("/api/group/getGroups", {
          token: this.$store.state.token
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

          this.groups = res.data.groups
        });
    },
    submit() {
      axios
        .post("/api/group/createGroup", {
          token: this.$store.state.token,
          name: this.form.name
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

          this.$router.push(`/group/${res.data.id}`)
        });
    },
    handleOpen(i, row) {
      this.$router.push(`/group/${row._id}`)
    }
  }
};
</script>

<style scoped>

</style>
