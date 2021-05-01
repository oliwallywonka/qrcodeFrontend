import React,{useReducer} from 'react';
import Cookie from 'js-cookie';

import authReducer from './authReducer';
import authContext from './authContext';

import axiosClient from '../../config/axios';
import tokenAuth from '../../config/token'

import { LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT, REVALIDATE } from 'types';

const AuthState = ({children}) => {

    const initialState = {
        token: null,
        authenticated: false,
        user: null,
        message: null,
        loading: true
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = async ({email,password}) => {
        try {
            const response = await axiosClient.post('/auth/signin',{email,password});
            dispatch({
                type:LOGIN_SUCCESS,
                payload: response.data
            });
            const token = Cookie.get('token');
            if(token) tokenAuth(token);
        } catch (error) {
            const alert = {
                msg: error.response.data.message,
                category: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alert
            });
        }
    }

    const userRevalidate = async(userCredentials) =>{
        dispatch({
            type:REVALIDATE,
            payload: userCredentials
        });
        const token = Cookie.get('token');
        if(token) tokenAuth(token);
    }
    /*const getUserFromTokens = async (payload) =>{
        if(payload.authenticated){
            dispatch({
                type:LOGIN_SUCCESS,
                payload: payload
            })      
        }else{
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }*/
    const logout =async () => {
        dispatch({
            type: LOGOUT
        })
    }
    return (
        <authContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                loading: state.loading,
                message: state.message,
                login,
                logout,
                userRevalidate
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;