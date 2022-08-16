import { configureStore } from '@reduxjs/toolkit';
// import storage from 'redux-persist/lib/storage'
// import { persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga'
import rootReducer from './rootReducer';




const store = configureStore({
    reducer: rootReducer,
    // middleware: [saga]
});
export default store;
