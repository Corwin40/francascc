import React from 'react';

const Checkbox = ({name, label, checked, onChange}) => {
    return (
        <div className="form-group">
            <div>
                <label
                    htmlFor={name}>{label}
                </label>
                <input
                    type="checkbox"
                    id={name}
                    name={name}
                    checked={checked}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}

export default Checkbox;