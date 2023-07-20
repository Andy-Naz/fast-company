import axios from "axios"

export const httpAuth = axios.create({
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
})

const urlSingUp = "https://identitytoolkit.googleapis.com/v1/accounts:signUp"

const authService = {
    register: async ({ email, password }) => {
        const { data } = await httpAuth.post(urlSingUp, { email, password, returnSecureToken: true })
        return data
    }
}

export default authService
