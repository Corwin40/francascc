// Imports des composants natif de react
import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";

// Imports des outils (tools)
import moment from "moment";
import {toast} from "react-toastify";
import PagesAPI from "../../../services/webapp/PagesAPI";

// Imports des élements Bootstrap React
import {Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

// Imports des composants de formulaires
import Button from "react-bootstrap/Button";
import Checkbox from "../../../components/forms/Checkbox";
import Select from 'react-select';

const UserPage = ({match, history}) => {

    let date = new Date();
    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    // permet de vérifier route Ajout ou edition
    const {id = "new" } = match.params;

    const [page, setPage] = useState({
        title:'',
        slug:'',
        state:'',
        metaKeywords:'',
        metaDescription:'' ,
        isMenu:false
    });

    const [errors, setErrors] = useState({
        title:'',
        slug:'',
        state:'',
        metaKeyword:'',
        metaDescription:'' ,
        isMenu:''
    });

    // Récupère les données correspondant à l'id transmise pour une modification
    const fetchPage = async id =>{
        try{
            const {title, slug, state, metaKeywords, metaDescription ,isMenu, sections} = await PagesAPI.findOne(id);
            setPage({title, slug, state, metaKeywords, metaDescription ,isMenu, sections})
        } catch (error) {
            console.log(error.response);
        }
    };

    const [editing, setEditing] = useState(false);
    useEffect(()=>{
        if(id!== "new")
            setEditing(true);
        fetchPage(id);
    }, [id]);

    const handleChange = ({currentTarget}) => {
        const {type, name} = currentTarget;
        const value = type === 'checkbox' ? currentTarget.checked : currentTarget.value;
        setPage({...page, [name]: value})
        console.log(type, name, value);
    }


    const handleSubmit = async (event) =>{
        event.preventDefault();
        try {
            if (editing) {
                const response = await PagesAPI.updateOne(id, page);
                toast.info("la page à bien été modifiée.")
            }else{
                const response = await PagesAPI.newOne(page);
                setErrors({});
                toast.info("La nouvelle page a été enregistrée.")
                history.replace("/pages");
            }

        } catch ({response}) {
            const {violations} = response.data;
            if(violations){
                const apiErrors = {};
                violations.forEach(({propertyPath, message})=>{
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
            }
        }
    };

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="alert alert-dismissible alert-light d-flex justify-content-between align-items-center mb-3">
                        <h1>Page du site : <small>Ajout / Modification</small></h1>
                    </div>
                </div>
            </div>

            <Card border="secondary">
                <Card.Header>{!editing && "Création d'une nouvelle page" || "Modification de la page : " + page.title}</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <p><b>INFORMATIONS</b></p>
                        <hr/>
                        <Form.Row>
                            <Col>
                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label size="sm" column sm="2">
                                        Titre
                                    </Form.Label>
                                    <Col sm="4">
                                        <Form.Control
                                            name="title"
                                            size="sm"
                                            type="text"
                                            placeholder="Titre"
                                            value={page.title}
                                            onChange={handleChange}
                                            error={errors.title}
                                        />
                                    </Col>
                                    <Form.Label size="sm" column sm="2">
                                        alias :
                                    </Form.Label>
                                    <Col sm="4">
                                        <Form.Control
                                            name="slug"
                                            size="sm"
                                            type="text"
                                            placeholder="Titre"
                                            value={page.slug}
                                            onChange={handleChange}
                                            error={errors.slug}
                                        />
                                    </Col>
                                </Form.Group>

                            </Col>
                        </Form.Row>
                        <p><b>METADONNEES</b></p>
                        <hr/>
                        <Form.Row>
                            <Col>
                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label size="sm" column sm="2">
                                        Mots Clefs
                                    </Form.Label>
                                    <Col sm="4">

                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label size="sm" column sm="2">
                                        Description
                                    </Form.Label>
                                    <Col sm="4">
                                        <Form.Control
                                            name="metaDescription"
                                            label="Description"
                                            placeholder="Description"
                                            type="text"
                                            value={page.metaDescription}
                                            onChange={handleChange}
                                            error={errors.definition}
                                            size="sm"
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Check
                                    type="switch"
                                    id="isMenu"
                                    name="isMenu"
                                    label="Utiliser cette page comme menu du site"
                                    onChange={handleChange}
                                    checked={page.isMenu}
                                />
                            </Col>
                        </Form.Row>

                        {!editing && <Button type="submit" className="btn btn-sm btn-success mr-1">Ajouter</Button> || <Button  type="submit"className="btn btn-sm btn-success mr-1">Modifier</Button>}
                        <Link to="/pages" className="btn btn-sm btn-secondary">Retour à la liste</Link>

                    </Form>
                </Card.Body>
            </Card>

        </>
    )
};

export default UserPage;