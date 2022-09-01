import { combineReducers } from 'redux';
import messagesReducer from './slices/messages.slice.js';
import channelsReducer from './slices/channels.slice.js';
import socketReducer from './slices/socket.slice.js';
import prefsReducer from './slices/prefs.slice.js';
import usersReducer from './slices/users.slice.js';
import userReducer from './slices/user.slice.js';
import logReducer from './slices/log.slice.js';

const rootReducer = combineReducers({
    messages: messagesReducer,
    channels: channelsReducer,
    socket: socketReducer,
    prefs: prefsReducer,
    users: usersReducer,
    user: userReducer,
    log: logReducer,
});
export default rootReducer;
