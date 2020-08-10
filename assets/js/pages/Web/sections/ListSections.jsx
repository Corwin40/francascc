import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
// Tools
import moment from "moment";
import Pagination from "../../../components/tools/Pagination";
import UsersAPI from "../../../services/admin/UsersAPI";
// Styles
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faUserTimes } from '@fortawesome/free-solid-svg-icons';
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {Button, Form, Modal} from "react-bootstrap";
import SectionsAPI from "../../../services/webapp/SectionsAPI";
import Checkbox from "../../../components/forms/Checkbox";

const ListUser = () => {

    // Déclaration des constantes React
    const [sections, setSections] = useState([]);
    const [loading, setLoading] =useState(true);
    const [showDelete, setShowDelete] = useState(false);
    const [DeletedUser, setDeletedUser] = useState([]);
    const [checked, setChecked] = useState(false)

    // Capture toutes les entités de la table Users
    const fetchSections = async () => {
        try {
            const data = await SectionsAPI.findAll();
            setSections(data);
            setLoading(false);
        } catch (error) {
            console.log(error.response)
        }
    };

    // Chargers les données au chargement du composant
    useEffect(() => {
        fetchSections();
    }, []);

    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    // mise en place de la fonction de suppression d'un customer
    const handleDelete = async id => {
        const originalSections = [...sections];                        // copie du tableau des customers
        setSections(sections.filter(section => section.id !== id));
        setShowDelete(false);
        try {
            await UsersAPI.delete(id);
        }catch(error){
            setSections(originalSections);
        }
    };

    // Modal de suppression - fermeture
    const handleDeleteClose = () => setShowDelete(false);
    //Modal de suppression - ouverture
    const handleDeleteShow = (section) => {
        setDeletedUser(section);
        setShowDelete(true);
    }

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
                            <Link
                                className="btn btn-sm btn-primary mr-1"
                                to={"/section/" + section.id}><FontAwesomeIcon icon={faEdit} />
                            </Link>
                            <Button variant="danger" onClick={() => handleDeleteShow(section)} size="sm">
                                <FontAwesomeIcon icon={faUserTimes} />
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
};

export default ListUser;