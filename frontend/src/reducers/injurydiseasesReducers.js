import {
    ALL_INJURYDISEASE_REQUEST,
    ALL_INJURYDISEASE_SUCCESS,
    ALL_INJURYDISEASE_FAIL,

    
    NEW_INJURYDISEASE_REQUEST,
    NEW_INJURYDISEASE_SUCCESS,
    NEW_INJURYDISEASE_RESET,
    NEW_INJURYDISEASE_FAIL,

    
    UPDATE_INJURYDISEASE_REQUEST,
    UPDATE_INJURYDISEASE_SUCCESS,
    UPDATE_INJURYDISEASE_RESET,
    UPDATE_INJURYDISEASE_FAIL,

    INJURYDISEASE_DETAILS_REQUEST,
    INJURYDISEASE_DETAILS_SUCCESS,
    INJURYDISEASE_DETAILS_FAIL,

    DELETE_INJURYDISEASE_REQUEST,
    DELETE_INJURYDISEASE_SUCCESS,
    DELETE_INJURYDISEASE_RESET,
    DELETE_INJURYDISEASE_FAIL,


    CLEAR_ERRORS 
} from '../constants/injurydiseasesConstant'


export const allInjuryDiseasesReducer = (state = { injurydiseases: [] }, action) => {
    switch (action.type) {

        case ALL_INJURYDISEASE_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ALL_INJURYDISEASE_SUCCESS:
            return {
                ...state,
                loading: false,
                injurydiseases: action.payload
            }

        case ALL_INJURYDISEASE_FAIL:
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


export const newInjuryDiseasesReducer = (state = { injurydiseases: {} }, action) => {
    switch (action.type) {

        case NEW_INJURYDISEASE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_INJURYDISEASE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                injurydiseases: action.payload.injurydiseases
            }

        case NEW_INJURYDISEASE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_INJURYDISEASE_RESET:
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



export const injurydiseasesDetailsReducer = (state = { injurydiseases: {} }, action) => {
    switch (action.type) {

        case INJURYDISEASE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case INJURYDISEASE_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                injurydiseases: action.payload
            }

        case INJURYDISEASE_DETAILS_FAIL:
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



export const injurydiseasesReducer = (state = {}, action) => {
    switch (action.type) {

            
        case UPDATE_INJURYDISEASE_REQUEST:
        case DELETE_INJURYDISEASE_REQUEST:
                return {
                ...state,
                loading: true
            }

        case UPDATE_INJURYDISEASE_SUCCESS:
            
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case UPDATE_INJURYDISEASE_RESET:
            return {
                ...state,
                isUpdated: false
            }


        case UPDATE_INJURYDISEASE_FAIL:
        case DELETE_INJURYDISEASE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case DELETE_INJURYDISEASE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
                
        case DELETE_INJURYDISEASE_RESET:
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
