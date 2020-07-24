import React, {useContext, useState} from 'react';
import {Link, NavLink} from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowAltCircleRight, faArrowAltCircleDown, faUser, faGlobe, faPenSquare, faFileAlt, faBook, faCog, faBuilding} from '@fortawesome/free-solid-svg-icons';

const AsideAdmin = ({open, handleChangeOpen}) => {

    return (
        <aside id="aside" className={!open && "aside-closed" || "aside-open"}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" onClick={handleChangeOpen}>
                    {!open &&
                    <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg"/>
                    ||
                    <FontAwesomeIcon icon={faArrowAltCircleDown} size="lg"/>
                    }
                </a>
                <NavLink className="navbar-brand" to="/dashboard">OpenGaia</NavLink>
            </nav>
            <div id="aside-list">
                <div className="aside-userpanel">

                </div>
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column">
                        <li>
                            <Link to={"/colleges"}>
                                <FontAwesomeIcon icon={faBuilding}/>
                                <p>COLLEGE</p>
                            </Link>
                        </li>
                        <li>
                            <a>
                                <FontAwesomeIcon icon={faBook}/>
                                <p>CONTENU</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <Link to={"/pages"}>
                                <FontAwesomeIcon icon={faFileAlt}/>
                                <p>Pages</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="#">
                                <FontAwesomeIcon icon={faFileAlt}/>
                                <p>Header</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="#">
                                <FontAwesomeIcon icon={faFileAlt}/>
                                <p>Footer</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/articles"}>
                                <FontAwesomeIcon icon={faPenSquare}/>
                                <p>Articles</p>
                            </Link>
                        </li>
                    </ul>
                    <ul className="nav nav-pills nav-sidebar flex-column">
                        <li className="nav-item treeview-on">
                            <a>
                                <FontAwesomeIcon icon={faCog}/>
                                <p>PARAMETRES</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <Link to={"/users"}>
                                <FontAwesomeIcon icon={faUser}/>
                                <p>Utilisateur</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/site/1"}>
                                <FontAwesomeIcon icon={faGlobe}/>
                                <p>Site</p>
                            </Link>
                        </li>
                    </ul>

                </nav>
            </div>

        </aside>
    );
};

export default AsideAdmin;