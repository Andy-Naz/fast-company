import { createSlice } from "@reduxjs/toolkit"
import qualitiesService from "../services/qualities.service"

const qualitiesSlice = createSlice({
    name: "qualities",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        qualitiesRequested: (state) => {
            state.isLoading = true
        },
        qualitiesReceived: (state, action) => {
            state.entities = action.payload
            state.lastFetch = Date.now()
            state.isLoading = false
        },
        qualitiesRequestFailed: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        }
    }
})

const { reducer: qualitiesReducer, actions } = qualitiesSlice
const { qualitiesRequested, qualitiesReceived, qualitiesRequestFailed } = actions

function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true
    }
    return false
}

export const loadQualitiesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().qualities
    if (isOutdated(lastFetch)) {
        dispatch(qualitiesRequested())
        try {
            const { content } = await qualitiesService.get()
            dispatch(qualitiesReceived(content))
        } catch (error) {
            dispatch(qualitiesRequestFailed(error.message))
        }
    }
}

export const getQualities = () => (state) => state.qualities.entities
export const getQualitiesLoadingStatus = () => (state) => state.qualities.isLoading

// export const getQualitiesByIds = (Ids) => (state) => {
//     if (state.qualities.entities) {
//         return state.qualities.entities.filter((quality) => Ids.includes(quality._id))
//     }
//     return []
// }

// export const getQualitiesByIds = (qualitiesIds) => (state) => {
//     if (state.qualities.entities) {
//         const qualitiesArray = []
//         for (const qualId of qualitiesIds) {
//             for (const quality of state.qualities.entities) {
//                 if (quality._id === qualId) {
//                     qualitiesArray.push(quality)
//                     break
//                 }
//             }
//         }
//         return qualitiesArray
//     }
//     return []
// }

export default qualitiesReducer
