<template>
  <div class="reader-list">
    <!-- <h2>Danh Sách Độc Giả</h2> -->
    <table v-if="readers.length > 0" class="reader-table">
      <thead>
        <tr>
          <th>Họ và Tên</th>
          <th>Ngày Sinh</th>
          <th>Giới Tính</th>
          <th>Địa Chỉ</th>
          <th>Số Điện Thoại</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reader in readers" :key="reader.madg">
          <td>{{ reader.holot }} {{ reader.ten }}</td>
          <td>{{ reader.ngaysinh }}</td>
          <td>{{ reader.phai }}</td>
          <td>{{ reader.diachi }}</td>
          <td>{{ reader.sdtdg }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>Không có độc giả nào để hiển thị.</p>
  </div>
</template>

<script>
export default {
  name: 'ReaderList',
  data() {
    return {
      readers: [
        {
          madg: 100,
          holot: 'Nguyễn Văn',
          ten: 'A',
          ngaysinh: '15/05/2001',
          phai: 'nam',
          diachi: 'Tp.Cần Thơ, Ninh Kiều',
          sdtdg: '0346789503',
        },
        // Thêm các độc giả khác vào đây nếu cần
      ],
    };
  },
};
</script>

<style scoped>
.reader-list {
  padding: 20px;
  text-align: center;
  margin-left: 250px;
  margin-right: 250px;

}

h2 {
  font-size: 28px;
  margin-bottom: 20px;
}

.reader-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.reader-table th, .reader-table td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}

.reader-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.reader-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.reader-table tbody tr:hover {
  background-color: #e0e0e0;
}

@media (max-width: 768px) {
  .reader-table {
    font-size: 14px;
  }

  .reader-table th, .reader-table td {
    padding: 8px;
  }
}
</style>
