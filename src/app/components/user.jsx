import React from "react"
import Quality from "./quality"
import BookMark from "./bookmark"
import PropTypes from "prop-types"

const User = (user) => {
    return (
        <tr key={user._id}>
            <td>{user.name}</td>
            <td>
                {user.qualities.map((item) => (
                    <Quality key={item._id} name={item.name} color={item.color} />
                ))}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate} /5</td>
            <td>
                <BookMark user={user} onClick={() => user.onBookMark(user._id)} />
            </td>
            <td>
                <button onClick={() => user.onDelete(user._id)} className="btn btn-danger">
                    delete
                </button>
            </td>
        </tr>
    )
}

User.propTypes = {
    user: PropTypes.object.isRequired,
}

export default User
