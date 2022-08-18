// Import react and libraries
import {useEffect, useState} from "react";
import {useStateValue} from "../../utils/context/StateProvider";
import {createCommentAxios, getCommentAxios} from "../../services/commentService";

import CommentComponent from "./Comment-component";

const Comments = ({id}) => {
	const [{user, auth}, dispatch] = useStateValue();
	const [commentData, setcommentData] = useState([]);
	const [content, setTextData] = useState("");
	const [error, setError] = useState(false);
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refresh]);

	const refreshComment = () => {
		setRefresh(!refresh);
	};

	const getData = () => {
		getCommentAxios(id).then((res) => {
			setcommentData(res.data);
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (content.length < 2) {
			setError(true);
		} else {
			createCommentAxios({
				commentaire: content,
				UserId: user.id,
				PostId: id,
			}).then(() => {
				setError(false);
				setTextData("");
				refreshComment();
			});
		}
	};

	return (
		<div style={{border: "2px solid white"}}>
			<div>
				<header>Commentaires</header>
				{commentData
					// .sort((a, b) => b.id - a.id)
					.map((comment) => (
						<CommentComponent key={comment.id} comment={comment} refreshComment={refreshComment} />
					))}
			</div>
			<form onSubmit={(e) => handleSubmit(e)}>
				<textarea
					style={{border: error ? "1px solid red" : "1px solid #61dafb"}}
					onChange={(e) => setTextData(e.target.value)}
					placeholder='Ecrivez un commentaire ...'
					value={content}></textarea>

				{error && <p> Veuillez écrire un texte plus long que 2 caracts</p>}
				<input type='submit' value='Envoyer' />
			</form>
		</div>
	);
};

export default Comments;
