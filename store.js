import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import reduxThunk from 'redux-thunk';

import rootReducer from "./src/redux/reducers";

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(reduxThunk)
));

export { store };