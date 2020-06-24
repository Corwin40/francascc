/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.scss in this case)
import '../scss/admin.scss';

const $ = require('jquery');
require('bootstrap');

import react, {useState} from "react";
import ReactDOM from 'react-dom';
import React from "react";
import {HashRouter, Switch, Route, withRouter} from "react-router-dom";
import NavbarAdmin from "./components/modules/NavbarAdmin";
import AsideAdmin from "./components/modules/AsideAdmin";
import DashBoardPage from "./pages/admin/Dashboard";
import UsersPage from "./pages/admin/Users/UsersPage"



const Admin = () => {

    const [open, setOpen] = useState(false);

    const handleChangeOpen = () => {
        if (!open){
            setOpen(true);
            console.log(open);
        } else {
            setOpen(false);
            console.log(open)
        }
    }

    return(
        <HashRouter>
            <AsideAdmin open={open} handleChangeOpen={handleChangeOpen}/>
            <main className={!open && "main" || "main-large"}>
                <NavbarAdmin/>
                <div className="container-fluid pt-3">
                    <Switch>
                        <Route path="/Users" component={UsersPage} />
                        <Route path="/" component={DashBoardPage}/>
                    </Switch>
                </div>
            </main>
        </HashRouter>
    )
}

const rootElement = document.querySelector("#Admin");
ReactDOM.render(<Admin/>, rootElement);

console.log('Hello Webpack Encore! Edit me in assets/js/app.js');
