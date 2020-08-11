import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Field from "../../../components/forms/Fields";
import UsersAPI from "../../../services/admin/UsersAPI";
import moment from "moment";
import Checkbox from "../../../components/forms/Checkbox";
import SiteAPI from "../../../services/admin/ConfigAPI";
import {toast} from "react-toastify";

const ViewSite = ({match, history}) => {

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
            <div className="row">
                <div className="col-12">
                    <h3>Configuration du site</h3>
                    <hr/>
                </div>
            </div>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home"
                       role="tab" aria-controls="nav-home" aria-selected="true">Général</a>
                    <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile"
                       role="tab" aria-controls="nav-profile" aria-selected="false">Profile</a>
                    <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact"
                       role="tab" aria-controls="nav-contact" aria-selected="false">Contact</a>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div
                    className="tab-pane fade show active"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab">
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
                </div>
                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">...
                </div>
                <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...
                </div>
            </div>

        </>
    )
};

export default ViewSite;