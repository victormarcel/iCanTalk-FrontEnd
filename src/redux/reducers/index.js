import { combineReducers } from 'redux';

import userReducer from "./userReducer";
import conversationsReducer from "./conversationsReducer";
import currentConversationReducer from "./currentConversationReducer";

const rootReducer = combineReducers({
    userInfos: userReducer,
    conversations: conversationsReducer,
    currentConversation: currentConversationReducer
})

export default rootReducer;