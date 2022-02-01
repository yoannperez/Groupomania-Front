import React from "react";
import banner from "../../assets/icon-left-font-monochrome-white.svg";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";


const AdminNav = (user) => {
  let users = { ...user };

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <>
      <nav className={"navigationContainer adminNavColor"}>
        <div>
          <Link to={"/"}>
            <img src={banner} alt="banner groupomania" className="banner-img" />
          </Link>
        </div>
        <div className="userNav">
          {user && (
            <div className="navbar-nav">
              <li className="nav-item">
                <a href="/" className="nav-link" onClick={() => logOut()}>
                  LogOut
                </a>
              </li>

              <li className="nav-item">
                <a href="/profile" className="nav-link">
                  <img src={users.image} className="profilePicture" alt="avatar" /> Admin{" "}
                </a>
              </li>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default AdminNav;
