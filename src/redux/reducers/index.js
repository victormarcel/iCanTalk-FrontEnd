import { combineReducers } from 'redux';

import userReducer from "./userReducer";
import searchInputTopReducer from "./searchInputTopReducer";

const rootReducer = combineReducers({
    userInfos: userReducer,
    searchInputTopValue: searchInputTopReducer
})

export default rootReducer;