import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Field from "../../../components/forms/Fields";
import UsersAPI from "../../../services/admin/UsersAPI";
import moment from "moment";
import Checkbox from "../../../components/forms/Checkbox";
import SiteAPI from "../../../services/admin/SiteAPI";
import {toast} from "react-toastify";

const SitePage = ({match, history}) => {

    let date = new Date();
    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    // permet de vérifier route Ajout ou edition
    const {id = "new" } = match.params;

    const [site, setSite] = useState({
        name:"",
        description: "",
        isOffline:""
    });

    const [errors, setErrors] = useState({
        name:"",
        description: "",
        isOffline:""
    });

    // Récupère les données correspondant à l'id transmise pour une modification
    const fetchSite = async id =>{
        try{
            const {name, description, isOffline} = await SiteAPI.findOne(id);
            setSite({name, description, isOffline})
        } catch (error) {
            console.log(error.response);
        }
    };

    const [editing, setEditing] = useState(false);
    useEffect(()=>{
        if(id!== "new")
            setEditing(true);
        fetchSite(id);
    }, [id]);

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setSite({... site, [name]:value});
    };

    // mise en place du Checkbox
    const [value, setValue] = useState(false);

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try {
            if (editing) {
                const response = await SiteAPI.updateOne(id, site);
                toast.info("Les informations ont été modifiés.")
            }else{
                const response = await SiteAPI.newOne(site);
                setErrors({});
                history.replace("/sites");
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
                {!editing && <h1>Paramétrage du site</h1> || <h1>Modification de l'utilisateur</h1>}
            </div>
            <form onSubmit={handleSubmit}>
                <Field
                    name="name"
                    label="Nom du site"
                    placeholder="Entrer le prénom"
                    type="text"
                    value={site.name}
                    onChange={handleChange}
                    error={errors.name}
                />
                <Field
                    name="description"
                    label="description du site"
                    placeholder=""
                    type="text"
                    value={site.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                />

                {!editing &&
                <Checkbox
                    name="isActive"
                    label = "Activation de l'utilisateur"
                    isOn={value}
                    handleToggle={({currentTarget}) => {
                        setValue(!value);
                        const {name} = currentTarget;
                        setSite({... site, [name]:value});
                    }}
                />
                ||
                <Checkbox
                    name="isOffline"
                    label = "Mettre le site en maintenance"
                    isOn={site.isOffline}
                    handleToggle={({currentTarget}) => {
                        setValue(!site.isOffline);
                        const {name} = currentTarget;
                        setSite({... site, [name]:value});
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

export default SitePage;