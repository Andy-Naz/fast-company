import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import PropTypes from "prop-types"
import QualitiesList from "../../ui/qualities/qualitiesList"
import api from "../../../api"

const UserPage = ({ userId }) => {
    const [user, setUser] = useState()

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data))
    }, [])

    const history = useHistory()

    const handleEditUsers = () => {
        history.push(`/users/${userId}/edit`)
    }

    if (user) {
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
    userId: PropTypes.string.isRequired
}

export default UserPage
