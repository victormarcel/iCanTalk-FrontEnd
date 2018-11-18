export const SET_ONLINE_USERS_COUNT = "SET_ONLINE_USERS_COUNT";
export const setOnlineUsersCount = onlineUsersCount => ({
    type: SET_ONLINE_USERS_COUNT,
    onlineUsersCount
});

export const ADD_ONLINE_USER = "ADD_ONLINE_USER";
export const addOnlineUser = user => ({
    type: ADD_ONLINE_USER,
    user
});

export const REMOVE_ONLINE_USER = "REMOVE_ONLINE_USER";
export const removeOnlineUser = userId => ({
    type: REMOVE_ONLINE_USER,
    userId
});

export const RESET_ONLINE_USERS = "RESET_ONLINE_USERS";
export const resetOnlineUsers = () => ({
    type: RESET_ONLINE_USERS
});