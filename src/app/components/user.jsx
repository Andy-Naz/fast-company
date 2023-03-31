import React from "react"
import Quality from "./quality"
import BookMark from "./bookmark"
import PropTypes from "prop-types"

const User = ({ _id, name, qualities, profession, completedMeetings, rate, bookmark, onDelete, onToggleBookMark }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>
                {qualities.map((item) => (
                    <Quality key={item._id} {...item} />
                ))}
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate} /5</td>
            <td>
                <BookMark status={bookmark} onClick={() => onToggleBookMark(_id)} />
            </td>
            <td>
                <button onClick={() => onDelete(_id)} className="btn btn-danger">
                    delete
                </button>
            </td>
        </tr>
    )
}

User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    bookmark: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
}

export default User
