import '../scss/first.scss';
const $ = require('jquery');
require('bootstrap');

import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import {HashRouter, Switch, Route, withRouter} from "react-router-dom";
import Col from "react-bootstrap/Col";
import {Form, Navbar, Card} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import PagesAPI from "./services/webapp/PagesAPI";
import {toast} from "react-toastify";
import ConfigAPI from "./services/admin/ConfigAPI";
import UsersAPI from "./services/admin/UsersAPI";
// imports pages

const First =()=>{

    let id = 1;
    // ***
    // Code pour la configuration générale du site
    // ***
    const [config, setConfig] = useState({
        name:'',
        description : '',
        isOffline: true
    })
    const [configErrors, setConfigErrors] = useState({
        name:'',
        description : '',
        isOffline: ''
    })
    const configHandleChange = ({currentTarget}) => {
        const {type, name} = currentTarget;
        const value = type === 'checkbox' ? currentTarget.checked : currentTarget.value;
        setConfig({...config, [name]: value})
        console.log(type, name, value);
    }
    const fetchconfig = async id =>{
        try{
            const {name, description, isOffline} = await ConfigAPI.findOne(id);
            setConfig({name, description, isOffline})
        } catch (error) {
            console.log(error.response);
        }
    };
    const configHandleSubmit = async (event) =>{
        event.preventDefault();
        try {
            const response = await ConfigAPI.newOne(config);
            setUserErrors({});
            toast.info("L'étape 1 a été correctement enregistrée.")
            history.replace("/admin/firstinstall");

        } catch ({response}) {
            const {violations} = response.data;
            if(violations){
                const apiErrors = {};
                violations.forEach(({propertyPath, message})=>{
                    apiErrors[propertyPath] = message;
                });
                setUserErrors(apiErrors);
            }
        }
    };


    // ***
    // Code de création du premier utilisateur
    // ***
    const [user, setUser] = useState({
        firstName:"",
        lastName:"",
        password:"",
        passwordConfirm: "",
        email:"",
    });
    const [userErrors, setUserErrors] = useState({
        firstName: "",
        lastName:"",
        password:'',
        passwordConfirm: "",
        email:"",
    });
    const userHandleChange = ({currentTarget}) => {
        const {type, name} = currentTarget;
        const value = type === 'checkbox' ? currentTarget.checked : currentTarget.value;
        setUser({...user, [name]: value})
        console.log(type, name, value);
    }
    // Gestion de la soumission du formulaire "User" et des erreurs
    const userHandleSubmit = async event => {
        event.preventDefault();
        // gestion js pour le cas de mots de passe différents
        const apiErrors = {};
        if(user.password !== user.passwordConfirm) {
            apiErrors.passwordConfirm = "Attention, les mots de passe ne correspondent pas !!";
            setUserErrors(apiErrors);
            return;
        }
        try{
            const response = await UsersAPI.register(user);
            setUserErrors({});
        } catch ({response}) {
            const {violations} = response.data;
            if(violations){
                const apiErrors = {};
                violations.forEach(({propertyPath, message})=>{
                    apiErrors[propertyPath] = message;
                });
                setUserErrors(apiErrors);
            }
        }
    };

    return(
        <div>
            <div className="container-fluid" id="op_first_header">
                <div className="row">
                    <div className="col-12">
                        <h3>OpenGAIA - <small>Configuration du site</small></h3>
                    </div>
                </div>

            </div>
            <main className="container">

                <div className="row">
                    <div className="col-12">
                        <Card>
                            <Card.Body>
                                <div className="row">
                                    <div className="col-12">
                                        <h4>Etape 1 : <small>configuration du site</small></h4>
                                        <hr/>
                                    </div>
                                    <div className="col-12">
                                        <Form onSubmit={configHandleChange}>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Group as={Row} controlId="formPlaintextPassword">
                                                        <Form.Label size="sm" column sm="2">
                                                            Nom du site :
                                                        </Form.Label>
                                                        <Col sm="4">
                                                            <Form.Control
                                                                name="name"
                                                                size="sm"
                                                                type="text"
                                                                placeholder="Nom du site"
                                                                value={config.name}
                                                                onChange={configHandleChange}
                                                                error={configErrors.name}
                                                            />
                                                        </Col>
                                                    </Form.Group>
                                                </Col>
                                            </Form.Row>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Group as={Row} controlId="formPlaintextPassword">
                                                        <Form.Label size="sm" column sm="2">
                                                            Description :
                                                        </Form.Label>
                                                        <Col sm="10">
                                                            <Form.Control
                                                                as="textarea"
                                                                row="5"
                                                                name="description"
                                                                size="sm"
                                                                placeholder="Nom du site"
                                                                value={config.description}
                                                                onChange={configHandleChange}
                                                                error={configErrors.description}
                                                            />
                                                        </Col>
                                                    </Form.Group>
                                                </Col>
                                            </Form.Row>
                                            <Form.Check
                                                name="isOffline"
                                                type="switch"
                                                id="custom-switch"
                                                value={user.isOffline}
                                                onChange={userHandleChange}
                                                error={userErrors.isOffline}
                                                label="Site hors ligne"
                                            />
                                            <hr/>
                                            <Button variant="outline-secondary" type="submit">
                                                Valider les informations
                                            </Button>
                                        </Form>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Card>
                            <Card.Body>
                                <div className="row">
                                    <div className="col-12">
                                        <h4>Etape 2 : <small>création de l'utilisateur principal</small></h4>
                                        <hr/>
                                    </div>
                                    <div className="col-12">
                                        <Form onSubmit={userHandleChange}>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Group as={Row} controlId="formPlaintextPassword">
                                                        <Form.Label size="sm" column sm="2">
                                                            Nom et prénom :
                                                        </Form.Label>
                                                        <Col sm="4">
                                                            <Form.Control
                                                                name="firstName"
                                                                size="sm"
                                                                type="text"
                                                                placeholder="Prénom"
                                                                value={user.firstName}
                                                                onChange={userHandleChange}
                                                                error={userErrors.firstName}
                                                            />
                                                        </Col>
                                                        <Col sm="4">
                                                            <Form.Control
                                                                name="lastName"
                                                                size="sm"
                                                                type="text"
                                                                placeholder="Nom"
                                                                value={user.lastName}
                                                                onChange={userHandleChange}
                                                                error={userErrors.lastName}
                                                            />
                                                        </Col>
                                                    </Form.Group>
                                                </Col>
                                            </Form.Row>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Group as={Row} controlId="formPlaintextPassword">
                                                        <Form.Label size="sm" column sm="2">
                                                            Email :
                                                        </Form.Label>
                                                        <Col sm="4">
                                                            <Form.Control
                                                                name="email"
                                                                size="sm"
                                                                type="text"
                                                                value={user.email}
                                                                onChange={userHandleChange}
                                                                error={userErrors.email}
                                                            />
                                                        </Col>
                                                    </Form.Group>
                                                </Col>
                                            </Form.Row>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Group as={Row} controlId="formPlaintextPassword">
                                                        <Form.Label size="sm" column sm="2">
                                                            Mot de passe :
                                                        </Form.Label>
                                                        <Col sm="4">
                                                            <Form.Control
                                                                name="password"
                                                                size="sm"
                                                                type="password"
                                                                value={user.password}
                                                                onChange={userHandleChange}
                                                                error={userErrors.password}
                                                            />
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row} controlId="formPlaintextPassword">
                                                        <Form.Label size="sm" column sm="2">
                                                            Confirmation :
                                                        </Form.Label>
                                                        <Col sm="4">
                                                            <Form.Control
                                                                name="passwordConfirm"
                                                                size="sm"
                                                                type="password"
                                                                value={user.passwordConfirm}
                                                                onChange={userHandleChange}
                                                                error={userErrors.passwordConfirm}
                                                            />
                                                        </Col>
                                                    </Form.Group>
                                                </Col>
                                            </Form.Row>
                                            <hr/>
                                            <Button variant="outline-secondary" type="submit">
                                                Créer le compte
                                            </Button>
                                        </Form>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )

}

const rootElement = document.querySelector("#First");
ReactDOM.render(<First/>, rootElement);
