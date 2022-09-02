/*=================================================
    BLOCK: PERSIST
===================================================*/
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    version: 1,
    storage: storage,
    blacklist: ['channels', 'log', 'loggedIn', 'messages', 'socket', 'users'],
    whitelist: ['prefs', 'user'],
};

/*=================================================
    BLOCK: REDUCERS
===================================================*/
import { combineReducers } from 'redux';
import messagesReducer from './slices/messages.slice.js';
import channelsReducer from './slices/channels.slice.js';
import loggedInReducer from './slices/loggedIn.slice.js';
import socketReducer from './slices/socket.slice.js';
import prefsReducer from './slices/prefs.slice.js';
import usersReducer from './slices/users.slice.js';
import userReducer from './slices/user.slice.js';
import logReducer from './slices/log.slice.js';

const rootReducer = combineReducers({
    messages: messagesReducer,
    channels: channelsReducer,
    loggedIn: loggedInReducer,
    socket: socketReducer,
    prefs: prefsReducer,
    users: usersReducer,
    user: userReducer,
    log: logReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
