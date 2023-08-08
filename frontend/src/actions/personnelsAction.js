import axios from 'axios'

import {
    ALL_PERSONNEL_REQUEST,
    ALL_PERSONNEL_SUCCESS,
    ALL_PERSONNEL_FAIL,

    NEW_PERSONNEL_REQUEST,
    NEW_PERSONNEL_SUCCESS,
    NEW_PERSONNEL_FAIL,

    UPDATE_PERSONNEL_REQUEST,
    UPDATE_PERSONNEL_SUCCESS,
    UPDATE_PERSONNEL_FAIL,

    PERSONNEL_DETAILS_REQUEST,
    PERSONNEL_DETAILS_SUCCESS,
    PERSONNEL_DETAILS_FAIL,

    DELETE_PERSONNEL_REQUEST,
    DELETE_PERSONNEL_SUCCESS,
    DELETE_PERSONNEL_FAIL,

    CLEAR_ERRORS 
} from '../constants/personnelsConstant'


// Get all personnels
export const allPersonnels = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_PERSONNEL_REQUEST })

        const { data } = await axios.get('/api/v1/admin/personnels')

        dispatch({
            type: ALL_PERSONNEL_SUCCESS,
            payload: data.personnels
        })

    } catch (error) {
        dispatch({
            type: ALL_PERSONNEL_FAIL,
            payload: error.response.data.message
        })
    }
}


export const newPersonnels = (personnelsData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PERSONNEL_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                
            }
        }

        const { data } = await axios.post(`/api/v1/admin/personnels/create`, personnelsData, config)

        dispatch({
            type: NEW_PERSONNEL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_PERSONNEL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updatePersonnels = (id, personnelsData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PERSONNEL_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/personnels/${id}`, personnelsData, config)

        dispatch({
            type: UPDATE_PERSONNEL_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PERSONNEL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getPersonnelsDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: PERSONNEL_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/admin/personnels/${id}`)

        dispatch({
            type: PERSONNEL_DETAILS_SUCCESS,
            payload: data.personnels
        })

    } catch (error) {
        dispatch({
            type: PERSONNEL_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const deletePersonnels = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_PERSONNEL_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/personnels/${id}`)

        dispatch({
            type: DELETE_PERSONNEL_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_PERSONNEL_FAIL,
            payload: error.response.data.message
        })
    }
}



export const clearErrors = () => async (dispatch) =>{
	dispatch({
		type: CLEAR_ERRORS

	})
}
