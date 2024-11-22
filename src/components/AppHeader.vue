<template>
  <header class="header">
    <!-- Logo và Tên Dự Án -->
    <div class="header-logo">
      <a href="/" class="logo-link">
        <img src="/src/assets/img/CTU_logo.png" alt="Library Logo" class="logo-img" />
        Quản Lý Thư Viện
      </a>
    </div>

    <!-- Nút mở menu trên màn hình nhỏ -->
    <button class="menu-toggle" @click="toggleMenu">
      <i class="fas" :class="menuOpen ? 'fa-times' : 'fa-bars'"></i>
    </button>

    <!-- Thanh điều hướng -->
    <nav :class="['header-nav', { 'nav-open': menuOpen }]">
      <ul class="nav-list">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Trang Chủ</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/books" class="nav-link">Quản Lý Sách</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/readers" class="nav-link">Quản Lý Độc Giả</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/borrow" class="nav-link">Thống Kê</router-link>
        </li>
      </ul>

      <!-- Thanh tìm kiếm -->
      <div class="search-box">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Tìm kiếm sách..."
          class="search-input"
          @input="searchBooks"
        />
        <button class="search-button">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </nav>

    <!-- Thông tin người dùng -->
    <div class="user-info">
      <button class="user-dropdown-toggle" @click="toggleUserMenu">
        <i class="fas fa-user"></i> {{ userName || 'Đăng nhập' }}
      </button>
      <ul :class="['user-menu', { 'menu-open': userMenuOpen }]">
        <li><a href="#" class="dropdown-item">Hồ Sơ</a></li>
        <li><a href="#" class="dropdown-item">Đổi Mật Khẩu</a></li>
        <li class="divider"></li>
        <li><a href="#" class="dropdown-item" @click="logout">Đăng Xuất</a></li>
      </ul>
    </div>
  </header>
</template>

<script>
import { eventBus } from "@/event-bus";
export default {
  name: "AppHeader",
  data() {
    return {
      menuOpen: false,
      userMenuOpen: false,
      userName: null, // Lưu tên người dùng
      searchQuery: '',  
      // books: [],  
      // error: null,  
      // loading: false,  
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    toggleUserMenu() {
      this.userMenuOpen = !this.userMenuOpen;
    },
    logout() {
      // Xóa token và thông tin người dùng khỏi localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Chuyển hướng về trang đăng nhập
      this.$router.push("/login");
    },
   async searchBooks() {
      if (this.searchQuery.trim() === '') {
        eventBus.updateSearchResults("", [], null); // Clear results if search is empty
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/api/books/search?query=${this.searchQuery}`);
        const data = await response.json();

        if (response.ok) {
          eventBus.updateSearchResults(this.searchQuery, data); // Update event bus with results
        } else {
          eventBus.updateSearchResults(this.searchQuery, [], "Không thể tìm thấy sách.");
        }
      } catch (error) {
        eventBus.updateSearchResults(this.searchQuery, [], "Đã xảy ra lỗi khi tìm kiếm.");
      }
    },
  },
  mounted() {
    // Lấy thông tin người dùng từ localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.hotennv) {
      this.userName = user.hotennv;
    }
  },
};
</script>

<style scoped>
/* Header Container */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #343a40;
  color: white;
  padding: 10px 20px;
  padding-left: 250px;
  padding-right: 250px;
  position: relative;
  z-index: 1000;
}

/* Logo */
.header-logo .logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  font-size: 20px;
  font-weight: bold;
}

.header-logo .logo-img {
  height: 40px;
  margin-right: 10px;
}

/* Toggle Menu Button (Mobile) */
.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

/* Navigation Menu */
.header-nav {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-nav.nav-open {
  flex-direction: column;
  position: absolute;
  top: 60px;
  right: 0;
  background-color: #343a40;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.nav-list {
  display: flex;
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item .nav-link {
  text-decoration: none;
  color: white;
  padding: 10px;
  transition: color 0.3s;
}

.nav-item .nav-link:hover {
  color: #ffc107;
}

/* Search Box */
.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-input {
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 14px;
}

.search-button {
  background-color: #ffc107;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  color: black;
}

/* User Info */
.user-info {
  position: relative;
}

.user-dropdown-toggle {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.user-menu {
  position: absolute;
  top: 40px;
  right: 0;
  background-color: white;
  color: black;
  list-style: none;
  padding: 10px;
  margin: 0;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: none;
}

.user-menu.menu-open {
  display: block;
}

.dropdown-item {
  padding: 5px 10px;
  text-decoration: none;
  color: black;
  display: block;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
}

/* Divider */
.divider {
  border-top: 1px solid #ccc;
  margin: 5px 0;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .header-nav {
    display: none;
    flex-direction: column;
  }

  .header-nav.nav-open {
    display: flex;
  }

  .search-box {
    display: none;
  }
}
</style>
