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
    setChannelName(channel, name) {
        for (let i = 0; i < this.state.channels.length; i++) {
            if (this.state.channels[i].name === channel.name) {
                this.state.channels[i].name = name;
            }
        }
    },

    /*================================================*/
    /*================================================*/
    // METHOD: => setChannelPublic
    setChannelPublic(channel) {
        for (let i = 0; i < this.state.channels.length; i++) {
            if (this.state.channels[i].name === channel.name) {
                this.state.channels[i].locked = false;
            }
        }
    },
    /*================================================*/
    /*================================================*/
    // METHOD: => setChannelPrivate
    setChannelPrivate(channel) {
        for (let i = 0; i < this.state.channels.length; i++) {
            if (this.state.channels[i].name === channel.name) {
                this.state.channels[i].locked = true;
            }
        }
    },
    /*================================================*/
    /*================================================*/
    // METHOD: => setChannelPassword
    setChannelPassword(channel, password) {
        for (let i = 0; i < this.state.channels.length; i++) {
            if (this.state.channels[i].name === channel.name) {
                this.state.channels[i].password = password;
            }
        }
    },
    /*================================================*/
    /*================================================*/
};
module.exports = channels;
