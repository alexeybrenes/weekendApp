import {
    combineReducers,
} from 'redux';
import axios from "axios";
import data from "./data";
import {push} from "react-router-redux";

//Constants
const
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILURE = 'LOGIN_FAILURE',
    FETCH_ACTIVITY_DATA_SUCCESS = 'FETCH_ACTIVITY_DATA_SUCCESS',
    DELETE_ACTIVITY_SUCCESS = 'DELETE_ACTIVITY_SUCCESS',
    UPDATE_ACTIVITY_SUCCESS = 'UPDATE_ACTIVITY_SUCCESS',
    SAVE_ACTIVITY_SUCCESS = 'SAVE_ACTIVITY_SUCCESS'

//Initial State
const initialState = {
    activeUser: ''
}

//Actions
export const login = (user, password) => {
    return dispatch => {
        return (
            axios.post(`${data.URL}/${data.APP_ID}/${data.API_KEY}/users/login`, {
                "login": user,
                "password": password
            })
                .then(function (response) {
                    console.log(response);
                    dispatch({
                        type: LOGIN_SUCCESS,
                        activeUser: response.data.name
                    })
                    dispatch(push('/main'));
                })
                .catch(function (error) {
                    console.log(error);
                    dispatch({
                        type: LOGIN_FAILURE,
                        error: error.response.data.message
                    })
                })
        )

    }
}

export const fetchActivityData = () => {
    return dispatch => {
        axios.get(`${data.URL}/${data.APP_ID}/${data.API_KEY}/data/activities?sortBy=nextPossibleDate`)
            .then(function (response) {
                dispatch({
                    type: FETCH_ACTIVITY_DATA_SUCCESS,
                    data: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export const createActivity = (activity, date) => {
    return dispatch => {
        axios.post(`${data.URL}/${data.APP_ID}/${data.API_KEY}/data/activities`, {
            'recommendation_reason': activity.recommendation_reason,
            'category': activity.category,
            'name': activity.name,
            'description': activity.description,
            'nextPossibleDate': date,
            'imageUrl': activity.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1024px-No_image_3x4.svg.png'
        })
            .then(response => {
                dispatch({
                    type: SAVE_ACTIVITY_SUCCESS
                })
                dispatch(fetchActivityData())
            })
            .catch(function (error) {
                console.log(error);
            });

    }
}

export const deleteActivity = (objectId) => {
    return dispatch => {
        axios.delete(`${data.URL}/${data.APP_ID}/${data.API_KEY}/data/activities/${objectId}`)
            .then(function(response) {
                dispatch({
                    type: DELETE_ACTIVITY_SUCCESS
                })
                dispatch(fetchActivityData())
            })
            .catch(function (error) {
                console.log(error)
            })
    }
}

export const updateActivity = (activity, date, objectId) => {
    return dispatch => {
        axios.put(`${data.URL}/${data.APP_ID}/${data.API_KEY}/data/activities/${objectId}`, {
            'recommendation_reason': activity.recommendation_reason,
            'category': activity.category,
            'name': activity.name,
            'description': activity.description,
            'nextPossibleDate': date,
            'imageUrl': activity.imageUrl
        })
            .then(response => {
                dispatch({
                    type: UPDATE_ACTIVITY_SUCCESS
                })
                dispatch(fetchActivityData())
            })
            .catch(function (error) {
                console.log(error);
            });

    }
}

//Reducers

export const reducers = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                activeUser: action.activeUser,
                error: false,
                errorMessage: ''
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                error: true,
                errorMessage: action.error
            }
        case FETCH_ACTIVITY_DATA_SUCCESS:
            return {
                ...state,
                gridData: action.data
            }
        case DELETE_ACTIVITY_SUCCESS:
            return {
                ...state
            }
        case UPDATE_ACTIVITY_SUCCESS:
            return {
                ...state
            }
        case SAVE_ACTIVITY_SUCCESS:
            return {
                ...state
            }
        default:
            return state
    }
}

//Selectors
export function getActiveUser(state) {
    return state.app.activeUser
}

export function getGridData(state) {
    return state.app.gridData
}

//Combine Reducers

export const rootReducer = combineReducers({
    app: reducers
});