import React from "react";
import banner from "../../assets/icon-left-font-monochrome-white.svg";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
require("dotenv").config();

const UserNav = (user) => {
  let users = { ...user };

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <>
      <nav className={"navigationContainer"}>
        <Link to={"/"} className="brandName">
          <img src={banner} style={{ height: "30px" }} alt="banner groupomania" className="banner-img" />
        </Link>
        <div className="userNav">
          <div className="navbar-nav">
            <li className="nav-item">
              <a href="/" className="nav-link" onClick={() => logOut()}>
                LogOut
              </a>
            </li>

            <li className="nav-item">
              <a href="/profile" className="nav-link">
                <img src={users.image} className="profilePicture" alt="avatar" /> Profil{" "}
              </a>
            </li>
          </div>
        </div>
      </nav>
    </>
  );
};

export default UserNav;
