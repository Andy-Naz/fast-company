import React from "react"
import PropTypes from "prop-types"

const GroupList = ({ items }) => {
    return (
        <ul className="list-group">
            {Object.keys(items).map((item) => (
                <li key={items[item]._id} className="list-group-item">
                    {items[item].name}
                </li>
            ))}
        </ul>
    )
}

GroupList.propTypes = {
    items: PropTypes.object.isRequired
}

export default GroupList
