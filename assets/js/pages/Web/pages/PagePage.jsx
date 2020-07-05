import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Field from "../../../components/forms/Fields";
import UsersAPI from "../../../services/admin/UsersAPI";
import moment from "moment";
import Checkbox from "../../../components/forms/Checkbox";
import {toast} from "react-toastify";
import PagesAPI from "../../../services/webapp/PagesAPI";

const UserPage = ({match, history}) => {

    let date = new Date();
    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    // permet de vérifier route Ajout ou edition
    const {id = "new" } = match.params;

    const [page, setPage] = useState({
        title:"",
        slug:"",
        definition:"",
        type:"",
        isActive:false,
        isMenu:false,
        createAt:"",
        updateAt:""
    });

    const [errors, setErrors] = useState({
        title:"",
        slug:"",
        definition:"",
        type:"",
        isActive:"",
        isMenu:"",
        createAt:"",
        updateAt:""
    });

    // Récupère les données correspondant à l'id transmise pour une modification
    const fetchPage = async id =>{
        try{
            const {title, slug, definition, type, isActive, isMenu} = await PagesAPI.findOne(id);
            setPage({title, slug, definition, type, isActive, isMenu})
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
        const {name, value} = currentTarget;
        setPage({... page, [name]:value});
    };

    // mise en place du Checkbox
    const [value, setValue] = useState(false);

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
                history.replace("/page");
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
                    name="title"
                    label="Titre de la page"
                    placeholder=""
                    type="text"
                    value={page.title}
                    onChange={handleChange}
                    error={errors.title}
                />
                <Field
                    name="slug"
                    label="slug"
                    placeholder=""
                    type="text"
                    value={page.slug}
                    onChange={handleChange}
                    error={errors.slug}
                />
                <Field
                    name="definition"
                    label="definition"
                    placeholder=""
                    type="text"
                    value={page.definition}
                    onChange={handleChange}
                    error={errors.definition}
                />
                {!editing &&
                <Checkbox
                    name="isPublish"
                    label = "La page est publiée ?"
                    isOn={value}
                    handleToggle={({currentTarget}) => {
                        setValue(!value);
                        const {name} = currentTarget;
                        setPage({... page, [name]:value});
                    }}
                />
                ||
                <Checkbox
                    name="isActive"
                    label = "La page est publiée ?"
                    isOn={page.isActive}
                    handleToggle={({currentTarget}) => {
                        setValue(!page.isActive);
                        const {name} = currentTarget;
                        setPage({... page, [name]:value});
                    }}
                />
                }

                {!editing &&
                <Checkbox
                    name="isMenu"
                    label = "La page est un menu ?"
                    isOn={value}
                    handleToggle={({currentTarget}) => {
                        setValue(!value);
                        const {name} = currentTarget;
                        setPage({... page, [name]:value});
                    }}
                />
                ||
                <Checkbox
                    name="isMenu"
                    label = "La page est un menu ?"
                    isOn={page.isMenu}
                    handleToggle={({currentTarget}) => {
                        setValue(!page.isActive);
                        const {name} = currentTarget;
                        setPage({... page, [name]:value});
                    }}
                />
                }

                <div className="form-group">
                    {!editing && <button className="btn btn-sm btn-success mr-1">Ajouter</button> || <button className="btn btn-sm btn-success mr-1">Modifier</button>}
                    <Link to="/pages" className="btn btn-sm btn-secondary">Retour à la liste</Link>
                </div>


            </form>
        </>
    )
};

export default UserPage;