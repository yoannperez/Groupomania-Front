import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Article from "../components/Article";
import authService from "../services/auth.service";



const Feed = () => {
  // -----------     Constants     ------------------
  const [newsData, setNewsData] = useState([]);
  const [content, setTextData] = useState("");
  const [error, setError] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const user = authService.getCurrentUser();
  const history = useNavigate();
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState();

  // --  ---     END OF: Constants     ------------------

  // -----------    HOOKS    ------------------
  useEffect(() => {
    if (user) {
      getData();
    }

    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);
  // ----------- END OF :   HOOKS    ------------------

  // ----------------------------------      FUNCTIONS     --------------------------------------
  // -----------      Get Datas From API Function     ------------------
  const getData = () => {
    axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
    axios.get(process.env.REACT_APP_API_ADRESS + "/api/posts/").then((res) => setNewsData(res.data));
  };
  // -----------   END OF:    Get Datas From API Function   -------------

  // -----------------      SEND Datas to API     ------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.length < 2) {
      setError(true);
    } else {
      const post = {
        text: content,
        UserId: user.userId,
      };

      const formData = new FormData();
      formData.append("post", JSON.stringify(post));
      formData.append("image", image);

      axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
      axios
        .post(process.env.REACT_APP_API_ADRESS + "/api/posts/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          setError(false);
          setTextData("");
          getData();
          setEditPost(false);
        });
    }
  };
  // ---------------   END OF: SEND Datas to API   --------------------
  // ----------------- END OF :      FUNCTIONS     ------------------

 // ---------------------    CREATE DOM    ----------------------
  if (!user) {
    history.push("/");

    return null;
  } else {
    return (
      <div className="feedContainer">
        <div className={editPost ? "createPost" : "postClose"}>
          <form className="publicate" onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="textArea" className="labelHidden">
              Entrez votre texte
              <textarea id="textArea" onChange={(e) => setTextData(e.target.value)} onClick={() => setEditPost(true)} placeholder="Que voulez-vous dire ?" value={content}></textarea>
            </label>
            <input type="submit" value="Publier" />
          </form>
          {error && <p style={{ color: error ? " red" : "1px solid #61dafb", textAlign: "center" }}> Veuillez écrire un texte plus long que 2 caracts</p>}
                <form action="">
            <label htmlFor="file">Changer l'image</label>
            <input
              className="inputfile"
              type="file"
              id="file"
              name="file"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImage(file);
                } else {
                  setImage(null);
                }
              }}
            ></input>
          </form>
          <img src={preview} alt="" />
          <hr />
          <p
            onClick={(e) => {
              setEditPost(false);
            }}
          >
            -Fermer l'éditeur-
          </p>
        </div>
       
        <h1>Derniers articles</h1>
        <div>
          {newsData
            .sort((a, b) => b.id - a.id)
            .map((post) => (
              <Article key={post.id} article={post} />
            ))}
        </div>
      </div>
    );
  }
  // -----------    END OF: OBJECT RETURNED TO VIRTUAL DOM    ----------
};

export default Feed;
