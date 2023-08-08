import {

    ALL_ADOPTER_REQUEST,
    ALL_ADOPTER_SUCCESS,
    ALL_ADOPTER_FAIL,

    NEW_ADOPTER_REQUEST,
    NEW_ADOPTER_SUCCESS,
    NEW_ADOPTER_RESET,
    NEW_ADOPTER_FAIL,

    UPDATE_ADOPTER_REQUEST,
    UPDATE_ADOPTER_SUCCESS,
    UPDATE_ADOPTER_RESET,
    UPDATE_ADOPTER_FAIL,

    ADOPTER_DETAILS_REQUEST,
    ADOPTER_DETAILS_SUCCESS,
    ADOPTER_DETAILS_FAIL,

        
    DELETE_ADOPTER_REQUEST,
    DELETE_ADOPTER_SUCCESS,
    DELETE_ADOPTER_RESET,
    DELETE_ADOPTER_FAIL,



    CLEAR_ERRORS 
} from '../constants/adoptersConstant'


export const allAdoptersReducer = (state = { adopters: [] }, action) => {
    switch (action.type) {

        case ALL_ADOPTER_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ALL_ADOPTER_SUCCESS:
            return {
                ...state,
                loading: false,
                adopters: action.payload
            }

        case ALL_ADOPTER_FAIL:
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

export const newAdoptersReducer = (state = { adopters: {} }, action) => {
    switch (action.type) {

        case NEW_ADOPTER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_ADOPTER_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                adopters: action.payload.adopters
            }

        case NEW_ADOPTER_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_ADOPTER_RESET:
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

export const adoptersDetailsReducer = (state = { adopters: {} }, action) => {
    switch (action.type) {

        case ADOPTER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ADOPTER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                adopters: action.payload
            }

        case ADOPTER_DETAILS_FAIL:
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


export const adoptersReducer = (state = {}, action) => {
    switch (action.type) {
        

        case UPDATE_ADOPTER_REQUEST:
        case DELETE_ADOPTER_REQUEST:

                return {
                ...state,
                loading: true
            }

        case UPDATE_ADOPTER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case UPDATE_ADOPTER_RESET:
            return {
                ...state,
                isUpdated: false
            }


        case UPDATE_ADOPTER_FAIL:
        case DELETE_ADOPTER_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case DELETE_ADOPTER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
                
        case DELETE_ADOPTER_RESET:
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
