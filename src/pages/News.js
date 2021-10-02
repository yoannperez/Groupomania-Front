import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Article from "../components/Article";
import authService from "../services/auth.service";

require("dotenv").config();

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [UserId, setUserId] = useState("");
  const [content, setTextData] = useState("");
  const [error, setError] = useState(false);
  const user = authService.getCurrentUser();
  const history = useHistory();



  useEffect(() => {
    if(user){
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // -----------      Get Datas From API Function     ------------------
  const getData = () => {
    // axios.get(process.env.API_ADRESS:process.env.API_ADRESS)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' +user.token;
    axios.get("http://localhost:3000/api/posts/find/").then((res) => setNewsData(res.data));
  };
  // -----------   END OF:    Get Datas From API Function   -------------


  // -----------------      SEND Datas to API     ------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.length < 2) {
      setError(true);
    } else {
      axios
        .post("http://localhost:3000/api/posts/new", {
          text: content,
          UserId: user.userId,
        })
        .then(() => {
          setError(false);
          setUserId("");
          setTextData("");
          getData();
        });
    }
  };
  // -----------------   END OF: SEND Datas to API   --------------------

  // ---------------    OBJECT RETURNED TO VIRTUAL DOM    ------------------

  if (!user) {
    history.push("/");

    return null;
  } else {
    
    return (
      <div className="news-container">
        <h1>Feed Les actualités</h1>
  
        <form onSubmit={(e) => handleSubmit(e)}>
          {/* // -- style={{border: error ? "1px solid red" :"1px solid #61dafb"}}  ==> Teste l'erreur*/}
          <textarea style={{ border: error ? "1px solid red" : "1px solid #61dafb" }} onChange={(e) => setTextData(e.target.value)} placeholder="Créer un post{Truc}" value={content}></textarea>
          {/* // Message donné si la condition n'est pas  bonne */}
          {error && <p> Veuillez écrire un texte plus long que 2 caracts</p>}
          <input type="submit" value="Envoyer" />
        </form>


        <ul>
          {newsData
            .sort((a, b) => b.id - a.id)
            .map((post) => (
              <Article key={post.id} article={post} />
            ))}
        </ul>


      </div>
    );
  }




  // -----------    END OF: OBJECT SEND TO VIRTUAL DOM    ----------
};

export default News;
