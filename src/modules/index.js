import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import login from './login'

export default combineReducers({
    routing: routerReducer,
    counter,
    login
})