import React from "react";
import {Routes, Route, Navigate, Link, NavLink} from "react-router-dom";

import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";

const Routing = () => {
	return (
		<Routes>
			<Route path='*' element={<Home />} /> :
			<Route path='*' element={<LoginPage />} />
		</Routes>
	);
};

export default Routing;
