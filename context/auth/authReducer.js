import Cookie from 'js-cookie';

import {
    LOGIN_SUCCESS,
    REVALIDATE,
    LOGIN_ERROR,
    LOGOUT
} from '../../types';

const reducer = (state,action) => {
    switch(action.type){
        case LOGIN_SUCCESS:
            Cookie.set('token',action.payload.token);
            Cookie.set('authenticated',true);
            Cookie.set('user',JSON.stringify(action.payload.user));
            return {
                ...state,
                authenticated: true,
                user: action.payload.user,
                token: action.payload.token
            };
        case LOGIN_ERROR:
            Cookie.remove('token');
            Cookie.remove('authenticated');
            Cookie.remove('user');
            return{
                ...state,
                token:null,
                user: null,
                message: action.payload,
                authenticated: false
            };
        case REVALIDATE:
            return{
                ...state,
                authenticated: action.payload.initialAuthenticated,
                user:action.payload.initialUser,
                token:action.payload.initialToken
            };
        case LOGOUT:
            Cookie.remove('token');
            Cookie.remove('authenticated');
            Cookie.remove('user');
            return{
                ...state,
                token:null,
                user:null,
                authenticated:false
            }
        default:
            return state;
    }
}

export default reducer