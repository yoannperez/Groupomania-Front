import axios from "axios";
import React from "react";
require('dotenv').config()

const DeleteComment = ({id}) => {
    // console.log(id);
  const handleDelete = () => {
    axios.delete( process.env.REACT_APP_API_ADRESS + "/api/comments/" + id);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  return (
    <div>
      <button
        onClick={() => {
          if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
            handleDelete();
          }
        }}
      >
        Supprimer
      </button>
    </div>
  );
};

export default DeleteComment;
