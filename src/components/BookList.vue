<template>
  <div class="book-list">
    <h2 >Danh Sách Sách</h2>

    <!-- Add Book Form -->
    <div v-if="isEditing">
      <h3>Cập nhật sách</h3>
      <form @submit.prevent="updateBook">
        <div>
          <label for="tensach">Tên Sách:</label>
          <input v-model="currentBook.tensach" type="text" required />
        </div>
        <div>
          <label for="dongia">Đơn Giá:</label>
          <input v-model="currentBook.dongia" type="number" required />
        </div>
        <div>
          <label for="soquyen">Số Quyển:</label>
          <input v-model="currentBook.soquyen" type="number" required />
        </div>
        <div>
          <label for="namxb">Năm Xuất Bản:</label>
          <input v-model="currentBook.namxb" type="text" required />
        </div>
        <div>
          <button type="submit">Cập Nhật</button>
          <button type="button" @click="cancelEdit">Hủy</button>
        </div>
      </form>
    </div>

    <!-- Add Book Button -->
    <button @click="startAddingBook">Thêm Sách</button>

    <!-- Book List -->
    <div class="book-cards">
      <div class="book-card" v-for="book in books" :key="book._id.$oid">
        <h3>{{ book.tensach }}</h3>
        <p>Đơn giá: {{ book.dongia | currency }}</p>
        <p>Số Quyển: {{ book.soquyen }}</p>
        <p>Năm xuất bản: {{ book.namxb }}</p>
        <p>Tác giả: {{ book.tacgia }}</p>
        <button @click="editBook(book)">Sửa</button>
        <button @click="deleteBook(book._id.$oid)">Xóa</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BookList',
  data() {
    return {
      books: [],
      isEditing: false,
      currentBook: {},
    };
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    // Lấy danh sách sách từ MongoDB
    async fetchBooks() {
      try {
        const response = await axios.get('http://localhost:3001/api/books');
        this.books = response.data;
      } catch (error) {
        console.error('Lỗi khi lấy danh sách sách:', error);
      }
    },

    // Bắt đầu thêm sách
    startAddingBook() {
      this.isEditing = true;
      this.currentBook = { masach: '', tensach: '', dongia: 0, soquyen: 0, namxb: '', maxb: '', tacgia: '' };
    },

    // Cập nhật sách
    async updateBook() {
      try {
        if (this.currentBook._id) {
          // Nếu đang sửa, thực hiện cập nhật
          await axios.put(`http://localhost:3001/api/books/${this.currentBook._id.$oid}`, this.currentBook);
        } else {
          // Nếu thêm sách mới, thực hiện thêm mới
          await axios.post('http://localhost:3001/api/books', this.currentBook);
        }
        this.isEditing = false;
        this.fetchBooks();
      } catch (error) {
        console.error('Lỗi khi cập nhật sách:', error);
      }
    },

    // Hủy chức năng sửa
    cancelEdit() {
      this.isEditing = false;
      this.currentBook = {};
    },

    // Sửa sách
    editBook(book) {
      this.isEditing = true;
      this.currentBook = { ...book };
    },

    // Xóa sách
    async deleteBook(bookId) {
      try {
        await axios.delete(`http://localhost:3001/api/books/${bookId}`);
        this.fetchBooks();
      } catch (error) {
        console.error('Lỗi khi xóa sách:', error);
      }
    },
  },
};
</script>

<style scoped>
.book-list {
  font-family: 'Arial', sans-serif;
  color: #333;
  margin-top: 20px;
}

h2 {
  font-size: 32px;
  margin-bottom: 20px;
  text-align: center;
}

.book-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.book-card {
  background-color: #f9f9f9;
  padding: 15px;
  width: 250px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.book-card h3 {
  font-size: 20px;
  color: #4CAF50;
}

.book-card p {
  font-size: 16px;
  color: #333;
}

.book-card button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.book-card button:hover {
  background-color: #0056b3;
}

button {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  margin-bottom: 20px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

form input {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

form button {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
}

form button:hover {
  background-color: #0056b3;
}

form button[type='button'] {
  background-color: #dc3545;
}

form button[type='button']:hover {
  background-color: #c82333;
}
</style>
