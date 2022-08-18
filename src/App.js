// import React and libraries
import React, {useEffect} from "react";
import {Routes, Route, Navigate, Link, NavLink} from "react-router-dom";
// Import stylesheet
import "./styles/index.scss";
// Pages
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";
// State
import {useStateValue} from "./utils/context/StateProvider";
import {actionTypes} from "./utils/Reducer/Reducer";
import {useState} from "react";
import {getUsersAxios} from "./services/userService";

/**
 * Application entry point
 * @returns void
 */
const App = () => {
	const [{user, auth}, dispatch] = useStateValue();
	const [isLoading, setIsLoading] = useState(false);

	window.addEventListener("load", (event) => {
		console.log("page is fully loaded");
	});

	useEffect(() => {
		// setIsLoading(true);
		// console.log("auth: ", auth);
		const authDatas = JSON.parse(localStorage.getItem("auth"));
		// console.log("authDatas: ", authDatas);

		if (authDatas) {
			getUserDatas(authDatas);
			storeAuthDatasToStore(authDatas);
			// console.log("auth: ", auth);
		} else {
			// console.log("authDatas is empty");
		}
		return;
		// console.log("useEffect Finished");
		// setIsLoading(false);
	}, []);

	async function getUserDatas(user) {
		try {
			// console.log("Start fetching api");
			await getUsersAxios(user).then(({data}) => {
				// console.log("Start dispatching user");
				dispatch({
					type: actionTypes.SET_USER,
					user: data.user,
					// user: {
					// 	...data.user,
					// 	imageUrl: data.user.imageUrl.replace(
					// 		"https://localhost:3001",
					// 		process.env.REACT_APP_API_ADRESS
					// 	),
					// },
				});
			});
			// console.log("Fetch axios user's informations ended");
			// console.log("datas: ", datas);
		} catch (error) {
			console.log(error);
		}
	}

	async function storeAuthDatasToStore(data) {
		dispatch({
			type: actionTypes.SET_AUTH,
			auth: data,
		});
	}
	// console.log("APPuser: ", user);
	// console.log("auth: ", auth);
	return (
		<>
			{/* {isLoading ? (
				<div className='Loader'></div>
			) : (
				
				
				)} */}
			{/* <Navigate to='/home' replace={true} /> : <Navigate to='/login' replace={true} />} */}

			<Routes>
				{user ? <Route path='*' element={<Home />} /> : <Route path='*' element={<LoginPage />} />}
				<Route exact path='/profile' element={<Profile />} />
			</Routes>
			{/* {user ? <Navigate to='/home' replace={true} /> : <Navigate to='/login' replace={true} />} */}
		</>
	);
};

export default App;
