import React, { useEffect } from "react"
import PropTypes from "prop-types"
import Quality from "./quality"
import { useDispatch, useSelector } from "react-redux"
import { getQualities, getQualitiesLoadingStatus, loadQualitiesList } from "../../../store/qualities"

const QualitiesList = ({ qualities }) => {
    const dispatch = useDispatch()

    const isLoading = useSelector(getQualitiesLoadingStatus())
    const qualitiesState = useSelector(getQualities())
    const qualitiesList = qualitiesState.filter((quality) => qualities.includes(quality._id))

    useEffect(() => {
        dispatch(loadQualitiesList())
    }, [])

    if (!isLoading) {
        return (
            <>
                {qualitiesList.map((qual) => (
                    <Quality key={qual._id} {...qual} />
                ))}
            </>
        )
    } else return "Loading..."
}

QualitiesList.propTypes = {
    qualities: PropTypes.array
}

export default QualitiesList
