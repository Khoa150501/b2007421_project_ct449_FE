<template>
      <div v-if="books.length" class="result-search">
      <h3>Kết quả tìm kiếm</h3>
      <ul>
        <li v-for="book in books" :key="book._id">
          <p><strong>{{ book.tensach }}</strong> - Mã sách: {{ book.masach }}</p>
          <p>Tác giả: {{ book.tacgia }} | Năm XB: {{ book.namxb }}</p>
        </li>
      </ul>
    </div>

  <div v-else-if="error">
    <p>{{ error }}</p>
  </div>
  <div v-else>
    <p></p>
  </div>
</template>

<script>
import { eventBus } from "@/event-bus"; // Import event bus

export default {
  name: "SearchResults",
  data() {
    return {
      books: [],
      error: null,
    };
  },
  created() {
    // Lắng nghe sự kiện cập nhật kết quả tìm kiếm từ event bus
    this.$watch(
      () => eventBus.books,
      (newBooks) => {
        this.books = newBooks;
      }
    );
    this.$watch(
      () => eventBus.error,
      (newError) => {
        this.error = newError;
      }
    );
  },
};
</script>
<style>
.result-search {
  background-color: #f8f9fa; /* Màu nền nhẹ */
  padding: 20px;
  border-radius: 8px;  /* Bo góc */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Đổ bóng nhẹ */
  margin-top: 20px;
  margin-left: 250px;
  margin-right: 250px
}

/* Tiêu đề kết quả tìm kiếm */
.result-search h3 {
  font-size: 24px;
  color: #343a40; /* Màu chữ tối */
  margin-bottom: 15px;
  text-align: center;
}

/* Danh sách kết quả */
.result-search ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Mỗi mục sách */
.result-search li {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1); /* Đổ bóng cho mỗi mục */
  transition: background-color 0.3s ease, transform 0.2s ease; /* Hiệu ứng hover */
}

/* Thông tin sách */
.result-search li p {
  font-size: 16px;
  color: #495057; /* Màu chữ tối cho thông tin sách */
  margin: 5px 0;
}

/* Thêm hiệu ứng khi di chuột vào mỗi mục */
.result-search li:hover {
  background-color: #f1f1f1; /* Màu nền khi hover */
  transform: translateY(-2px); /* Nâng mục lên khi hover */
}

/* Định dạng cho tiêu đề sách */
.result-search li p strong {
  color: #007bff; /* Màu xanh cho tên sách */
  font-size: 18px;
}

/* Thông tin về tác giả và năm xuất bản */
.result-search li p span {
  font-style: italic;
  color: #6c757d; /* Màu chữ nhạt cho tác giả và năm xuất bản */
}</style>
