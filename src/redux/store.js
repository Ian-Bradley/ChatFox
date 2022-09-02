/*=================================================
    BLOCK: PERSIST
===================================================*/
import persistedReducer from './root.reducer.js';
import {
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

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

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(saga),
});

saga.run(messagesSaga);
const persistor = persistStore(store);

export { store, persistor };
