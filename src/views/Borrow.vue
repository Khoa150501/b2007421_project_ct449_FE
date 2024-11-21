<template>
  <div>
      <section class="hero">
      <div class="hero-content">
       <h1>Quản lý Mượn Sách</h1>
        <!-- <router-link to="/books" class="btn-primary">Xem Sách</router-link> -->
        <!-- <router-link to="/borrow" class="btn-secondary">Quản lý Mượn Sách</router-link> -->
      </div>
    </section>

    <BorrowStatistics :borrows="borrows" />
    <BorrowList :borrows="borrows" />
    <BorrowForm @addBorrow="addBorrow" />

  </div>
</template>

<script>
import axios from 'axios';
import BorrowList from '@/components/BorrowList.vue';
import BorrowForm from '@/components/BorrowForm.vue';
import BorrowStatistics from '@/components/BorrowStatistics.vue';

export default {
  data() {
    return {
      borrows: [],
    };
  },
  created() {
    this.fetchBorrows();
  },
  methods: {
    async fetchBorrows() {
      try {
        const response = await axios.get('http://localhost:3000/api/borrow');
        this.borrows = response.data;
      } catch (error) {
        console.error('Lỗi khi lấy danh sách phiếu mượn:', error);
      }
    },
    async addBorrow(newBorrow) {
      try {
        const response = await axios.post('http://localhost:3000/api/borrow', newBorrow);
        this.borrows.push(response.data);
      } catch (error) {
        console.error('Lỗi khi thêm phiếu mượn:', error);
      }
    },
  },
  components: {
    BorrowList,
    BorrowForm,
    BorrowStatistics
  },
};
</script>
<style scoped>
.hero {
  /* background-color: #4CAF50; */
  background-image: url(/src/assets/img/banner-gia-ke-thu-vien.jpg);
  padding: 50px 20px;
  text-align: center;
  color: white;
  margin-bottom: 50px;
}

.hero h1 {
  font-size: 36px;
  font-style: bold;
  margin-bottom: 20px;
}

</style>
