import React, { Component} from "react";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import "./styles/index.scss";
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import banner from "./assets/icon-left-font-monochrome-white.svg";
import AdminNav from "./components/Navbar/AdminNav";
import UserNav from "./components/Navbar/UserNav";

const user = AuthService.getCurrentUser();

class App extends Component {

  state = {
    image: "",
    isAdmin: {},
  };

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

    if (user) {
      // If user as a Token
      return (
        <div className="wrapper">
          {this.state.isAdmin ? <AdminNav props={user} image={this.state.image} isAdmin={this.state.isAdmin} /> : <UserNav props={user} image={this.state.image} isAdmin={this.state.isAdmin} />}
          <Routes>
          
            <Route exact path="/" element={<Feed/>} />
            <Route exact path="/profile" element={<Profile/>} />
            <Route component={Feed} />
          </Routes>
        </div>
      );
    } else {
      // If user doesn't have a Token
      return (
        <div className="wrapper">
          <nav className="navigationContainer">
            <Link to={"/"} className="brandName">
              <img src={banner} style={{ height: "30px" }} alt="banner groupomania" className="banner-img" />
            </Link>
          </nav>
          <div>
            <Routes>
              <Route exact path="/" element={<Login/>} />
              <Route exact path="/register" element={<Register/>} />
              <Route component={Login} />
            </Routes>
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
