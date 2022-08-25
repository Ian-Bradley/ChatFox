import messagesSaga from './sagas/messages.saga.js';
import { configureStore } from '@reduxjs/toolkit';
// import storage from 'redux-persist/lib/storage'
// import { persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './root.reducer.js';

const saga = createSagaMiddleware();
const store = configureStore({
    reducer: rootReducer,
    middleware: [saga],
});
saga.run(messagesSaga);

export default store;
