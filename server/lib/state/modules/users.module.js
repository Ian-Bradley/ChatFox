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
        this.state.users.map((user) => {
            if (user.name === name) {
                user.color = newName;
            }
        });
    },
    /*================================================*/
    /*================================================*/
    // METHOD: => setUserNickname
    setUserNickname(name, newNickname) {
        this.state.users.map((user) => {
            if (user.name === name) {
                user.color = newNickname;
            }
        });
    },
    /*================================================*/
    /*================================================*/
    // METHOD: => setUserColor
    setUserColor(name, newColor) {
        this.state.users.map((user) => {
            if (user.name === name) {
                user.color = newColor;
            }
        });
    },
    /*================================================*/
    /*================================================*/
};
module.exports = users;
