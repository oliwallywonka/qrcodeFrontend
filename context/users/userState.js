import React,{ useReducer } from 'react'

import userContext from './userContext';
import userReducer from './'

import{
    USERS_GET,
    USER_CURRENT,
    USER_ADD,
    USER_EDIT,
    USER_DELETE,
    USER_ERROR
} from '../../types/index'

import clientAxios from '../../config/axios';

const UserState = ({children}) => {
    const initialSate = {
        users: [],
        message: null,
        user: null
    }

    const [state,dispatch] = useReducer()
}