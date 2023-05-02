import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { paginate } from "../utils/paginate"
import Pagination from "../components/pagination"
import GroupList from "../components/groupList"
import SearchStatus from "../components/searchStatus"
import UserTable from "../components/usersTable"
import api from "../api"
import _ from "lodash"
import SearchField from "./searchField"

const UsersList = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfession] = useState()
    const [selectedProf, setSelectedProf] = useState()
    const [searchInput, setSearchInput] = useState("")

    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" })
    const pageSize = 4

    const [users, setUsers] = useState()

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data))
    }, [])

    const handleDelete = (id) => {
        setUsers(users.filter((user) => user._id !== id))
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
    }, [selectedProf, searchInput])

    const handleProfessionSelect = (item) => {
        setSearchInput("")
        setSelectedProf(item)
    }

    const handleSearchInput = ({ target }) => {
        setSelectedProf()
        setSearchInput(target.value)
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const handleSort = (item) => {
        setSortBy(item)
    }

    const clearFilter = () => {
        setSelectedProf()
        setSearchInput("")
    }

    if (users) {
        let filteredUsers = null
        if (searchInput) {
            filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchInput.toLowerCase()))
        } else if (selectedProf) {
            filteredUsers = users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
        } else {
            filteredUsers = users
        }

        // const filteredUsers = searchInput
        //     ? users.filter((user) => user.name.toLowerCase().includes(searchInput.toLowerCase()))
        //     : selectedProf
        //         ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
        //         : users

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
                    <SearchField value={searchInput} onChange={handleSearchInput} />

                    {/* <form action="">
                        <input type="text" placeholder="Поиск" value={searchInput} onChange={handleSearchInput}></input>
                    </form> */}

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

UsersList.propTypes = {
    user: PropTypes.object
}

export default UsersList
