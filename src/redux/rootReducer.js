import logReducer from './features/log.feature.js'
import userReducer from './features/user.feature.js'
import usersReducer from './features/users.feature.js'
import channelReducer from './features/channel.feature.js'
import channelsReducer from './features/channels.feature.js'
import messagesReducer from './features/messages.feature.js'
import userTotalReducer from './features/userTotal.feature.js'
import preferencesReducer from './features/preferences.feature.js'

const rootReducer = {
    log: logReducer,
    user: userReducer,
    users: usersReducer,
    messages: messagesReducer,
    channel: channelReducer,
    channels: channelsReducer,
    userTotal: userTotalReducer,
    preferences: preferencesReducer,
}
export default rootReducer