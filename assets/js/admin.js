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
import ViewSite from "./pages/admin/site/ViewSite"
import ListUser from "./pages/admin/Users/ListUser"
import EditUser from "./pages/admin/Users/EditUser";
import ListArticles from "./pages/Web/Articles/ListArticles";
import ListPage from "./pages/Web/pages/ListPage";
import PagePage from "./pages/Web/pages/EditPage"
// imports API
import AuthContext from "./contexts/AuthContext";
import authAPI from "./services/admin/authAPI";
import LoginPage from "./pages/admin/LoginPage";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditArticles from "./pages/Web/Articles/EditArticles";
import ViewUser from "./pages/admin/Users/ViewUser";
import UserPage from "./pages/Web/pages/EditPage";
import ListCollege from "./pages/admin/college/ListCollege";
import EditCollege from "./pages/admin/college/EditCollege";

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

                        <PrivateRoute path="/colleges/:id" component={EditCollege} />
                        <PrivateRoute path="/colleges/new" component={EditCollege} />
                        <PrivateRoute path="/colleges/" component={ListCollege} />

                        <PrivateRoute path="/pages/:id" component={PagePage} />
                        <PrivateRoute path="/pages/new" component={PagePage} />
                        <PrivateRoute path="/pages" component={ListPage} />

                        <PrivateRoute path="/articles/:id" component={EditArticles}/>
                        <PrivateRoute path="/articles/new" component={EditArticles}/>
                        <PrivateRoute path="/articles" component={ListArticles}/>

                        <PrivateRoute path="/site/:id" component={ViewSite}/>

                        <PrivateRoute path="/users/:id" component={ViewUser} />
                        <PrivateRoute path="/users/new" component={EditUser} />
                        <PrivateRoute path="/users/:id" component={EditUser} />
                        <PrivateRoute path="/users" component={ListUser} />

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
