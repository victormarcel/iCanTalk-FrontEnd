export const SET_CONVERSATIONS = "SET_CONVERSATIONS";
export const setConversations = conversations => ({
    type: SET_CONVERSATIONS,
    conversations
});

export const UPDATE_CONVERSATION = "UPDATE_CONVERSATION";
export const updateConversation = conversation => ({
    type: UPDATE_CONVERSATION,
    conversation
});