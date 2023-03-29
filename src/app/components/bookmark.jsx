import React from "react"
import PropTypes from "prop-types"

const BookMark = ({ user, ...rest }) => {
    return (
        <button {...rest} className="btn btn-light">
            <i className={user.bookmark ? "bi bi-bookmark-check-fill" : "bi bi-bookmark"}></i>
        </button>
    )
}

BookMark.propTypes = {
    user: PropTypes.object.isRequired
}

export default BookMark
