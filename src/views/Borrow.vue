<template>
  <div class="borrow-management">
    <div class="search-bar mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Tìm kiếm sách hoặc người mượn"
        @input="searchBorrows"
        class="form-control"
      />
    </div>

    <div class="container">
      <div class="row">
        <div v-for="borrow in filteredBorrows" :key="borrow._id" class="col-md-4 mb-4">
          <div class="card">
            <div class="card-body">
              <h5>{{ borrow.book.tensach }}</h5>
              <p><strong>Người Mượn:</strong> {{ borrow.reader.name }}</p>
              <p><strong>Ngày Mượn:</strong> {{ borrow.dateBorrowed | formatDate }}</p>
              <p><strong>Ngày Trả:</strong> {{ borrow.dateReturned ? borrow.dateReturned | formatDate : 'Chưa trả' }}</p>
              <p><strong>Tình Trạng:</strong> 
                <span :class="{'text-success': borrow.status === 'returned', 'text-danger': borrow.status === 'not-returned'}">
                  {{ borrow.status === 'returned' ? 'Đã trả' : 'Chưa trả' }}
                </span>
              </p>
              <button
                v-if="borrow.status === 'not-returned'"
                class="btn btn-success"
                @click="updateStatus(borrow._id, 'returned')"
              >
                Đánh dấu là đã trả
              </button>
              <button
                v-if="borrow.status === 'returned'"
                class="btn btn-warning"
                @click="updateStatus(borrow._id, 'not-returned')"
              >
                Đánh dấu là chưa trả
              </button>
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
  name: "BorrowManagement",
  data() {
    return {
      borrows: [],
      filteredBorrows: [],
      searchQuery: "",
      loading: true,
    };
  },
  mounted() {
    this.fetchBorrows();
  },
  methods: {
    async fetchBorrows() {
      try {
        const response = await axios.get("http://localhost:3001/api/borrows");
        this.borrows = response.data;
        this.filteredBorrows = this.borrows; // Mặc định hiển thị toàn bộ mượn sách
        this.loading = false;
      } catch (error) {
        console.error("Có lỗi khi lấy danh sách mượn sách:", error.message);
        this.loading = false;
      }
    },
    searchBorrows() {
      if (this.searchQuery.trim() === "") {
        this.filteredBorrows = this.borrows;
      } else {
        this.filteredBorrows = this.borrows.filter((borrow) => {
          return (
            borrow.book.tensach.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            borrow.reader.name.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        });
      }
    },
    async updateStatus(borrowId, status) {
      try {
        await axios.patch(`http://localhost:3001/api/borrows/${borrowId}`, { status });
        this.fetchBorrows(); // Cập nhật lại danh sách sau khi thay đổi trạng thái
      } catch (error) {
        console.error("Có lỗi khi cập nhật trạng thái mượn sách:", error.message);
      }
    }
  },
  filters: {
    formatDate(value) {
      if (!value) return '';
      const date = new Date(value);
      return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });
    }
  }
};
</script>

<style scoped>
.borrow-management {
  padding: 20px;
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

/* Card */
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

.card-body h5 {
  font-size: 18px;
  margin: 10px 0;
}

.card-body p {
  font-size: 14px;
  margin: 5px 0;
}

.card-body button {
  margin-top: 10px;
}

/* Success & Danger Text */
.text-success {
  color: green;
}

.text-danger {
  color: red;
}
</style>
