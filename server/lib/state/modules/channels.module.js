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
    deleteChannel(id) {
        console.log('deleteCHANNEL ==> this.state.channels: ', this.state.channels);
        this.state.channels = this.state.channels.filter((channel) => channel.id !== id);
        console.log('deleteCHANNEL ==> this.state.channels: ', this.state.channels);
    },
    /*================================================*/
    /*================================================*/
    // METHOD: => setChannelName
    setChannelName(id, name) {
        this.state.channels.map((channel) => {
            if (channel.id === id) {
                channel.name = name;
            }
        });
    },
    /*================================================*/
    /*================================================*/
    // METHOD: => setChannelDescription
    setChannelDescription(id, description) {
        this.state.channels.map((channel) => {
            if (channel.id === id) {
                channel.description = description;
            }
        });
    },
    /*================================================*/
    /*================================================*/
    // METHOD: => setChannelPublic
    setChannelPublic(id) {
        this.state.channels.map((channel) => {
            if (channel.id === id) {
                channel.locked = false;
                channel.password = '';
            }
        });
    },
    /*================================================*/
    /*================================================*/
    // METHOD: => setChannelPrivate
    setChannelPrivate(id, password) {
        this.state.channels.map((channel) => {
            if (channel.id === id) {
                channel.locked = true;
                channel.password = password;
            }
        });
    },
    /*================================================*/
    /*================================================*/
    // METHOD: => setChannelPassword
    setChannelPassword(id, password) {
        this.state.channels.map((channel) => {
            if (channel.id === id) {
                channel.password = password;
            }
        });
    },
    /*================================================*/
    /*================================================*/
    // METHOD: => addUserToChannel
    addUserToChannel(channelID, userName) {
        console.log('addUserToChannel ==> this.state.channels: ', this.state.channels);
        this.state.channels.map((channel) => {
            if (channel.id === channelID) {
                channel.users.push(userName);
            }
        });
        console.log('addUserToChannel ==> this.state.channels: ', this.state.channels);
    },
    /*================================================*/
    /*================================================*/
    // METHOD: => removeUserFromChannel
    removeUserFromChannel(channelID, userName) {
        console.log('removeUserFromChannel ==> this.state.channels: ', this.state.channels);
        this.state.channels.map((channel) => {
            if (channel.id === channelID) {
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
