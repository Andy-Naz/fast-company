import React from "react"
import PropTypes from "prop-types"
import Quality from "./quality"
import { useQualities } from "../../../hooks/useQualities"

const QualitiesList = ({ idList }) => {
    const { isLoading, getQualities } = useQualities()
    const qualities = getQualities(idList)
    if (!isLoading) {
        return (
            <>
                {qualities.map((qual) => (
                    <Quality key={qual._id} {...qual} />
                ))}
            </>
        )
    } else return "Loading..."
}

QualitiesList.propTypes = {
    idList: PropTypes.array
}

export default QualitiesList
