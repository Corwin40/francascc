import React, {useContext, useState} from 'react';
import {Link, NavLink} from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowAltCircleRight, faArrowAltCircleDown, faUser} from '@fortawesome/free-solid-svg-icons';


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
            </nav>
            <div id="aside-list">
                <ul>
                    <li>
                        <a className="title">Administration</a>
                        <Link to="/Users">Utilisateur</Link>
                    </li>
                </ul>
            </div>

        </aside>
    );
};

export default AsideAdmin;