import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import api from "../../../api"
import AddComment from "./addComment"
import CommentList from "./commentList"
import _ from "lodash"

const Comments = ({ userId }) => {
    const [comments, setComments] = useState()

    useEffect(() => {
        api.comments.fetchCommentsForUser(userId).then((data) => setComments(data))
    }, [])

    const handleRemoveComment = (commentId) => {
        api.comments.remove(commentId).then((id) => setComments(comments.filter((x) => x._id !== id)))
    }

    const handleSubmit = (data) => {
        api.comments.add({ ...data, pageId: userId }).then((data) => setComments([...comments, data]))
    }

    const sortedComments = _.orderBy(comments, ["created_at"], ["desc"])

    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <AddComment onSubmit={handleSubmit} />
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    {sortedComments.length > 0 && (
                        <CommentList comments={sortedComments} onRemove={handleRemoveComment} />
                    )}
                </div>
            </div>
        </>
    )
}

Comments.propTypes = {
    userId: PropTypes.string.isRequired
}

export default Comments
