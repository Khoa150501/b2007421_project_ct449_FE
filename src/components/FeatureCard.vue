<template>
  <div class="statistics">
    <h2>Thống Kê Phiếu Mượn</h2>
    <div class="stats-container">
      <div class="stat-item">
        <h3>Tổng Số Phiếu Mượn</h3>
        <p>{{ totalBorrows }}</p>
      </div>
      <div class="stat-item">
        <h3>Phiếu Đã Trả</h3>
        <p>{{ returnedBorrows }}</p>
      </div>
      <div class="stat-item">
        <h3>Phiếu Chưa Trả</h3>
        <p>{{ notReturnedBorrows }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: 'FeatureCard',
  props: {
    borrows: Array,
  },
  computed: {
    totalBorrows() {
      return this.borrows.length;
    },
    returnedBorrows() {
      return this.borrows.filter(borrow => borrow.tinhtrang === true).length;
    },
    notReturnedBorrows() {
      return this.borrows.filter(borrow => borrow.tinhtrang === false).length;
    }
  }
};
</script>

<style scoped>
.statistics {
  /* margin: 20px; */
  margin-top: 20px;
  text-align: center;
  margin-left: 250px;
  margin-right: 250px;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.stats-container {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.stat-item {
  background-color: #f4f4f4;
  border-radius: 8px;
  padding: 20px;
  width: 30%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stat-item h3 {
  font-size: 20px;
  color: #4CAF50;
}

.stat-item p {
  font-size: 24px;
  color: #333;
  font-weight: bold;
}

@media screen and (max-width: 768px) {
  .stats-container {
    flex-direction: column;
    align-items: center;
  }

  .stat-item {
    width: 80%;
    margin-bottom: 15px;
  }
}
</style>