import {useEffect, useState} from "react";
import Comments from "../Comments";
// import Header from "./Header";
import {dateParser} from '../../globalFunctions/globalFunctions'
import {useStateValue} from "../../utils/context/StateProvider";
import {updatePostsAxios, deletePostsAxios} from "../../services/postService";

const Post = ({article, refresh}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedText, setEditedText] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [{user}, dispatch] = useStateValue();

	useEffect(() => {
		if (article.imageUrl) {
			setImageUrl(
				article.imageUrl.replace("http://localhost:3000", process.env.REACT_APP_API_ADRESS)
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleUpdate = async (e) => {
		e.preventDefault();
		const data = {
			text: editedText ? editedText : article.text,
		};
		try {
			await updatePostsAxios(article.id, data);
			// console.log("datas: ", datas);
		} catch (error) {
			console.log(error);
		}
		setIsEditing(false);
	};

	const handleDelete = () => {
		if (window.confirm("Voulez-vous supperimer ce post ?")) {
			try {
				deletePostsAxios(article.id);
			} catch (error) {
				console.log(error);
			}
			setTimeout(() => {
				refresh();
			}, 500);
		}
	};

	return (
		<div
			className='article'
			style={{background: isEditing ? "#f3feff" : "white", border: "2px solid white"}}>
			{/* <Header article={article} /> */}

			<div className='card-header'>
				<em>
					Ici ça merde grave ! 
					{/* Posté le {dateParser(article.createdAt)}, par {article.id} */}
					{/* Posté le {dateParser(article.createdAt)}, par {article.article.User.username} */}
				</em>
			</div>

			{isEditing ? (
				<label htmlFor='textInput'>
					Entrez votre texte :
					<textarea
						onChange={(e) => setEditedText(e.target.value)}
						id='textInput'
						autoFocus
						defaultValue={editedText ? editedText : article.text}></textarea>
				</label>
			) : (
				<div className='articleflex'>
					<p className='flexParaf'>{editedText ? editedText : article.text}</p>
					{article.imageUrl && <img className='postPhoto' src={imageUrl} alt='' />}
				</div>
			)}

			{article.UserId === user.userId || user.isAdmin ? (
				<div className='btn-container'>
					{isEditing ? (
						<button onClick={(e) => handleUpdate(e)}>Valider</button>
					) : (
						<button onClick={() => setIsEditing(true)}>Edit</button>
					)}
					<button
						onClick={() => {
							handleDelete();
						}}>
						Supprimer
					</button>
				</div>
			) : null}

			<Comments id={article.id} />
		</div>
	);
};

export default Post;
