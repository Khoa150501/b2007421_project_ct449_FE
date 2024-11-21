<template>
  <div class="card">
    <h3>{{ book.tensach }}</h3>
    <p><strong>Tác Giả:</strong> {{ book.tacgia }}</p>
    <p><strong>Giá:</strong> {{ book.dongia | currency }}</p>
    <p><strong>Năm Xuất Bản:</strong> {{ book.namxb }}</p>
    <p><strong>Số Quyển:</strong> {{ book.soquyen }}</p>
  </div>
</template>

<script>
export default {
  name: 'BookCard',
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  filters: {
    currency(value) {
      if (!value) return '0 đ';
      return value.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
      });
    }
  }
};
</script>

<style scoped>
.card {
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
  margin: 5px 0;
}
</style>
