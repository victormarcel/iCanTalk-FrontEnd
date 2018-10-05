export const SET_CURRENT_CONVERSATIONS = "SET_CURRENT_CONVERSATIONS";
export const setCurrentConversation = currentConversation => ({
    type: SET_CURRENT_CONVERSATIONS,
    currentConversation
});

export const PUSH_MESSAGE = "PUSH_MESSAGE";
export const pushMessageToCurrentConversation = message => ({
    type: PUSH_MESSAGE,
    message
});