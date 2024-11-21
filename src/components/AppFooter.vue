<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>Quản Lý Thư Viện</h3>
        <p>Địa chỉ: 123 Đường ABC, Quận Ninh Kiều, Thành phố Cần Thơ</p>
        <p>Email: support@library.com</p>
        <p>Điện thoại: +84 123 456 789</p>
      </div>
      
      <div class="footer-section">
        <h3>Liên kết nhanh</h3>
        <ul>
          <li><a href="/about">Giới thiệu</a></li>
          <li><a href="/privacy-policy">Chính sách bảo mật</a></li>
          <li><a href="/terms">Điều khoản sử dụng</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h3>Theo dõi chúng tôi</h3>
        <ul class="social-media">
          <li><a href="https://www.facebook.com" target="_blank">Facebook</a></li>
          <li><a href="https://www.instagram.com" target="_blank">Instagram</a></li>
          <li><a href="https://www.twitter.com" target="_blank">Twitter</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2024 Quản Lý Thư Viện. Tất cả quyền được bảo lưu.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter"
};
</script>

<style scoped>
.footer {
  background-color: #2c3e50;
  color: white;
  padding: 40px 20px;
  font-size: 14px;
  justify-content: center;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-left: 250px;

}

.footer-section {
  width: 30%;
}

.footer-section h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.footer-section p {
  margin: 5px 0;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin: 5px 0;
}

.footer-section ul li a {
  color: #ecf0f1;
  text-decoration: none;
}

.footer-section ul li a:hover {
  text-decoration: underline;
}

.social-media {
  display: flex;
  gap: 10px;
}

.footer-bottom {
  text-align: center;
  font-size: 12px;
  margin-top: 20px;
}

.footer-bottom p {
  margin: 0;
}
</style>
