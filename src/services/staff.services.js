import createApiClient from './api.service';

class NhanVienService {
  constructor(baseUrl = "/api/nhanvien") {
    this.api = createApiClient(baseUrl);
  }

  // Đăng ký nhân viên
  async register(data) {
    return (await this.api.post("/register", data)).data;
  }

  // Đăng nhập nhân viên
  async login(data) {
    return (await this.api.post("/login", data)).data;
  }
}

export default new NhanVienService();