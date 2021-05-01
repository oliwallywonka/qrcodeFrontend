import React, { useReducer } from 'react';
import modalReducer from './modalReducer';
import modalContext from './modalContext';

import { MODAL_SHOW,MODAL_HIDE} from '../../types';

const ModalState = props => {
    const initialState = {
        visible: false,
        name: '',
        payload:null
    }

    const [ state, dispatch ] = useReducer(modalReducer, initialState);

    // Funciones
    const showModal = (payload=null,name='') => {
        dispatch({
            type: MODAL_SHOW,
            payload: payload,
            name: name
        });

    }

    const hideModal = () => {
        dispatch({
            type:MODAL_HIDE,
        })
    }


    return (
        <modalContext.Provider
            value={{
                visible: state.visible,
                name: state.name,
                payload: state.payload,
                showModal,
                hideModal
            }}
        > 
            {props.children}
        </modalContext.Provider>
    )
}

export default ModalState;