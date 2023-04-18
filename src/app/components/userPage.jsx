import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import PropTypes from "prop-types"
import QualitiesList from "./qualitiesList"
import api from "../api"

const UserPage = ({ id }) => {
    console.log(id)
    const [user, setUser] = useState()

    useEffect(() => {
        api.users.getById(id).then((user) => setUser(user))
    }, [])

    useEffect(() => {
        console.log(user)
    }, [user])

    const history = useHistory()

    const handleBackToUsers = () => {
        history.push("/users")
    }

    if (user) {
        return (
            <>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession}</h2>
                <QualitiesList qualities={user.qualities} />
                <h3>{user.completedMeetings}</h3>
                <h2>{user.rate}</h2>
                <button onClick={() => handleBackToUsers()}>Все пользователи</button>
            </>
        )
    }
    return "...loading"
}

UserPage.propTypes = {
    id: PropTypes.string.isRequired
}

export default UserPage
