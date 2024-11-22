import { createStore } from "vue";

export default createStore({
  state: {
    books: [], // Dữ liệu sách tìm kiếm
    searchQuery: "", // Từ khóa tìm kiếm
    loading: false, // Trạng thái đang tìm kiếm
    error: null, // Thông báo lỗi
  },
  mutations: {
    setBooks(state, books) {
      state.books = books;
    },
    setSearchQuery(state, query) {
      state.searchQuery = query;
    },
    setLoading(state, status) {
      state.loading = status;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async searchBooks({ commit }, query) {
      commit("setLoading", true);
      commit("setError", null);

      try {
        const response = await fetch(`/api/books/search?query=${query}`);
        const data = await response.json();
        commit("setBooks", data);
      } catch (error) {
        commit("setError", "Không thể tìm kiếm sách.");
      } finally {
        commit("setLoading", false);
      }
    },
  },
});
