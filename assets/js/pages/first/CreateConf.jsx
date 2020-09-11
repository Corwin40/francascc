import React, {useState} from 'react';
import {HashRouter, Switch, Route, withRouter, Redirect} from "react-router-dom";
import ConfigAPI from "../../services/admin/ConfigAPI";
import {Card, Form, Col, Row, Button} from "react-bootstrap";
import {toast} from "react-toastify";
import PagesAPI from "../../services/webapp/PagesAPI";

const CreateConf = () => {

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

    // creation de la page d'accueil de l'appli
    const [page, setPage] = useState({
        title:'Accueil',
        slug:'accueil',
        state:'publiée',
        metaKeywords:{},
        metaDescription:'' ,
        isMenu:true
    })
    const [pageErrors, setPageErrors] = useState({
        title:'',
        slug:'',
        state:'',
        metaKeywords:{},
        metaDescription:'' ,
        isMenu:''
    })

    const configHandleChange = ({currentTarget}) => {
        const {type, name} = currentTarget;
        const value = type === 'checkbox' ? currentTarget.checked : currentTarget.value;
        setConfig({...config, [name]: value})
        console.log(type, name, value);
    }

    const configHandleSubmit = async (event) =>{
        event.preventDefault();
        try {
            const responseConf = await ConfigAPI.newOne(config);
            const responsePage = await PagesAPI.newOne(page);
            setConfigErrors({});
            toast.info("Les éléments de compfiguration sont enregistrés.")
            history.push("/user");

        } catch ({response}) {
            const {violations} = response.data;
            if(violations){
                const apiErrors = {};
                violations.forEach(({propertyPath, message})=>{
                    apiErrors[propertyPath] = message;
                });
                setConfigErrors(apiErrors);
            }
        }
    };

    return (
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
                                <Form onSubmit={configHandleSubmit}>
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
                                        value={config.isOffline}
                                        onChange={configHandleChange}
                                        error={configErrors.isOffline}
                                        label="Site hors ligne"
                                    />
                                    <hr/>
                                    <p>
                                        Un utilisateur sera automatiquement crée. ce dernier s'appelle : "Admin" et a pour mot de passe : admin <br/>
                                        Dès votre première connexion à l'adminstration de l'application : <br/>
                                        - veuillez vous créez un nouvel utilisateur, <br/>
                                        - Veuillez vous créez un mot de passe sécurisé contenant au minimum 1 majuscule, 1 minisucule et des chiffres.
                                    </p>
                                    <Button variant="outline-primary" type="submit" size="sm">
                                        Valider les informations
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default CreateConf;