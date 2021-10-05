import axios from "axios";
import { React, useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import { useHistory } from "react-router-dom";

require('dotenv').config()

const Game = () => {
  const history = useHistory();
  const API_URL = process.env.REACT_APP_API_ADRESS;
  const [userData, setUserData] = useState([]);
  const user = AuthService.getCurrentUser();

  useEffect(() => {
    if (user) {
      const getUserData = () => {
        axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
        axios.get( API_URL + "/api/users/" + user.userId)
        .then((res) => {
          const imageUrl = res.data.user.imageUrl.replace("http://localhost:3000",API_URL);
                         
          setUserData(
          { id : res.data.user.id,
            username: res.data.user.username,
            email: res.data.user.email,
            isAdmin: res.data.user.isAdmin,
            description : res.data.user.description,
            imageUrl : imageUrl,
            createdAt:res.data.user.createdA,
            updatedAt:res.data.user.updatedAt}
          )
          })
      };
      getUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


console.log(userData);



  if (!user) {
    history.push("/");

    return null;
  } else {
    
    return (
      <div>
        <h1>User profile de : {userData.username}</h1>
        
        <p><strong>Image:</strong>{userData.imageUrl}</p>
        <img src={userData.imageUrl} alt="User Profil" />
      </div>
    )
  }
};

export default Game;
