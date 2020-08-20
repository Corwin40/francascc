import '../scss/first.scss';
const $ = require('jquery');
require('bootstrap');

import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import {HashRouter, Switch, Route, withRouter} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import FirstPage from "./pages/first/FirstPage";
import CreateConf from "./pages/first/CreateConf";
import CreateUser from "./pages/first/CreateUser";
import {Navbar} from "react-bootstrap";

// imports pages

const First =()=>{

    return(
        <HashRouter>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">
                        <img
                            alt=""
                            src="/logo.svg"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        OpenGaia - CMS
                    </Navbar.Brand>
                </Navbar>

            <div className="container">
                <Switch>
                    <Route path="/user" component={CreateUser}/>
                    <Route path="/conf" component={CreateConf}/>
                    <Route path="/" component={FirstPage}/>
                </Switch>
            </div>
        </HashRouter>
    )

}

const rootElement = document.querySelector("#First");
ReactDOM.render(<First/>, rootElement);
