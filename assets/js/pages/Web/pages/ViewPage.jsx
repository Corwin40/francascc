// imports tools et React
import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import moment from "moment";
import {toast} from "react-toastify";
import PagesAPI from "../../../services/webapp/PagesAPI";
// import des icons
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle, faMinusCircle} from "@fortawesome/free-solid-svg-icons";
// import bootstrap react
import Card from "react-bootstrap/Card";
import Checkbox from "../../../components/forms/Checkbox";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import ListSections from "../sections/ListSections";
import AddSections from "../sections/AddSections";
import {Form, Modal} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SectionsAPI from "../../../services/webapp/SectionsAPI";

const UserPage = ({match, history}) => {

    let date = new Date();
    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    const [showAddSection, setShowAddSection] = useState(false);

    const handleClose = () => setShowAddSection(false);
    const handleShow = () => setShowAddSection(true);


    // permet de vérifier route Ajout ou edition
    const {id = "new" } = match.params;

    const [page, setPage] = useState({
        title:'',
        slug:'',
        state:'',
        metaKeyword:'',
        metaDescription:'' ,
        isMenu:false,
        sections:'',
        author:''
    });
    const [section, setSection] = useState({
        name:'',
        page: 'api/pages/' + id,
    })

    const [errors, setErrors] = useState({
        id:'',
        title:'',
        slug:'',
        state:'',
        metaKeyword:'',
        metaDescription:'' ,
        isMenu:'',
        sections:"",
        author:''
    });
    // Etat sur les erreurs liées au formulaire des sections
    const [errorsSection, setErrorsSection] = useState({
        name:'',
        page:'',
    });

    // Récupère les données correspondant à l'id transmise pour une modification
    const fetchPage = async id =>{
        try{
            const {title, slug, state, metaKeyword, metaDescription ,isMenu, author, sections} = await PagesAPI.findOne(id);
            setPage({title, slug, state, metaKeyword, metaDescription ,isMenu, author, sections})
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
    }

    const handleChangeSection = ({currentTarget}) => {
        const {type, name} = currentTarget;
        const value = type === 'checkbox' ? currentTarget.checked : currentTarget.value;
        setSection({...section, [name]: value})
    }

    const handleSubmitSection = async (event) =>{
        event.preventDefault();
        try {
            const response = await SectionsAPI.newOne(section);
            setErrors({});
            setShowAddSection(false);
            toast.info("La nouvelle section a été enregistrée.")

        } catch ({response}) {
            const {violations} = response.data;
            if(violations){
                const apiErrors = {};
                violations.forEach(({propertyPath, message})=>{
                    apiErrors[propertyPath] = message;
                });
                setErrorsSection(apiErrors);
            }
        }
    };


    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="alert alert-dismissible alert-light d-flex justify-content-between align-items-center mb-3">
                        <h1>Page : {page.title} </h1>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 col-lg-3">
                    <h3>INFORMATIONS</h3>
                    <hr/>
                    <p>
                    <b>Titre : </b>{page.title}<br/>
                    <b>Auteur : </b>{page.author.firstName} {page.author.lastName}
                    </p>
                    <p>sections : {page.sections.length}</p>

                </div>
                <div className="col-sm-12 col-lg-9">
                    <h3>LISTES DES SECTIONS</h3>
                    <hr/>
                    <div className="op_toolbar_view">
                        <Button variant="outline-primary" size="sm" onClick={() => handleShow(page)}>
                            <FontAwesomeIcon icon={faPlusCircle}/> Sections
                        </Button>
                        <Button variant="outline-primary" size="sm" ><FontAwesomeIcon icon={faMinusCircle}/> Sections</Button>
                    </div>
                    <ListSections/>
                </div>
            </div>

            <Modal show={showAddSection} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Ajout d'une section à la page {page.title}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmitSection}>
                    <Modal.Body>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label
                                column sm="2"
                            >
                                Nom :
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    name="name"
                                    size="sm"
                                    type="text"
                                    placeholder="Nom de la section"
                                    value={section.name}
                                    onChange={handleChangeSection}
                                    error={errorsSection.name}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="page">
                            <Col sm="10">
                                <Form.Control
                                    name="page"
                                    size="sm"
                                    type="hidden"
                                    placeholder=""
                                    value={section.page}
                                    onChange={handleChangeSection}
                                    error={errorsSection.page}
                                />
                            </Col>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" size="sm" onClick={handleClose}>
                            Annuler l'ajout
                        </Button>
                        <Button type="submit" variant="primary" size="sm">
                            Ajouter la section
                        </Button>
                    </Modal.Footer>
                </Form>

            </Modal>

        </>
    )
};

export default UserPage;