import React from "react"
import PropTypes from "prop-types"

const SelectField = ({ label, value, onChange, defaultOption, options, name, error }) => {
    const optionsArray = !Array.isArray(options) && typeof options === "object" ? Object.values(options) : options

    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value })
    }

    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "")
    }

    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <select className={getInputClasses()} id={name} name={name} value={value} onChange={handleChange}>
                <option disabled value="">
                    {defaultOption}
                </option>
                {optionsArray &&
                    optionsArray.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}

SelectField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    defaultOption: PropTypes.string,
    error: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}
export default SelectField
