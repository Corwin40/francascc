import React, {useContext} from 'react';
// Imports tools React
// imports éléments de React Bootstrap & Fontawesome
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import authAPI from "../../services/admin/authAPI";
import AuthContext from "../../contexts/AuthContext";
import {Link} from "react-router-dom";

const AsideRightEspColl = () => {

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    const handleLogout = () => {
        authAPI.logout();
        setIsAuthenticated(false);
        history.push("/");
    };

    return (
        <div className="col-3">
            <Card className="op_espcoll_card">
                <ListGroup variant="flush">
                    <ListGroup.Item>Notre compte</ListGroup.Item>
                </ListGroup>
            </Card>
            <Card className="op_espcoll_card">
                <ListGroup variant="flush">
                    <ListGroup.Item>nouvel article</ListGroup.Item>
                    <ListGroup.Item>Message(s)</ListGroup.Item>
                </ListGroup>
            </Card>
            <Card border="secondary" className="op_espcoll_card">
                <ListGroup variant="flush">
                    <ListGroup.Item><a onClick={handleLogout}>Déconnexion <FontAwesomeIcon icon={faSignOutAlt}/></a></ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    );
};

export default AsideRightEspColl;