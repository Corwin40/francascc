import React, {useState} from 'react';

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
        <div>

        </div>
    );
};

export default AddSections;