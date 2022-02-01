import React, { Component } from "react";
import axios from "axios";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import "./styles/index.scss";
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import banner from "./assets/icon-left-font-monochrome-white.svg";
import AdminNav from "./components/Navbar/AdminNav";
import UserNav from "./components/Navbar/UserNav";
import UserService from "./services/user.service";
import logo from "./assets/icon.svg";

const user = AuthService.getCurrentUser();

class App extends Component {
  state = {
    image: "",
    isAdmin: {},
  };

  componentDidMount() {
    if (user) {
      console.log("truc" + UserService.getUser(user));
      UserService.getUser(user);
      // console.log(userData);

      // axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
      // axios.defaults.baseURL = process.env.REACT_APP_API_ADRESS;
      // axios
      //   .get(process.env.REACT_APP_API_ADRESS + "/api/users/" + user.userId)

      //   .then((response) => {
      //     const image = response.data.user.imageUrl.replace("https://localhost:3000", process.env.REACT_APP_API_ADRESS);
      //     this.setState({ image });
      //     const isAdmin = response.data.user.isAdmin;
      //     this.setState({ isAdmin });
      //     return { image, isAdmin };
      //   })

      //   .catch((response) => Error);
    }
  }
  render() {
    if (user) {
      // If user as a Token
      return (
        <div className="wrapper">
          {this.state.isAdmin ? <AdminNav props={user} image={this.state.image} isAdmin={this.state.isAdmin} /> : <UserNav props={user} image={this.state.image} isAdmin={this.state.isAdmin} />}
          <Routes>
            <Route exact path="/" element={<Feed />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route component={Feed} />
          </Routes>
        </div>
      );
    } else {
      // If user doesn't have a Token
      return (
        <div className="wrapper">
          <nav className="navigationContainer userNavColor">
            <div>
              <Link to={"/"}>
                <img src={banner} alt="banner groupomania" className="banner-img" />
              </Link>
            </div>
          </nav>
          <div>
            {/* <div>coucou</div> */}
            <div className="logContainer">
              <div className="card-container">
                <img src={logo} alt="profile-img" className="" />

                <ul style={{ display: "flex", gap: "10px" }}>
                  <li >
                    <NavLink default className={"link"} to={"/"}>
                      {" "}
                      Se connecter{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/register"}> S'enregistrer </NavLink>
                  </li>
                </ul>

                <Routes>
                  <Route exact path="/" element={<Login />} />
                  <Route exact path="/register" element={<Register />} />
                </Routes>
              </div>
            </div>
          </div>
          <div className="wrapper footerBar">
            <h3> Le réseau qui vous ressemble et qui nous rassemble</h3>
          </div>
        </div>
      );
    }
  }
}

export default App;
