import React from "react";
import Card from "react-bootstrap/Card";
import {CardColumns} from "react-bootstrap";

const DashBoardPage = (props) => {
    return(
        <>
        <div className="alert alert-dismissible alert-light">
            <h1><strong>Tableau de bord </strong></h1>
        </div>
        <CardColumns>
            <Card>
                <Card.Header>Derniers ajout de contenu</Card.Header>
            </Card>
            <Card>
                <Card.Header>Derniers commentaires</Card.Header>
            </Card>
            <Card>
                <Card.Header>Messagerie</Card.Header>
            </Card>
        </CardColumns>

        </>
    );
};

export default DashBoardPage;