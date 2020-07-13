import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Field from "../../../components/forms/Fields";
import UsersAPI from "../../../services/admin/UsersAPI";
import moment from "moment";
import Checkbox from "../../../components/forms/Checkbox";
import {toast} from "react-toastify";
import PagesAPI from "../../../services/webapp/PagesAPI";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";

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
        isMenu:false
    });

    const [errors, setErrors] = useState({
        title:'',
        slug:'',
        state:'',
        metaKeyword:'',
        metaDescription:'' ,
        isMenu:''
    });

    // Récupère les données correspondant à l'id transmise pour une modification
    const fetchPage = async id =>{
        try{
            const {title, slug, state, metaKeyword, metaDescription ,isMenu, sections} = await PagesAPI.findOne(id);
            setPage({title, slug, state, metaKeyword, metaDescription ,isMenu, sections})
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

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="alert alert-dismissible alert-light d-flex justify-content-between align-items-center mb-3">
                        <h1>Page du site <small>Ajout / Modification</small></h1>
                    </div>
                </div>
            </div>

            <Card border="secondary">
                <Card.Header>Informations</Card.Header>
                <Card.Body>
                    <b>titre de la page</b>
                </Card.Body>
            </Card>

        </>
    )
};

export default UserPage;