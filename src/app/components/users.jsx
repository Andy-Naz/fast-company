import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { paginate } from "../utils/paginate"
import Pagination from "./pagination"
import User from "./user"
import GroupList from "./groupList"
import api from "../api"

const Users = ({ users: allUsers, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfession] = useState()
    const [selectedProf, setSelectedProf] = useState()
    const count = allUsers.length
    const pageSize = 4

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data))
    }, [])

    const handleProfessionSelect = (item) => {
        setSelectedProf(item)
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }
    const clearFilter = () => {
        setSelectedProf()
    }

    const filteredUsers = selectedProf ? allUsers.filter((user) => user.profession === selectedProf) : allUsers
    const userCrop = paginate(filteredUsers, currentPage, pageSize)

    return (
        <>
            {professions && (
                <>
                    <GroupList items={professions} onItemSelect={handleProfessionSelect} selectedItem={selectedProf} />
                    <button onClick={clearFilter} className="btn btn-secondary mt-2">Очистить</button>
                </>
            )}
            {count > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {userCrop.map((user) => (
                            <User key={user._id} {...user} {...rest} />
                        ))}
                    </tbody>
                </table>
            )}
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    )
}

Users.propTypes = {
    users: PropTypes.array.isRequired
}

export default Users
