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
import {Button, Modal} from "react-bootstrap";

const ListUser = () => {

    // Déclaration des constantes React
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // state pour initialiser le départ de la boucle de pagination
    const [search, setSearch] = useState("");
    const [loading, setLoading] =useState(true);
    const [showDelete, setShowDelete] = useState(false);
    const [DeletedUser, setDeletedUser] = useState([]);

    // Capture toutes les entités de la table Users
    const fetchUsers = async () => {
        try {
            const data = await UsersAPI.findAll();
            setUsers(data);
            setLoading(false);
        } catch (error) {
            console.log(error.response)
        }
    };

    // Chargers les données au chargement du composant
    useEffect(() => {
        fetchUsers();
    }, []);

    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    // mise en place de la fonction de suppression d'un customer
    const handleDelete = async id => {
        const originalUsers = [...users];                        // copie du tableau des customers
        setUsers(users.filter(user => user.id !== id));
        setShowDelete(false);
        try {
            await UsersAPI.delete(id);
        }catch(error){
            setUsers(originalUsers);
        }
    };

    // fonction pour capturer la nouvelle valeur de pagination
    const handleChangeUsersPagination = page => setCurrentPage(page);

    // Mise en place de la fonction de recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    };

    const itemsPerPage = 10;

    // Moteur de recherche sur la requète
    const filteredUsers = users.filter(
        u =>
            u.firstName.toLowerCase().includes(search.toLowerCase()) ||
            u.lastName.toLowerCase().includes(search.toLowerCase())
    );

    // mise en place de l'alimentation des pages de paginations
    const paginatedUsers = Pagination.getStart(
        filteredUsers,
        currentPage,
        itemsPerPage
    );

    // Modal de suppression - fermeture
    const handleDeleteClose = () => setShowDelete(false);
    //Modal de suppression - ouverture
    const handleDeleteShow = (user) => {
        setDeletedUser(user);
        setShowDelete(true);
    }

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="alert alert-dismissible alert-light d-flex justify-content-between align-items-center mb-3">
                        <h1>Tableau de bord : <small>Gestion des utilisateurs</small></h1>
                    </div>
                </div>
                <div className="col-2">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Rechercher ..."/>
                    </div>
                </div>
                <div className="col-10">
                    <Link to={"/users/new"} className="btn btn-secondary"><FontAwesomeIcon icon={faPlusCircle} /> Ajouter un utilisateur</Link>
                </div>
            </div>
            <table className="table table-sm table-hover">
                <thead>
                <tr>
                    <th>id</th>
                    <th>Nom et Prénom</th>
                    <th>Email</th>
                    <th>actif</th>
                    <th>articles</th>
                    <th>Pages</th>
                    <th>Créer le</th>
                    <th>Modifier le</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {paginatedUsers.map(user => (                                                    // La fonction map = for de symfony, key = Sur quelle clé le map doit il opérer.
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td><Link to={"/users/view/" + user.id}>{user.firstName} {user.lastName}</Link></td>
                        <td>{user.email}</td>
                        <td>{user.isActive > 0 && <p>Oui</p> || <p>Non</p> }</td>
                        <td>
                            {user.articles.length } crée(s)
                        </td>
                        <td>
                            {user.pages.length } crée(s)
                        </td>
                        <td>{formatDate(user.createAt)}</td>
                        <td>{formatDate(user.updateAt)}</td>
                        <td className="float-right">
                            <Link
                                className="btn btn-sm btn-primary mr-1"
                                to={"/users/" + user.id}><FontAwesomeIcon icon={faEdit} />
                            </Link>
                            <Button
                                variant="danger"
                                onClick={handleDeleteShow}
                                size="sm">

                                <FontAwesomeIcon icon={faUserTimes} />
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {itemsPerPage < filteredUsers.length &&
            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={filteredUsers.length}
                onPageChanged={handleChangeUsersPagination()}
            />
            }

            <Modal show={showDelete} onHide={handleDeleteClose}>
                <Modal.Body>
                    <h1>Attention</h1>
                    Vous êtes sur le point de supprimer le profil de <br/>
                    <b>{DeletedUser.firstName} {DeletedUser.lastName}.</b><br/>
                    Etes-vous sur de vouloir continuer ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteClose}>
                        Fermer
                    </Button>
                    <Button
                        onClick={() => handleDelete(DeletedUser.id)}                       // Active la fonction "handleDelete"
                        className="btn btn-sm btn-danger">
                        <FontAwesomeIcon icon={faUserTimes} />
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ListUser;