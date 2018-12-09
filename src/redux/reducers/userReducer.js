import { 
    SET_IS_REGISTERED_USER,
    SET_USER_INFOS,
    SET_USER_DESCRIPTION,
    SET_USER_PICTURY
} from "../actions";

var INITIAL_STATE = {
    isRegisteredUser: null,
    name: "",
    phone: "",
    email: "",
    description: "",
    pictureUrl: "",
    fcmToken: ""
}

function userReducer(state = INITIAL_STATE, action) {

    let newState = {};

    switch(action.type){
        case SET_IS_REGISTERED_USER:

            newState = { ...state };
            newState.isRegisteredUser = action.isRegisteredUser;
            return newState;

        case SET_USER_INFOS:

            newState = { ...state };
            newState.id = action.userInfos.id ? action.userInfos.id : "";
            newState.name = action.userInfos.name ? action.userInfos.name : "";
            newState.phone = action.userInfos.phone ? action.userInfos.phone : "";
            newState.email = action.userInfos.email ? action.userInfos.email : "";
            newState.description = action.userInfos.description ? action.userInfos.description : "";
            newState.pictureUrl = action.userInfos.pictureUrl ? action.userInfos.pictureUrl : "";
            newState.fcmToken = action.userInfos.fcmToken ? action.userInfos.fcmToken : "";
            return newState;

        case SET_USER_DESCRIPTION:
        
            newState = { ...state };

            newState.description = action.description;
            return newState;

        case SET_USER_PICTURY:
        
            newState = { ...state };

            newState.pictureUrl = action.picturyUrl;
            return newState;

        default:
            return state;
    }

};

export default userReducer;