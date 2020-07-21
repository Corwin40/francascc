import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Field from "../../../components/forms/Fields";
import moment from "moment";
import {toast} from "react-toastify";
import CollegesAPI from "../../../services/admin/CollegesAPI";
import Card from "react-bootstrap/Card";
import {Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const EditCollege = ({match, history}) => {

    let date = new Date();
    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    // permet de vérifier route Ajout ou edition
    const {id = "new" } = match.params;

    const [college, setCollege] = useState({
        name:'',
        address:'',
        complement:'',
        zipcode:'',
        city:'',
        collegeEmail:'',
        groupEmail:'',
        animateur:'',
    });

    const [errors, setErrors] = useState({
        name:'',
        address:'',
        complement:'',
        zipcode:'',
        city:'',
        collegeEmail:'',
        groupEmail:'',
        animateur:'',
    });

    // Récupère les données correspondant à l'id transmise pour une modification
    const fetchCollege = async id =>{
        try{
            const {name, address, complement, zipcode, collegeEmail, groupEmail, city, animateur} = await CollegesAPI.findOne(id);
            setCollege({name, address, complement, zipcode, collegeEmail, groupEmail, city, animateur })
        } catch (error) {
            console.log(error.response);
        }
    };

    const [editing, setEditing] = useState(false);
    useEffect(()=>{
        if(id!== "new")
            setEditing(true);
        fetchCollege(id);
    }, [id]);

    const handleChange = ({currentTarget}) => {
        const {type, name} = currentTarget;
        const value = type === 'checkbox' ? currentTarget.checked : currentTarget.value;
        setCollege({...college, [name]: value})
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try {
            if (editing) {
                const response = await CollegesAPI.updateOne(id, college);
                toast.info("la page à bien été modifiée.")
            }else{
                const response = await CollegesAPI.newOne(college);
                setErrors({});
                toast.info("La nouvelle page a été enregistrée.")
                history.replace("/colleges");
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
                        <h1>Etablissements : <small>Modification / Ajout</small></h1>
                    </div>
                </div>
            </div>

            <Card border="secondary">
                <Card.Header>{!editing && "Création d'une nouvelle page" || "Modification de la page : " + college.name}</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <p><b>L'ETABLISSEMENT</b></p>
                        <hr/>

                        <Form.Row>
                            <Col>
                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label size="sm" column sm="2">
                                        College
                                    </Form.Label>
                                    <Col sm="4">
                                        <Form.Control
                                            name="college"
                                            size="sm"
                                            type="text"
                                            placeholder="college"
                                            value={college.name}
                                            onChange={handleChange}
                                            error={errors.title}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label size="sm" column sm="2">
                                        Adresse
                                    </Form.Label>
                                    <Col sm="4">
                                        <Form.Control
                                            name="address"
                                            size="sm"
                                            type="text"
                                            placeholder="adresse"
                                            value={college.address}
                                            onChange={handleChange}
                                            error={errors.address}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label size="sm" column sm="2">

                                    </Form.Label>
                                    <Col sm="4">
                                        <Form.Control
                                            name="complement"
                                            size="sm"
                                            type="text"
                                            placeholder=""
                                            value={college.complement}
                                            onChange={handleChange}
                                            error={errors.complement}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label size="sm" column sm="2">
                                        CP / Commune
                                    </Form.Label>
                                    <Col sm="4">
                                        <Form.Control
                                            name="zipcode"
                                            size="sm"
                                            type="text"
                                            placeholder=""
                                            value={college.zipcode}
                                            onChange={handleChange}
                                            error={errors.zipcode}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Col sm="4">
                                        <Form.Control
                                            name="city"
                                            size="sm"
                                            type="text"
                                            placeholder=""
                                            value={college.city}
                                            onChange={handleChange}
                                            error={errors.city}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label size="sm" column sm="2">
                                        Email du collège
                                    </Form.Label>
                                    <Col sm="4">
                                        <Form.Control
                                            name="collegeEmai"
                                            size="sm"
                                            type="text"
                                            placeholder=""
                                            value={college.collegeEmai}
                                            onChange={handleChange}
                                            error={errors.collegeEmai}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <p><b>LE GROUPE</b></p>
                        <hr/>
                        <Form.Row>
                            <Col>
                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label size="sm" column sm="2">
                                        L'accompagnateur :
                                    </Form.Label>
                                    <Col sm="4">
                                        <Form.Control
                                            name="animateur"
                                            size="sm"
                                            type="text"
                                            placeholder=""
                                            value={college.animateur}
                                            onChange={handleChange}
                                            error={errors.animateur}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Col>
                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label size="sm" column sm="2">
                                        mail de contact du groupe :
                                    </Form.Label>
                                    <Col sm="4">
                                        <Form.Control
                                            name="groupEmail"
                                            size="sm"
                                            type="text"
                                            placeholder=""
                                            value={college.groupEmail}
                                            onChange={handleChange}
                                            error={errors.groupEmail}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Row>

                        <div className="form-group">
                            {!editing && <button className="btn btn-sm btn-success mr-1">Ajouter</button> || <button className="btn btn-sm btn-success mr-1">Modifier</button>}
                            <Link to="/colleges" className="btn btn-sm btn-secondary">Retour à la liste</Link>
                        </div>

                    </Form>
                </Card.Body>
            </Card>

        </>
    )
};

export default EditCollege;