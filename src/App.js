import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./styles/index.scss";
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./pages/Home";
import Profile from "./components/profile.component";
import Feed from "./pages/News";
import Game from "./pages/Game";

const user = AuthService.getCurrentUser();


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    // this.state = {
    //   showModeratorBoard: false,
    //   showAdminBoard: false,
    //   currentUser: undefined,
    // };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Groupomania
          </Link>
          {user && (
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          )}

          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/game"} className="nav-link">
                Game
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/feed"} className="nav-link">
                Feed
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            {/* <Route exact path={["/", "/home"]} component={Home} /> */}
            <Route exact path="/game" component={Game} />
            <Route exact path={"/"} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/feed" component={Feed} />
            
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
