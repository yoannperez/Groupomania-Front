// import React and libraries
import React, {useEffect} from "react";
import {Routes, Route, Link, NavLink} from "react-router-dom";
// Import stylesheet
import "./styles/index.scss";
// Pages
// import Home from "./pages/Home";
// import LoginPage from "./pages/LoginPage";
// State
import {useStateValue} from "./utils/context/StateProvider";
import {actionTypes} from "./utils/Reducer/Reducer";
import {useState} from "react";


/**
 * Application entry point
 * @returns void
 */
const App = () => {

	const [{user}, dispatch] = useStateValue();
	const [isLoading, setIsLoading] = useState(true);

	console.log("From App :", user);

	useEffect(() => {
		setIsLoading(true);
		const userDatas = localStorage.getItem("user");
		if (userDatas) {
			dispatch({
				type: actionTypes.SET_USER,
				user: userDatas,
			});
		}
		setIsLoading(false);
		// console.log("userDatas", userDatas);
	}, []);

	// useEffect(() => {
	// 	const getData = (response, err) => {
	// 		if (user) {

	// 			// axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
	// 			// axios.defaults.baseURL = process.env.REACT_APP_API_ADRESS;
	// 			axios
	// 				.get(process.env.REACT_APP_API_ADRESS + "/api/users/" + user.userId)
	// 				.then((response) => {
	// 					// saveUser(user);
	// 					setUtilisateur({
	// 						...response.data.user,
	// 						imageUrl: response.data.user.imageUrl.replace(
	// 							"https://localhost:3001",
	// 							process.env.REACT_APP_API_ADRESS
	// 						),
	// 					});
	// 				})
	// 				.catch((err) => Error);
	// 		}
	// 	};
	// 	getData();
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [refreshState]);

	return (
		<>
		<h1>main</h1>
			{/* {isLoading ? (
				<div className='Loader'></div>
			) : (
				<Routes>
					{user ? (
						<Route path='*' element={<Home />} />
					) : (
						<Route path='*' element={<LoginPage />} />
					)}
				</Routes>
			)} */}
		</>
	);
};

export default App;
