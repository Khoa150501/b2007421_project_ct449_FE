<template>
  <div class="reader-management">
    <h1>Quản Lý Độc Giả</h1>
      <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>
    <!-- Danh sách độc giả -->
    <table class="table">
      <thead>
        <tr>
          <th>Họ Lót</th>
          <th>Tên</th>
          <th>Ngày Sinh</th>
          <th>Phái</th>
          <th>Địa Chỉ</th>
          <th>SĐT</th>
          <th>Mã Độc Giả</th>
          <th>Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reader in readers" :key="reader._id">
          <td>{{ reader.holot }}</td>
          <td>{{ reader.ten }}</td>
          <td>{{ reader.ngaysinh }}</td>
          <td>{{ reader.phai }}</td>
          <td>{{ reader.diachi }}</td>
          <td>{{ reader.sdtdg }}</td>
          <td>{{ reader.madg }}</td>
          <td>
            <button class="btn btn-primary m-2" @click="editReader(reader)">Sửa </button>

            <button class="btn btn-danger" @click="confirmDelete(reader._id)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Form thêm/sửa độc giả -->
    <div class="reader-form">
      <h2>{{ editing ? 'Sửa Độc Giả' : 'Thêm Độc Giả' }}</h2>
      <form @submit.prevent="handleSubmit">
        <input type="text" v-model="formData.holot" placeholder="Họ Lót" required />
        <input type="text" v-model="formData.ten" placeholder="Tên" required />
        <input type="date" v-model="formData.ngaysinh" required />
        <select v-model="formData.phai" required>
          <option value="nam">Nam</option>
          <option value="nu">Nữ</option>
        </select>
        <input type="text" v-model="formData.diachi" placeholder="Địa Chỉ" required />
        <input type="text" v-model="formData.sdtdg" placeholder="SĐT" required />
        <input type="number" v-model="formData.madg" placeholder="Mã Độc Giả" required />
        <button type="submit">{{ editing ? 'Cập Nhật' : 'Thêm Mới' }}</button>
      </form>
    </div>

    <!-- Thông báo thành công -->
    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      readers: [],
      formData: {
        holot: "",
        ten: "",
        ngaysinh: "",
        phai: "nam",
        diachi: "",
        sdtdg: "",
        madg: null,
      },
      editing: false,
      editingId: null,
      successMessage: "", // Thông báo thành công
    };
  },
  methods: {
    async fetchReaders() {
      try {
        const res = await axios.get("http://localhost:3001/api/readers");
        this.readers = res.data;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách độc giả:", error);
      }
    },
    async handleSubmit() {
      try {
        if (this.editing) {
          // Sửa độc giả
          await axios.put(`http://localhost:3001/api/readers/${this.editingId}`, this.formData);
          this.successMessage = "Cập nhật thông tin độc giả thành công!";
        } else {
          // Thêm độc giả
          await axios.post("http://localhost:3001/api/readers", this.formData);
          this.successMessage = "Thêm mới độc giả thành công!";
        }
        this.resetForm();
        this.fetchReaders();
        this.clearMessageAfterTimeout();
      } catch (error) {
        console.error("Lỗi khi gửi dữ liệu:", error);
      }
    },
    confirmDelete(id) {
      if (confirm("Bạn có chắc chắn muốn xóa độc giả này không?")) {
        this.deleteReader(id);
      }
    },
    async deleteReader(id) {
      try {
        await axios.delete(`http://localhost:3001/api/readers/${id}`);
        this.successMessage = "Xóa độc giả thành công!";
        this.fetchReaders();
        this.clearMessageAfterTimeout();
      } catch (error) {
        console.error("Lỗi khi xóa độc giả:", error);
      }
    },
    editReader(reader) {
      this.editing = true;
      this.editingId = reader._id;
      this.formData = { ...reader };
    },
    resetForm() {
      this.editing = false;
      this.editingId = null;
      this.formData = {
        holot: "",
        ten: "",
        ngaysinh: "",
        phai: "nam",
        diachi: "",
        sdtdg: "",
        madg: null,
      };
    },
    clearMessageAfterTimeout() {
      setTimeout(() => {
        this.successMessage = "";
      }, 3000); // Thông báo biến mất sau 3 giây
    },
  },
  mounted() {
    this.fetchReaders();
  },
};
</script>

<style scoped>
.reader-management{
  margin-left: 250px;
  margin-right: 250px;
}
.reader-management h1{
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
}
.success-message {
  margin-top: 20px;
  color: green;
  font-weight: bold;
}
.reader-form {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.reader-form h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
}

.reader-form form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.reader-form input[type="text"],
.reader-form input[type="date"],
.reader-form input[type="number"],
.reader-form select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #fff;
  box-sizing: border-box;
  transition: border-color 0.3s ease-in-out;
}

.reader-form input[type="text"]:focus,
.reader-form input[type="date"]:focus,
.reader-form input[type="number"]:focus,
.reader-form select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
}

.reader-form button[type="submit"] {
  padding: 10px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.reader-form button[type="submit"]:hover {
  background-color: #0056b3;
}

.reader-form button[type="submit"]:active {
  background-color: #004085;
}

.reader-form button[type="submit"]:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
