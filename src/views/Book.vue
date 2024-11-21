<template>
  <div class="book-view">
    <BookList />
  </div>
</template>

<script>
// Import BookList component
import BookList from '@/components/BookList.vue';

export default {
  name: 'BookView',
  components: {
    BookList, // Đăng ký component BookList trong view này
  },
};
</script>

<style scoped>
.book-view {
  padding: 20px;
  margin-left: 250px;
  margin-right: 250px
}

h1 {
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;
}
</style>