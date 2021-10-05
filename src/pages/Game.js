import axios from "axios";
import { React, useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import { useHistory } from "react-router-dom";

require('dotenv').config()


const Game = () => {
  const user = AuthService.getCurrentUser();
  const history = useHistory();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (user) {
      const getUserData = () => {
        axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
        axios.get(process.env.REACT_APP_API_ADRESS + "/api/users/" + user.userId).then((res) => setUserData(res.data));
      };
      getUserData();
      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


// console.log(userData.user);





  const handleClick = (e) => {
    history.push("/");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    // AuthService.logout()
    localStorage.removeItem("user");
    handleClick();
  };

  // const imgProfile = process.env.REACT_APP_API_ADRESS+ userData.user.imageUrl.split("http://localhost:3000")[1]
console.log( userData.user);

  if (!user) {
    history.push("/");

    return null;
  } else {
    return (
      <div>
        <h3>Rock n'roll</h3>
        <button onClick={(e) => handleLogout(e)}>Logout</button>
        <p>
          <strong>Image:</strong> {userData.imageUrl}
        </p>
        {/* <img src={imgProfile} alt="User Profil" /> */}
      </div>
    );
  }
};

export default Game;
