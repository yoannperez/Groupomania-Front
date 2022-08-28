// import React and libraries
import React, {useEffect} from "react";
import {useState} from "react";
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
import {getUsersAxios} from "./services/userService";


/**
 * Application entry point
 * @example
 * <APP />
 */
const App = () => {
	const [{user, auth}, dispatch] = useStateValue();
	const [storedInLocal, setStoredInLocal] = useState(() => {
		return JSON.parse(localStorage.getItem("auth")) || "";
	});

	// window.addEventListener("load", (event) => {
	// 	setIsLoading(false);
	// 	console.log("page is fully loaded");
	// });

	// useEffect(() => {
	// 	console.log("fromStorage", storedInLocal);
	// }, []);

	useEffect(() => {
		if (storedInLocal) {
			getUsersAxios(storedInLocal)
				.then(({data}) => {
					console.log(data);
					dispatch({
						type: actionTypes.SET_USER,
						user: data.user,
					});
				})
				.catch((error) => {
					console.log(error);
				});

			dispatch({
				type: actionTypes.SET_AUTH,
				auth: storedInLocal,
			});
			console.log("user: ", user);
			console.log("auth: ", auth);
			setTimeout(()=>console.log("coucou"), 5000)
		} else {
			console.log("authDatas is empty");
		}
		// setIsLoading(false);
		return;
	}, []);

	return (
		<>
			<Routes>
				{storedInLocal ? (
					<Route path='*' element={<Home />} />
				) : (
					<Route path='*' element={<LoginPage />} />
				)}
				<Route path='/profile' element={<Profile />} />
			</Routes>

			{/* <Navigate to='/home' replace={true} /> : <Navigate to='/login' replace={true} />} */}

			{/* {user ? <Home /> : <LoginPage />} */}

			{/* {user ? <Navigate to='/home' replace={true} /> : <Navigate to='/login' replace={true} />} */}
		</>
	);
};

export default App;
