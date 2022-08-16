import React from "react";
import {Routes, Route, Link, NavLink} from "react-router-dom";

import Profile from "./Profile";
import AdminNav from "../components/Navbar/AdminNav";
import UserNav from "../components/Navbar/UserNav";
import Feed from "./Feed";

import {useStateValue} from "../utils/context/StateProvider";

const Home = () => {


    const [{user}, dispatch] = useStateValue();

	return (
		<div className='wrapper'>
			<h1>Home</h1>
			{/* {user.isAdmin ? (
				<AdminNav props={user} image={user.imageUrl} isAdmin={user.isAdmin} />
			) : (
				<UserNav props={user} image={user.imageUrl} isAdmin={user.isAdmin} />
			)}
			<Routes>
				<Route exact path='/' element={<Feed />} />
				<Route
					exact
					path='/profile'
					element={
						<Profile/>
					}
				/>
			</Routes> */}
		</div>
	);
};

export default Home;
