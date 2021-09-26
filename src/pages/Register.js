import React from "react";
import NavigationLog from "../components/NavigationLog";

const Login = () => {
  return (
    <div className="login">
      <img src="./img/icon-left-font.svg" alt="logo" />
      <div className="login--container">
        <NavigationLog />
        <div className="formulaire">
          <form>
            <input type="text" placeholder="Name"></input>
            <input type="text" placeholder="E-mail"></input>
            <input type="text" placeholder="Mot de passe"></input>
            <input type="submit" value="Envoyer" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
