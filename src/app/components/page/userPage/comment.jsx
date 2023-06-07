import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import api from "../../../api"

const Comment = ({ comment, onRemove }) => {
    const [user, setUser] = useState()

    useEffect(() => {
        api.users.getById(comment.userId).then((data) => setUser(data))
    }, [])

    const getTimeOfComment = () => {
        const now = new Date()
        const msTimePeriod = now.getTime() - Number(comment.created_at)

        if (msTimePeriod < 60 * 1000) {
            return " - 1 минуту назад"
        } else if (msTimePeriod < 5 * 60 * 1000) {
            return " - 5 минут назад"
        } else if (msTimePeriod < 10 * 60 * 1000) {
            return " - 10 минут назад"
        } else if (msTimePeriod < 30 * 60 * 1000) {
            return " - 30 минут назад"
        } else if (msTimePeriod < 24 * 60 * 60 * 1000) {
            const hours = Math.floor(msTimePeriod / 1000 / 60 / 60)
            const minutes = Math.floor((msTimePeriod - hours * 60 * 60 * 1000) / 1000 / 60)
            return ` - ${hours}:${minutes}`
        } else {
            return " - давно"
        }
    }

    if (user) {
        return (
            <div className="bg-light card-body mb-3">
                <div className="row">
                    <div className="col">
                        <div className="d-flex flex-start ">
                            <img
                                src={`https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
                                    .toString(36)
                                    .substring(7)}.svg`}
                                className="rounded-circle shadow-1-strong me-3"
                                alt="avatar"
                                width="65"
                                height="65"
                            />
                            <div className="flex-grow-1 flex-shrink-1">
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="mb-1 ">
                                            {user.name}
                                            <span className="small">{getTimeOfComment()}</span>
                                        </p>
                                        <button
                                            className="btn btn-sm text-primary d-flex align-items-center"
                                            onClick={() => onRemove(comment._id)}
                                        >
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    </div>
                                    <p className="small mb-0">{comment.content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Comment.propTypes = {
    comment: PropTypes.object,
    onRemove: PropTypes.func
}

export default Comment
