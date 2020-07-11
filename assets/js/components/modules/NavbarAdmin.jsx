import React, {useContext, useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
// imports Tools
import authAPI from "../../services/admin/authAPI";
import ConfigAPI from "../../services/admin/ConfigAPI";
import AuthContext from "../../contexts/AuthContext";

// imports Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle} from '@fortawesome/free-solid-svg-icons';
// imports de React Bootstrap
import {Dropdown} from 'react-bootstrap';
import PagesAPI from "../../services/webapp/PagesAPI";


const NavbarAdmin = ({history}) => {

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    const [user, setUser] = useState(authAPI.valueUser);
    const [config, setConfig] = useState([])

    // récupération des données de création du site
    const fetchConfig = async () => {
        try {
            const data = await ConfigAPI.findOne(1);
            setConfig(data);
        } catch (error) {
            console.log(error.response)
        }
    };

    // Chargers les données au chargement du composant
    useEffect(() => {
        fetchConfig();
    }, []);

    const handleLogout = () => {
        authAPI.logout();
        setIsAuthenticated(false);
        history.push("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="navbar-brand" to="/dashboard">{config.name}</NavLink>
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
                                {user.firstName} {user.lastName} <FontAwesomeIcon icon={faUserCircle} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>voir mon profil</Dropdown.Item>
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