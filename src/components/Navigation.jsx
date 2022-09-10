import React from "react";
import banner from "../assets/icon-left-font-monochrome-white.svg";
import {Link} from "react-router-dom";
import {logout} from "../services/authService";

const Navigation = ({user}) => {
	const logOut = () => {
		logout();
	};

	return (
		<>
			<nav className={"navigationContainer " + (user.isAdmin ? "adminNavColor" : "userNavColor")}>
				<div>
					<Link to={"/"}>
						<img src={banner} alt='banner groupomania' className='banner-img' />
					</Link>
				</div>
				<div className='userNav'>
					{user && (
						<div className='navbar-nav'>
							<li className='nav-item'>
								<a href='/' className='nav-link' onClick={() => logOut()}>
									LogOut
								</a>
							</li>

							<li className='nav-item'>
								<Link to={"/profile"}>
									<img src={user.imageUrl} className='profilePicture' alt='avatar' />{" "}
									{user.username}
								</Link>
							</li>
						</div>
					)}
				</div>
			</nav>
		</>
	);
};

export default Navigation;
