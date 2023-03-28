import React, { useState } from "react"
import Users from "./components/users"
import SearchStatus from "./components/searchStatus"
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
                    bookmark: !user.bookmark,
                }
            }
            return user
        })
        setUsers(newUsers)
    }

    return (
        <>
            <SearchStatus length={users.length} />
            <Users users={users} onDelete={handleDelete} onBookMark={handleToggleBookMark} />
        </>
    )
}

export default App
