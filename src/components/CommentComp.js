import React, { useState } from "react";
import axios from "axios";
import authService from "../services/auth.service";
import DeleteComment from "./DeleteComment";
require("dotenv").config();

const CommentComp = (comment) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");
  const user = authService.getCurrentUser();



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

    axios.put(process.env.REACT_APP_API_ADRESS + "/api/comments/" + comment.comment.id, data);
    setIsEditing(false);
  };
  // END OF : ------------    MODIFY POST LOGIC   ----------------

  // ---------------------    CREATE DOM    ----------------------

  if (user.userId === comment.comment.UserId) {
    return (
      <div style={{ display: "flex", width: "100%" }}>
        {/* <p>commentComp</p> */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
          {isEditing ? <textarea onChange={(e) => setEditedText(e.target.value)} autoFocus defaultValue={editedText ? editedText : comment.comment.commentaire}></textarea> : <p>{editedText ? editedText : comment.comment.commentaire}</p>}
          <div style={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "bottom" }}>
            
            <em >Le {dateParser(comment.comment.updatedAt)}, par {comment.comment.User.username} </em>
          </div>
            <div className="btn-container">
              {isEditing ? <button onClick={handleEdit}>Valider</button> : <button onClick={() => setIsEditing(true)}>Edit</button>}
              <DeleteComment id={comment.comment.id} />
            </div>
        </div>
      </div>
    );
  }
  
    return (
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        
          {isEditing ? <textarea onChange={(e) => setEditedText(e.target.value)} autoFocus defaultValue={editedText ? editedText : comment.comment.commentaire}></textarea> : <p>{editedText ? editedText : comment.comment.commentaire}</p>}
          <div style={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "bottom" }}>
            <em>Le {dateParser(comment.comment.updatedAt)}, par {comment.comment.User.username}</em>
            
          </div>
        </div>
      </div>
    );
  
};
// END OF : ------------    CREATE DOM    --------------------
export default CommentComp;
