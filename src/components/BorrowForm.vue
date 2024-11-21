<template>
  <div class="borrow-form">
    <h2>Thêm Phiếu Mượn</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="madg">Tên người mượn:</label>
        <input v-model="newBorrow.madg" id="madg" type="text" required />
      </div>
      <div class="form-group">
        <label for="masach">Tên sách:</label>
        <input v-model="newBorrow.masach" id="masach" type="text" required />
      </div>
      <div class="form-group">
        <label for="ngaymuon">Ngày Mượn:</label>
        <input v-model="newBorrow.ngaymuon" id="ngaymuon" type="date" required />
      </div>
      <div class="form-group">
        <label for="ngaytra">Ngày Trả:</label>
        <input v-model="newBorrow.ngaytra" id="ngaytra" type="date" required />
      </div>
      <div class="form-group">
        <label for="tinhtrang">Tình Trạng:</label>
        <select v-model="newBorrow.tinhtrang" id="tinhtrang" required>
          <option :value="true">Đã trả</option>
          <option :value="false">Chưa trả</option>
        </select>
      </div>
      <button type="submit">Thêm Phiếu Mượn</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newBorrow: {
        madg: '',
        masach: '',
        ngaymuon: '',
        ngaytra: '',
        tinhtrang: false,
      },
    };
  },
  methods: {
    submitForm() {
      this.$emit('addBorrow', this.newBorrow);
      this.newBorrow = { madg: '', masach: '', ngaymuon: '', ngaytra: '', tinhtrang: false };  // Reset form
    },
  },
};
</script>

<style scoped>
.borrow-form {
  max-width: 600px;
  margin: 30px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #4CAF50;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.form-group input[type="date"] {
  width: 100%;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

button:active {
  background-color: #3e8e41;
}

@media screen and (max-width: 768px) {
  .borrow-form {
    padding: 15px;
  }
}
</style>
