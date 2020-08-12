import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
// Tools
import moment from "moment";
import Pagination from "../../../components/tools/Pagination";
import CollegesAPI from "../../../services/admin/CollegesAPI";
// Styles
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faUserTimes } from '@fortawesome/free-solid-svg-icons';
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {Button, Modal} from "react-bootstrap";

const ListCollege = () => {

    // Déclaration des constantes React
    const [colleges, setColleges] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // state pour initialiser le départ de la boucle de pagination
    const [search, setSearch] = useState("");
    const [loading, setLoading] =useState(true);
    const [showDelete, setShowDelete] = useState(false);
    const [DeletedCollege, setDeletedCollege] = useState([]);

    // Capture toutes les entités de la table Users
    const fetchColleges = async () => {
        try {
            const data = await CollegesAPI.findAll();
            setColleges(data);
            setLoading(false);
        } catch (error) {
            console.log(error.response)
        }
    };

    // Chargers les données au chargement du composant
    useEffect(() => {
        fetchColleges();
    }, []);

    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    // mise en place de la fonction de suppression d'un customer
    const handleDelete = async id => {
        const originalColleges = [...colleges];                        // copie du tableau des customers
        setColleges(colleges.filter(college => college.id !== id));
        setShowDelete(false);
        try {
            await CollegesAPI.delete(id);
        }catch(error){
            setColleges(originalColleges);
            console.log(error.response);
        }
    };

    // fonction pour capturer la nouvelle valeur de pagination
    const handleChangeCollegesPagination = page => setCurrentPage(page);

    // Mise en place de la fonction de recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    };

    const itemsPerPage = 10;

    // Moteur de recherche sur la requète
    const filteredColleges = colleges.filter(
        u =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.city.toLowerCase().includes(search.toLowerCase())
    );

    // mise en place de l'alimentation des pages de paginations
    const paginatedColleges = Pagination.getStart(
        filteredColleges,
        currentPage,
        itemsPerPage
    );

    // Modal de suppression - ouverture
    const handleDeleteClose = () => setShowDelete(false);
    //Modal de suppression - fermeture
    const handleDeleteShow = (college) => {
        setDeletedCollege(college);
        console.log(DeletedCollege);
        setShowDelete(true);
    }

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="alert alert-dismissible alert-light d-flex justify-content-between align-items-center mb-3">
                        <h1>Etablissements : <small>Liste des collèges inscrits</small></h1>
                    </div>
                </div>
                <div className="col-2">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Rechercher ..."/>
                    </div>
                </div>
                <div className="col-10">
                    <Link to={"/colleges/new"} className="btn btn-secondary"><FontAwesomeIcon icon={faPlusCircle} /> Ajouter un collège</Link>
                </div>
            </div>
            <table className="table table-sm table-hover">
                <thead>
                <tr>
                    <th>id</th>
                    <th>Nom et Prénom</th>
                    <th>Email</th>
                    <th>Créer le</th>
                    <th>Modifier le</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {paginatedColleges.map(college => (                                                    // La fonction map = for de symfony, key = Sur quelle clé le map doit il opérer.
                    <tr key={college.id}>
                        <td>{college.id}</td>
                        <td><Link to={"/colleges/" + college.id}>{college.name}</Link></td>
                        <td>{college.mail}</td>
                        <td>{formatDate(college.createAt)}</td>
                        <td>{formatDate(college.updateAt)}</td>
                        <td className="float-right">
                            <Link
                                className="btn btn-sm btn-primary mr-1"
                                to={"/colleges/" + college.id}><FontAwesomeIcon icon={faEdit} />
                            </Link>
                            <Button variant="danger" onClick={() => handleDeleteShow(college)} size="sm">
                                <FontAwesomeIcon icon={faUserTimes} />
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {itemsPerPage < filteredColleges.length &&
            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={filteredColleges.length}
                onPageChanged={handleChangeCollegesPagination()}
            />
            }

            <Modal show={showDelete} onHide={handleDeleteClose}>
                <Modal.Body>
                    <h1>Attention</h1>
                    Vous êtes sur le point de supprimer le profil de <br/>
                    <b>{DeletedCollege.name}</b><br/>
                    Etes-vous sur de vouloir continuer ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteClose}>
                        Fermer
                    </Button>
                    <Button
                        onClick={() => handleDelete(DeletedCollege.id)}                       // Active la fonction "handleDelete"
                        className="btn btn-sm btn-danger">
                        <FontAwesomeIcon icon={faUserTimes} />
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ListCollege;