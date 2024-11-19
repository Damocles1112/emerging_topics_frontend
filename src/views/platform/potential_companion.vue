<template>
  <div class="root">
    <div class="search">
      <el-input placeholder="请输入检索词" v-model="searchWord" clearable>
        <el-button @click="searchedAnswer" slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-table :data="tableData" border style="width: 100%" :default-sort="{prop:'user_number', order:'descending'}">
      <el-table-column prop="user_id" label="用户ID" width="180" show-overflow-tooltip sortable></el-table-column>
      <el-table-column prop="gender" label="性别" width="180" show-overflow-tooltip></el-table-column>
      <el-table-column prop="contact_info" label="联系方式" width="360" show-overflow-tooltip>
        <template slot-scope="scope">
          <div>
            QQ: {{ scope.row.contact_info.qq }}
            <br>
            微信: {{ scope.row.contact_info.wechat }}
            <br>
            邮箱: {{ scope.row.contact_info.email }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button plain @click="answerView(scope.row)" type="primary" style="margin-left: 16px;">查看介绍</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      title="个人介绍"
      :visible.sync="drawer"
      :direction="direction">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>用户：{{ answerData.user_id }}</span>
        </div>
        <div class="text item">
          <span>{{ answerData.introduction }}</span>
        </div>
      </el-card>
    </el-drawer>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "potential_user_info",
  data() {
    return {
      drawer: false,               // 抽屉控制
      direction: 'rtl',            // 抽屉方向选择
      searchWord: "",              // 检索词
      answerData: {               // 单条回答具体信息
        "user_number": "",
        "user_id": "",
        "introduction": ""
      },
      tableData: []               // 表格的显示数据
    };
  },
  methods: {
    async fetchPotentialCompanions() {
      try {
        const response = await axios.get('/admin/getPotentialCompanion');
        if (response.data.code === 200) {
          const data = JSON.parse(response.data.data);
          this.tableData = data;
        } else {
          this.$message.error('获取潜在搭子数据失败');
        }
      } catch (error) {
        console.error('获取潜在搭子数据失败:', error);
        this.$message.error('获取潜在搭子数据失败');
      }
    },
    answerView(row) {
      this.drawer = true;
      this.answerData["user_number"] = row["user_number"];
      this.answerData["user_id"] = row["user_id"];
      this.answerData["introduction"] = row["introduction"];
    },
    searchedAnswer() {
      const wholeData = this.tableData;
      this.tableData = [];
      const key = new RegExp(this.searchWord);
      for (let i = 0; i < wholeData.length; i++) {
        if (key.test(wholeData[i]["user_id"]) || key.test(wholeData[i]["user_number"])) {
          this.tableData.push(wholeData[i]);
        }
      }
    }
  },
  mounted() {
    this.fetchPotentialCompanions();
  }
};
</script>

<style scoped>

</style>
