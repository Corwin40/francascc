import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import Field from "../../../components/forms/Fields";
import UsersAPI from "../../../services/admin/UsersAPI";
import moment from "moment";
import {toast} from "react-toastify";
import Checkbox from "../../../components/forms/Checkbox";

const EditUser = ({match, history}) => {

    let date = new Date();
    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    // permet de vérifier route Ajout ou edition
    const {id = "new" } = match.params;

    const [user, setUser] = useState({
        firstName: "",
        lastName:"",
        email:"",
        isActive: false,
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName:"",
        email:"",
        isActive:""
    });

    // Récupère les données correspondant à l'id transmise pour une modification
    const fetchUser = async id =>{
        try{
            const {firstName, lastName, email, isActive} = await UsersAPI.findOne(id);
            setUser({firstName, lastName, email, isActive})
        } catch (error) {
            console.log(error.response);
        }
    };

    const [editing, setEditing] = useState(false);
    useEffect(()=>{
        if(id!== "new")
            setEditing(true);
        fetchUser(id);
    }, [id]);

    const handleChange = ({currentTarget}) => {
        const {type, name} = currentTarget;
        const value = type === 'checkbox' ? currentTarget.checked : currentTarget.value;
        setUser({...user, [name]: value})
        console.log(type, name, value);
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try {
            if (editing) {
                const response = await UsersAPI.updateOne(id, user);
                toast.info("Le profil a bien été modifié dans la base.")
            }else{
                const response = await UsersAPI.newOne(user);
                setErrors({});
                toast.error("Une erreur s'est produite durant l'enregistrement.")
                history.replace("/users");
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
            <div className="d-flex justify-content-between align-items-content mb-3">
                {!editing && <h1>Ajout d'un utilisateur</h1> || <h1>Modification de l'utilisateur</h1>}
            </div>
            <form onSubmit={handleSubmit}>
                <Field
                    name="firstName"
                    label="Prénom de l'utilisateur"
                    placeholder="Entrer le prénom"
                    type="text"
                    value={user.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                />
                <Field
                    name="lastName"
                    label="Nom de l'utilisateur"
                    placeholder="Entrer le nom"
                    type="text"
                    value={user.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                />
                <Field
                    name="email"
                    label="E-mail de l'utilisateur"
                    placeholder="Entrer l'E-mail"
                    type="email"
                    value={user.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <Checkbox
                    name="isActive"
                    checked={user.isActive}
                    label="Activation du compte"
                    onChange={handleChange}
                />

                <div className="form-group">
                    {!editing && <button className="btn btn-sm btn-success mr-1">Ajouter</button> || <button className="btn btn-sm btn-success mr-1">Modifier</button>}
                    <Link to="/users" className="btn btn-sm btn-secondary">Retour à la liste</Link>
                </div>


            </form>
        </>
    )
};

export default EditUser;