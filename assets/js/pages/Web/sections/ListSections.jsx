import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
// Tools
import moment from "moment";
// Styles
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faUserTimes ,faPlusCircle,faMinusCircle} from '@fortawesome/free-solid-svg-icons';
import {Button, Form, Modal, Row} from "react-bootstrap";
import SectionsAPI from "../../../services/webapp/SectionsAPI";
import PagesAPI from "../../../services/webapp/PagesAPI";
import {toast} from "react-toastify";
import Col from "react-bootstrap/Col";

const ListUser = (id) => {

    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    // Déclaration des constantes React
    const [sections, setSections] = useState([]);
    const [addSection, setAddSections] = useState({
        name : 'nouvelle section',
        page : '/api/pages/' + id.id
    })
    const [errors, setErrors] = useState({
        name : '',
        page : ''
    })
    const [parentPage, setParentPage] = useState([])
    const [loading, setLoading] =useState(true);
    const [showDelete, setShowDelete] = useState(false);
    const [DeletedSection, setDeletedSection] = useState([]);

    // CODE POUR LA LISTE DES SECTIONS
    // Capture toutes les entités de la table Section
    const fetchSections = async () => {
        try {
            const data = await SectionsAPI.findAll();
            setSections(data);
            setLoading(false);
        } catch (error) {
            console.log(error.response)
        }
    };
    // Charge les données au chargement du composant.
    useEffect(() => {
        fetchSections();
    }, []);
    // mise en place de la fonction de suppression d'une section
    const handleDelete = async id => {
        const originalSections = [...sections];                        // copie du tableau des sections
        setSections(sections.filter(section => section.id !== id));
        setShowDelete(false);
        try {
            await SectionsAPI.delete(id);
        }catch(error){
            setSections(originalSections);
        }
    };


    // GESTION DE LA MODALE DE SUPPRESSION
    // Ouverture de la modale
    const handleDeleteShow = (section) => {
        setDeletedSection(section);
        setShowDelete(true);
    }
    // Fermeture de la modale
    const handleDeleteClose = () => setShowDelete(false);


    // CODE POUR L'AJOUT D'UNE SECTION
    // Bouton de validation pour l'ajout d'une section
    const handleSubmitAddSection = async (event) => {
        event.preventDefault();
        const response = await SectionsAPI.newOne(addSection);
        toast.info("La nouvelle page a été enregistrée.")
        const newData = await SectionsAPI.findAll();
        setSections(newData);
    }


    // GESTION DE LA MODALE DE MODIFICATION D'UNE SECTION
    // Elements de base
    const [showUpdateSection, setShowUpdateSection] = useState(false);
    const [updateSection, setUpdateSection] = useState({
        name:'',
        page:'',
        className:'',
    });
    const [updateSectionErrors, setUpdateSectionErrors] = useState({
        name:'',
        page:'',
        className:'',
    });
    // Ouverture de la modale
    const handleUpdateSectionShow =(section)=>{
        setShowUpdateSection(true);
        setUpdateSection(section);
    }
    // Fermeture de la modale
    const handleUpdateSectionClose = () => {
        setShowUpdateSection(false);
    }
    // Mise à jour des champs
    const handleChangeUpdateSection =({currentTarget})=>{
        const {type, name} = currentTarget;
        const value = type === 'checkbox' ? currentTarget.checked : currentTarget.value;
        setUpdateSection({...updateSection, [name]: value})
    }

    // Bouton de validation pour l'ajout d'une section
    const handleSubmitUpdateSection = async (event) => {
        event.preventDefault();
        let id = updateSection.id
        const response = await SectionsAPI.updateOne(id, updateSection);
        toast.info("La section a été enregistrée.")
        setShowUpdateSection(false);
        const newData = await SectionsAPI.findAll();
        setSections(newData);
    }

    return (
        <>
            <div className="op_toolbar_view">
                <Form onSubmit={handleSubmitAddSection}>
                    <Button type="submit" variant="outline-primary" size="sm"><FontAwesomeIcon icon={faPlusCircle}/> Sections</Button>
                </Form>
            </div>
            <table className="table table-sm table-hover">
                <thead>
                <tr>
                    <th></th>
                    <th>Nom de la section</th>
                    <th>Contenu de la section</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {sections.map(section => (                                                    // La fonction map = for de symfony, key = Sur quelle clé le map doit il opérer.
                    <tr key={section.id}>
                        <td className="align-middle">{section.id}</td>
                        <td className="align-middle">
                            {section.name}
                        </td>
                        <td className="align-middle">
                           {section.className}
                        </td>
                        <td>
                            <Button variant="info" onClick={() => handleUpdateSectionShow(section)} size="sm">
                                <FontAwesomeIcon icon={faEdit} />
                            </Button>
                            <Button variant="danger" onClick={() => handleDeleteShow(section)} size="sm">
                                <FontAwesomeIcon icon={faUserTimes} />
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Modal id="ModalSectionDelete" show={showDelete} onHide={handleDeleteClose}>
                <Modal.Body>
                    <h1>Attention</h1>
                    Vous êtes sur le point de supprimer la section : <br/><b>{DeletedSection.name}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteClose}>
                        Fermer
                    </Button>
                    <Button
                        onClick={() => handleDelete(DeletedSection.id)}                       // Active la fonction "handleDelete"
                        className="btn btn-sm btn-danger">
                        <FontAwesomeIcon icon={faUserTimes} />
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal id="ModalUpdateSection" show={showUpdateSection} onHide={handleUpdateSectionClose} size="lg" centered>
                <Form onSubmit={handleSubmitUpdateSection}>
                <Modal.Header>
                    <h3>Modification de la section</h3>
                </Modal.Header>
                <Modal.Body>
                        <Form.Row>
                            <Col>
                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label size="sm" column sm="2">
                                        Titre
                                    </Form.Label>
                                    <Col sm="4">
                                        <Form.Control
                                            name="name"
                                            size="sm"
                                            type="text"
                                            placeholder="Titre"
                                            value={updateSection.name}
                                            onChange={handleChangeUpdateSection}
                                            error={updateSectionErrors.name}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" size="sm" variant="outline-warning">Modifier</Button>
                    <Button variant="outline-danger" size="sm" onClick={handleUpdateSectionClose}>
                        Fermer
                    </Button>
                </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default ListUser;