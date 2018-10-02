import React from 'react';
import { Provider } from 'react-redux'
import { store } from "./store";

import ICanTakApp from "./src/ICanTalkApp";

const App = () => (

    <Provider store = { store }>
        <ICanTakApp/>
    </Provider>

)

export default App;