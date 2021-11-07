import React, { useContext } from "react";
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

export const NavBar = () => {
    const { authenticated } = useContext(AuthContext);

    const unAuthNavBar = () => {
        return(
            <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
            </>
        )
    }

    return(
        <div className="navbar">
            { authenticated ? <div></div> : unAuthNavBar()}
        </div>
    )
}