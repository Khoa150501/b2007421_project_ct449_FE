import { reactive } from "vue";

export const eventBus = reactive({
  searchQuery: "",  // Từ khóa tìm kiếm
  books: [],        // Kết quả tìm kiếm
  error: null,      // Lỗi nếu có

  // Hàm để phát sự kiện
  updateSearchResults(query, books, error = null) {
    this.searchQuery = query;
    this.books = books;
    this.error = error;
  }
});