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
    removeUser(id) {
        console.log('removeUSER ==> id: ', id);
        console.log('removeUSER ==> typeof id: ', typeof id);
        console.log(
            'removeUSER ==> FIND USER: ',
            this.state.users.find((user) => user.id === id)
        );
        if (this.state.users.find((user) => user.id === id)) {
            // User exists in array
            console.log('removeUSER ==> User exists in array');
            console.log('removeUSER ==> this.state.users: ', this.state.users);
            this.state.users = this.state.users.filter((user) => user.id !== id);
            console.log('removeUSER ==> this.state.users: ', this.state.users);
        } else {
            // No user!!
            console.log('removeUSER ==> No user!!');
        }
    },
    /*================================================*/
    /*================================================*/
    // METHOD: => setUserName
    setUserName(id, name) {
        this.state.users.map((user) => {
            if (user.id === id) {
                user.color = name;
            }
        });
    },
    /*================================================*/
    /*================================================*/
    // METHOD: => setUserNickname
    setUserNickname(id, nickname) {
        this.state.users.map((user) => {
            if (user.id === id) {
                user.color = nickname;
            }
        });
    },
    /*================================================*/
    /*================================================*/
    // METHOD: => setUserColor
    setUserColor(id, color) {
        this.state.users.map((user) => {
            if (user.id === id) {
                user.color = color;
            }
        });
    },
    /*================================================*/
    /*================================================*/
};
module.exports = users;
