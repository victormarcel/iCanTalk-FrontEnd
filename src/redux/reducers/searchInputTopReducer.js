import { SET_SEARCH_INPUT_VALUE } from "../actions";

function searchInputTopReducer(state = "", action) {

    switch(action.type){

        case SET_SEARCH_INPUT_VALUE:
            return action.value;

        default:
            return state;
    }

};

export default searchInputTopReducer;