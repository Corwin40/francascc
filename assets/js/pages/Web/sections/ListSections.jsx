// import tools et react
import React, {useEffect, useState} from 'react';
import SectionsAPI from "../../../services/webapp/SectionsAPI";
import Alert from "react-bootstrap/Alert";


const ListSections = () => {

    const [sections, setSections] = useState();
    const [list, setList] = useState(false);

// Capture toutes les entités de la table Users
    const fetchSections = async () => {
        try {
            const data = await SectionsAPI.findAll();
            if(data.length === 0){
                setList(false);
            }else{
                setList(true);
            }
            setSections(data);
            setLoading(false);
        } catch (error) {
            console.log(error.response)
        }
    };

// Chargers les données au chargement du composant
    useEffect(() => {
        fetchSections();
    }, []);
    return (
        <>
            {!list &&
            <Alert variant="warning">
                La page ne possède pas de sections et de contenus pour l'instant
            </Alert>
            ||
                <table>
                    <tr>
                        <td></td>
                    </tr>
                </table>

            }
        </>
    );
};

export default ListSections;