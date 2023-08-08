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
    NEW_ANIMAL_RESET,
    NEW_ANIMAL_FAIL,

    UPDATE_ANIMAL_REQUEST,
    UPDATE_ANIMAL_SUCCESS,
    UPDATE_ANIMAL_RESET,
    UPDATE_ANIMAL_FAIL,

    ANIMAL_INFO_REQUEST,
    ANIMAL_INFO_SUCCESS,
    ANIMAL_INFO_FAIL,


    DELETE_ANIMAL_REQUEST,
    DELETE_ANIMAL_SUCCESS,
    DELETE_ANIMAL_RESET,
    DELETE_ANIMAL_FAIL,

    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,


    CLEAR_ERRORS,

} from '../constants/animalsConstant'

//Show All
export const animalsReducer = (state = { animals: [] }, action) => {
	switch(action.type) {

		case ALL_ANIMALS_REQUEST:
			return {
				loading: true,
				animals: []
			}

		case ALL_ANIMALS_SUCCESS:
			return {
				loading:false,
				animals: action.payload.animals,
				animalsCount: action.payload.animalsCount,
				resPerPage: action.payload.resPerPage,
				filteredAnimalsCount: action.payload.filteredAnimalsCount
			}

		case ALL_ANIMALS_FAIL:
			return {
				loading:false,
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




export const animalsDetailsReducer = (state = { animals: {} }, action) => {
    switch (action.type) {

        case ANIMALS_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ANIMALS_DETAILS_SUCCESS:
            return {
                loading: false,
                animals: action.payload
            }

        case ANIMALS_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
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


export const allAdminAnimalsReducer = (state = { animals: [] }, action) => {
    switch (action.type) {

        case ALL_ADMIN_ANIMALS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ALL_ADMIN_ANIMALS_SUCCESS:
            return {
                ...state,
                loading: false,
                animals: action.payload
            }

        case ALL_ADMIN_ANIMALS_FAIL:
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

//CREATE ANIMAL
export const newAnimalsReducer = (state = { animals: {} }, action) => {
    switch (action.type) {

        

        case NEW_ANIMAL_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_ANIMAL_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                animals: action.payload.animals
            }

        case NEW_ANIMAL_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_ANIMAL_RESET:
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



//UPDATE AND DELETE
export const animalAdminReducer = (state = {}, action) => {
    switch (action.type) {

        case UPDATE_ANIMAL_REQUEST:
        case DELETE_ANIMAL_REQUEST:

                return {
                ...state,
                loading: true
            }

        case UPDATE_ANIMAL_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case UPDATE_ANIMAL_RESET:
            return {
                ...state,
                isUpdated: false
            }


        case UPDATE_ANIMAL_FAIL:
        case DELETE_ANIMAL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        
        case DELETE_ANIMAL_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    isDeleted: action.payload
                }
                
        case DELETE_ANIMAL_RESET:
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


export const animalsInfoReducer = (state = { animals: {} }, action) => {
    switch (action.type) {

    
        case ANIMAL_INFO_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ANIMAL_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                animals: action.payload
            }

        case ANIMAL_INFO_FAIL:
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


export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {

        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }

        case NEW_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_REVIEW_RESET:
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