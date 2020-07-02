import React, {useContext, useState} from 'react';

// import API's
import authAPI from "../../services/admin/authAPI";
import AuthContext from "../../contexts/AuthContext";
// import des éléments de Form
import Field from "../../components/forms/Fields";
const LoginPage = () => {

    // Gestion de l'authentification par les contexts de Réact
    const {setIsAuthenticated} = useContext(AuthContext);

    // State pour l'alimentation du mot de passe
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");

    // Gestion des champs
    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setCredentials({...credentials, [name]: value});
    };

    //gestion du submit
    const handleSubmit = async event => {
        event.preventDefault();  // Pas de rechargement de la page au submit du formulaire
        try{
            await authAPI.authenticate(credentials);
            setError("");
            setIsAuthenticated(true);
            history.replace("http://localhost:8000/op_login");
        }catch(error){
            console.log(error.response);
            setError("Aucun compte n'existe avec cette adresse ou les informations ne correspondent pas ! ")
        }
    };

    return (
        <div className="wrapper">
            <img src="#"/>
            <form className="form-signin" onSubmit={handleSubmit}>
                <h2 className="form-signin-heading">Connexion</h2>
                <Field name="username" label="Identifiant" placeholder="Adresse E-mail de connexion" type="text" error={error} onChange={handleChange} value={credentials.username} />
                <Field name="password" label="Mot de passe" placeholder="" type="password" onChange={handleChange} value={credentials.password} />
                <label className="checkbox">
                    <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe"/> Remember me
                </label>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;