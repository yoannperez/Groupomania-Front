import React, { Component } from "react";
import axios from "axios";
import { Switch, Route, Link } from "react-router-dom";
import "./styles/index.scss";
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import banner from "./assets/icon-left-font-monochrome-white.svg";

const user = AuthService.getCurrentUser();

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }
  state = {
    image: "",
    isAdmin: {},
  };
  logOut() {
    AuthService.logout();
  }

  componentDidMount() {
    if (user) {
      require("dotenv").config();
      axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
      axios.defaults.baseURL = "http://groupomania.sc1yperez.universe.wf/";
      axios
        .get(process.env.REACT_APP_API_ADRESS + "/api/users/" + user.userId)

        .then((response) => {
          const image = response.data.user.imageUrl.replace("http://localhost:3000", process.env.REACT_APP_API_ADRESS);
          this.setState({ image });
          const isAdmin = response.data.user.isAdmin;
          this.setState({ isAdmin });
        })

        .catch((response) => Error);
    }
  }
  render() {
    const admin = this.state.isAdmin;
    if (user) {
      // If user as a Token
      return (
        <div className="wrapper">
          {/* <nav className="navigationContainer" style={{ backgroundColor: admin ? "red" : "green" }}> */}
          <nav className={admin ? "navigationContainer admin" : "navigationContainer"}>
            <Link to={"/"} className="brandName">
              <img src={banner} style={{ height: "30px" }} alt="groupomania-logo" className="banner-img" />
            </Link>
            <div className="userNav">
              {user && (
                <div className="navbar-nav">
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={this.logOut}>
                      LogOut
                    </a>
                  </li>

                  <li className="nav-item">
                    {admin ? (
                      <a href="/profile" className="nav-link">
                        <img src={this.state.image} className="profilePicture" alt="avatar" /> Admin{" "}
                      </a>
                    ) : (
                      <a href="/profile" className="nav-link">
                        <img src={this.state.image} className="profilePicture" alt="avatar" /> Profil{" "}
                      </a>
                    )}
                  </li>
                </div>
              )}
            </div>
          </nav>

          <Switch>
            <Route exact path="/" component={Feed} />
            <Route exact path="/profile" component={Profile} />
            <Route component={Feed} />
          </Switch>
        </div>
      );
    } else {
      // If user doesn't have a Token
      return (
        <div className="wrapper">
          <nav className="navigationContainer">
            <Link to={"/"} className="brandName">
              <img src={banner} style={{ height: "30px" }} alt="logo" className="banner-img" />
            </Link>
          </nav>

          <div>
            <Switch>
              {/* <Route exact path={["/", "/home"]} component={Home} /> */}
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route component={Login} />
            </Switch>
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
