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
// imports des pages JSX
import LoginEspCollPage from "./pages/admin/LoginEspCollPage";
import PrivateRoute from "./components/tools/PrivateRoute";
import HomePage from "./pages/admin/HomePage";
import NavBarEspColl from "./components/modules/NavBarEspColl";
import AsideRightEspColl from "./components/modules/AsideRightEspColl";

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
            <div id="op_espcoll" className="container">
                <NavBarEspColl/>
                <div id="op_espcoll_row" className="row">
                    <div className="col-9">
                        <HashRouter>
                            <Switch>
                                <PrivateRoute path="/home" component={HomePage}/>

                                <Route path="/" component={LoginEspCollPage} />
                            </Switch>
                        </HashRouter>
                    </div>
                    <AsideRightEspColl/>
                </div>

            </div>
            <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}/>
        </AuthContext.Provider>
        )

}

const rootElement = document.querySelector("#App");
ReactDOM.render(<App/>, rootElement);