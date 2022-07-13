import React from "react";
import {dateParser} from '../../globalFunctions/globalFunctions' 

const ArticleCardheaher = (article) => {


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
