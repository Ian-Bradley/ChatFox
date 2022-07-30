import React from 'react';
import './ChatBar.scss';

export default function ChatBar ( props )
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
                let username = props.currentUser;
                let currentTime = Date.now();

                if (props.currentUser === "")
                {
                    username = props.anonymous;
                }

                let newMessage = {
                    username: username,
                    content: content,
                    time: currentTime,
                    type: "postMessage",
                    color: props.color
                };

                props.message.onopen(newMessage);
                e.target.value = "";
            }
        }
    };

    //USERNAME HANDLER
    const onKeyDown = e =>
    {
        if (e.keyCode === 13)
        {

            let currentUser = props.currentUser;
            let currentTime = Date.now();

            if (currentUser === e.target.value)
            {
                // DO NOTHING
            }
            else
            {
                if (props.currentUser === "")
                {
                    currentUser = props.anonymous;
                }

                const name = {
                    oldUsername: currentUser,
                    newUsername: e.target.value,
                    time: currentTime,
                    color: props.color,
                    type: "postNotification"
                };

                props.changeUserName(e.target.value);
                props.message.onopen(name);
            }
        }
    };

    // COLOR MENU HANDLER
    const onClick = e =>
    {
        // e.preventDefault();
        props.colorMenu();
    }

    // PREFERENCES HANDLER
    const onPref = e =>
    {
        // e.preventDefault();
        props.preferencesMenu();
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
                style={{backgroundColor:props.color}}
                value=""
            />

            <input className="chatbar-username"
                onKeyDown={onKeyDown}
                id="username"
                defaultValue={props.currentUser}
                placeholder={props.anonymous}
            />

            <input className="chatbar-message"
                onKeyUp={onKeyUp}
                placeholder="Type a message and hit ENTER"
            />
        </div>
    );
    
}