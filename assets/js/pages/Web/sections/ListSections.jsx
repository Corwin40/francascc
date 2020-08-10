import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
// Tools
import moment from "moment";
import Pagination from "../../../components/tools/Pagination";
import UsersAPI from "../../../services/admin/UsersAPI";
// Styles
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faMinusCircle} from '@fortawesome/free-solid-svg-icons';
import { faUserTimes } from '@fortawesome/free-solid-svg-icons';
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {Button, Form, Modal} from "react-bootstrap";
import SectionsAPI from "../../../services/webapp/SectionsAPI";
import Checkbox from "../../../components/forms/Checkbox";

const ListUser = (page) => {

    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    // Déclaration des constantes React
    const [sections, setSections] = useState([]);
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

    // CODE POUR LE MODAL D'AJOUT D'UNE SECTION

    return (
        <>
            <table className="table table-sm table-hover">
                <tbody>
                {sections.map(section => (                                                    // La fonction map = for de symfony, key = Sur quelle clé le map doit il opérer.
                    <tr key={section.id}>
                        <td>
                            {section.id}
                        </td>
                        <td>{section.name}</td>
                        <td>
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