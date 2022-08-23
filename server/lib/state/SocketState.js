/*================================================
    BLOCK: IMPORTS
==================================================*/

const usersModule = require('./modules/users.module.js');
const channelsModule = require('./modules/channels.module.js');

/*================================================
    BLOCK: CLASS
==================================================*/

module.exports = class StateTracker {
    constructor() {
        /*================================================
            INNER: STATE
        ==================================================*/

        this.state = {
            users: [],
            channels: [],
        };

        /*================================================
            INNER: METHOD BINDINGS
        ==================================================*/

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
    }

    /*================================================
        INNER: METHOD BINDINGS
    ==================================================*/

    initData() {
        // ==> db
    }
};
