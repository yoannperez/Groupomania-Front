import axios from "axios";
import { React, useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import { useHistory } from "react-router-dom";
import UploadImg from "../components/Profil/UploadImg";

require("dotenv").config();

const Profile = () => {
  const history = useHistory();
  const API_URL = process.env.REACT_APP_API_ADRESS;
  const [userData, setUserData] = useState([]);
  const user = AuthService.getCurrentUser();

  useEffect(() => {
    if (user) {
      const getUserData = () => {
        axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
        // axios.defaults.baseURL = 'http://groupomania.sc1yperez.universe.wf/';
        
        axios.get(API_URL + "/api/users/" + user.userId).then((res) => {
          const imageUrl = res.data.user.imageUrl.replace("http://localhost:3000", API_URL);

          setUserData({ id: res.data.user.id, username: res.data.user.username, email: res.data.user.email, isAdmin: res.data.user.isAdmin, description: res.data.user.description, imageUrl: imageUrl, createdAt: res.data.user.createdA, updatedAt: res.data.user.updatedAt });
        });
      };
      getUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(userData);

  if (!user) {
    history.push("/");

    return null;
  } else {
    return (
      <div className="profil-container">
        <h1>Profile</h1>
        <h2>{userData.username}</h2>
        <p>{userData.description}</p>
        <div className="update-container">
          <div className="top-part">
            
            <img src={userData.imageUrl} alt="user-picture"></img>
            <UploadImg user={userData}/>
          </div>
        </div>
        {/* <p>
          <strong>Image:</strong>
          {userData.imageUrl}
        </p>
        <img src={userData.imageUrl} alt="User Profil" /> */}
      </div>
    );
  }
};

export default Profile;
