import React from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import { getProfessions, getProfessionsLoadingStatus } from "../../store/professions"

const Profession = ({ id }) => {
    const professions = useSelector(getProfessions())
    const professionsLoading = useSelector(getProfessionsLoadingStatus())

    function getProfession(id) {
        return professions.find((p) => p._id === id)
    }
    const prof = getProfession(id)
    if (!professionsLoading) {
        return <p>{prof.name}</p>
    } else return "Loading..."
}
Profession.propTypes = {
    id: PropTypes.string
}
export default Profession
