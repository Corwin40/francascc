import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Field from "../../../components/forms/Fields";
import UsersAPI from "../../../services/admin/UsersAPI";
import moment from "moment";
import Checkbox from "../../../components/forms/Checkbox";

const UserPage = ({match, history}) => {

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
        const {name, value} = currentTarget;
        setUser({... user, [name]:value});
    };

    // mise en place du Checkbox
    const [value, setValue] = useState(false);

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try {
            if (editing) {
                const response = await UsersAPI.updateOne(id, user);
            }else{
                const response = await UsersAPI.newOne(user);
                setErrors({});
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
                {!editing &&
                <Checkbox
                    name="isActive"
                    label = "Activation de l'utilisateur"
                    isOn={value}
                    handleToggle={({currentTarget}) => {
                        setValue(!value);
                        const {name} = currentTarget;
                        setUser({... user, [name]:value});
                    }}
                />
                ||
                <Checkbox
                    name="isActive"
                    label = "Activation de l'utilisateur"
                    isOn={user.isActive}
                    handleToggle={({currentTarget}) => {
                        setValue(!user.isActive);
                        const {name} = currentTarget;
                        setUser({... user, [name]:value});
                    }}
                />
                }

                <div className="form-group">
                    {!editing && <button className="btn btn-sm btn-success mr-1">Ajouter</button> || <button className="btn btn-sm btn-success mr-1">Modifier</button>}
                    <Link to="/users" className="btn btn-sm btn-secondary">Retour à la liste</Link>
                </div>


            </form>
        </>
    )
};

export default UserPage;