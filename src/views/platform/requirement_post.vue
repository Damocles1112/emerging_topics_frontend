<template>
  <el-container>
    <el-header style="height: 180px;">
      <h1>需求发布</h1>
    </el-header>
    <el-main>
      <div class="search">
        <el-form>
          <el-form-item>
            <el-input
              type="textarea"
              placeholder="请输入寻找搭子的具体需求，内容越详尽越好哦~"
              v-model="requirements"
              :rows="6"
              style="width: 70%; height: 200px;">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchCompanion">开始搜寻</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "SearchCompanion", // 组件名称
  data() {
    return {
      requirements: "", // 绑定输入框的数据
    };
  },
  methods: {
    searchCompanion() {
      if (this.requirements === "") {
        alert("请输入完整查询信息！");
      } else {
        this.$store.commit("searchCompanion", this.requirements);
        // 使用 fetch API 发送 GET 请求
        fetch('http://localhost:9528/admin/searchCompanion?requirements=' + encodeURIComponent(this.requirements), {
          method: 'GET' // 使用 GET 请求
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Network response was not ok.');
          }
        })
        .then(data => {
          // 如果发布成功，则在日志中记录信息
          console.log("用户当前发布需求为：" + this.requirements);
          console.log("服务器返回的数据：", data);
          console.log(data);
        })
        .catch(error => {
          // 如果发布失败，则弹出警告并在日志中记录此次结果
          alert("需求未发布");
          console.error("需求未发布"  + "   当前需求为：" + this.requirements, error);
        });
      }
    },
  },
};
</script>

<style>
.search {
  text-align: center; /* 使搜索框和按钮居中显示 */
}
</style>

<style scoped>
  .el-header{
    background-color: #ffffff;
    color: #000000;
    text-align: center;
    line-height: 60px;
  }
  .el-main {
    background-color: #ffffff;
    color: #333;
    text-align: center;

    line-height: 260px;
  }
</style>
