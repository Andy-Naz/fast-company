import React from "react"
import PropTypes from "prop-types"

const BookMark = ({ status, ...rest }) => {
    return (
        <button {...rest} className="btn btn-light">
            <i className={status ? "bi bi-bookmark-check-fill" : "bi bi-bookmark"}></i>
        </button>
    )
}

BookMark.propTypes = {
    status: PropTypes.object.isRequired
}

export default BookMark
