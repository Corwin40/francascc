import React from 'react';
import {Link} from "react-router-dom";


const FirstPage = () => {
    return (
        <div className="row">
            <div className="col-12">
                <h2>Introduction</h2>
                <hr/>
                <p>Bonjour,<br/>En cliquant sur le bouton "Suivant", vous allez suivre les étapes de configuration de votre nouveau site.</p>
            </div>
            <div className="col-12">
                <Link className="btn btn-sm btn-primary float-right" to="/conf">Suivant</Link>
            </div>
        </div>

    );
};

export default FirstPage;