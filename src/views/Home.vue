<template>
  <div class="home">
    <!-- Hero Section (Banner) -->
    <section class="hero">
      <div class="hero-content">
        <h1>Chào mừng đến với Hệ thống Quản lý Thư viện</h1>
        <p>Quản lý sách, mượn sách và theo dõi hoạt động một cách dễ dàng và hiệu quả.</p>
        <div class="cta-buttons">
          <router-link to="/books" class="btn-primary">Xem Sách</router-link>
          <router-link to="/borrow" class="btn-secondary">Quản lý Mượn Sách</router-link>
        </div>
      </div>
    </section>

    <!-- Statistics Section -->
     <div class="mb-5"> 
    <Statistics :borrows="borrows" />
     </div>
  </div>
</template>

<script>
import Statistics from '@/components/BorrowStatistics.vue';

export default {
  name: 'Home',
  components: {
    Statistics
  },
  data() {
    return {
      // Dữ liệu phiếu mượn, có thể lấy từ API
      borrows: [
        { tinhtrang: true },  // Phiếu đã trả
        { tinhtrang: false }, // Phiếu chưa trả
        { tinhtrang: true },
        { tinhtrang: false }
      ]
    };
  }
};
</script>

<style scoped>
/* General Styling */
.home {
  font-family: 'Arial', sans-serif;
  color: #333;
}

/* Hero Section */
.hero {
  position: relative; /* Cần thiết để cho phép ::before phủ lên trên background */
  background-image: url('/src/assets/img/banner-gia-ke-thu-vien.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 100px 20px;
  text-align: center;
  margin-bottom: 60px;
}

.hero::before {
  content: ""; /* Tạo một phần tử ảo */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4); /* Màu đen bán trong suốt */
  z-index: -1; /* Đảm bảo lớp phủ ở phía dưới các phần tử nội dung */
}

.hero h1 {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
  text-transform: uppercase;
}

.hero p {
  font-size: 20px;
  margin-bottom: 30px;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.btn-primary,
.btn-secondary {
  padding: 12px 25px;
  color: white;
  text-decoration: none;
  font-size: 18px;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn-primary {
  background-color: #007BFF;
}

.btn-secondary {
  background-color: #6c757d;
}

.btn-primary:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.btn-secondary:hover {
  background-color: #5a6268;
  transform: translateY(-2px);
}

/* Features Section */
.features {
  text-align: center;
  margin-bottom: 60px;
}

.features h2 {
  font-size: 36px;
  margin-bottom: 40px;
  color: #444;
  text-transform: uppercase;
}

.feature-cards {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 20px;
}

.feature-cards .card {
  width: 280px;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-cards .card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.card h3 {
  font-size: 24px;
  margin-bottom: 15px;
  color: #333;
}

.card p {
  font-size: 16px;
  color: #666;
}

/* About Us Section */
.about-us {
  text-align: center;
  margin: 60px 20px;
}

.about-us h2 {
  font-size: 36px;
  margin-bottom: 30px;
  color: #444;
}

.about-us p {
  font-size: 18px;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
  color: #555;
}
</style>
