import React, { useState } from "react";
import axios from "axios";
import DeletePost from "./DeletePost";
import authService from "../services/auth.service";
import Comments from "./Comments";
require('dotenv').config()

const Article = ({ article }) => {
  const user = authService.getCurrentUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");
  

  // console.log(article.UserId);
  // console.log(user);

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
      text: editedText ? editedText : article.text,
    };
    axios.put(process.env.REACT_APP_API_ADRESS + "/api/posts/" + article.id, data);
    setIsEditing(false);
  };
  // END OF : ------------    MODIFY POST LOGIC   ----------------

  // ---------------------    CREATE DOM    ----------------------
if(article.UserId === user.userId){
    return (
      <div className="article" style={{ background: isEditing ? "#f3feff" : "white", border: "2px solid white" }}>
        
        <div className="card-header">
          <em>Posté le {dateParser(article.createdAt)}, par {article.User.username}</em>
          
        </div>

        {isEditing ?
        <label for="textInput">Entrez votre texte :
         <textarea onChange={(e) => setEditedText(e.target.value)} id="textInput" autoFocus defaultValue={editedText ? editedText : article.text}></textarea></label>
          : <p>{editedText ? editedText : article.text}</p>}

        <div className="btn-container">
          {isEditing ? <button onClick={handleEdit}>Valider</button> : <button onClick={() => setIsEditing(true)}>Edit</button>}

          <DeletePost id={article.id} />
        </div>
        <Comments comment={article.id} />
      </div>
    );

  }{
    return (
      <div className="article" style={{ background: isEditing ? "#f3feff" : "white", border: "2px solid white" }}>
        
        <div className="card-header">
        <em>Posté le {dateParser(article.createdAt)}, par {article.User.username}</em>
        </div>

        <p>{article.text}</p>
        <Comments comment={article.id} />
      </div>
    );




  }




};
// END OF : ------------    CREATE DOM    --------------------

export default Article;
