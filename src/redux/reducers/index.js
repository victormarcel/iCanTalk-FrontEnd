import { combineReducers } from 'redux';

import userReducer from "./userReducer";

const rootReducer = combineReducers({
    isRegisteredUser: userReducer
})

export default rootReducer;