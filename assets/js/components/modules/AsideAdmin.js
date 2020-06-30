import React, {useContext, useState} from 'react';
import {Link, NavLink} from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowAltCircleRight, faArrowAltCircleDown, faUser, faGlobe,} from '@fortawesome/free-solid-svg-icons';


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
                <NavLink className="navbar-brand" to="/">OpenGaia</NavLink>
            </nav>
            <div id="aside-list">
                <div className="aside-userpanel">

                </div>
                <nav class="mt-2">
                    <ul class="nav nav-pills nav-sidebar flex-column">
                        <li>
                            <a>
                                <p>Configuration</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <Link to={"/users"}><p>Utilisateur</p></Link>
                        </li>
                    </ul>
                </nav>
            </div>

        </aside>
    );
};

export default AsideAdmin;