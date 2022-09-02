const users = {
    /*================================================*/
    /*================================================*/
    // METHOD: => addUser
    addUser(user) {
        this.state.users.push(user);
    },
    /*================================================*/
    /*================================================*/
    // METHOD: => removeUser
    removeUser(id) {
        if (this.state.users.find((user) => user.id === id)) {
            this.state.users = this.state.users.filter((user) => user.id !== id);
        }
    },
    /*================================================*/
    /*================================================*/
    // METHOD: => getUser
    getUser(id) {
        return this.state.users.find((user) => user.id === id);
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
