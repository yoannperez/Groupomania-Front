import axios from "axios";
import AuthService from "./auth.service";
import { useState } from "react";
require("dotenv").config();

const user = AuthService.getCurrentUser();
const API_URL = process.env.REACT_APP_API_ADRESS + "/api/users/";
// const [userInfo, setUserInfo] = useState([]);
// const [userInfo, setUserInfo] = useState([]);

class UserService {
  // login(email, password) {
  //   return axios
  //     .post(API_URL + "signin", {
  //       email,
  //       password
  //     })
  //     .then(response => {
  //       if (response.data.token) {
  //         localStorage.setItem("user", JSON.stringify(response.data));
  //       }

  //       return response.data;
  //     });
  // }

  // logout() {
  //   localStorage.removeItem("user");
  // }

  // register(username, email, password) {
  //   return axios.post(API_URL + "signup", {
  //     username,
  //     email,
  //     password,
  //   });
  // }

  getUserInfos(){
    axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
    axios.get(process.env.REACT_APP_API_ADRESS + "/api/users/" + user.userId)
    // .then((res) => setUserInfo(res.data));
    .then((res) =>{ 
      let machin = "coucou"
      // console.log(machin)
      return machin} );
  }

  
}

export default new UserService();
