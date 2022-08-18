import axios from "axios";
import React from "react";

const DeleteProfile = ({id}) => {
	const handleDeleteUser = () => {
		axios.delete(process.env.REACT_APP_API_ADRESS + "/api/users/" + id);
		localStorage.removeItem("auth");
		setTimeout(() => {
			window.location.reload();
		}, 500);
	};

	return (
		<div>
			<button
				onClick={() => {
					if (window.confirm("Etes-vous sûr de vouloir effacer votre profil ? ")) {
						handleDeleteUser();
					}
				}}>
				Supprimer le profil
			</button>
		</div>
	);
};

export default DeleteProfile;
