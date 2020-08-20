import React from 'react';
import Form from "react-bootstrap/Form";

const Checkbox = ({name, label, checked, onChange}) => {
    return (
    <Form>
        <Form.Check
            type="switch"
            id={name}
            name={name}
            label={label}
            checked={checked}
            onChange={onChange}
        />
    </Form>
    )
}

export default Checkbox;