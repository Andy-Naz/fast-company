import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import PropTypes from "prop-types"
import QualitiesList from "../../ui/qualities/qualitiesList"
import api from "../../../api"
import EditForm from "../../ui/editForm"

const UserPage = ({ id }) => {
    const [user, setUser] = useState()
    const params = useParams()
    const { edit } = params

    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data))
    }, [])

    const history = useHistory()

    const handleEditUsers = () => {
        history.push(`/users/${id}/edit`)
    }

    if (user) {
        if (edit) {
            return <EditForm user={user} />
        }
        return (
            <>
                <h1>{user.name}</h1>
                <h2>Email: {user.email}</h2>
                <h2>Профессия: {user.profession.name}</h2>
                <QualitiesList qualities={user.qualities} />
                <h6>completedMeetings: {user.completedMeetings}</h6>
                <h5>Пол: {user.sex}</h5>
                <h2>Rate: {user.rate}</h2>
                <button onClick={handleEditUsers}>Изменить</button>
            </>
        )
    }
    return "loading..."
}

UserPage.propTypes = {
    id: PropTypes.string.isRequired
}

export default UserPage
