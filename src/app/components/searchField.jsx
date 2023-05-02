import React from "react"
import PropTypes from "prop-types"

const SearchField = ({ value, onChange }) => {
    return <input type="text" className="form-control" placeholder="Поиск по имени..." value={value} onChange={onChange}></input>
}

SearchField.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
}

export default SearchField
