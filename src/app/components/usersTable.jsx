import React from "react"
// import TableHeader from "./tableHeader"
// import TableBody from "./tableBody"
import BookMark from "./bookmark"
import QualitiesList from "./qualitiesList"
import PropTypes from "prop-types"
import Table from "./table"

const UserTable = ({ users, onSort, selectedSort, onToggleBookMark, onDelete, ...rest }) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: { name: "Качества", component: (user) => <QualitiesList qualities={user.qualities} /> },
        profession: { path: "profession.name", name: "Профессия" },
        completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => <BookMark status={user.bookmark} onClick={() => onToggleBookMark(user._id)} />
        },
        delete: {
            component: (user) => (
                <button onClick={() => onDelete(user._id)} className="btn btn-danger">
                    delete
                </button>
            )
        }
    }

    return (
        <Table onSort={onSort} selectedSort={selectedSort} columns={columns} data={users} />
        // <table className="table">
        //     <TableHeader {...{ onSort, selectedSort, columns }} />
        //     <TableBody {...{ data: users, columns }} />
        // </table>
    )
}

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default UserTable
