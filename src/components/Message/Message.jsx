import React from 'react';
import './Message.scss';

/**
 * @props message (object)
 * -> type (string)
 * -> name (string)
 * -> time (number)
 * -> color (string)
 * -> content (string)
 */

export default function Message ( props )
{
    /*======================================
        RENDER FUNCTIONS - Interactions
    ========================================*/


    /*======================================
        RENDER FUNCTIONS - Displaying
    ========================================*/

    //REGULAR EXPRESS FOR FINDING IMAGE EXTENSIONS
    // let regex = ( /\.( gif|jp?g|png|svg|bmp|tiff|bat )$/i );


    // TIMESTAMP HANDLING
    // let time = props.calculateTimeSince( props.message.messageTime );
    
    /*======================================
        COMPONENTS
    ========================================*/

    switch ( props.message.type )
    {

        /*======================================*/
        /*======================================*/

        case 'message':
        {
            // if( regex.test( props.message.content ) )
            // {
                // > Display image if a URL with an image extension is found
                // return (
                //     <main className="chat-message">
                //         <span className="message-name">
                //             {props.message.name}
                //         </span>
                //         <img className="message-content" id="images" src={props.message.content} alt="Image"/>
                //     </main>
                // );
            // }
            // else
            // {
                // > DISPLAY IMAGE IF A URL WITH AN IMAGE EXTENSION IS FOUND
                return (
                    <main className="message">
                        <span className="message-time">
                            {props.message.time}
                        </span>
                        <span className={"message-name " + props.message.color}>
                            {props.message.name}
                        </span>
                        <span className="message-content">
                            {props.message.content}
                        </span>
                    </main>
                );
            // }
        }

        /*======================================*/
        /*======================================*/  

        case 'notification':
        {
            return (
                <main className="message">
                    <div className="message-notification">
                        <span style={{color:props.message.color}}>
                            {props.message.nameOld}
                        </span>
                        <span> changed their name to </span>
                        <span style={{color:props.message.color}}>
                            {props.message.name}
                        </span>
                    </div>
                </main>
            );
            return <div>test</div>
        }

        /*======================================*/
        /*======================================*/

        default:
        {  
            console.log('ChatMessage - Error: Unrecognized message type')
            return null;
        }
    }
}