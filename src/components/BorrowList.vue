<template>
  <div class="borrow_list">
    <h2>Danh Sách Phiếu Mượn</h2>
    <table>
      <thead>
        <tr>
          <th>Tên người mượn</th>
          <th>Tên sách</th>
          <th>Ngày Mượn</th>
          <th>Ngày Trả</th>
          <th>Tình Trạng</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="borrow in borrows" :key="borrow._id">
          <td>{{ borrow.docgia_info.holot }} {{ borrow.docgia_info.ten }}</td>
          <td>{{ borrow.sach_info.tensach }}</td>
          <td>{{ borrow.ngaymuon }}</td>
          <td>{{ borrow.ngaytra }}</td>
          <td>{{ borrow.tinhtrang ? 'Đã trả' : 'Chưa trả' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    borrows: Array,
  },
};
</script>
<style scoped>
.borrow_list {
  margin-left: 250px;
  margin-right: 250px;
  margin-top: 20px;
}

h2 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #4CAF50;
  color: white;
}

td {
  font-size: 16px;
}

tr:hover {
  background-color: #f5f5f5;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:nth-child(odd) {
  background-color: #ffffff;
}

@media screen and (max-width: 768px) {
  .borrow_list {
    margin-left: 20px;
    margin-right: 20px;
  }

  table {
    font-size: 14px;
  }
}
</style>
