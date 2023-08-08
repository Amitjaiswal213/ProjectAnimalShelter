import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'


import { 
        animalsReducer, 
        animalsDetailsReducer,

        allAdminAnimalsReducer,
        newAnimalsReducer,
        animalAdminReducer,
        animalsInfoReducer,
        newReviewReducer
   } from './reducers/animalsReducer'


import { 
    authReducer,
    userReducer,
    forgotPasswordReducer,
    allUsersReducer,
    userDetailsReducer,

} from './reducers/userReducer'


import { 
    allPersonnelsReducer,
    newPersonnelsReducer,
    personnelsReducer,
    personnelsDetailsReducer

} from './reducers/personnelsReducer'


import { 
    allInjuryDiseasesReducer,
    newInjuryDiseasesReducer,
    injurydiseasesDetailsReducer,
    injurydiseasesReducer,


} from './reducers/injurydiseasesReducers'



import{
    allAdoptersReducer,
    newAdoptersReducer,
    adoptersDetailsReducer,
    adoptersReducer
} from './reducers/adoptersReducer'


//one object that contains all of the reducers
const reducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,


	animals: animalsReducer,
    animalsDetails: animalsDetailsReducer,

    adminAnimalsAll: allAdminAnimalsReducer,
    newAnimals: newAnimalsReducer,
    //update and delete
    animalsAdmin: animalAdminReducer,
    animalsInfo: animalsInfoReducer,

    newReview: newReviewReducer,

    
    

    allPersonnels: allPersonnelsReducer,
    newPersonnels: newPersonnelsReducer,
    personnels: personnelsReducer,
    personnelsDetails: personnelsDetailsReducer,


    allInjury: allInjuryDiseasesReducer,
    newInjury: newInjuryDiseasesReducer,
    injurydiseases: injurydiseasesReducer,
    injurydiseasesDetails: injurydiseasesDetailsReducer,

    
    allAdopters: allAdoptersReducer,
    newAdopters: newAdoptersReducer,
    adoptersDetaisl: adoptersDetailsReducer,
    adopters: adoptersReducer,





})


//Empty Object
let initialState = {


}

//middleware
const middlware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)))






export default store;



