import logReducer from './slices/log.slice.js';
import userReducer from './slices/user.slice.js';
import usersReducer from './slices/users.slice.js';
import prefsReducer from './slices/prefs.slice.js';
import channelReducer from './slices/channel.slice.js';
import channelsReducer from './slices/channels.slice.js';
import messagesReducer from './slices/messages.slice.js';
import userTotalReducer from './slices/userTotal.slice.js';

const rootReducer = {
    log: logReducer,
    user: userReducer,
    users: usersReducer,
    prefs: prefsReducer,
    channel: channelReducer,
    messages: messagesReducer,
    channels: channelsReducer,
    userTotal: userTotalReducer,
};
export default rootReducer;
