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
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const EditArticles = ({match, history}) => {

    let date = new Date();
    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    // permet de vérifier route Ajout ou edition
    const {id = "new" } = match.params;
    const [editing, setEditing] = useState(false);
    useEffect(()=>{
        if(id!== "new")
            setEditing(true);
        fetchArticle(id);
    }, [id]);

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
            <Card className="op_espcoll_card">
                <ListGroup variant="flush">
                    {!editing &&
                    <ListGroup.Item>Création de votre nouvel article</ListGroup.Item>
                    ||
                    <ListGroup.Item>Modification de l'article : {article.title}</ListGroup.Item>
                    }
                </ListGroup>
            </Card>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Row>
                            <Col>
                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label size="sm" column sm="2">
                                        Titre
                                    </Form.Label>
                                    <Col sm="4">
                                        <Form.Control
                                            name="title"
                                            size="sm"
                                            type="text"
                                            placeholder="Titre"
                                            value={article.title}
                                            onChange={handleChange}
                                            error={errors.title}
                                        />
                                    </Col>
                                    <Form.Label size="sm" column sm="2">
                                        slug :
                                    </Form.Label>
                                    <Col sm="4">
                                        <Form.Control
                                            name="slug"
                                            size="sm"
                                            type="text"
                                            placeholder=""
                                            value={article.slug}
                                            onChange={handleChange}
                                            error={errors.slug}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Col sm="12">
                                        <Textarea
                                            name="content"
                                            size="sm"
                                            rows="10"
                                            value={article.content}
                                            onChange={handleChange}
                                            error={errors.content}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
};

export default EditArticles;