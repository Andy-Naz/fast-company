import axios from "axios"

export const httpAuth = axios.create({
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
})

const singUpURL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp"
const logInURL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword"

const authService = {
    register: async ({ email, password }) => {
        const { data } = await httpAuth.post(singUpURL, { email, password, returnSecureToken: true })
        return data
    },
    login: async ({ email, password }) => {
        const { data } = await httpAuth.post(logInURL, { email, password, returnSecureToken: true })
        return data
    }
}

export default authService
