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
    deleteChannel(name) {
        console.log('deleteCHANNEL ==> name: ', name);
        console.log('deleteCHANNEL ==> typeof name: ', typeof name);
        console.log(
            'deleteCHANNEL ==> FIND CHANNEL: ',
            this.state.channels.find((channel) => channel.name === name)
        );
        if (this.state.channels.find((user) => user.name === name)) {
            console.log('deleteCHANNEL ==> Channel exists in array');
            console.log('deleteCHANNEL ==> this.state.channels: ', this.state.channels);
            this.state.channels = this.state.channels.filter((channel) => channel.name !== name);
            console.log('deleteCHANNEL ==> this.state.channels: ', this.state.channels);
        } else {
            console.log('deleteCHANNEL ==> No channel!!');
        }
    },
    /*================================================*/
    /*================================================*/
    // METHOD: => setChannelName
    setChannelName(name, newName) {
        this.state.channels.map((channel) => {
            if (channel.name === name) {
                channel.name = newName;
            }
        });
    },
    /*================================================*/
    /*================================================*/
    // METHOD: => setChannelDescription
    setChannelDescription(name, description) {
        this.state.channels.map((channel) => {
            if (channel.name === name) {
                channel.description = description;
            }
        });
    },
    /*================================================*/
    /*================================================*/
    // METHOD: => setChannelPublic
    setChannelPublic(name) {
        this.state.channels.map((channel) => {
            if (channel.name === name) {
                channel.locked = false;
                channel.password = '';
            }
        });
    },
    /*================================================*/
    /*================================================*/
    // METHOD: => setChannelPrivate
    setChannelPrivate(name, password) {
        this.state.channels.map((channel) => {
            if (channel.name === name) {
                channel.locked = true;
                channel.password = password;
            }
        });
    },
    /*================================================*/
    /*================================================*/
    // METHOD: => setChannelPassword
    setChannelPassword(name, password) {
        this.state.channels.map((channel) => {
            if (channel.name === name) {
                channel.password = password;
            }
        });
    },
    /*================================================*/
    /*================================================*/
};
module.exports = channels;
