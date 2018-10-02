import { SET_CURRENT_CONVERSATIONS } from "../actions";

function currentConversationReducer(state = {}, action) {

    switch(action.type){
        case SET_CURRENT_CONVERSATIONS:

            return action.currentConversation;

        default:
            return state;
    }

};

export default currentConversationReducer;