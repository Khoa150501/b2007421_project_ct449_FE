<template>
  <div>
    <h2>Danh Sách Người Mượn</h2>
    <table>
      <thead>
        <tr>
          <th>Mã Độc Giả</th>
          <th>Họ và Tên</th>
          <th>Ngày Sinh</th>
          <th>Giới Tính</th>
          <th>Địa Chỉ</th>
          <th>SĐT</th>
          <th>Thao Tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="docgia in docgia" :key="docgia.madg">
          <td>{{ docgia.madg }}</td>
          <td>{{ docgia.holot }} {{ docgia.ten }}</td>
          <td>{{ docgia.ngaysinh }}</td>
          <td>{{ docgia.phai }}</td>
          <td>{{ docgia.diachi }}</td>
          <td>{{ docgia.sdtdg }}</td>
          <td>
            <button @click="deleteDocgia(docgia.madg)">Xóa</button>
            <button @click="editDocgia(docgia)">Sửa</button>
          </td>
        </tr>
      </tbody>
    </table>

    <h3>Thêm Người Mượn</h3>
    <form @submit.prevent="submitForm">
      <input v-model="newDocgia.madg" placeholder="Mã Độc Giả" required />
      <input v-model="newDocgia.holot" placeholder="Họ" required />
      <input v-model="newDocgia.ten" placeholder="Tên" required />
      <input v-model="newDocgia.ngaysinh" type="date" required />
      <input v-model="newDocgia.phai" placeholder="Giới Tính" required />
      <input v-model="newDocgia.diachi" placeholder="Địa Chỉ" required />
      <input v-model="newDocgia.sdtdg" placeholder="SĐT" required />
      <button type="submit">Thêm</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      docgia: [],
      newDocgia: {
        madg: '',
        holot: '',
        ten: '',
        ngaysinh: '',
        phai: '',
        diachi: '',
        sdtdg: '',
      },
    };
  },
methods: {
  async fetchDocgiaList() {
    try {
      const response = await axios.get('http://localhost:3001/api/docgia'); // Đảm bảo URL đúng
      this.docgia = response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async deleteDocgia(madg) {
    try {
      await axios.delete(`http://localhost:3001/api/docgia/${madg}`); // Đảm bảo URL đúng
      this.fetchDocgiaList();
    } catch (error) {
      console.error(error);
    }
  },
  async submitForm() {
    try {
      await axios.post('http://localhost:3001/api/docgia', this.newDocgia); // Đảm bảo URL đúng
      this.fetchDocgiaList();
      this.newDocgia = { madg: '', holot: '', ten: '', ngaysinh: '', phai: '', diachi: '', sdtdg: '' };
    } catch (error) {
      console.error(error);
    }
  },
},
};
</script>

<style scoped>
/* Add styles here */
</style>
