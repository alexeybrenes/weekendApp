import axios from 'axios';
import data from '../data';
import { push } from 'react-router-redux'
export const LOGIN = 'login/LOGIN';

const initialState = {
    activeUser: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                activeUser: action.activeUser
            }

        default:
            return state
    }
}

export const login = (user, password) => {
    return dispatch => {
        return (
            axios.post(`${data.URL}/${data.APP_ID}/${data.API_KEY}/users/login`, {
                "login": user,
                "password": password
            })
                .then(function (response) {
                    dispatch({
                        type: LOGIN,
                        activeUser: response.data.name
                    })
                    dispatch(push('/main'));
                })
                .catch(function (error) {
                    console.log(error);
                })
        )

    }
}