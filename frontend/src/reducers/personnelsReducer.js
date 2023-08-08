import {
    ALL_PERSONNEL_REQUEST,
    ALL_PERSONNEL_SUCCESS,
    ALL_PERSONNEL_FAIL,

    NEW_PERSONNEL_REQUEST,
    NEW_PERSONNEL_SUCCESS,
    NEW_PERSONNEL_RESET,
    NEW_PERSONNEL_FAIL,

    UPDATE_PERSONNEL_REQUEST,
    UPDATE_PERSONNEL_SUCCESS,
    UPDATE_PERSONNEL_RESET,
    UPDATE_PERSONNEL_FAIL,

    PERSONNEL_DETAILS_REQUEST,
    PERSONNEL_DETAILS_SUCCESS,
    PERSONNEL_DETAILS_FAIL,

    DELETE_PERSONNEL_REQUEST,
    DELETE_PERSONNEL_SUCCESS,
    DELETE_PERSONNEL_RESET,
    DELETE_PERSONNEL_FAIL,


    CLEAR_ERRORS 
} from '../constants/personnelsConstant'


export const allPersonnelsReducer = (state = { personnels: [] }, action) => {
    switch (action.type) {

        case ALL_PERSONNEL_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ALL_PERSONNEL_SUCCESS:
            return {
                ...state,
                loading: false,
                personnels: action.payload
            }

        case ALL_PERSONNEL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}


export const newPersonnelsReducer = (state = { personnels: {} }, action) => {
    switch (action.type) {

        case NEW_PERSONNEL_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_PERSONNEL_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                personnels: action.payload.personnels
            }

        case NEW_PERSONNEL_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_PERSONNEL_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}


export const personnelsDetailsReducer = (state = { personnels: {} }, action) => {
    switch (action.type) {

        case PERSONNEL_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case PERSONNEL_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                personnels: action.payload
            }

        case PERSONNEL_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const personnelsReducer = (state = {}, action) => {
    switch (action.type) {

        case UPDATE_PERSONNEL_REQUEST:
        case DELETE_PERSONNEL_REQUEST:

                return {
                ...state,
                loading: true
            }

        case UPDATE_PERSONNEL_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case UPDATE_PERSONNEL_RESET:
            return {
                ...state,
                isUpdated: false
            }


        case UPDATE_PERSONNEL_FAIL:
        case DELETE_PERSONNEL_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload
            }
        
        case DELETE_PERSONNEL_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
            
        case DELETE_PERSONNEL_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

