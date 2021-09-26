import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationLog = () => {
    return (
        <div className="navigation-log">
            <NavLink exact to="login" activeClassName="nav-active">Login</NavLink>
            <NavLink exact to="register" activeClassName="nav-active">Register</NavLink>
        </div>
    );
};

export default NavigationLog;