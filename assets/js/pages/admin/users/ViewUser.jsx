import React, {useEffect, useState} from 'react';
import UsersAPI from "../../../services/admin/UsersAPI";
import Card, {CardFooter} from "react-bootstrap/Card";


const ViewUser = ({match, history}) => {

    // Déclaration des constantes React
    const [users, setUsers] = useState([]);

    //Récupération de l'ID USer
    const {id} = match.params;

    // récupération des données de création du site
    const fetchUser = async () => {
        try {
            const data = await UsersAPI.findOne(id);
            setUsers(data);
        } catch (error) {
            console.log(error.response)
        }
    };

    useEffect(()=> {
        fetchUser();
    },[]);

    return (
        <Card border="secondary">
            <Card.Header>Informations</Card.Header>
            <Card.Body>
                <Card.Text>
                    <b>Nom :</b> {users.lastName}
                </Card.Text>
                <Card.Text>
                    <b>Prénom :</b> {users.firstName}
                </Card.Text>
                <form>test</form>
            </Card.Body>
        </Card>
    );
};

export default ViewUser;