import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
// Tools
import PagesAPI from "../../../services/webapp/PagesAPI";
import moment from "moment";
import Pagination from "../../../components/tools/Pagination";
// Styles
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEdit, faUserTimes, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import {Button, Modal} from "react-bootstrap";

const PagesPage = () => {

    // Déclaration des constantes React
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // state pour initialiser le départ de la boucle de pagination
    const [search, setSearch] = useState("");
    const [loading, setLoading] =useState(true);
    const [showDelete, setShowDelete] = useState(false);
    const [DeletedPage, setDeletedPage] = useState([]);

    // Capture toutes les entités de la table Articles
    const fetchPages = async () => {
        try {
            const data = await PagesAPI.findAll();
            setPages(data);
            setLoading(false);
        } catch (error) {
            console.log(error.response)
        }
    };

    // Chargers les données au chargement du composant
    useEffect(() => {
        fetchPages();
    }, []);

    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    // mise en place de la fonction de suppression d'un customer
    const handleDelete = async id => {
        const originalPages = [...pages];                        // copie du tableau des customers
        setPages(pages.filter(page => page.id !== id));
        setShowDelete(false);
        try {
            await PagesAPI.delete(id);
        }catch(error){
            setPages(originalPages);
            console.log(error.response);
        }
    };

    // fonction pour capturer la nouvelle valeur de pagination
    const handleChangePagePagination = page => setCurrentPage(page);

    // Mise en place de la fonction de recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    };

    const itemsPerPage = 10;

    // Moteur de recherche sur la requète
    const filteredPages = pages.filter(
        p =>
            p.title.toLowerCase().includes(search.toLowerCase())
    );

    // mise en place de l'alimentation des pages de paginations
    const paginatedPages = Pagination.getStart(
        filteredPages,
        currentPage,
        itemsPerPage
    );

    // Modal de suppression - ouverture
    const handleDeleteClose = () => setShowDelete(false);
    //Modal de suppression - fermeture
    const handleDeleteShow = (page) => {
        setDeletedPage(page);
        console.log(DeletedPage);
        setShowDelete(true);
    }


    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="alert alert-dismissible alert-light d-flex justify-content-between align-items-center mb-3">
                        <h1>Tableau de bord : <small>Gestion des Pages</small></h1>
                    </div>
                </div>
                <div className="col-2">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Rechercher ..."/>
                    </div>
                </div>
                <div className="col-10">
                    <Link to={"/pages/new"} className="btn btn-secondary"><FontAwesomeIcon icon={faPlusCircle} /> Ajouter une page</Link>
                </div>
            </div>
            <table className="table table-sm table-hover">
                <thead>
                <tr>
                    <th>id</th>
                    <th>Nom et Prénom</th>

                    <th>Créer le</th>
                    <th>Modifier le</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {paginatedPages.map(page => (                                                    // La fonction map = for de symfony, key = Sur quelle clé le map doit il opérer.
                    <tr key={page.id}>
                        <td>{page.id}</td>
                        <td><Link to={"/pages/" + page.id}>{page.title}</Link></td>

                        <td>{formatDate(page.createAt)}</td>
                        <td>{formatDate(page.updateAt)}</td>
                        <td className="float-right">
                            <Link
                                className="btn btn-sm btn-primary mr-1"
                                to={"/Pages/" + page.id}><FontAwesomeIcon icon={faEdit} />
                            </Link>
                            <Button variant="danger" onClick={() => handleDeleteShow(page)} size="sm">
                                <FontAwesomeIcon icon={faUserTimes} />
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {itemsPerPage < filteredPages.length &&
            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={filteredPages.length}
                onPageChanged={handleChangePagePagination}
            />
            }
            <Modal show={showDelete} onHide={handleDeleteClose}>
                <Modal.Body>
                    <h1>Attention</h1>
                    Vous êtes sur le point de supprimer la page: <b>{DeletedPage.title}.</b><br/>
                    Etes-vous sur de vouloir continuer ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteClose}>
                        Fermer
                    </Button>
                    <Button
                        onClick={() => handleDelete(DeletedPage.id)}                       // Active la fonction "handleDelete"
                        className="btn btn-sm btn-danger">
                        <FontAwesomeIcon icon={faUserTimes} />
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PagesPage;