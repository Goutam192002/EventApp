import { combineReducers } from "redux";

const INITIAL_STATE = {
    title: '',
    description: '',
    createdBy: '',
    invites: []
};

const eventReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state
    }
};

export default combineReducers({
    event: eventReducer
});
