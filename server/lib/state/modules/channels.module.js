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
};
module.exports = channels;
