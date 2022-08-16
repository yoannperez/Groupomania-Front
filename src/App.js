// import React and libraries
import React, {useEffect} from "react";
// Import stylesheet
import "./styles/index.scss";
// Pages
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
// State
import {useStateValue} from "./utils/context/StateProvider";
import {actionTypes} from "./utils/Reducer/Reducer";

const App = () => {
	const [{user}, dispatch] = useStateValue();

	console.log("From App :", user);
	// localStorage.setItem("user", JSON.stringify(data))

	useEffect(() => {
		const userDatas = localStorage.getItem("user");
		if (userDatas) {
			dispatch({
				type: actionTypes.SET_USER,
				user: userDatas,
			});
		}
		console.log("userDatas", userDatas);
	}, []);

	// useEffect(() => {
	// 	const getData = (response, err) => {
	// 		if (user) {
	// 			// fetchUsers(user)
	// 			// fetchPosts()
	// 			// axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
	// 			// axios.defaults.baseURL = process.env.REACT_APP_API_ADRESS;
	// 			axios
	// 				.get(process.env.REACT_APP_API_ADRESS + "/api/users/" + user.userId)
	// 				.then((response) => {
	// 					// saveUser(user);
	//                     // saveUserTest(user);
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

	return <>{user ? <div>Coucouc</div> : <LoginPage />}</>;
};

export default App;
