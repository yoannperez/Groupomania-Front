import axios from "axios";
import React from "react";

const DeleteComment = ({id}) => {
    // console.log(id);
  const handleDelete = () => {
    axios.delete("http://localhost:3000/api/comments/" + id);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  return (
    <div>
      <button
        onClick={() => {
          if (window.confirm("Voulez-vous supperimer ce commentaire ?")) {
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
