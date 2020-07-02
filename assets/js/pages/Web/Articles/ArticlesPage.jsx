import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
// Tools
import ArticlesAPI from "../../../services/webapp/ArticlesAPI";
import moment from "moment";
import Pagination from "../../../components/tools/Pagination";
// Styles
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEdit, faUserTimes, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const ArticlesPage = () => {

    // Déclaration des constantes React
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // state pour initialiser le départ de la boucle de pagination
    const [search, setSearch] = useState("");
    const [loading, setLoading] =useState(true);

    // Capture toutes les entités de la table Articles
    const fetchArticles = async () => {
        try {
            const data = await ArticlesAPI.findAll();
            setArticles(data);
            setLoading(false);
        } catch (error) {
            console.log(error.response)
        }
    };

    // Chargers les données au chargement du composant
    useEffect(() => {
        fetchArticles();
    }, []);

    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    // mise en place de la fonction de suppression d'un customer
    const handleDelete = async id => {
        const originalArticles = [...articles];                        // copie du tableau des customers
        setArticles(articles.filter(article => article.id !== id));
        try {
            await ArticlesAPI.delete(id);
        }catch(error){
            setArticles(originalArticles);
            console.log(error.response);
        }
    };

    // fonction pour capturer la nouvelle valeur de pagination
    const handleChangePage = page => setCurrentPage(page);

    // Mise en place de la fonction de recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    };

    const itemsPerPage = 10;

    // Moteur de recherche sur la requète
    const filteredArticles = articles.filter(
        a =>
            a.title.toLowerCase().includes(search.toLowerCase()) ||
            a.author.toLowerCase().includes(search.toLowerCase())
    );

    // mise en place de l'alimentation des pages de paginations
    const paginatedArticles = Pagination.getStart(
        filteredArticles,
        currentPage,
        itemsPerPage
    );

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="alert alert-dismissible alert-light d-flex justify-content-between align-items-center mb-3">
                        <h1>Tableau de bord : <small>Gestion des articles</small></h1>
                    </div>
                </div>
                <div className="col-2">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Rechercher ..."/>
                    </div>
                </div>
                <div className="col-10">
                    <Link to={"/articles/new"} className="btn btn-secondary"><FontAwesomeIcon icon={faPlusCircle} /> Ajouter un article</Link>
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
                {paginatedArticles.map(user => (                                                    // La fonction map = for de symfony, key = Sur quelle clé le map doit il opérer.
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td><Link to={"/articles/" + article.id}></Link></td>

                        <td>{formatDate(article.createAt)}</td>
                        <td>{formatDate(article.updateAt)}</td>
                        <td>
                            <Link
                                className="btn btn-sm btn-primary mr-1"
                                to={"/articles/" + article.id}><FontAwesomeIcon icon={faEdit} />
                            </Link>
                            <button
                                onClick={() => handleDelete(user.id)}                       // Active la fonction "handleDelete"
                                className="btn btn-sm btn-danger">
                                <FontAwesomeIcon icon={faUserTimes} />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {itemsPerPage < filteredArticles.length &&
            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={filteredArticles.length}
                onPageChanged={handleChangePage}
            />
            }
        </>
    );
};

export default ArticlesPage;