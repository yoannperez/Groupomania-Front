import React from "react";

const Article = ({ article }) => {

    const dateParser =(date) =>{

        let newDate = new Date(date).toLocaleDateString('fr-FR',{
            year :"numeric",
            month: "long",
            day: "numeric",
            hour:"numeric",
            minute:"numeric",
            second:"numeric"
        })
        return newDate
    }



  return (
    <div className="article">
      <div className="card-header">
        <h3>{article.User.username}</h3>
        <em>Posté le {dateParser(article.createdAt)}</em>
      </div>
      <p>{article.text}</p>
      <div className="btn-container">
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default Article;
