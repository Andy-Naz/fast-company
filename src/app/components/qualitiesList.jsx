import React from "react"
import Quality from "./quality"
import PropTypes from "prop-types"

const QualitiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map((item) => (
                <Quality key={item._id} {...item} />
            ))}
        </>
    )
}

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
}

export default QualitiesList
