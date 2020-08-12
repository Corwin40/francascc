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
    // Modal de suppression - ouverture
    const handleDeleteShow = (section) => {
        setDeletedSection(section);
        setShowDelete(true);
    }
    // Modal de suppression - fermeture
    const handleDeleteClose = () => setShowDelete(false);

    // CODE POUR L'AJOUT D'UNE SECTION
    const handleSubmitAddSection = async (event) => {
        event.preventDefault();
        const response = await SectionsAPI.newOne(addSection);
        toast.info("La nouvelle page a été enregistrée.")
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
                    <th>Nom de la class</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {sections.map(section => (                                                    // La fonction map = for de symfony, key = Sur quelle clé le map doit il opérer.
                    <tr key={section.id}>
                        <td>{section.id}</td>
                        <td>
                            <Form.Control
                                size="sm"
                                value={section.name}
                            />
                        </td>
                        <td>
                            <Form.Control
                                size="sm"
                                value={section.className}
                            />
                        </td>
                        <td>
                            <Button variant="info" onClick={() => handleDeleteShow(section)} size="sm">
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
            <Modal show={showDelete} onHide={handleDeleteClose}>
                <Modal.Body>
                    <h1>Attention</h1>
                    Vous êtes sur le point de supprimer la section : <br/><b></b>{DeletedSection.name}
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
        </>
    );
};

export default ListUser;