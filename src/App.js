import React, { Component } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./styles/index.scss";
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import Feed from "./pages/News";
import Game from "./pages/Game";
import NotFound from "./pages/NotFound";

const user = AuthService.getCurrentUser();

console.log(user);

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
  }

  logOut() {
    AuthService.logout();
  }



  render() {
    if (user) {
      console.log("coucou");

      return (
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/feed"} className="navbar-brand">
              Groupomania
            </Link>
            {user && (
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a href="/" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            )}
          </nav>
          <switch>
            <Redirect to="/feed" />
            <Route path="/feed" component={Feed} />
            {/* <Route exact path="/" component={Login} /> */}
          </switch>
        </div>
      );

      // <Route exact path="/feed" component={Feed} />
    } else {
      
      return (
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/feed"} className="navbar-brand">
              Groupomania
            </Link>
            {user && (
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a href="/" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            )}

            <div className="navbar-nav ml-auto">
              {user && (
                <li className="nav-item">
                  <Link to={"/game"} className="nav-link">
                    Game
                  </Link>
                </li>
              )}
              {user && (
                <li className="nav-item">
                  <Link to={"/feed"} className="nav-link">
                    Feed
                  </Link>
                </li>
              )}
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              {/* <Route exact path={["/", "/home"]} component={Home} /> */}
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/game" component={Game} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/feed" component={Feed} />
              <Route component={NotFound}/>
            </Switch>
          </div>
        </div>
      );
    }
  }
}

export default App;
