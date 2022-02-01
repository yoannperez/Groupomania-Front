import { React, useEffect, useState } from "react";
import axios from "axios";
import authService from "../services/auth.service";
import DeleteComment from "./DeleteComment";
require("dotenv").config();

const CommentComp = (comment) => {
  const API_URL = process.env.REACT_APP_API_ADRESS;
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [userData, setUserData] = useState([]);
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

  if (user.userId === comment.comment.UserId || userData.isAdmin) {
    // If user is owner or administrator
    return (
      <div style={{ display: "flex", width: "100%" }}>
        <div className="userCommentContainer">
          <div className="commentAndDate">
            {isEditing ? <textarea onChange={(e) => setEditedText(e.target.value)} autoFocus defaultValue={editedText ? editedText : comment.comment.commentaire}></textarea> : <p>{editedText ? editedText : comment.comment.commentaire}</p>}
            <em className="date">
              Le {dateParser(comment.comment.updatedAt)}, par {comment.comment.User.username}
            </em>
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
      // If user is NOT owner or administrator
      <div className="userCommentContainer">
        <div className="commentAndDate">
          {isEditing ? <textarea onChange={(e) => setEditedText(e.target.value)} autoFocus defaultValue={editedText ? editedText : comment.comment.commentaire}></textarea> : <p>{editedText ? editedText : comment.comment.commentaire}</p>}
          <em className="date">
            Le {dateParser(comment.comment.updatedAt)}, par {comment.comment.User.username}
          </em>
        </div>
      </div>
    );
  
};
// END OF : ------------    CREATE DOM    --------------------
export default CommentComp;
