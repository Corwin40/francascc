// imports tools et React
import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import moment from "moment";
import {toast} from "react-toastify";
import PagesAPI from "../../../services/webapp/PagesAPI";
// import des pages
import ListSections from "../sections/ListSections";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";

const UserPage = ({match, history}) => {

    let date = new Date();
    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    // permet de vérifier route Ajout ou edition
    const {id = "new" } = match.params;

    const [page, setPage] = useState({
        title:'',
        slug:'',
        state:'',
        metaKeyword: {},
        metaDescription:'' ,
        isMenu:false,
        sections:'',
        author:''
    });


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

    const handleChangePage = ({currentTarget}) => {
        const {type, name} = currentTarget;
        const value = type === 'checkbox' ? currentTarget.checked : currentTarget.value;
        setPage({...page, [name]: value})
    }


    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h3>Pages : <small>{page.title}</small></h3>
                    <hr/>
                </div>
                <div className="col-10">
                    <Link to={"/pages"} className="btn btn-secondary"><FontAwesomeIcon icon={faPlusCircle} /> Retour à la liste des pages</Link>
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

                </div>
                <div className="col-sm-12 col-lg-9">
                    <h3>LISTES DES SECTIONS</h3>
                    <hr/>
                    <ListSections id={id}/>
                </div>
            </div>
        </>
    )
};

export default UserPage;