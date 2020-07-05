import React from 'react';

const Textarea = ({name, label, rows, value, onChange, placeholder, error=""}) => (
    <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <textarea
            value={value || ''}
            onChange={onChange}
            className={"form-control form-control-sm" + (error && " is-invalid")}
            placeholder={placeholder}
            name={name}
            id={name}
            rows={rows}

        />
        {error && <p className="invalid-feedback">{error}</p>}
    </div>
);

export default Textarea;