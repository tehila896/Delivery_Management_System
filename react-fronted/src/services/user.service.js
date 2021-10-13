import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:10091/api/test/';

class UserService {
  getPublicContent() {
    // return axios.get(API_URL + 'all');
   return "Public Content.";
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
    // return "User Content.";
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
    // return "Moderator Board.";
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
    //return "Admin Board.";
  }
}

export default new UserService();
