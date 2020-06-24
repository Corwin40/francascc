import React, {useContext, useState} from 'react';
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="/">OpenGaia</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/recos">connexion<span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/users">User<span className="sr-only">(current)</span></NavLink>
                        </li>

                    </ul>
                </div>
            </nav>
    );
}

export default Navbar;