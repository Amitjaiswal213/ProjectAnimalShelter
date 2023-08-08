import axios from 'axios'


import {
    ALL_INJURYDISEASE_REQUEST,
    ALL_INJURYDISEASE_SUCCESS,
    ALL_INJURYDISEASE_FAIL,

    NEW_INJURYDISEASE_REQUEST,
    NEW_INJURYDISEASE_SUCCESS,
    NEW_INJURYDISEASE_FAIL,

        
    UPDATE_INJURYDISEASE_REQUEST,
    UPDATE_INJURYDISEASE_SUCCESS,
    UPDATE_INJURYDISEASE_FAIL,

    INJURYDISEASE_DETAILS_REQUEST,
    INJURYDISEASE_DETAILS_SUCCESS,
    INJURYDISEASE_DETAILS_FAIL,

    
    DELETE_INJURYDISEASE_REQUEST,
    DELETE_INJURYDISEASE_SUCCESS,
    DELETE_INJURYDISEASE_FAIL,

    CLEAR_ERRORS 
} from '../constants/injurydiseasesConstant'


// Get all injurydiseases
export const allInjuryDiseases = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_INJURYDISEASE_REQUEST })

        const { data } = await axios.get('/api/v1/admin/injurydiseases')

        dispatch({
            type: ALL_INJURYDISEASE_SUCCESS,
            payload: data.injurydiseases
        })

    } catch (error) {
        dispatch({
            type: ALL_INJURYDISEASE_FAIL,
            payload: error.response.data.message
        })
    }
}


export const newInjuryDiseases = (injurydiseasesData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_INJURYDISEASE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                
            }
        }

        const { data } = await axios.post(`/api/v1/admin/injurydiseases/new`, injurydiseasesData, config)

        dispatch({
            type: NEW_INJURYDISEASE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_INJURYDISEASE_FAIL,
            payload: error.response.data.message
        })
    }
}


export const updateInjuryDiseases = (id, injurydiseasesData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_INJURYDISEASE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/injurydiseases/${id}`, injurydiseasesData, config)

        dispatch({
            type: UPDATE_INJURYDISEASE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_INJURYDISEASE_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getInjuryDiseasesDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: INJURYDISEASE_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/admin/injurydiseases/${id}`)

        dispatch({
            type: INJURYDISEASE_DETAILS_SUCCESS,
            payload: data.injurydiseases
        })

    } catch (error) {
        dispatch({
            type: INJURYDISEASE_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteInjuryDiseases = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_INJURYDISEASE_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/injurydiseases/${id}`)

        dispatch({
            type: DELETE_INJURYDISEASE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_INJURYDISEASE_FAIL,
            payload: error.response.data.message
        })
    }
}




export const clearErrors = () => async (dispatch) =>{
	dispatch({
		type: CLEAR_ERRORS

	})
}