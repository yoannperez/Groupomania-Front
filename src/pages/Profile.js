import axios from "axios";
import { React, useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import { useHistory } from "react-router-dom";
import UploadImg from "../components/Profil/UploadImg";
import DeleteProfile from "../components/Profil/DeleteProfile";

require("dotenv").config();

const Profile = () => {
  const history = useHistory();
  const API_URL = process.env.REACT_APP_API_ADRESS;
  const [userData, setUserData] = useState([]);
  const user = AuthService.getCurrentUser();

  // -----------      Get User's Datas From API Function     ------------------
  useEffect(() => {
    if (user) {
      const getUserData = () => {
        axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
        axios.get(API_URL + "/api/users/" + user.userId).then((res) => {
          const imageUrl = res.data.user.imageUrl.replace("http://localhost:3000", API_URL);

          setUserData({ id: res.data.user.id, username: res.data.user.username, email: res.data.user.email, isAdmin: res.data.user.isAdmin, description: res.data.user.description, imageUrl: imageUrl, createdAt: res.data.user.createdA, updatedAt: res.data.user.updatedAt });
        });
      };
      getUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // -----------   END OF:    Get User's Datas From API Function   -------------

  // ---------------    OBJECT RETURNED TO VIRTUAL DOM    ------------------
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
            <img src={userData.imageUrl} alt="Avatar"></img>
            <UploadImg user={userData} />
          </div>
        </div>
            {!userData.isAdmin && 
            <DeleteProfile id={userData.id} />
            }
      </div>
    );
  }
  // -----------    END OF: OBJECT SEND TO VIRTUAL DOM    ----------
};

export default Profile;
