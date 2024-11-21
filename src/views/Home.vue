<template>
  <div class="home">
    <!-- Hero Section (Banner) -->
    <section class="hero">
      <div class="hero-content">
        <h1>Chào mừng đến với Hệ thống Quản lý Thư viện</h1>
        <p>Quản lý sách, mượn sách và theo dõi hoạt động một cách dễ dàng và hiệu quả.</p>
        <router-link to="/books" class="btn-primary">Xem Sách</router-link>
        <router-link to="/borrow" class="btn-secondary">Quản lý Mượn Sách</router-link>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <h2>Chức năng nổi bật</h2>
      <div class="feature-cards">
        <!-- Sử dụng component con BookCard -->
         
        <BookCard v-for="book in books" :key="book.masach" :book="book" />

        <div class="card">
          <h3>Quản Lý Mượn Sách</h3>
          <p>Theo dõi thông tin mượn sách và hạn trả.</p>
        </div>
        <div class="card">
          <h3>Quản Lý Độc Giả</h3>
          <p>Thêm và quản lý thông tin độc giả sử dụng hệ thống.</p>
        </div>
      </div>
    </section>

    <!-- About Us Section -->
    <section class="about-us">
      <h2>Về chúng tôi</h2>
      <p>
        Hệ thống quản lý thư viện này được thiết kế để giúp thư viện hoạt động hiệu quả hơn với tính năng quản lý sách, mượn sách và theo dõi các hoạt động.
        Với giao diện dễ sử dụng, người dùng có thể dễ dàng tìm kiếm và mượn sách một cách nhanh chóng.
      </p>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import BookCard from '@/components/BookCard.vue';  // Đảm bảo import đúng

export default {
  name: 'Home',
  components: {
    BookCard  // Đăng ký component con
  },
  data() {
    return {
      books: []  // Mảng chứa danh sách sách
    };
  },
  mounted() {
    this.fetchBooks();  // Khi trang được tải, gọi API để lấy danh sách sách
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await axios.get('http://localhost:3001/api/books'); // URL API lấy sách
        this.books = response.data;  // Gán dữ liệu sách vào biến books
      } catch (error) {
        console.error('Có lỗi khi lấy danh sách sách:', error.message);
      }
    }
  }
};
</script>

<style scoped>
/* Overall home styling */
.home {
  font-family: Arial, sans-serif;
  color: #333;
}

/* Hero Section */
.hero {
  /* background-color: #4CAF50; */
  background-image: url(/src/assets/img/banner-gia-ke-thu-vien.jpg);
  color: white;
  padding: 50px 20px;
  text-align: center;
  margin-bottom: 50px;
}

.hero h1 {
  font-size: 36px;
  font-style: bold;
  margin-bottom: 20px;
}

.hero p {
  font-size: 20px;
  margin-bottom: 30px;
}

.btn-primary, .btn-secondary {
  padding: 10px 20px;
  color: white;
  text-decoration: none;
  font-size: 16px;
  margin: 10px;
  border-radius: 5px;
}

.btn-primary {
  background-color: #007BFF;
}

.btn-secondary {
  background-color: #6c757d;
}

.hero .btn-primary:hover, .hero .btn-secondary:hover {
  opacity: 0.8;
}

/* Features Section */
.features {
  text-align: center;
  margin-bottom: 50px;
}

.features h2 {
  font-size: 30px;
  margin-bottom: 40px;
}

.feature-cards {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.feature-cards .card {
  width: 250px;
  background-color: #f8f9fa;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card h3 {
  font-size: 24px;
  margin-bottom: 15px;
}

.card p {
  font-size: 16px;
}

/* About Us Section */
.about-us {
  text-align: center;
  margin: 50px 20px;
}

.about-us h2 {
  font-size: 30px;
  margin-bottom: 20px;
}

.about-us p {
  font-size: 18px;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
}
</style>