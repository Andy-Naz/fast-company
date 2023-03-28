import React, { useState } from "react"
import api from "../api"
import "bootstrap/dist/css/bootstrap.css"

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter((user) => user._id !== userId))
    }
    const renderPhrase = (number) => {
        return number === 0
            ? "Никто с тобой не тусанет"
            : number <= 4 && number > 1
            ? number + " человека тусанут с тобой сегодня"
            : number + " человек тусанет с тобой сегодня"
    }

    return (
        <>
            <span className={users.length > 0 ? "badge fs-4 bg-primary" : "badge fs-4 bg-danger"}>
                {renderPhrase(users.length)}
            </span>

            {users.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>
                                    {user.qualities.map((quality) => (
                                        <span key={quality._id} className={"badge bg-" + quality.color + " me-2"}>
                                            {quality.name}
                                        </span>
                                    ))}
                                </td>
                                <td>{user.profession.name}</td>
                                <td>{user.completedMeetings}</td>
                                <td>{user.rate + "/5"}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user._id)}>
                                        delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}

export default Users
