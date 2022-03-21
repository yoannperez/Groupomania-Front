import axios from "axios";

const API_URL = process.env.REACT_APP_API_ADRESS + "/api/auth/";

class AuthService {
  // Login user with user email and passord
  login(email, password) {
    return axios
      .post(API_URL + "signin", {
        email,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user"); // remove LocalStorage
  }

  // Register User
  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }

  // Get current user from lacal storage
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  
}

export default new AuthService();