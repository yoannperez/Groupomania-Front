import React from "react";
import {useEffect} from "react";
import {dateParser} from "../../globalFunctions/globalFunctions";

const Header = ({article}) => {
	const {createdAt, User} = article;
	useEffect(() => {
		// console.log("from post header: ", article);
		if (User) {
			// console.log("from post header: ", User.username);
		}
	}, []);

	return (
		<div>
			<div className='card-header'>
				<em>
					Ici ça merde grave
					{/* Posté le {dateParser(article.createdAt)}, par {article.id} */}
					{/* Posté le {dateParser(article.createdAt)}, par {article.article.User.username} */}
				</em>
			</div>
		</div>
	);
};

export default Header;
