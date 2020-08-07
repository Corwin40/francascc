import React from "react";
import Card from "react-bootstrap/Card";
import {CardColumns} from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";

const HomePage = (props) => {
    return(
        <>
            <Card className="op_espcoll_card">
                <ListGroup variant="flush">
                    <ListGroup.Item>Bienvenue dans votre espace</ListGroup.Item>
                </ListGroup>
            </Card>
            <Card>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Titre</th>
                        <th>Last Name</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody></tbody>
                </Table>
            </Card>
        </>
    );
};

export default HomePage;