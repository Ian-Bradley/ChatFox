import React from 'react';
import './ChatBar.scss';

/**
 * @props
 * @props
 */

export default function ChatBar ( props )
{
    /*======================================
        RENDER FUNCTIONS - Interactions
    ========================================*/

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
                // const content = e.target.value;
                // let username = props.currentUser;

                // if (props.currentUser === "")
                // {
                //     username = props.anonymous;
                // }

                // let newMessage = {
                //     username: username,
                //     content: content,
                //     time: Date.now(),
                //     type: "postMessage",
                //     color: props.color
                // };

                // props.message.onopen(newMessage);
                // e.target.value = "";
            }
        }
    };

    /*======================================
        RENDER FUNCTIONS - Displaying
    ========================================*/


    /*======================================
        COMPONENTS
    ========================================*/

    return (
        <div className="container-chatbar">
            {/* <input className="preferences-button"
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
            /> */}

            {/* <input className="chatbar-username"
                onKeyDown={onKeyDown}
                id="username"
                defaultValue={props.currentUser}
                placeholder={props.anonymous}
            /> */}

            <input className="chatbar-message"
                onKeyUp={onKeyUp}
                placeholder="Type your message here"
            />
        </div>
    );
    
}