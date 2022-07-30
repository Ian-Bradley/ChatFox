import React from 'react';
import './ChatMessage.scss';

/**
 * @props message (object)
 * -> name (string)
 * -> content (string)
 * -> time (number)
 * -> color (string)
 * -> type (string)
 */

export default function ChatMessage ( props )
{
    /*======================================
        RENDER FUNCTIONS - Interactions
    ========================================*/


    /*======================================
        RENDER FUNCTIONS - Displaying
    ========================================*/

    //REGULAR EXPRESS FOR FINDING IMAGE EXTENSIONS
    let regex = ( /\.( gif|jp?g|png|svg|bmp|tiff|bat )$/i );


    // TIMESTAMP HANDLING
    let time = props.calculateTimeSince( props.message.messageTime );
    
    /*======================================
        COMPONENTS
    ========================================*/

    switch ( props.message.type )
    {

        /*======================================*/
        /*======================================*/

        case 'message':
        {
            if( regex.test( props.message.content ) )
            {
                // > Display image is a URL with an image extension is found
                return (
                    <main className="chat-message">
                        <span className="message-username">
                            {props.message.username}
                        </span>
                        <img className="message-content" id="images" src={props.message.content} alt="Image"/>
                    </main>
                );
            }
            else
            {
                // > DISPLAY IMAGE IF A URL WITH AN IMAGE EXTENSION IS FOUND
                return (
                    <main className="chat-message">
                        <span className="message-username" style={{color:props.message.color}}>
                            {props.message.username}
                        </span>
                        <span className="message-content">
                            {props.message.content}
                        </span>
                        <span className="message-time" style={{display: props.timestampDisplay}}>
                            {time}
                        </span>
                    </main>
                );
            }
        }

        /*======================================*/
        /*======================================*/  

        case 'notification':
        {
            return (
                <main className="chat-message system">
                    <span className="message-notification">
                        <span style={{color:props.message.color}}>
                            {props.message.oldUsername}
                        </span>
                        <span> changed their name to </span>
                        <span style={{color:props.message.color}}>
                            {props.message.newUsername}
                        </span>
                    </span>
                </main>
            );
        }

        /*======================================*/
        /*======================================*/

        default:
    }
}