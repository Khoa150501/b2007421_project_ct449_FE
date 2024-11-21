<template>
  <div class="auth-form">
    <h2>Đăng Ký</h2>
    <form @submit.prevent="handleRegister">
      <div>
        <label for="msnv">Mã số nhân viên</label>
        <input type="text" id="msnv" v-model="msnv" required />
      </div>
      <div>
        <label for="hotennv">Họ tên</label>
        <input type="text" id="hotennv" v-model="hotennv" required />
      </div>
      <div>
        <label for="password">Mật khẩu</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div>
        <label for="diachi">Địa chỉ</label>
        <input type="text" id="diachi" v-model="diachi" required />
      </div>
      <div>
        <label for="sdtnv">Số điện thoại</label>
        <input type="text" id="sdtnv" v-model="sdtnv" required />
      </div>
      <div>
        <button type="submit">Đăng ký</button>
      </div>
    </form>
    <p>Đã có tài khoản? <router-link to="/login">Đăng nhập</router-link></p>
  </div>
</template>

<script>
import NhanVienService from "@/services/staff.services.js";

export default {
  data() {
    return {
      msnv: "",
      hotennv: "",
      password: "",
      diachi: "",
      sdtnv: ""
    };
  },
  methods: {
    async handleRegister() {
      try {
        const response = await NhanVienService.register({
          msnv: this.msnv,
          hotennv: this.hotennv,
          password: this.password,
          diachi: this.diachi,
          sdtnv: this.sdtnv
        });
        console.log(response);
        this.$router.push("/login");
      } catch (error) {
        console.error("Đăng ký thất bại:", error.message);
      }
    }
  }
};
</script>

<style scoped>
.auth-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

label {
  display: block;
  margin: 8px 0;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

p {
  text-align: center;
}

router-link {
  color: #007bff;
}
</style>
