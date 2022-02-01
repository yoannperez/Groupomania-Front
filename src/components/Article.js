import { React, useEffect, useState } from "react";
import axios from "axios";
import DeletePost from "./DeletePost";
import authService from "../services/auth.service";
import Comments from "./Comments";
import ArticleCardheaher from "./Article/ArticleCardheaher";
const API_URL = process.env.REACT_APP_API_ADRESS;

const Article = ({ article }) => {
  const user = authService.getCurrentUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [userData, setUserData] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  // -----------      Get User's Datas From API Function     ------------------
  useEffect(() => {
    if (article.imageUrl) {
      setImageUrl(article.imageUrl.replace("http://localhost:3000", API_URL));
    }

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
      text: editedText ? editedText : article.text,
    };
    axios.put(process.env.REACT_APP_API_ADRESS + "/api/posts/" + article.id, data);
    setIsEditing(false);
  };
  // END OF : ------------    MODIFY POST LOGIC   ----------------

  // ---------------------    CREATE DOM    ----------------------
  if (article.UserId === user.userId || userData.isAdmin) {
    return (
      <div className="article" style={{ background: isEditing ? "#f3feff" : "white", border: "2px solid white" }}>
        <ArticleCardheaher article={article} />

        {isEditing ? (
          <label htmlFor="textInput">
            Entrez votre texte :<textarea onChange={(e) => setEditedText(e.target.value)} id="textInput" autoFocus defaultValue={editedText ? editedText : article.text}></textarea>
          </label>
        ) : (
          <div className="articleflex">
            <p className="flexParaf">{editedText ? editedText : article.text}</p>
            {article.imageUrl && <img className="postPhoto" src={imageUrl.replace("http://localhost:3000", API_URL)} alt="" />}
          </div>
        )}

        <div className="btn-container">
          {isEditing ? <button onClick={handleEdit}>Valider</button> : <button onClick={() => setIsEditing(true)}>Edit</button>}

          <DeletePost id={article.id} />
        </div>
        <Comments comment={article.id} />
      </div>
    );
  }
  
    return (
      <div className="article" style={{ background: isEditing ? "#f3feff" : "white", border: "2px solid white" }}>
        <ArticleCardheaher article={article} />
        <div className="articleflex">
          <p className="flexParaf">{article.text}</p>
          {article.imageUrl && <img className="postPhoto" src={imageUrl.replace("http://localhost:3000", API_URL)} alt="" />}
        </div>
        <Comments comment={article.id} />
      </div>
    );
  
};
// END OF : ------------    CREATE DOM    --------------------

export default Article;
