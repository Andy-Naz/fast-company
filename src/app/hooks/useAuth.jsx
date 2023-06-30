import React, { useState, useContext, useEffect } from "react"
import PropTypes from "prop-types"
import axios from "axios"
import userService from "../services/user.service"
import { toast } from "react-toastify"
import localStorageService, { setTokens } from "../services/localStorage.service"

export const httpAuth = axios.create({
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
})

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState({})
    const [error, setError] = useState(null)

    async function singIn({ email, password }) {
        const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword"
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            })
            setTokens(data)
            getUserData()
            console.log("singIn", data)
        } catch (error) {
            errorCatcher(error)
            const { code, message } = error.response.data.error
            if (code === 400) {
                if (message === "EMAIL_NOT_FOUND") {
                    const errorObject = { email: "Неверный Email" }
                    throw errorObject
                }
                if (message === "INVALID_PASSWORD") {
                    const errorObject = { password: "Неверный пароль" }
                    throw errorObject
                }
            }
        }
    }

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    async function singUp({ email, password, ...rest }) {
        const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp"
        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true })
            setTokens(data)
            console.log("singUp", data)
            await createUser({
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
                ...rest
            })
        } catch (error) {
            errorCatcher(error)
            const { code, message } = error.response.data.error
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = { email: "Пользователь с таким Email уже существует" }
                    throw errorObject
                }
            }
        }
    }

    async function createUser(data) {
        try {
            const { content } = await userService.create(data)
            console.log(content)
            setUser(content)
        } catch (error) {
            errorCatcher(error)
        }
    }

    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser()
            setUser(content)
        } catch (error) {
            errorCatcher(error)
        }
    }

    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData()
        }
    }, [])

    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])

    function errorCatcher(error) {
        const { message } = error.response.data
        setError(message)
    }

    return <AuthContext.Provider value={{ singIn, singUp, currentUser }}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default AuthProvider
