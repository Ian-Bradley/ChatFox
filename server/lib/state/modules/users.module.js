const users = {
    /*================================================*/
    /*================================================*/
    // METHOD: => addUser
    addUser(user) {
        console.log('user: ', user);
        this.state.users.push(user);
    },
    /*================================================*/
    /*================================================*/
    // METHOD: => removeUser
    removeUser(name) {
        console.log('removeUSER ==> name: ', name);
        console.log('removeUSER ==> typeof name: ', typeof name);
        console.log(
            'removeUSER ==> FIND USER: ',
            this.state.users.find((user) => user.name === name)
        );
        if (this.state.users.find((user) => user.name === name)) {
            // User exists in array
            console.log('removeUSER ==> User exists in array');
            console.log('removeUSER ==> this.state.users: ', this.state.users);
            this.state.users = this.state.users.filter((user) => user.name !== name);
            console.log('removeUSER ==> this.state.users: ', this.state.users);
        } else {
            // No user!!
            console.log('removeUSER ==> No user!!');
        }
    },
    /*================================================*/
    /*================================================*/
    // METHOD: => setUserName
    setUserName(name, newName) {
        for (let i = 0; i < this.state.users.length; i++) {
            if (this.state.users[i].name === name) {
                this.state.users[i].name = newName;
            }
        }
    },
    /*================================================*/
    /*================================================*/

    // METHOD: => setUserNickname
    setUserNickname(name, newNickname) {
        for (let i = 0; i < this.state.users.length; i++) {
            if (this.state.users[i].name === name) {
                this.state.users[i].nickname = newNickname;
            }
        }
    },
    /*================================================*/
    /*================================================*/
    // METHOD: => setUserColor
    setUserColor(name, newColor) {
        for (let i = 0; i < this.state.users.length; i++) {
            if (this.state.users[i].name === name) {
                this.state.users[i].color = newColor;
            }
        }
    },
    /*================================================*/
    /*================================================*/
};
module.exports = users;
