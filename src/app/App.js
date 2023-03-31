import React, { useState } from "react"
import Users from "./components/users"
import api from "./api/index"

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId))
    }

    const handleToggleBookMark = (id) => {
        const newUsers = users.map((user) => {
            if (user._id === id) {
                return {
                    ...user,
                    bookmark: !user.bookmark
                }
            }
            return user
        })
        setUsers(newUsers)
    }

    return (
        <>
            <Users users={users} onDelete={handleDelete} onToggleBookMark={handleToggleBookMark} />
        </>
    )
}

export default App
