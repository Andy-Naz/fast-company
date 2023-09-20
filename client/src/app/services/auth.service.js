import axios from "axios"
import localStorageService from "./localStorage.service"
import configFile from "../config.json"

export const httpAuth = axios.create({
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
})

const baseURLMongoDB = configFile.apiEndpoint.MongoDB

let singUpURL = ""
let logInURL = ""
let tokenURL = ""

if (configFile.isFireBase) {
    singUpURL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp"
    logInURL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword"
    tokenURL = "https://securetoken.googleapis.com/v1/token"
} else {
    singUpURL = baseURLMongoDB + "/auth/" + "signUp"
    logInURL = baseURLMongoDB + "/auth/" + "signInWithPassword"
    tokenURL = baseURLMongoDB + "/auth/" + "token"
}

const authService = {
    register: async ({ email, password }) => {
        const { data } = await httpAuth.post(singUpURL, { email, password, returnSecureToken: true })
        return data
    },
    login: async ({ email, password }) => {
        const { data } = await httpAuth.post(logInURL, { email, password, returnSecureToken: true })
        return data
    },
    refresh: async () => {
        const { data } = await httpAuth.post(tokenURL, {
            grant_type: "refresh_token",
            refresh_token: localStorageService.getRefreshToken()
        })
        return data
    }
}

export default authService
