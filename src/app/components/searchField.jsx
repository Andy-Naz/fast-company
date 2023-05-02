import React from "react"
import PropTypes from "prop-types"

const SearchField = ({ value, onChange }) => {
    return (
        <form action="">
            <input type="text" placeholder="Поиск" value={value} onChange={onChange}></input>
        </form>
    )
}

SearchField.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
}

export default SearchField
