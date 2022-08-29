const usersModule = require('./modules/users.module.js');
const channelsModule = require('./modules/channels.module.js');

module.exports = class StateTracker {
    constructor() {

        this.state = {
            users: [],
            channels: [],
        };

        // Init
        this.initData = this.initData.bind(this);

        // Users
        this.addUser = usersModule.addUser.bind(this);
        this.removeUser = usersModule.removeUser.bind(this);
        
        this.setUserName = usersModule.setUserName.bind(this);
        this.setUserNickname = usersModule.setUserNickname.bind(this);
        this.setUserColor = usersModule.setUserColor.bind(this);

        // Channels
        this.addChannel = channelsModule.addChannel.bind(this);
        this.deleteChannel = channelsModule.deleteChannel.bind(this);

        this.setChannelName = channelsModule.setChannelName.bind(this);
        this.setChannelPublic = channelsModule.setChannelPublic.bind(this);
        this.setChannelPrivate = channelsModule.setChannelPrivate.bind(this);
        this.setChannelPassword = channelsModule.setChannelPassword.bind(this);
        this.setChannelDescription = channelsModule.setChannelDescription.bind(this);

        this.addUserToChannel = channelsModule.addUserToChannel.bind(this);
        this.removeUserFromChannel = channelsModule.removeUserFromChannel.bind(this);
    }
    
    initData() {
        // ==> db
    }
};
