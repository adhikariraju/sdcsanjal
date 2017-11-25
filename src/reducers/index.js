import {combineReducers} from 'redux'
import {reducer as reduxFormReducer} from 'redux-form'
import {routerReducer} from 'react-router-redux'
import {loginReducer} from './loginReducer'
import {postReducer} from './postReducer'
import {registerReducer} from './registerReducer'
import {saveUserReducer} from './saveUserReducer'
export const reducer=combineReducers({
    routing:routerReducer,
    registerReducer:registerReducer,
    loginReducer:loginReducer,
    form:reduxFormReducer,
    postReducer:postReducer,
    userDetail:saveUserReducer
});