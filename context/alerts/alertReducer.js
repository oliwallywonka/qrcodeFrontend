import {ALERT_SHOW, ALERT_HIDE} from '../../types';

const reducer = (state, action) => {
    switch(action.type) {
        case ALERT_SHOW:
            return {
                alert: action.payload
            }
        case ALERT_HIDE:
            return {
                alert: null
            }
        default:
            return state;
    }
}

export default reducer