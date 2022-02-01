import axios from "axios";
import React, { useState } from "react";
import authService from "../../services/auth.service";

const UploadImg = (userInfo) => {
  const userToken = authService.getCurrentUser();
  const [file, setFile] = useState();

  // const useForceUpdate = () => {
  //   const [value, setValue] = useState(0); // integer state
  //   return () => setValue((value) => value + 1); // update the state to force render
  // };

  // const forceUpdate = useForceUpdate();

  // -----------------   END OF: SEND Datas to API   --------------------

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
      .then((res) => {
        console.log("retour serveur image");

        setTimeout(() => {
          window.location.reload();
          // forceUpdate();
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
