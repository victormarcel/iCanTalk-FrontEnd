import { combineReducers } from 'redux';

import userReducer from "./userReducer";

const rootReducer = combineReducers({
    userInfos: userReducer
})

export default rootReducer;