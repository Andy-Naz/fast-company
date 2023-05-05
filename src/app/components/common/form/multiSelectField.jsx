import React from "react"
import PropTypes from "prop-types"
import Select from "react-select"

const MultiSelectField = ({ options, onChange, name, label }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                label: options[optionName].name,
                value: options[optionName]._id
            }))
            : options

    const handleChange = (value) => {
        onChange({ name, value })
    }

    return (
        <div className="mb-4">
            <label className="form-label">
                {label}
            </label>{" "}
            <Select isMulti closeMenuOnSelect={false} options={optionsArray} onChange={handleChange} name={name} />
        </div>
    )
}

MultiSelectField.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.oneOfType(PropTypes.array, PropTypes.object),
    label: PropTypes.string
}

export default MultiSelectField
