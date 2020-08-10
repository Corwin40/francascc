import '../scss/app.scss';

const $ = require('jquery');
require('bootstrap');

import React, {useState} from "react";
import ReactDOM from 'react-dom';
import {HashRouter, Switch, Route, withRouter} from "react-router-dom";
// imports tools
import authAPI from "./services/admin/authAPI";
import AuthContext from "./contexts/AuthContext";
import {toast, ToastContainer} from "react-toastify";
import PrivateRoute from "./components/tools/PrivateRoute";

// imports des pages JSX
import LoginEspCollPage from "./pages/admin/LoginEspCollPage";
import HomePage from "./pages/admin/HomePage";
import NavBarEspColl from "./components/modules/NavBarEspColl";
import AsideRightEspColl from "./components/modules/AsideRightEspColl";
import EditArticles from "./pages/Web/articles/EditArticlesEspColl";

authAPI.setup();

const App = () => {
    // validation de l'authentification
    const [isAuthenticated, setIsAuthenticated] = useState(
        authAPI.isAuthenticated()
    );
    return(
        <AuthContext.Provider value={{
            isAuthenticated: isAuthenticated,
            setIsAuthenticated: setIsAuthenticated
        }}>
            <HashRouter>
                <div id="op_espcoll" className="container">
                    <NavBarEspColl/>
                    <div id="op_espcoll_row" className="row">
                        <div className="col-9">
                            <Switch>

                                <PrivateRoute path="/articles/:id" component={EditArticles}/>
                                <PrivateRoute path="/articles/new" component={EditArticles}/>
                                <PrivateRoute path="/home" component={HomePage}/>

                                <Route path="/" component={LoginEspCollPage} />
                            </Switch>
                        </div>
                        <AsideRightEspColl/>
                    </div>
                </div>
            </HashRouter>

            <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}/>
        </AuthContext.Provider>
        )

}

const rootElement = document.querySelector("#App");
ReactDOM.render(<App/>, rootElement);