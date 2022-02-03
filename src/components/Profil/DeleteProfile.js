
import axios from "axios";
import React from "react";


const DeleteProfile = ({id}) => {


    const handleDelete = () => {
       
        axios.delete( process.env.REACT_APP_API_ADRESS + "/api/users/" + id);
        localStorage.removeItem("user");
        setTimeout(() => {

          window.location.reload();
        }, 500);
      };
    return (
        <div>
            <button
        onClick={() => {
          if (window.confirm("Etes-vous sûr de vouloir effacer votre profil ? ")) {
            handleDelete();
          }
        }}
      >
       Supprimer le profil
      </button>
        </div>
    );
};

export default DeleteProfile;