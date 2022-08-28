import {React, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useStateValue} from "../utils/context/StateProvider";
import {updateUsersAxios, getUsersAxios, deleteUsersAxios} from "../services/userService";
import {actionTypes} from "../utils/Reducer/Reducer";

const Profile = ({utilisateur, refreshState, setRefreshState}) => {
	const [{user, auth}, dispatch] = useStateValue();
	const [file, setFile] = useState();
	const navigate = useNavigate();

	console.log(user.id);

	const updateProfile = (e) => {
		e.preventDefault();
		const data = new FormData();
		data.append("image", file);

		try {
			updateUsersAxios(auth, data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}).then((res) => {
				getUserDatas(auth);
				console.log(res);
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteUser = async () => {
		if (window.confirm("Etes-vous sûr de vouloir effacer votre profil ? ")) {
			// console.log(auth)
			try {
				await deleteUsersAxios(auth).then((res) => {
					localStorage.removeItem("auth");
					console.log("axios response: ", res);
					dispatch(
						{
							type: actionTypes.SET_USER,
							user: null,
						},
						{
							type: actionTypes.SET_AUTH,
							auth: null,
						}
					);
					setTimeout(() => {
						navigate("/");
						// window.location.reload();
					}, 800);
				});
			} catch (error) {
				console.log("delete user", error.message);
			}
		}
	};

	async function getUserDatas(user) {
		try {
			await getUsersAxios(user).then(({data}) => {
				dispatch({
					type: actionTypes.SET_USER,
					user: data.user,
				});
			});
		} catch (error) {
			console.log("concon: ", error);
		}
	}

	return (
		<div className='profil-container'>
			<h1>Profile Settings</h1>
			<h2>{user.username}</h2>
			<p>{user.description}</p>
			<div className='update-container'>
				<div className='top-part'>
					<img src={user.imageUrl} alt='user profile avatar'></img>

					<form action='' onSubmit={updateProfile} className='upload-pic'>
						<label htmlFor='file'>Charger l'image</label>
						<input
							className='inputfile'
							type='file'
							id='file'
							name='file'
							accept='.jpg, .jpeg, .png'
							onChange={(e) => {
								setFile(e.target.files[0]);
							}}></input>
						<br />
						<input type='submit' value='Envoyer' />
					</form>

					{!user.isAdmin && (
						<button
							onClick={() => {
								handleDeleteUser();
							}}>
							Supprimer le profil
						</button>
					)}

					<nav>
						<li className='nav-item'>
							<Link to='/'>
								<button className='btn btn-primary btn-block'>x FERMER x</button>
							</Link>
						</li>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default Profile;
