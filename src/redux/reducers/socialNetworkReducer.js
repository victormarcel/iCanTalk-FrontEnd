import { 
    SET_ONLINE_USERS_COUNT,
    ADD_ONLINE_USER,
    REMOVE_ONLINE_USER,
    RESET_ONLINE_USERS
} from "../actions";

const INITIAL_STATE = {
    onlineUsersCount: 0,
    onlineUsers: []
}

function socialNetworkReducer(state = INITIAL_STATE, action) {

    let newState;

    switch(action.type){
        case SET_ONLINE_USERS_COUNT:

            newState = {...state};
            newState.onlineUsersCount = action.onlineUsersCount;

            return newState;

        case ADD_ONLINE_USER:

            newState = {...state};
            let user = action.user;

            if(Array.isArray(user)){
                newState.onlineUsers = newState.onlineUsers.concat(user);
            } else {
                newState.onlineUsers.unshift(user);
            }

            return newState;

        case REMOVE_ONLINE_USER:

            newState = {...state};
            let onlineUsers = newState.onlineUsers;

            onlineUsers.map((user, index) => {

                if(user.ID_USUARIO == action.userId){

                    onlineUsers.splice(index, 1);
                    return;

                }

            });

            return newState;

        case RESET_ONLINE_USERS:
            
            newState = {...state};
            newState.onlineUsers = [];

            return newState;

        default:
            return state;
    }

};

export default socialNetworkReducer;