import Login from "../components/login.component";
import Register from "../components/register.component";
import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";


const Home = () => {
  return (
    <div className="home">
        {/* <Navigation/>
        <Logo/> */}
        <h3>Accueil</h3>
        {/* <Login />
        <Register /> */}
    </div>
  );
};

export default Home;
