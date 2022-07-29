import React, { Component } from 'react';
import './ChatBar.scss';

export default class ChatBar extends Component {

    render()
    {

        //CHAT MESSAGE HANDLER
        const onKeyUp = e =>
        {
            // e.preventDefault();
            if (e.keyCode === 13)
            {
                if (e.target.value === "")
                {
                    // DO NOTHING ON EMPTY FIELD ENTRY
                }
                else
                {
                    const content = e.target.value;
                    let username = this.props.currentUser;
                    let messageTime = Date.now();

                    if (this.props.currentUser === "")
                    {
                        username = this.props.anonymous;
                    }

                    let newMessage = {
                        username: username,
                        content: content,
                        messageTime: messageTime,
                        type: "postMessage",
                        color: this.props.color
                    };

                    this.props.message.onopen(newMessage);
                    e.target.value = "";
                }
            }
        };

        //USERNAME HANDLER
        const onKeyDown = e =>
        {
            if (e.keyCode === 13)
            {

                let currentUser = this.props.currentUser;
                let messageTime = Date.now();

                if (currentUser === e.target.value)
                {
                    // DO NOTHING
                }
                else
                {
                    if (this.props.currentUser === "")
                    {
                        currentUser = this.props.anonymous;
                    }

                    const name = {
                        oldUsername: currentUser,
                        newUsername: e.target.value,
                        messageTime: messageTime,
                        color: this.props.color,
                        type: "postNotification"
                    };

                    this.props.changeUserName(e.target.value);
                    this.props.message.onopen(name);
                }
            }
        };

        // COLOR MENU HANDLER
        const onClick = e =>
        {
            // e.preventDefault();
            this.props.colorMenu();
        }

        // PREFERENCES HANDLER
        const onPref = e =>
        {
            // e.preventDefault();
            this.props.preferencesMenu();
        }

        return (
            <div className="chatbar">
                <input className="preferences-button"
                    onClick={onPref}
                    type="image"
                    src="build/preferences.png"
                    value=""
                />

                <input className="color-button"
                    id="color-button"
                    onClick={onClick}
                    type="image"
                    src="build/color.png"
                    style={{backgroundColor:this.props.color}}
                    value=""
                />

                <input className="chatbar-username"
                    onKeyDown={onKeyDown}
                    id="username"
                    defaultValue={this.props.currentUser}
                    placeholder={this.props.anonymous}
                />

                <input className="chatbar-message"
                    onKeyUp={onKeyUp}
                    placeholder="Type a message and hit ENTER"
                />
            </div>
        );
    }
}