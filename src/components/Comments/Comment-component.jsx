import React, {useState} from "react";
import {dateParser} from "../../globalFunctions/globalFunctions";
import {useStateValue} from "../../utils/context/StateProvider";
import {updateCommentAxios, deleteCommentAxios} from "../../services/commentService";

const CommentComponent = ({comment, refreshComment}) => {
	const {id, commentaire, createdAt, updatedAt, UserId, User} = comment;
	const [isEditing, setIsEditing] = useState(false);
	const [editedText, setEditedText] = useState("");
	const [{user}, dispatch] = useStateValue();

	const handleEdit = () => {
		const data = {
			commentaire: editedText ? editedText : commentaire,
		};
		try {
			updateCommentAxios(id, data);
			setIsEditing(false);
		} catch (error) {
			console.log(error);
		}
		setIsEditing(false);
	};

	const handleDelete = () => {
		if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
			try {
				deleteCommentAxios(id);
				setIsEditing(false);
			} catch (error) {
				console.log(error);
			}
			setTimeout(() => {
				// window.location.reload();
				refreshComment();
			}, 500);
		}
	};

	return (
		<div className='comment__Container'>
			{isEditing ? (
				<textarea
					className='comment__msg'
					onChange={(e) => setEditedText(e.target.value)}
					autoFocus
					defaultValue={editedText ? editedText : commentaire}></textarea>
			) : (
				<p>{editedText ? editedText : commentaire}</p>
			)}

			<div className='comment__msg-tools'>
				<div className='comment__date-username'>
					<em>
						Le {dateParser(updatedAt)}, par {User.username}
					</em>
				</div>

				{user.id === UserId ? (
					<div className='btn-container'>
						{isEditing ? (
							<button onClick={handleEdit}>Valider</button>
						) : (
							<button onClick={() => setIsEditing(true)}>Edit</button>
						)}
						<button onClick={handleDelete}>Supprimer</button>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default CommentComponent;
