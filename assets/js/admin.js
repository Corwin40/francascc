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
import PrivateRoute from "./components/tools/PrivateRoute";

//import all pages
import DashBoardPage from "./pages/admin/Dashboard";
import SitePage from "./pages/admin/site/SitePage"
import UsersPage from "./pages/admin/Users/UsersPage"
import UserPage from "./pages/admin/Users/userPage";
import ArticlesPage from "./pages/Web/Articles/ArticlesPage";
import ListPage from "./pages/Web/pages/ListPage";
import PagePage from "./pages/Web/pages/EditPage"
// imports API
import AuthContext from "./contexts/AuthContext";
import authAPI from "./services/admin/authAPI";
import LoginPage from "./pages/admin/LoginPage";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArticlePage from "./pages/Web/Articles/ArticlePage";

authAPI.setup();

const Admin = () => {

    const [open, setOpen] = useState(true);

    const handleChangeOpen = () => {
        if (!open){
            setOpen(true);
        } else {
            setOpen(false);
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
                        <PrivateRoute path="/pages/:id" component={PagePage} />
                        <PrivateRoute path="/pages/new" component={PagePage} />
                        <PrivateRoute path="/pages" component={ListPage} />

                        <PrivateRoute path="/articles/:id" component={ArticlePage}/>
                        <PrivateRoute path="/articles/new" component={ArticlePage}/>
                        <PrivateRoute path="/articles" component={ArticlesPage}/>

                        <PrivateRoute path="/site/:id" component={SitePage}/>

                        <PrivateRoute path="/Users/new" component={UserPage} />
                        <PrivateRoute path="/Users/:id" component={UserPage} />
                        <PrivateRoute path="/Users" component={UsersPage} />

                        <PrivateRoute path="/dashboard" component={DashBoardPage}/>

                        <Route path="/" component={LoginPage} />
                    </Switch>
                </div>
            </main>
        </HashRouter>
            <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}/>
        </AuthContext.Provider>
    )
}

const rootElement = document.querySelector("#Admin");
ReactDOM.render(<Admin/>, rootElement);

console.log('Hello Webpack Encore! Edit me in assets/js/app.js');
