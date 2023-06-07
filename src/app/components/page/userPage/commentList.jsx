import React from "react"
import Comment from "./comment"
import PropTypes from "prop-types"

const CommentList = ({ comments, onRemove }) => {
    // console.log(comments)
    return (
        <>
            <h2>Comments</h2>
            <hr />
            {comments.map((comment) => (
                <Comment key={comment._id} comment={comment} onRemove={onRemove}/>
            ))}
        </>
    )
}

CommentList.propTypes = {
    comments: PropTypes.array,
    onRemove: PropTypes.func
}

export default CommentList
