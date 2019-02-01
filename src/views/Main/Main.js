import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import createStore from '../../store';

const { store, persistor } = createStore();

const Main = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <div>Main</div>
        </PersistGate>
    </Provider>
);

export default Main;