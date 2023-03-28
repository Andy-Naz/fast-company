import React from "react"

const BookMark = ({ user, ...rest }) => {
    return (
        <button onClick={() => rest.onBookMark(user._id)} className="btn btn-light">
            <i className={user.bookmark ? "bi bi-bookmark-check-fill" : "bi bi-bookmark"}></i>
        </button>
    )
}

export default BookMark
