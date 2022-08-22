/*================================================
    BLOCK: IMPORTS
==================================================*/


/*================================================
    BLOCK: TRACKING CLASS
==================================================*/

module.exports = class StateTracker {
    constructor() {
        /*================================================
            INNER: STATE
        ==================================================*/

        this.state = {
            log: [],
            users: [],
            messages: [],
            channels: [],
        };

        /*================================================
            INNER: STATE METHODS - Binding
        ==================================================*/

        // State methods - Users
        this.addUser = this.addUser.bind(this);
        this.removeUser = this.removeUser.bind(this);

        // State methods - User Info
        this.setUserName = this.setUserName.bind(this);
        this.setUserNickname = this.setUserNickname.bind(this);
        this.setUserColor = this.setUserColor.bind(this);

        // State methods - Channels
        this.addChannel = this.addChannel.bind(this);
        this.deleteChannel = this.deleteChannel.bind(this);
        this.setChannelName = this.setChannelName.bind(this);
        this.setChannelPublic = this.setChannelPublic.bind(this);
        this.setChannelPrivate = this.setChannelPrivate.bind(this);
        this.setChannelPassword = this.setChannelPassword.bind(this);

        // State methods - Messages
        this.addMessage = this.addMessage.bind(this);

        // State methods - Dev Log
        this.addLogItem = this.addLogItem.bind(this);
    }

    /*================================================
        INNER: STATE METHODS - Users
    ==================================================*/

    // FUNCTION: => addUser
    addUser(user) {
        console.log('user: ', user);
        this.state.users.push(user);
    }

    /*================================================*/
    /*================================================*/

    // FUNCTION: => removeUser
    removeUser(userID) {
        console.log('removeUSER ==> userID: ', userID);
        console.log('removeUSER ==> typeof userID: ', typeof userID);
        console.log('removeUSER ==> FIND USER: ', this.state.users.find((user) => user.id === userID)
        );
        if (this.state.users.find((user) => user.id === userID)) {
            // User exists in array
            console.log('removeUSER ==> User exists in array');
            console.log('removeUSER ==> this.state.users: ', this.state.users);
            this.state.users = this.state.users.filter((user) => user.id !== userID);
            console.log('removeUSER ==> this.state.users: ', this.state.users);
        } else {
            // No user!!
            console.log('removeUSER ==> No user!!');
        }
    }

    /*================================================
        INNER: STATE METHODS - User Info
    ==================================================*/

    // FUNCTION: => setUserName
    setUserName(userID, newName) {
        for (let i = 0; i < this.state.users.length; i++) {
            if (this.state.users[i].id === userID) {
                this.state.users[i].name = newName;
            }
        }
    }

    /*================================================*/
    /*================================================*/

    // FUNCTION: => setUserNickname
    setUserNickname(userID, newNickname) {
        for (let i = 0; i < this.state.users.length; i++) {
            if (this.state.users[i].id === userID) {
                this.state.users[i].nickname = newNickname;
            }
        }
    }

    /*================================================*/
    /*================================================*/

    // FUNCTION: => setUserColor
    setUserColor(userID, newColor) {
        for (let i = 0; i < this.state.users.length; i++) {
            if (this.state.users[i].id === userID) {
                this.state.users[i].color = newColor;
            }
        }
    }

    /*================================================
        INNER: STATE METHODS - Channels
    ==================================================*/

    // FUNCTION: => addChannel
    addChannel(channel) {
        this.state.channels.push(channel);
    }

    /*================================================*/
    /*================================================*/

    // FUNCTION: => deleteChannel
    deleteChannel(channelID) {
        console.log('deleteCHANNEL ==> channelID: ', channelID);
        console.log('deleteCHANNEL ==> typeof channelID: ', typeof channelID);
        console.log('deleteCHANNEL ==> FIND CHANNEL: ', this.state.channels.find((channel) => channel.id === channelID)
        );
        if (this.state.channels.find((user) => user.id === channelID)) {
            console.log('deleteCHANNEL ==> Channel exists in array');
            console.log('deleteCHANNEL ==> this.state.channels: ', this.state.channels);
            this.state.channels = this.state.channels.filter((channel) => channel.id !== channelID);
            console.log('deleteCHANNEL ==> this.state.channels: ', this.state.channels);
        } else {
            console.log('deleteCHANNEL ==> No channel!!');
        }
    }

    /*================================================*/
    /*================================================*/

    // FUNCTION: => setChannelName
    setChannelName(channel, name) {
        for (let i = 0; i < this.state.channels.length; i++) {
            if (this.state.channels[i].id === channel.id) {
                this.state.channels[i].nickname = name;
            }
        }
    }

    /*================================================*/
    /*================================================*/

    // FUNCTION: => setChannelPublic
    setChannelPublic(channel) {
        for (let i = 0; i < this.state.channels.length; i++) {
            if (this.state.channels[i].id === channel.id) {
                this.state.channels[i].locked = false;
            }
        }
    }

    /*================================================*/
    /*================================================*/

    // FUNCTION: => setChannelPrivate
    setChannelPrivate(channel) {
        for (let i = 0; i < this.state.channels.length; i++) {
            if (this.state.channels[i].id === channel.id) {
                this.state.channels[i].locked = true;
            }
        }
    }

    /*================================================*/
    /*================================================*/

    // FUNCTION: => setChannelPassword
    setChannelPassword(channel, password) {
        for (let i = 0; i < this.state.channels.length; i++) {
            if (this.state.channels[i].id === channel.id) {
                this.state.channels[i].password = password;
            }
        }
    }

    /*================================================
        INNER: STATE METHODS - Messages
    ==================================================*/

    // FUNCTION: => addMessage
    addMessage(message) {
        this.state.messages.push(message);
    }

    /*================================================
        INNER: STATE METHODS - Dev Log
    ==================================================*/

    // FUNCTION: => addLogItem
    addLogItem(logItem) {
        this.state.log.push(logItem);
    }
};
