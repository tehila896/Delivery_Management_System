import axios from "axios";

const API_URL = "http://localhost:10091/api/redis/customer/save_customer";

class AuthService {

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
