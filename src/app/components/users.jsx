import React, { useState, useEffect } from "react"
import { paginate } from "../utils/paginate"
import Pagination from "./pagination"
import GroupList from "./groupList"
import SearchStatus from "./searchStatus"
import UserTable from "./usersTable"
import api from "../api"
import _ from "lodash"

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfession] = useState()
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" })
    const pageSize = 8

    const [users, setUsers] = useState()

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data))
    }, [])

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

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data))
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf])

    const handleProfessionSelect = (item) => {
        setSelectedProf(item)
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const handleSort = (item) => {
        setSortBy(item)
    }

    const clearFilter = () => {
        setSelectedProf()
    }

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
            : users
        const count = filteredUsers.length

        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])

        const userCrop = paginate(sortedUsers, currentPage, pageSize)

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                            selectedItem={selectedProf}
                        />
                        <button onClick={clearFilter} className="btn btn-secondary mt-2">
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    {count > 0 && (
                        <UserTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onToggleBookMark={handleToggleBookMark}
                            onDelete={handleDelete}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        )
    }
    return "loading..."
}

export default Users
