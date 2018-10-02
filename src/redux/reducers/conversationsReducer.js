import { SET_CONVERSATIONS, UPDATE_CONVERSATION } from "../actions";

function conversationsReducer(state = [], action) {

    let conversations;

    switch(action.type){
        //arrumar
        case SET_CONVERSATIONS:
            
            const newState = [...state];
        
            const conversationUserIds = newState.map(conversation => {
                return conversation.SECONDARY_USER_ID;
            })

            action.conversations.forEach(conversation => {

                if(conversationUserIds.indexOf(conversation.SECONDARY_USER_ID) === -1){
                    newState.push(conversation);
                }

            });

            return newState;

        case UPDATE_CONVERSATION:

            conversations = state;

            conversations.forEach((conversation, i) => {

                if(conversation.SECONDARY_USER_ID === action.conversation.SECONDARY_USER_ID){
                    conversations.splice(i, 1);
                }

            });

            conversations.unshift(action.conversation);
            return conversations;

        default:
            return state;
    }

};

export default conversationsReducer;