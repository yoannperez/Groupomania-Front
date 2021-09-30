import React, { Component } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import "./styles/index.scss";
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import Feed from "./pages/News";
import Game from "./pages/Game";
import NotFound from "./pages/NotFound";

const user = AuthService.getCurrentUser();

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
    if (user) { // If user as a Token
      return (
        <div className="wrapper">
          <nav className="navigationContainer">
            <Link to={"/feed"} className="brandName">
              Groupomania
            </Link>
            <div className="userNav">
              {user && (
                <div className="navbar-nav">
                  <li className="nav-item">
                    <a href="/" className="nav-link" onClick={this.logOut}>
                      LogOut
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/" className="nav-link">
                      Profil
                    </a>
                  </li>
                </div>
              )}
            </div>
          </nav>
          <switch>
            <Redirect to="/feed" />
            <Route path="/feed" component={Feed} />
          </switch>
        </div>
      );
    } else { // If user doesn't have a Token
      return (
        <div className="wrapper">
          
          <nav className="navigationContainer">
            <Link to={"/feed"} className="brandName">
              Groupomania
            </Link>
          </nav>

          <div>
            <Switch>
              {/* <Route exact path={["/", "/home"]} component={Home} /> */}
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/game" component={Game} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/feed" component={Feed} />
              <Route component={NotFound} />
            </Switch>
          </div>
          <div className="footerBar"> <h3> Le réseau qui nous rassemble</h3></div>
        </div>
      );
    }
  }
}

export default App;
