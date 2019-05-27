import { combineReducers } from "redux";
import { AsyncStorage } from 'react-native';

const INITIAL_STATE = {
    user: AsyncStorage.getItem('user'),
    authToken: AsyncStorage.getItem('authToken')
};

const userReducer = (state = INITIAL_STATE, action) => {
    if (action.type === 'add') {
        return Object.assign({}, state, {
            user: action.payload
        });
    } else {
        return state;
    }
};

export default combineReducers({
    user: userReducer
})