import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import PropTypes from "prop-types"
import api from "../../../api"
import UserInfoCard from "./userInfoCard"
import Comments from "./comments"

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
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserInfoCard user={user} onEdit={handleEditUsers} />
                    </div>
                    <div className="col-md-8">
                        <Comments userId={userId} />
                    </div>
                </div>
            </div>
        )
    }
    return "loading..."
}

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
}

export default UserPage
