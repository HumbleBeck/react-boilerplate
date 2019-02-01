import thunk from 'redux-thunk';
import logger from 'redux-logger';
import * as localforage from 'localforage';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import reducers from './reducers';

localforage.config({
    driver: localforage.LOCALSTORAGE,
    name: process.env.APP_NAME,
    version: process.env.APP_VERSION,
    storeName: process.env.LOCALFORAGE_STORE_NAME
});

const persistConfig = {
    key: process.env.PERSIS_KEY,
    storage: localforage,
    // whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, reducers)

const middleware = [thunk];

if (process.env.APP_MODE === 'production') {
    middleware.push(logger);
}



export default () => {
    const store = createStore(
        persistedReducer,
        {},
        applyMiddleware(...middleware)
    );

    const persistor = persistStore(store)

    return { store, persistor };
}
