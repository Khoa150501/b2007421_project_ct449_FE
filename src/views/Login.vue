<!-- <template>
  <div class="auth-form">
    <h2>Đăng Nhập</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email/SDT</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Mật khẩu</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div>
        <button type="submit">Đăng nhập</button>
      </div>
    </form>
    <p>Chưa có tài khoản? <router-link to="/register">Đăng ký</router-link></p>
  </div>
</template>

<script>
import NhanVienService from "@/services/staff.services.js";

export default {
  data() {
    return {
      msnv: "",
      password: ""
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await NhanVienService.login({
          msnv: this.msnv,
          password: this.password
        });
        console.log("Đăng nhập thành công:", response);
        // Chuyển hướng sau khi đăng nhập thành công
        this.$router.push("/home");
      } catch (error) {
        console.error("Đăng nhập thất bại:", error.message);
      }
    }
  }
};
</script>

<style scoped>
.auth-form {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.auth-form h2 {
  text-align: center;
  margin-bottom: 20px;
}

.auth-form div {
  margin-bottom: 15px;
}

.auth-form label {
  display: block;
  margin-bottom: 5px;
}

.auth-form input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.auth-form button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.auth-form button:hover {
  background-color: #45a049;
}
</style>
 -->
<template>
  <!-- <div class="login-container"> -->
  <div class="auth-form">

    <h2>Đăng nhập</h2>
    <form @submit.prevent="login">
      <div>
        <label for="msnv">Mã số nhân viên</label>
        <input type="text" id="msnv" v-model="msnv" required />
      </div>
      <div>
        <label for="password">Mật khẩu</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Đăng nhập</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>

</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      msnv: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          msnv: this.msnv,
          password: this.password
        });
        const { token, user } = response.data;

        // Lưu token vào localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        // Chuyển hướng tới trang /home
        this.$router.push('/');
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Lỗi đăng nhập!';
      }
    }
  }
};
</script>

<style>
.auth-form {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.auth-form h2 {
  text-align: center;
  margin-bottom: 20px;
}

.auth-form div {
  margin-bottom: 15px;
}

.auth-form label {
  display: block;
  margin-bottom: 5px;
}

.auth-form input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.auth-form button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.auth-form button:hover {
  background-color: #45a049;
}
.error {
  color: red;
}
</style>

