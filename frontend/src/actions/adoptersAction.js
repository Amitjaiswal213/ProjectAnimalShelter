import axios from 'axios';

import {

    ALL_ADOPTER_REQUEST,
    ALL_ADOPTER_SUCCESS,
    ALL_ADOPTER_FAIL,

    
    NEW_ADOPTER_REQUEST,
    NEW_ADOPTER_SUCCESS,
    NEW_ADOPTER_FAIL,

    UPDATE_ADOPTER_REQUEST,
    UPDATE_ADOPTER_SUCCESS,
    UPDATE_ADOPTER_FAIL,

    ADOPTER_DETAILS_REQUEST,
    ADOPTER_DETAILS_SUCCESS,
    ADOPTER_DETAILS_FAIL,

    DELETE_ADOPTER_REQUEST,
    DELETE_ADOPTER_SUCCESS,
    DELETE_ADOPTER_FAIL,




    CLEAR_ERRORS 
} from '../constants/adoptersConstant'


// Get all adopters
export const allAdopters = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_ADOPTER_REQUEST })

        const { data } = await axios.get('/api/v1/admin/adopters')

        dispatch({
            type: ALL_ADOPTER_SUCCESS,
            payload: data.adopters
        })

    } catch (error) {
        dispatch({
            type: ALL_ADOPTER_FAIL,
            payload: error.response.data.message
        })
    }
}


export const newAdopters = (adoptersData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_ADOPTER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                
            }
        }

        const { data } = await axios.post(`/api/v1/admin/adopters/create`, adoptersData, config)

        dispatch({
            type: NEW_ADOPTER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_ADOPTER_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getAdoptersDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: ADOPTER_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/admin/adopters/${id}`)

        dispatch({
            type: ADOPTER_DETAILS_SUCCESS,
            payload: data.adopters
        })

    } catch (error) {
        dispatch({
            type: ADOPTER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const updateAdopters = (id, adoptersData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_ADOPTER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/adopters/${id}`, adoptersData, config)

        dispatch({
            type: UPDATE_ADOPTER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_ADOPTER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteAdopters = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_ADOPTER_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/adopters/${id}`)

        dispatch({
            type: DELETE_ADOPTER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_ADOPTER_FAIL,
            payload: error.response.data.message
        })
    }
}



export const clearErrors = () => async (dispatch) =>{
	dispatch({
		type: CLEAR_ERRORS

	})
}
