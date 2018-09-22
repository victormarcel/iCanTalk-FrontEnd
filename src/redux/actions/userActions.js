export const SET_IS_REGISTERED_USER = "SET_IS_REGISTERED_USER";
export const setIsRegisteredUser = isRegisteredUser => ({
    type: SET_IS_REGISTERED_USER,
    isRegisteredUser
});

export const SET_USER_INFOS = "SET_USER_INFOS";
export const setUserInfos = userInfos => ({
    type: SET_USER_INFOS,
    userInfos
});