import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import UsersAPI from "../../../services/admin/UsersAPI";
import moment from "moment";
import {toast} from "react-toastify";
import PagesAPI from "../../../services/webapp/PagesAPI";
// import composants de form
import Field from "../../../components/forms/Fields";
import Textarea from "../../../components/forms/Textarea";
import Checkbox from "../../../components/forms/Checkbox";
import ArticlesAPI from "../../../services/webapp/ArticlesAPI";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";

const EditArticles = ({match, history}) => {

    let date = new Date();
    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    // permet de vérifier route Ajout ou edition
    const {id = "new" } = match.params;

    const [article, setArticle] = useState({
        title:"",
        slug:"",
        content:"",

    });

    const [errors, setErrors] = useState({
        title:"",
        slug:"",
        content:"",
    });

    // Récupère les données correspondant à l'id transmise pour une modification
    const fetchArticle = async id =>{
        try{
            const {title, slug, content} = await ArticlesAPI.findOne(id);
            setArticle({title, slug, content,})
        } catch (error) {
            console.log(error.response);
        }
    };

    const [editing, setEditing] = useState(false);
    useEffect(()=>{
        if(id!== "new")
            setEditing(true);
        fetchArticle(id);
    }, [id]);

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setArticle({... article, [name]:value});
    };

    // mise en place du Checkbox
    const [value, setValue] = useState(false);

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try {
            if (editing) {
                const response = await ArticlesAPI.updateOne(id, article);
                toast.info("L'article est bien modifié.")
            }else{
                const response = await ArticlesAPI.newOne(article);
                setErrors({});
                toast.info("L'article à bien été enregistré.")
                history.replace("/articles");
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
                        <h1>CONTENU : <small>Ajout / Modification </small></h1>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-between align-items-content mb-3">
                {!editing && <h1>Création d'un article</h1> || <h1>Modification de l'article : {article.title}</h1>}
            </div>
            <form onSubmit={handleSubmit}>
                <Field
                    name="title"
                    label="Titre de l'article"
                    placeholder=""
                    type="text"
                    value={article.title}
                    onChange={handleChange}
                    error={errors.title}
                />
                <Field
                    name="slug"
                    label="slug"
                    placeholder=""
                    type="text"
                    value={article.slug}
                    onChange={handleChange}
                    error={errors.slug}
                />
                <Textarea
                    name="content"
                    label="Contenu"
                    placeholder=""
                    rows="10"
                    value={article.content}
                    onChange={handleChange}
                    error={errors.content}
                />

                <div className="form-group">
                    {!editing && <button className="btn btn-sm btn-success mr-1">Ajouter</button> || <button className="btn btn-sm btn-success mr-1">Modifier</button>}
                    <Link to="/articles" className="btn btn-sm btn-secondary">Retour à la liste</Link>
                </div>


            </form>
        </>
    )
};

export default EditArticles;