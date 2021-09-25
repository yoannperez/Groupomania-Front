import axios from "axios";
import { useEffect, useState } from "react";
import Article from "../components/Article";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";

require("dotenv").config();

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [UserId, setUserId] = useState("");
  const [content, setTextData] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    // axios.get(process.env.API_ADRESS:process.env.API_ADRESS)
    axios.get("http://localhost:3000/api/posts/find/").then((res) => setNewsData(res.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/posts/new", {
        text: content,
        // "UserId":UserId ==> == à ce qui suit
        UserId,
      })
      .then(() => {
        setUserId("");
        setTextData("");
        getData()
      });
  };

  return (
    <div className="news-container">
      <Navigation />
      <Logo />
      <h1>News</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <input onChange={(e) => setUserId(e.target.value)} type="text" placeholder="Nom" value={UserId}></input>
        <textarea onChange={(e) => setTextData(e.target.value)} placeholder="Message"value={content}></textarea>
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
};

export default News;
