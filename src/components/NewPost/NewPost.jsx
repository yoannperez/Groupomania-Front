import {useState} from "react";
import {useStateValue} from "../../utils/context/StateProvider";
import {createPostsAxios} from "../../services/postService";
import ImagePreview from "../ImagePreview/ImagePreview";

const NewPost = ({refresh}) => {
	const [content, setTextData] = useState("");
	const [error, setError] = useState(false);
	const [editPost, setEditPost] = useState(false);

	const [image, setImage] = useState();
	const [{user, auth}, dispatch] = useStateValue();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (content.length < 2) {
			setError(true);
		} else {
			const post = {
				text: content,
				UserId: user.id,
			};

			const formData = new FormData();
			formData.append("post", JSON.stringify(post));
			formData.append("image", image);

			createPostsAxios(formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}).then(() => {
				setError(false);
				setTextData("");
				setImage(null);
				refresh();
				setEditPost(false);
			});
		}
	};

	return (
		<div className={editPost ? "createPost" : "postClose"}>
			<form className='publicate' onSubmit={(e) => handleSubmit(e)}>
				<label htmlFor='textArea' className='labelHidden'>
					Entrez votre texte
					<textarea
						id='textArea'
						onChange={(e) => setTextData(e.target.value)}
						onClick={() => setEditPost(true)}
						placeholder='Que voulez-vous dire ?'
						value={content}></textarea>
				</label>
				<input type='submit' value='Publier' />
			</form>
			{error && (
				<p style={{color: error ? " red" : "1px solid #61dafb", textAlign: "center"}}>
					Veuillez écrire un texte plus long que 2 caracts
				</p>
			)}
			<form action=''>
				<label htmlFor='file'>Charger une image</label>
				<input
					className='inputfile'
					type='file'
					id='file'
					name='file'
					accept='.jpg, .jpeg, .png'
					onChange={(e) => {
						const file = e.target.files[0];
						if (file) {
							setImage(file);
						} else {
							setImage(null);
						}
					}}></input>
			</form>
			<ImagePreview image={image}/>
			<hr />
			<p
				onClick={(e) => {
					setEditPost(false);
				}}>
				-Fermer l'éditeur-
			</p>
		</div>
	);
};

export default NewPost;
