import { createAction, createSlice } from "@reduxjs/toolkit"
import userService from "../services/user.service"
import authService from "../services/auth.service"
import localStorageService from "../services/localStorage.service"

const usersSlice = createSlice({
    name: "users",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        auth: null,
        isLoggedIn: false // косяк
    },
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true
        },
        usersReceived: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        usersRequestFailed: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        authRequestSuccess: (state, action) => {
            state.auth = { ...action.payload, isLoggedIn: true } // или тут косяк
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload
        }
    }
})

const { reducer: usersReducer, actions } = usersSlice
const { usersRequested, usersReceived, usersRequestFailed, authRequestSuccess, authRequestFailed } = actions

const authRequested = createAction("users/authRequested")
export const singUp =
    ({ email, password, ...rest }) =>
        async (dispatch) => {
            dispatch(authRequested)
            try {
                const data = await authService.register({ email, password })
                localStorageService.setTokens(data)
                dispatch(authRequestSuccess({ userId: data.localId }))
            } catch (error) {
                dispatch(authRequestFailed(error.message))
            }
        }

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested())
    try {
        const { content } = await userService.get()
        dispatch(usersReceived(content))
    } catch (error) {
        dispatch(usersRequestFailed(error.message))
    }
}

export const getUsersList = () => (state) => state.users.entities

export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((u) => u._id === userId)
    }
}

export const getUsers = () => (state) => state.users.entities
export const getUsersLoadingStatus = () => (state) => state.users.isLoading

export default usersReducer
