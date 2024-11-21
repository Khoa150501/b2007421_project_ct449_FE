<template>
  <div class="books">
    <!-- Tìm kiếm sách -->
    <div class="search-bar mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Tìm kiếm sách theo tên hoặc tác giả"
        @input="searchBooks"
        class="form-control"
      />
    </div>

    <!-- Danh sách sách -->
    <div class="container">
      <div class="row">
        <div
          v-for="book in filteredBooks"
          :key="book.masach"
          class="col-md-4 mb-4"
        >
          <div class="card">
            <div class="card-body">
              <p><strong>Tác Giả:</strong> {{ book.tacgia }}</p>
              <p><strong>Giá:</strong> {{ book.dongia | currency }}</p>
              <p><strong>Năm Xuất Bản:</strong> {{ book.namxb }}</p>
              <p><strong>Số Quyển:</strong> {{ book.soquyen }}</p>
              <img src="/src/assets/img/book/codedao.png" alt="" class="w-100">
              <h3>{{ book.tensach }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Books",
  data() {
    return {
      books: [],
      filteredBooks: [],
      searchQuery: "",
      loading: true,
    };
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await axios.get("http://localhost:3001/api/books");
        this.books = response.data;
        this.filteredBooks = this.books; // Mặc định hiển thị toàn bộ sách
        this.loading = false;
      } catch (error) {
        console.error("Có lỗi khi lấy danh sách sách:", error.message);
        this.loading = false;
      }
    },
    searchBooks() {
      if (this.searchQuery.trim() === "") {
        this.filteredBooks = this.books;
      } else {
        this.filteredBooks = this.books.filter((book) => {
          return (
            book.tensach
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()) ||
            book.tacgia.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        });
      }
    },
  },
  filters: {
    currency(value) {
      if (!value) return "0 đ";
      return value.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    },
  },
};
</script>

<style scoped>
.books {
  font-family: Arial, sans-serif;
  padding: 20px;
  margin-left: 250px;
  margin-right: 250px;
}

.search-bar {
  text-align: center;
  margin-bottom: 30px;
}

.search-bar input {
  padding: 10px;
  width: 60%;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-top: 10px;
  box-sizing: border-box;
}

.card {
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.05);
}

.card-body {
  padding: 15px;
}

.card-body h3 {
  font-size: 20px;
  margin: 10px 0;
}

.card-body p {
  font-size: 14px;
  margin: 5px 0;
}

.card-body .btn-details {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.card-body .btn-details:hover {
  background-color: #0056b3;
}

/* Loading */
.loading {
  text-align: center;
  font-size: 18px;
  color: #007bff;
}

/* No Books Found */
.no-books {
  text-align: center;
  font-size: 18px;
  color: #888;
}
</style>
