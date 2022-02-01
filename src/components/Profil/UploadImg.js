import axios from "axios";
import React, { useState } from "react";
import authService from "../../services/auth.service";



const UploadImg = (userInfo) => {
  const userToken = authService.getCurrentUser();
  const [file, setFile] = useState();
 
  // {
  //   username: "totoc6",
  //   description: " Un truc",
  // }
  // -----------------      SEND Image to API     ------------------------
  // const sendProfile = (datas) => {
  //   axios.defaults.headers.common["Authorization"] = "Bearer " + userToken.token;
  //   axios
  //     .put(
  //       process.env.REACT_APP_API_ADRESS + "/api/users/" + userInfo.user.id,
  //       datas

  //       //   {
  //       //     headers: {
  //       //         'Content-Type': 'multipart/form-data'
  //       //       }
  //       //   }
  //     )
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
      
     
  // };

  // -----------------   END OF: SEND Datas to API   --------------------

  // console.log(user.user);
  const handlePicture = (e) => {
    e.preventDefault();

    const data = new FormData();
    
    
    data.append("image", file);
    axios.defaults.headers.common["Authorization"] = "Bearer " + userToken.token;
    axios
      .put(process.env.REACT_APP_API_ADRESS + "/api/users/" + userInfo.user.id, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => "OK!")
      .catch((err) => console.log(err));
      setTimeout(() => {
        window.location.reload();
      }, 2000);
  };

  //
  // sendProfile({
  //   username: "Mon nouveau nom 2",
  //   description: " J'ai une super description !",
  // });

  return (
    
      <form action="" onSubmit={handlePicture} className="upload-pic">
        <label htmlFor="file">Changer l'image</label>
        <input className="inputfile"
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
