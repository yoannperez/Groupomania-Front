import React from "react";
import {Routes, Route, Link, NavLink} from "react-router-dom";

import banner from "../assets/icon-left-font-monochrome-white.svg";
import logo from "../assets/icon.svg";

import Login from "../components/Login";
import Register from "../components/Register";

const LoginPage = () => {
	let activeStyle = {
		textDecoration: "underline",
		color:"blue",
		fontWeight:"bold",
		fontSize:"18px",
	};

	return (
		<div className='wrapper'>
			<nav className='navigationContainer userNavColor'>
				<div>
					<Link to={"/"}>
						<img src={banner} alt='banner groupomania' className='banner-img' />
					</Link>
				</div>
			</nav>
			<div>
				<div className='logContainer'>
					<div className='card-container'>
						<img src={logo} alt='profile-img' className='' />
						<ul style={{display: "flex", gap: "10px"}}>
							<li>
								<NavLink to='/' style={({isActive}) => (isActive ? activeStyle : undefined)}>
									Se connecter
								</NavLink>
							</li>
							<li>
								<NavLink
									to='/register'
									style={({isActive}) => (isActive ? activeStyle : undefined)}>
									S'enregistrer
								</NavLink>
							</li>
						</ul>

						<Routes>
							<Route path='/' element={<Login />} />
							<Route path='/register' element={<Register />} />
						</Routes>
					</div>
				</div>
			</div>
			<div className='wrapper footerBar'>
				<h3> Le réseau qui vous ressemble et qui nous rassemble</h3>
			</div>
		</div>
	);
};

export default LoginPage;
