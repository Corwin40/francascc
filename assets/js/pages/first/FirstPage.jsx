import React from 'react';
import {Link} from "react-router-dom";
import {Button, Card, Col, Form, Row} from "react-bootstrap";


const FirstPage = () => {
    return (
        <div className="row">
            <div className="col-12">
                <Card>
                    <Card.Body>
                        <div className="row">
                            <div className="col-12">
                                <h2>Introduction</h2>
                                <hr/>
                                <p>Bonjour,<br/>En cliquant sur le bouton "Suivant", vous allez suivre les étapes de configuration de votre nouveau site.</p>
                                <p>Pensez à noter vos identifiants dans un endroit sûr afin de les récupérer.</p>
                            </div>
                            <div className="col-12">
                                <Link className="btn btn-sm btn-primary float-right" to="/conf">Suivant</Link>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>


    );
};

export default FirstPage;