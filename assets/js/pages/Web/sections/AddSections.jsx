import React, {useState} from 'react';

import {Modal, Button} from "react-bootstrap";

const AddSections = () => {


    const [section, setSections] = useState({
        name:'',
        className:'',
        page:''
        }
    );
    const [errors, setErrors] = useState({
        name:'',
        className:'',
        page:''
        }
    );

    return (
        <div></div>
    );
};

export default AddSections;