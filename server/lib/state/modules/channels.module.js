const channels = {
    /*================================================*/
    /*================================================*/
    // METHOD: => addChannel
    addChannel(channel) {
        this.state.channels.push(channel);
    },
    /*================================================*/
    /*================================================*/
    // METHOD: => deleteChannel
    deleteChannel(channelName) {
        console.log('deleteCHANNEL ==> this.state.channels: ', this.state.channels);
        this.state.channels = this.state.channels.filter((channel) => channel.name !== channelName);
        console.log('deleteCHANNEL ==> this.state.channels: ', this.state.channels);
    },
    /*================================================*/
    /*================================================*/
    // METHOD: => setChannelName
    setChannelName(channelName, newName) {
        this.state.channels.map((channel) => {
            if (channel.name === channelName) {
                channel.name = newName;
            }
        });
    },
    /*================================================*/
    /*================================================*/
    // METHOD: => setChannelDescription
    setChannelDescription(channelName, description) {
        this.state.channels.map((channel) => {
            if (channel.name === channelName) {
                channel.description = description;
            }
        });
    },
    /*================================================*/
    /*================================================*/
    // METHOD: => setChannelPublic
    setChannelPublic(channelName) {
        this.state.channels.map((channel) => {
            if (channel.name === channelName) {
                channel.locked = false;
                channel.password = '';
            }
        });
    },
    /*================================================*/
    /*================================================*/
    // METHOD: => setChannelPrivate
    setChannelPrivate(channelName, password) {
        this.state.channels.map((channel) => {
            if (channel.name === channelName) {
                channel.locked = true;
                channel.password = password;
            }
        });
    },
    /*================================================*/
    /*================================================*/
    // METHOD: => setChannelPassword
    setChannelPassword(channelName, password) {
        this.state.channels.map((channel) => {
            if (channel.name === channelName) {
                channel.password = password;
            }
        });
    },
    /*================================================*/
    /*================================================*/
    // METHOD: => addUserToChannel
    addUserToChannel(channelName, userName) {
        console.log('addUserToChannel ==> this.state.channels: ', this.state.channels);
        this.state.channels.map((channel) => {
            if (channel.name === channelName) {
                channel.users.push(userName);
            }
        });
        console.log('addUserToChannel ==> this.state.channels: ', this.state.channels);
    },
    /*================================================*/
    /*================================================*/
    // METHOD: => removeUserFromChannel
    removeUserFromChannel(channelName, userName) {
        console.log('removeUserFromChannel ==> this.state.channels: ', this.state.channels);
        this.state.channels.map((channel) => {
            if (channel.name === channelName) {
                channel.users = channel.users.filter(
                    (user) => user !== userName
                );
            }
        });
        console.log('removeUserFromChannel ==> this.state.channels: ', this.state.channels);
    },
    /*================================================*/
    /*================================================*/
};
module.exports = channels;
