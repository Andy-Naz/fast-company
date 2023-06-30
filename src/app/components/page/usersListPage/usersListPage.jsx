import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { paginate } from "../../../utils/paginate"
import Pagination from "../../common/pagination"
import api from "../../../api"
import GroupList from "../../common/groupList"
import SearchStatus from "../../ui/searchStatus"
import UserTable from "../../ui/usersTable"
import _ from "lodash"
import { useUser } from "../../../hooks/useUsers"

const UsersListPage = () => {
    const { users } = useUser()
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfession] = useState()
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" })
    const pageSize = 8

    const handleDelete = (userId) => {
        // setUsers(users.filter((user) => user._id !== userId));
        console.log(userId)
    }
    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark }
            }
            return user
        })
        // setUsers(newArray);
        console.log(newArray)
    }

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data))
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf, searchQuery])

    const handleProfessionSelect = (item) => {
        setSearchQuery("")
        setSelectedProf(item)
    }

    const handleSearchQuery = ({ target }) => {
        setSelectedProf()
        setSearchQuery(target.value)
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const handleSort = (item) => {
        setSortBy(item)
    }

    const clearFilter = () => {
        setSelectedProf()
        setSearchQuery("")
    }

    if (users) {
        console.log(users)
        let filteredUsers = null
        if (searchQuery) {
            filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
        } else if (selectedProf) {
            filteredUsers = users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
        } else {
            filteredUsers = users
        }

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

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Поиск по имени..."
                        value={searchQuery}
                        onChange={handleSearchQuery}
                    ></input>

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
    return "Loading..."
}

UsersListPage.propTypes = {
    user: PropTypes.object
}

export default UsersListPage
