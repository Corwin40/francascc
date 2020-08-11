import React, {useState, useContext} from 'react';
import authAPI from "../../services/admin/authAPI";
import AuthContext from "../../contexts/AuthContext";
import Field from "../../components/forms/Fields";

const LoginEspCollPage = ({ history }) => {

    // Gestion de l'authentification par les contexts de Réact
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

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
            history.replace("/home");
        }catch(error){
            console.log(error.response);
            setError("Aucun compte n'existe avec cette adresse ou les informations ne correspondent pas ! ")
        }
    };

    return (
        <>
            <p className="alert alert-info">Avant d'accéder à l'espace dédié, veuillez-vous connecter avec les identifiants fournis par le coordonnateur du dispositif "Collégiens-Citoyens".</p>

            <form onSubmit={handleSubmit}>
                <Field
                    name="username"
                    label="Identifiant"
                    placeholder="Adresse E-mail de connexion"
                    type="text"
                    error={error}
                    onChange={handleChange}
                    value={credentials.username}
                />
                <Field
                    name="password"
                    label="Mot de passe"
                    placeholder=""
                    type="password"
                    onChange={handleChange}
                    value={credentials.password}
                />

                <div className="form-group">
                    <button type="submit" className="btn btn-success">Se connecter</button>
                </div>

            </form>

        </>
    )
};

export default LoginEspCollPage;