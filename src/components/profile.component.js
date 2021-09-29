import React, { Component } from "react";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: AuthService.getCurrentUser(),
    };
  }
  // if currrentuser ?? else return
  // history.push => login.

  render() {
    const { currentUser } = this.state;

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
            {/* <strong>TOTO la riflette</strong> Profile */}
          </h3>
        </header>
        <ul>
          <li className="nav-item">
            <a href="/login" className="nav-link" onClick={this.logOut}>
              LogOut
            </a>
          </li>
        </ul>
        <p>
          <strong>Token:</strong> {currentUser.token.substring(0, 20)} ... {currentUser.token.substr(currentUser.token.length - 20)}
        </p>
        <p>
          <strong>Id:</strong> {currentUser.userId}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        {/* <p>
          <strong>Image :</strong>{" "}
          {currentUser.imageUrl}
        </p> */}
      </div>
    );
  }
}
