import axios from 'axios';

import { 
    ALL_ANIMALS_REQUEST,
    ALL_ANIMALS_SUCCESS, 
    ALL_ANIMALS_FAIL,

    ANIMALS_DETAILS_REQUEST,
	ANIMALS_DETAILS_SUCCESS,
	ANIMALS_DETAILS_FAIL,

    ALL_ADMIN_ANIMALS_REQUEST,
	ALL_ADMIN_ANIMALS_SUCCESS, 
    ALL_ADMIN_ANIMALS_FAIL,

    NEW_ANIMAL_REQUEST,
    NEW_ANIMAL_SUCCESS,
    NEW_ANIMAL_FAIL,

    UPDATE_ANIMAL_REQUEST,
    UPDATE_ANIMAL_SUCCESS,
    UPDATE_ANIMAL_FAIL,

    ANIMAL_INFO_REQUEST,
    ANIMAL_INFO_SUCCESS,
    ANIMAL_INFO_FAIL,

        
    DELETE_ANIMAL_REQUEST,
    DELETE_ANIMAL_SUCCESS,
    DELETE_ANIMAL_FAIL,

    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,



    CLEAR_ERRORS
   } from '../constants/animalsConstant'

//Animal Show all in frontpage
export const getAnimals = (currentPage = 1, keyword='', breed, sex, age) => async (dispatch) => {
    
    try {

        dispatch({
            type: ALL_ANIMALS_REQUEST
        })

    
        let link = `/api/v1/home/animals?keyword=${keyword}&page=${currentPage}`


        
        if(breed){
            link = `/api/v1/home/animals?keyword=${keyword}&page=${currentPage}&breed=${breed}`
        }

        if(sex){
            link = `/api/v1/home/animals?keyword=${keyword}&page=${currentPage}&sex=${sex}`
        }

        if(age){
            link = `/api/v1/home/animals?keyword=${keyword}&page=${currentPage}&age=${age}`
        }



        const {data} = await axios.get(link)


        dispatch({
            type: ALL_ANIMALS_SUCCESS,
            payload: data
        })

    } catch(error) {

        dispatch({
            type: ALL_ANIMALS_FAIL,
            payload: error.response.data.message
        })
    }
}

//Animal Click Detail
export const getAnimalsDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: ANIMALS_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/animals/${id}`)

        dispatch({
            type: ANIMALS_DETAILS_SUCCESS,
            payload: data.animals

        })
    } catch (error) {
        dispatch({
            type: ANIMALS_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get all animals
export const allAdminAnimals = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_ADMIN_ANIMALS_REQUEST })

        const { data } = await axios.get('/api/v1/admin/animals')

        dispatch({
            type: ALL_ADMIN_ANIMALS_SUCCESS,
            payload: data.animals
        })

    } catch (error) {
        dispatch({
            type: ALL_ADMIN_ANIMALS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const newAnimals = (animalsData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_ANIMAL_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                
            }
        }

        const { data } = await axios.post(`/api/v1/admin/animals/create`, animalsData, config)

        dispatch({
            type: NEW_ANIMAL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_ANIMAL_FAIL,
            payload: error.response.data.message
        })
    }
}


export const updateAnimals = (id, animalsData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_ANIMAL_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/animals/${id}`, animalsData, config)

        dispatch({
            type: UPDATE_ANIMAL_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_ANIMAL_FAIL,
            payload: error.response.data.message
        })
    }
}



export const getAnimalsInfo = (id) => async (dispatch) => {
    try {

        dispatch({ type: ANIMAL_INFO_REQUEST })
        const { data } = await axios.get(`/api/v1/admin/animals/${id}`)

        dispatch({
            type: ANIMAL_INFO_SUCCESS,
            payload: data.animals
        })

    } catch (error) {
        dispatch({
            type: ANIMAL_INFO_FAIL,
            payload: error.response.data.message
        })
    }
}



export const deleteAnimals = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_ANIMAL_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/animals/${id}`)

        dispatch({
            type: DELETE_ANIMAL_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_ANIMAL_FAIL,
            payload: error.response.data.message
        })
    }
}




export const newReview = (reviewData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_REVIEW_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/animals/review`, reviewData, config)

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}







export const clearErrors = () => async (dispatch) =>{
	dispatch({
		type: CLEAR_ERRORS

	})
}


