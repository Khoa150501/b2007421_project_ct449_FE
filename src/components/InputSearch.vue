<template>
  <div class="search-container">
    <h2>Tìm kiếm sách</h2>
    <input 
      v-model="query" 
      type="text" 
      placeholder="Nhập tên sách, mã sách, tác giả..."
      @input="searchBooks"
    />
    <button @click="searchBooks">Tìm kiếm</button>

    <div v-if="loading" class="loading">Đang tìm kiếm...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="books.length">
      <h3>Kết quả tìm kiếm</h3>
      <ul>
        <li v-for="book in books" :key="book._id">
          <p><strong>{{ book.tensach }}</strong> - Mã sách: {{ book.masach }}</p>
          <p>Tác giả: {{ book.tacgia }} | Năm XB: {{ book.namxb }}</p>
        </li>
      </ul>
    </div>

    <div v-else-if="!loading && !error">
      <p>Chưa có kết quả tìm kiếm.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',  // Biến chứa từ khóa tìm kiếm
      books: [],  // Danh sách sách tìm được
      error: null,  // Lỗi nếu có
      loading: false,  // Trạng thái loading
    };
  },
  methods: {
    async searchBooks() {
      if (this.query.trim() === '') {
        this.books = [];
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        // Gửi yêu cầu tìm kiếm tới API
        const response = await fetch(`http://localhost:3000/api/books/search?query=${this.query}`);
        const data = await response.json();

        if (response.ok) {
          this.books = data;
        } else {
          this.error = 'Không thể tìm thấy sách.';
        }
      } catch (error) {
        this.error = 'Đã xảy ra lỗi khi tìm kiếm.';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.search-container {
  margin: 20px;
  text-align: center;
}

input {
  padding: 10px;
  margin-right: 10px;
  width: 300px;
}

button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.loading {
  font-size: 18px;
  color: blue;
}

.error {
  color: red;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 10px 0;
}
</style>
