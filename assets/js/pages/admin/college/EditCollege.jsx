import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Field from "../../../components/forms/Fields";
import moment from "moment";
import {toast} from "react-toastify";
import CollegesAPI from "../../../services/admin/CollegesAPI";
import Card from "react-bootstrap/Card";

const EditCollege = ({match, history}) => {

    let date = new Date();
    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    // permet de vérifier route Ajout ou edition
    const {id = "new" } = match.params;

    const [college, setCollege] = useState({
        name:''
    });

    const [errors, setErrors] = useState({
        name:''
    });

    // Récupère les données correspondant à l'id transmise pour une modification
    const fetchCollege = async id =>{
        try{
            const {name} = await CollegesAPI.findOne(id);
            setCollege({name})
        } catch (error) {
            console.log(error.response);
        }
    };

    const [editing, setEditing] = useState(false);
    useEffect(()=>{
        if(id!== "new")
            setEditing(true);
        fetchCollege(id);
    }, [id]);

    const handleChange = ({currentTarget}) => {
        const {type, name} = currentTarget;
        const value = type === 'checkbox' ? currentTarget.checked : currentTarget.value;
        setCollege({...college, [name]: value})
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try {
            if (editing) {
                const response = await CollegesAPI.updateOne(id, college);
                toast.info("la page à bien été modifiée.")
            }else{
                const response = await collegesAPI.newOne(college);
                setErrors({});
                toast.info("La nouvelle page a été enregistrée.")
                history.replace("/colleges");
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
                        <h1>Etablissements : <small>Modification / Ajout</small></h1>
                    </div>
                </div>
            </div>

            <Card border="secondary">
                <Card.Header>{!editing && "Création d'une nouvelle page" || "Modification de la page : " + college.name}</Card.Header>
                <Card.Body>
                    <form onSubmit={handleSubmit}>
                        <Field
                            name="name"
                            label="Nom de l'établissement"
                            placeholder="Collège de ..."
                            type="text"
                            value={college.name}
                            onChange={handleChange}
                            error={errors.title}
                        />
                        <div className="form-group">
                            {!editing && <button className="btn btn-sm btn-success mr-1">Ajouter</button> || <button className="btn btn-sm btn-success mr-1">Modifier</button>}
                            <Link to="/colleges" className="btn btn-sm btn-secondary">Retour à la liste</Link>
                        </div>

                    </form>
                </Card.Body>
            </Card>

        </>
    )
};

export default EditCollege;