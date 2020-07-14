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

const UserPage = ({match, history}) => {

    let date = new Date();
    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

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

    const [errors, setErrors] = useState({
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

    const handleChange = ({currentTarget}) => {
        const {type, name} = currentTarget;
        const value = type === 'checkbox' ? currentTarget.checked : currentTarget.value;
        setPage({...page, [name]: value})
        console.log(type, name, value);
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try {
            if (editing) {
                const response = await PagesAPI.updateOne(id, page);
                toast.info("la page à bien été modifiée.")
            }else{
                const response = await PagesAPI.newOne(page);
                setErrors({});
                toast.info("La nouvelle page a été enregistrée.")
                history.replace("/pages");
            }

        } catch ({response}) {
            const {violations} = response.data;
            if(violations){
                const apiErrors = {};
                violations.forEach(({propertyPath, message})=>{
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
            }
        }
    };
    const addSection = () =>{

    }

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
                        <Button variant="outline-primary" size="sm" onClick={addSection}><FontAwesomeIcon icon={faPlusCircle}/> Sections</Button>
                        <Button variant="outline-primary" size="sm" onClick={addSection}><FontAwesomeIcon icon={faMinusCircle}/> Sections</Button>
                    </div>
                    <ListSections/>
                </div>
            </div>



        </>
    )
};

export default UserPage;