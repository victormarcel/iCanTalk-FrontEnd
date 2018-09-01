import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'remote-redux-devtools';
import reduxThunk from 'redux-thunk';

import ICanTakApp from "./src/ICanTalkApp";
import rootReducer from "./src/redux/reducers";

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(reduxThunk)
));

const App = () => (

    <Provider store = { store }>
        <ICanTakApp/>
    </Provider>

)

export default App;