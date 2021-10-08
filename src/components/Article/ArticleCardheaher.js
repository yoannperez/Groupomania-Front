import React from "react";

const ArticleCardheaher = (article) => {

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

  return (
    <div>
      <div className="card-header">
        <em>
          Posté le {dateParser(article.article.createdAt)}, par {article.article.User.username}
        </em>
      </div>
    </div>
  );
};

export default ArticleCardheaher;
