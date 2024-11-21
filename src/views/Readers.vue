<template>
  <div class="readers-page">
    <h1>Danh Sách Đọc Giả</h1>
    <!-- Gọi component ReaderList -->
    <ReaderList />
  </div>
</template>

<script>
// Import ReaderList component
import ReaderList from '@/components/ReaderList.vue';

export default {
  name: 'Readers',
  components: {
    ReaderList,  // Đăng ký component ReaderList
  },
};
</script>

<style scoped>
.readers-page {
  padding: 20px;
  text-align: center;
}
</style>
