// import React and libraries
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, Link, NavLink } from "react-router-dom";
// Import stylesheet
import "./styles/index.scss";
// Import auth services
import AuthService from "./services/auth.service";
// Import Components & Pages
import Login from "./components/login.component";
import Register from "./components/register.component";
import AdminNav from "./components/Navbar/AdminNav";
import UserNav from "./components/Navbar/UserNav";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
// Import Assets
import banner from "./assets/icon-left-font-monochrome-white.svg";
import logo from "./assets/icon.svg";


const App = () => {
    // Which user ?
    const user = AuthService.getCurrentUser();
    // States
    const [utilisateur, setUtilisateur] = useState({});
    const [refreshState, setRefreshState] = useState(false);


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
                            imageUrl: response.data.user.imageUrl.replace("https://localhost:3001", process.env.REACT_APP_API_ADRESS),
                        });
                       
                    })
                    .catch((err) => Error);
            }
        };
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshState]);

    
        if (user) {
            // If user as a Token
            return (
                <div className="wrapper">
                    {utilisateur.isAdmin ? <AdminNav props={user} image={utilisateur.imageUrl} isAdmin={utilisateur.isAdmin} /> : <UserNav props={user} image={utilisateur.imageUrl} isAdmin={utilisateur.isAdmin} />}
                    <Routes>
                        <Route exact path="/" element={<Feed />} />
                        <Route exact path="/profile" element={<Profile utilisateur={utilisateur} setUtilisateur={setUtilisateur} refreshState={refreshState} setRefreshState={setRefreshState} />} />
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
    }


export default App;
