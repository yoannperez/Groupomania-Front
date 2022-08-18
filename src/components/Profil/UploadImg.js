import axios from "axios";
import React, { useState } from "react";
import authService from "../../services/auth.service";
import {useStateValue} from "../../utils/context/StateProvider";

const UploadImg = ({utilisateur, refreshState, setRefreshState}) => {
  const userToken = authService.getCurrentUser();
  const [file, setFile] = useState();
  const [{user, auth}, dispatch] = useStateValue();

   const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", file);


    axios.defaults.headers.common["Authorization"] = "Bearer " + auth.token;
    axios
      .put(process.env.REACT_APP_API_ADRESS + "/api/users/" + user.id, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("retour serveur image");

        setTimeout(() => {
          setRefreshState(!refreshState)
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form action="" onSubmit={handlePicture} className="upload-pic">
      <label htmlFor="file">Changer l'image</label>
      <input
        className="inputfile"
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      ></input>
      <br />
      <input type="submit" value="Envoyer" />
    </form>
  );
};

export default UploadImg;
