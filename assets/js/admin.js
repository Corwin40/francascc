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
//import Tools
import NavbarAdmin from "./components/modules/NavbarAdmin";
import AsideAdmin from "./components/modules/AsideAdmin";
//import all pages
import DashBoardPage from "./pages/admin/Dashboard";
import SitePage from "./pages/admin/site/SitePage"
import UsersPage from "./pages/admin/Users/UsersPage"
import UserPage from "./pages/admin/Users/userPage";
import ArticlesPage from "./pages/Web/Articles/ArticlesPage";
import PagesPage from "./pages/Web/pages/PagesPage";
// imports API
import AuthContext from "./contexts/AuthContext";
import authAPI from "./services/admin/authAPI";

const Admin = () => {

    const [open, setOpen] = useState(true);

    const handleChangeOpen = () => {
        if (!open){
            setOpen(true);
            console.log(open);
        } else {
            setOpen(false);
            console.log(open)
        }
    }

    const [isAuthenticated, setIsAuthenticated] = useState(
        authAPI.isAuthenticated()
    );

    const NavbarWithRouter = withRouter(NavbarAdmin);

    return(
        <AuthContext.Provider value={{
            isAuthenticated: isAuthenticated,
            setIsAuthenticated: setIsAuthenticated
        }}>
        <HashRouter>
            <AsideAdmin open={open} handleChangeOpen={handleChangeOpen}/>
            <main className={!open && "main" || "main-large"}>
                <NavbarWithRouter/>
                <div className="container-fluid pt-3">
                    <Switch>
                        <Route path="/pages" component={PagesPage} />
                        <Route path="/articles" component={ArticlesPage}/>
                        <Route path="/site/1" component={SitePage}/>
                        <Route path="/Users/new" component={UserPage} />
                        <Route path="/Users/:id" component={UserPage} />
                        <Route path="/Users" component={UsersPage} />
                        <Route path="/" component={DashBoardPage}/>
                    </Switch>
                </div>
            </main>
        </HashRouter>
        </AuthContext.Provider>
    )
}

const rootElement = document.querySelector("#Admin");
ReactDOM.render(<Admin/>, rootElement);

console.log('Hello Webpack Encore! Edit me in assets/js/app.js');
