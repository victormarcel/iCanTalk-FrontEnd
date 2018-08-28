import { SET_IS_REGISTERED_USER } from "../actions";

function userReducer(state = false, action) {

    switch(action.type){
        case SET_IS_REGISTERED_USER:
            return action.isRegisteredUser;
        default:
            return state;
    }

};

export default userReducer;