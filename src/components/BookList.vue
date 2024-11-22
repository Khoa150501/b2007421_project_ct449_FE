
<template>
  <div class="book-management">
    <h1>Quản Lý Sách</h1>
    
    <!-- Danh sách sách -->
    <table class="table">
      <thead>
        <tr>
          <th>Mã Sách</th>
          <th>Tên Sách</th>
          <th>Đơn Giá</th>
          <th>Số Quyển</th>
          <th>Năm Xuất Bản</th>
          <th>Mã NXB</th>
          <th>Tác Giả</th>
          <th>Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book._id">
          <td>{{ book.masach }}</td>
          <td>{{ book.tensach }}</td>
          <td>{{ book.dongia }}</td>
          <td>{{ book.soquyen }}</td>
          <td>{{ book.namxb }}</td>
          <td>{{ book.maxb }}</td>
          <td>{{ book.tacgia }}</td>
          <td>
            <button @click="editBook(book)" class="btn btn-primary m-2">Sửa</button>
            <button @click="deleteBook(book._id)"class="btn btn-danger">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Form thêm/sửa sách -->
    <div class="book-form">
      <h2>{{ editing ? 'Sửa Sách' : 'Thêm Sách' }}</h2>
      <form @submit.prevent="handleSubmit">
        <input type="text" v-model="formData.masach" placeholder="Mã Sách" required />
        <input type="text" v-model="formData.tensach" placeholder="Tên Sách" required />
        <input type="number" v-model="formData.dongia" placeholder="Đơn Giá" required />
        <input type="number" v-model="formData.soquyen" placeholder="Số Quyển" required />
        <input type="text" v-model="formData.namxb" placeholder="Năm Xuất Bản" required />
        <input type="text" v-model="formData.maxb" placeholder="Mã NXB" required />
        <input type="text" v-model="formData.tacgia" placeholder="Tác Giả" required />
        <button type="submit">{{ editing ? 'Cập Nhật' : 'Thêm Mới' }}</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      books: [],
      formData: {
        masach: "",
        tensach: "",
        dongia: 0,
        soquyen: 0,
        namxb: "",
        maxb: "",
        tacgia: "",
      },
      editing: false,
      editingId: null,
    };
  },
  methods: {
    async fetchBooks() {
      try {
        const res = await axios.get("http://localhost:3001/api/books");
        this.books = res.data;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sách:", error);
      }
    },
    async handleSubmit() {
      try {
        if (this.editing) {
          await axios.put(`http://localhost:3001/api/books/${this.editingId}`, this.formData);
        } else {
          await axios.post("http://localhost:3001/api/books", this.formData);
        }
        this.resetForm();
        this.fetchBooks();
      } catch (error) {
        console.error("Lỗi khi gửi dữ liệu:", error);
      }
    },
    async deleteBook(id) {
      try {
        if (confirm("Bạn có chắc chắn muốn xóa sách này?")) {
          await axios.delete(`/api/books/${id}`);
          this.fetchBooks();
          alert("Sách đã được xóa thành công");
        }
      } catch (error) {
        console.error("Lỗi khi xóa sách:", error);
      }
    },
    editBook(book) {
      this.formData = { ...book };
      this.editing = true;
      this.editingId = book._id;
    },
    resetForm() {
      this.formData = {
        masach: "",
        tensach: "",
        dongia: 0,
        soquyen: 0,
        namxb: "",
        maxb: "",
        tacgia: "",
      };
      this.editing = false;
      this.editingId = null;
    },
  },
  created() {
    this.fetchBooks();
  },
};
</script>

<style scoped>
.book-management h1{
text-align: center;
}
.book-form {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.book-form h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
}

.book-form form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.book-form input[type="text"],
.book-form input[type="date"],
.book-form input[type="number"],
.book-form select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #fff;
  box-sizing: border-box;
  transition: border-color 0.3s ease-in-out;
}

.book-form input[type="text"]:focus,
.book-form input[type="date"]:focus,
.book-form input[type="number"]:focus,
.book-form select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
}

.book-form button[type="submit"] {
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

.book-form button[type="submit"]:hover {
  background-color: #0056b3;
}

.book-form button[type="submit"]:active {
  background-color: #004085;
}

.book-form button[type="submit"]:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>

