import {Routes, Route, Link, NavLink} from "react-router-dom";

// import Profile from "./Profile";
import Navigation from "../components/Navigation";
import Feed from "./Feed";

import {useStateValue} from "../utils/context/StateProvider";

const Home = () => {
	const [{user, auth}, dispatch] = useStateValue();

	// console.log("Home user", user);
	// console.log("Home auth", auth);
	return (
		<div className='wrapper'>
			<Navigation user={user} />
			<Feed />
		</div>
	);
};

export default Home;
