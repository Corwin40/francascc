
import '../scss/login.scss';
const $ = require('jquery');
require('bootstrap');

import react, {useState} from "react";
import ReactDOM from 'react-dom';
import React from "react";
import {HashRouter, Switch, Route, withRouter} from "react-router-dom";
// imports pages
import LoginPage from "./pages/admin/LoginPage";


const Login =()=>{

    return(
        <HashRouter>
            <Switch>
                <Route path="/" component={LoginPage} />
            </Switch>
        </HashRouter>
    )

}

const rootElement = document.querySelector("#Login");
ReactDOM.render(<Login/>, rootElement);
