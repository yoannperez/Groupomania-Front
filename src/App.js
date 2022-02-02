import React, { useEffect, useState } from "react";
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
// import UserService from "./services/user.service";
import logo from "./assets/icon.svg";
import SendToState from "./components/SendToState";

const App = () => {

  const [utilisateur, setUtilisateur] = useState({})
  const [loaded, setLoading] = useState(false);
  
  const user = AuthService.getCurrentUser();

  useEffect(() => {
    const getData = (response, err) => {
      if (user) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
        axios.defaults.baseURL = process.env.REACT_APP_API_ADRESS;
        axios
          .get(process.env.REACT_APP_API_ADRESS + "/api/users/" + user.userId)
          .then((response) => {

            setUtilisateur({
              ...response.data.user, 
              imageUrl:(response.data.user.imageUrl.replace("https://localhost:3001", process.env.REACT_APP_API_ADRESS))
            })
            setLoading(true);
          })
          .catch((response) => Error);
      }
      
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  if (user && loaded) {
    // If user as a Token
    return (
      <div className="wrapper">
        {utilisateur.isAdmin ? <AdminNav props={user} image={utilisateur.imageUrl} isAdmin={utilisateur.isAdmin} /> : <UserNav props={user} image={utilisateur.imageUrl} isAdmin={utilisateur.isAdmin} />}
        {/* <SendToState cart={cart} updateCart={updateCart} /> */}
        <Routes>
          <Route exact path="/" element={<Feed />} />
          <Route exact path="/profile" element={<Profile />} />
          {/* <Route exact path="/profile" element={<Profile email={email} setEmail={setEmail}/>} /> */}
          {/* <Route component={Feed} /> */}
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
                <li>
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
};

export default App;
