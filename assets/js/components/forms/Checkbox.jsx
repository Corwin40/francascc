import React from 'react';

const Checkbox = ({name, label, value, checked, onClick, type="text", error=""}) => (

    <div className="form-group">
        <div className="custom-control custom-switch">
            <input
                type={type}
                id={name}
                name={name}
                checked={checked}
                onclick={onClick}
                value={value}
                className={"custom-control-input" + (error && " is-invalid")}
            />
            <label className="custom-control-label" htmlFor={name}>{label}</label>
            {error && <p className="invalid-feedback">{error}</p>}
            </div>
    </div>
);

export default Checkbox;