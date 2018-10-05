import { SET_CURRENT_CONVERSATIONS, PUSH_MESSAGE } from "../actions";

function currentConversationReducer(state = {}, action) {

    switch(action.type){
        case SET_CURRENT_CONVERSATIONS:

            return action.currentConversation;

        case PUSH_MESSAGE:

            let newState = {...state};

            if(Boolean(state.MESSAGES)){
                newState.MESSAGES.push(action.message);
            }

            return newState;

        default:
            return state;
    }

};

export default currentConversationReducer;