import { createAction, createSlice } from "@reduxjs/toolkit"
import commentService from "../services/comment.service"
import { nanoid } from "nanoid"
import localStorageService from "../services/localStorage.service"

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload)
        }
    }
})

const commentCreateRequested = createAction("comments/commentCreateRequested")
const commentCreateFailed = createAction("comments/commentCreateFailed")

const { reducer: commentsReducer, actions } = commentsSlice
const { commentsRequested, commentsReceived, commentsRequestFailed, commentCreated } = actions

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested())
    try {
        const { content } = await commentService.getComments(userId)
        dispatch(commentsReceived(content))
    } catch (error) {
        dispatch(commentsRequestFailed(error.message))
    }
}

export const createComment = (data, userId) => async (dispatch) => {
    dispatch(commentCreateRequested())
    const currentUserId = localStorageService.getUserId()
    const comment = {
        ...data,
        _id: nanoid(),
        pageId: userId,
        created_at: Date.now(),
        userId: currentUserId
    }
    try {
        const { content } = await commentService.createComment(comment)
        dispatch(commentCreated(content))
    } catch (error) {
        dispatch(commentCreateFailed(error.message))
    }
}

export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading

export default commentsReducer
