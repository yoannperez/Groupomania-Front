import axios from "axios";
import React from "react";

const DeletePost = ({id, refresh}) => {
  
	const handleDelete = () => {
		axios.delete(process.env.REACT_APP_API_ADRESS + "/api/posts/" + id);
		setTimeout(() => {
			refresh();
		}, 1000);
	};

	return (
		<div>
			<button
				onClick={() => {
					if (window.confirm("Voulez-vous supperimer ce post ?")) {
						handleDelete();
					}
				}}>
				Supprimer
			</button>
		</div>
	);
};

export default DeletePost;
