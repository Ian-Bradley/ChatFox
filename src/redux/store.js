/*=================================================
    BLOCK: PERSIST
===================================================*/
import storage from 'redux-persist/lib/storage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['channels', 'log', 'messages', 'socket', 'users', 'userTotal'],
    whitelist: ['prefs', 'user'],
};
/*=================================================
    BLOCK: SAGA
===================================================*/
import messagesSaga from './sagas/messages.saga.js';
import createSagaMiddleware from 'redux-saga';

const saga = createSagaMiddleware();

/*=================================================
    BLOCK: STORE
===================================================*/
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root.reducer.js';

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(saga),
});

// const store = configureStore({
//     reducer: rootReducer,
//     middleware: [saga],
// });

saga.run(messagesSaga);
const persistor = persistStore(store);

export { store, persistor };
