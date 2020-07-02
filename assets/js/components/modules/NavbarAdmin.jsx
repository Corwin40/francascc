import React, {useContext, useState} from 'react';
import {NavLink} from "react-router-dom";
// imports Tools
import authAPI from "../../services/admin/authAPI";
import AuthContext from "../../contexts/AuthContext";

// imports Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle} from '@fortawesome/free-solid-svg-icons';
// imports de React Bootstrap
import {Dropdown} from 'react-bootstrap';


const NavbarAdmin = ({history}) => {

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    const [user, setUser] = useState([]);

    const handleLogout = () => {
        authAPI.logout();
        setIsAuthenticated(false);
        history.push("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="navbar-brand" to="/dashboard">OpenGaia v2.1.1 - Nom du site</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/recos">notifications<span className="sr-only">(current)</span></NavLink>
                    </li>
                    {(!isAuthenticated && (
                        <>
                            <li className="nav-item">
                                <NavLink to="/Register" className="nav-link">
                                    Inscription
                                </NavLink>
                            </li>
                            <li className="navitem">
                                <NavLink to="/login" className="btn btn-success mr-1">
                                    Connexion
                                </NavLink>
                            </li>
                        </>
                    )) || (
                        <>
                        <Dropdown>
                            <Dropdown.Toggle variant="default" id="dropdown-basic">
                                Mon Compte <FontAwesomeIcon icon={faUserCircle} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={handleLogout}>Déconnexion</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        </>
                    )}


                </ul>
            </div>
        </nav>
    );
}

export default NavbarAdmin;