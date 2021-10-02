import React, { useState } from "react";
import axios from "axios";
import authService from "../services/auth.service";

import DeleteComment from "./DeleteComment";

const CommentComp = (comment) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");
  const user = authService.getCurrentUser();

  //  console.log(user.userId);
  //  console.log(comment.comment.UserId);

  // -----------------    DATE PARSER    -----------------------
  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    return newDate;
  };
  // END OF : ------------    DATE PARSER    --------------------
  // ---------------------    MODIFY POST LOGIC   ----------------
  const handleEdit = () => {
    const data = {
      commentaire: editedText ? editedText : comment.comment.commentaire,
    };

    axios.put("http://localhost:3000/api/comments/" + comment.comment.id, data);
    setIsEditing(false);
  };
  // END OF : ------------    MODIFY POST LOGIC   ----------------

  // console.log(comment.comment.id);
  // ---------------------    CREATE DOM    ----------------------

  if (user.userId === comment.comment.UserId) {
    return (
      <div style={{ display: "flex", width: "100%", border: "1px solid red" }}>
        <p>commentComp</p>
        <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", color: "red" }}>
          {isEditing ? <textarea onChange={(e) => setEditedText(e.target.value)} autoFocus defaultValue={editedText ? editedText : comment.comment.commentaire}></textarea> : <p>{editedText ? editedText : comment.comment.commentaire}</p>}
          <p>{comment.comment.UserId}</p>
          <p>{dateParser(comment.comment.updatedAt)}</p>

          <div className="btn-container">
            {isEditing ? <button onClick={handleEdit}>Valider</button> : <button onClick={() => setIsEditing(true)}>Edit</button>}
            <DeleteComment id={comment.comment.id} />
          </div>
        </div>
      </div>
    );
  } {
    return (
      <div style={{ display: "flex", width: "100%", border: "1px solid red" }}>
        <p>commentComp</p>
        <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", color: "red" }}>
          {isEditing ? <textarea onChange={(e) => setEditedText(e.target.value)} autoFocus defaultValue={editedText ? editedText : comment.comment.commentaire}></textarea> : <p>{editedText ? editedText : comment.comment.commentaire}</p>}
          <p>{comment.comment.UserId}</p>
          <p>{dateParser(comment.comment.updatedAt)}</p>

          
        </div>
      </div>
    ); 
  }
};
// END OF : ------------    CREATE DOM    --------------------
export default CommentComp;
