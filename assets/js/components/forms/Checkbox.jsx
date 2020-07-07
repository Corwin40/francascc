import React from 'react';

const Checkbox = ({name, label, isOn, handleToggle}) => {
    return (
        <div className="form-group">
            <div className="custom-control custom-switch">
                <input
                    name={name}
                    id={name}
                    type="checkbox"
                    className="custom-control-input"
                    checked={isOn}
                    onChange={handleToggle}
                />
                <label
                    className="custom-control-label"
                    htmlFor="customSwitch1"
                >
                    {label}
                </label>
            </div>
        </div>
    )
}

export default Checkbox;