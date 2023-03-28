import React, { useState } from "react"
import api from "../api"
import "bootstrap/dist/css/bootstrap.css"

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter((user) => user._id !== userId))
    }
    const renderPhrase = (number) => {
        return number <= 4 && number > 1
            ? number + " человека тусанет с тобой сегодня"
            : number + " человек тусанет с тобой сегодня"
    }

    if (users.length === 0) {
        return (
            <span className="badge bg-danger fs-4">
                Никто с тобой не тусанет
            </span>
        )
    }

    return (
        <>
            <span className="badge bg-primary fs-4">
                {renderPhrase(users.length)}
            </span>
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
                        //с этого места вылезает ошибка, не могу отловить
                        //Warning: Each child in a list should have a unique "key" prop.
                        //вроде бы везде прописаны уникальные key
                        <tr>
                            <td key={user.name}>{user.name}</td>
                            <td>
                                {user.qualities.map((quality) => (
                                    <span
                                        className={
                                            "badge bg-" +
                                            quality.color +
                                            " me-2"
                                        }
                                    >
                                        {quality.name}
                                    </span>
                                ))}
                            </td>
                            <td key={user.profession.name}>
                                {user.profession.name}
                            </td>
                            <td key={user.completedMeetings}>
                                {user.completedMeetings}
                            </td>
                            <td key={user.rate}>{user.rate + "/5"}</td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(user._id)}
                                >
                                    delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Users