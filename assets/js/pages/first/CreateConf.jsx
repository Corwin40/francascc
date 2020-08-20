import React, {useState} from 'react';
import ConfigAPI from "../../services/admin/ConfigAPI";
import {Card, Form, Col, Row, Button} from "react-bootstrap";

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
    const configHandleChange = ({currentTarget}) => {
        const {type, name} = currentTarget;
        const value = type === 'checkbox' ? currentTarget.checked : currentTarget.value;
        setConfig({...config, [name]: value})
        console.log(type, name, value);
    }

    const configHandleSubmit = async (event) =>{
        event.preventDefault();
        try {
            const response = await ConfigAPI.newOne(config);
            setConfigErrors({});
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
                                    <Button variant="outline-primary" type="submit">
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