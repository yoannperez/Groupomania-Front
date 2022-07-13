// Import react and libraries
import React, { useEffect, useState } from "react";
import axios from "axios";

// Import authService
import authService from "../services/auth.service";

// Import components
import CommentComp from "./CommentComp";

const Comments = (article) => {
  // Call user's informations from localStorage
  const user = authService.getCurrentUser();

  // State
  const [commentData, setNewsData] = useState([]); // Store for comment's data
  const [content, setTextData] = useState("");
  const [error, setError] = useState(false);

  // Call datas from API when component is mounted
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // -----------      Get Datas From API Function     ------------------
  const getData = () => {
    // axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
    axios.get(process.env.REACT_APP_API_ADRESS + "/api/comments/" + article.comment).then((res) => {
      setNewsData(res.data);
    });
  };

  // -----------------      SEND Datas to API     ------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.length < 2) {
      setError(true);
    } else {
      axios
        .post(process.env.REACT_APP_API_ADRESS + "/api/comments/", {
          commentaire: content,
          UserId: user.userId,
          PostId: article.comment,
        })
        .then(() => {
          setError(false);
          setTextData("");
          getData();
        });
    }
  };

  // ---------------    OBJECT RETURNED TO VIRTUAL DOM    ------------------
  return (
    <div style={{ border: "2px solid white" }}>
      <div>
        <header>Commentaires</header>
        {commentData
          // .sort((a, b) => b.id - a.id)
          .map((comment) => (
            <CommentComp key={comment.id} comment={comment} />
          ))}
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea style={{ border: error ? "1px solid red" : "1px solid #61dafb" }} onChange={(e) => setTextData(e.target.value)} placeholder="Ecrivez un commentaire ..." value={content}></textarea>
        {/* // Message donné si la condition n'est pas  bonne */}
        {error && <p> Veuillez écrire un texte plus long que 2 caracts</p>}
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
  // ---------------    OBJECT RETURNED TO VIRTUAL DOM    ------------------
};

export default Comments;
