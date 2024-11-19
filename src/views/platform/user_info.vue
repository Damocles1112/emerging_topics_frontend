<template>
  <div class="root">
    <!-- 信息显示部分 -->
    <dl class="info-display">
      <dt class="user-id">{{ userInfo.userId }}</dt>
      <dd class="user-details">
        <div>性别: {{ userInfo.gender }}</div>
        <div>城市: {{ userInfo.city }}</div>
      </dd>
      <dd class="contact-info">
        <div>QQ: {{ userInfo.qq }}</div>
        <div>邮箱: {{ userInfo.email }}</div>
        <div>微信: {{ userInfo.wechat }}</div>
      </dd>
      <dt class="introduction-title">个人介绍</dt>
      <dd class="personal-introduction">
        {{ userInfo.introduction }}
      </dd>
    </dl>

    <!-- 信息设置按钮 -->
    <el-button class="edit-button" type="primary" @click="showDrawer = true">信息修改</el-button>

    <!-- 信息设置部分 -->
    <el-drawer
      title="个人信息设置"
      :visible.sync="showDrawer"
      direction="rtl"
      size="30%"
    >
      <el-form ref="userForm" :model="userForm" label-width="80px">
        <el-form-item label="年龄">
          <el-slider v-model="userForm.age" :min="18" :max="100"></el-slider>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="userForm.gender">
            <el-radio label="male">男</el-radio>
            <el-radio label="female">女</el-radio>
            <el-radio label="secret">保密</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="城市">
          <el-select v-model="userForm.city" placeholder="选择城市">
            <el-option v-for="city in cityList" :key="city.value" :label="city.label" :value="city.value"></el-option>
          </el-select>
        </el-form-item>
        <div class="form-title">联系方式</div>
        <el-form-item>
          <el-input v-model="userForm.wechat" placeholder="微信"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="userForm.qq" placeholder="QQ"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="userForm.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item label="个人介绍">
          <el-input type="textarea" v-model="userForm.introduction" :rows="6"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateProfile">保存</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      showDrawer: false,
      userInfo: {
        userNumber: '4698730',
        userId: '加载中',
        gender: '加载中',
        city: '加载中',
        qq: '加载中',
        email: '加载中',
        wechat: '加载中',
        introduction: '加载中'
      },
      userForm: {
        age: 25,
        gender: 'male',
        city: '',
        introduction: '',
        wechat: '',
        email: '',
        qq: ''
      },
      cityList: [
        { value: 'beijing', label: '北京' },
        { value: 'shanghai', label: '上海' },
        // 更多城市选项...
      ],
      // userNumber: '4698730' // 登陆用户的user_number
    };
  },
  methods: {
    async fetchUserInfo() {
  try {
    // 确保 userNumber 是字符串类型，并且与后端数据库中的键匹配
    const response = await axios.get(`http://localhost:9528/admin/getUserInfo/${this.userInfo.userNumber}`);
    const response_data = response.data;
    if (response_data.code === 200) {
      const userData = JSON.parse(response_data.data);
      this.userInfo = {
        userId: userData.user_id,
        gender: userData.gender,
        city: userData.city,
        qq: userData.contact_info.qq,
        email: userData.contact_info.email,
        wechat: userData.contact_info.wechat,
        introduction: userData.introduction
      };
      this.userForm = {
        ...userData,
        age: parseInt(userData.age, 10) // 确保年龄是数字类型
      };
    } else {
      this.$message.error('用户未找到');
    }
  } catch (error) {
    console.error('获取用户信息失败:', error);
    this.$message.error('获取用户信息失败');
  }
},
  async updateProfile() {
    try {
      const response = await this.$http.post('/admin/updateUserInfo', this.userForm);
      if (response.data.code === 200) {
        this.$message.success('资料更新成功');
        this.showDrawer = false;
        this.fetchUserInfo(); // 更新本地userInfo
      } else {
        this.$message.error('资料更新失败');
      }
    } catch (error) {
      console.error('更新用户资料失败:', error);
      this.$message.error('更新用户资料失败');
    }
  }
},
  mounted() {
    this.fetchUserInfo();
  }
};
</script>

<style>
.root {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100vh;
  width: 90%;
  margin: 0 auto;
  position: relative;
}
.info-display {
  width: 100%;
}
.user-id {
  font-size: 36px; /* 增大用户 ID 的字号 */
  font-weight: bold;
  padding: 20px;
  border-bottom: 1px solid #ccc;
}
.user-details, .contact-info, .introduction-title, .personal-introduction {
  padding: 20px;
  border-bottom: 1px solid #ccc;
  margin-top: 20px; /* 增加行间距 */
}
.contact-info div, .user-details div {
  margin: 10px 0;
}
.introduction-title {
  font-size: 24px; /* 增大“个人介绍”标题的字号大小 */
  font-weight: bold;
}
.personal-introduction {
  height: 50%;
  overflow-y: auto;
}
.edit-button {
  position: absolute;
  top: 20px; /* 与用户ID同高度 */
  right: 20px;
  margin-right: 0;
}
.el-drawer__body {
  padding: 20px;
}
.form-title {
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
