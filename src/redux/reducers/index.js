import { combineReducers } from 'redux';

import userReducer from "./userReducer";
import conversationsReducer from "./conversationsReducer";
import currentConversationReducer from "./currentConversationReducer";
import socialNetworkReducer from './socialNetworkReducer';

const rootReducer = combineReducers({
    userInfos: userReducer,
    conversations: conversationsReducer,
    currentConversation: currentConversationReducer,
    socialNetwork: socialNetworkReducer
})

export default rootReducer;