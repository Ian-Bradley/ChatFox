import React from 'react';
import * as C from '../../constants.js'
import './Message.scss';

/**
 * @props message (object)      Message info
 * @props preferences (object)  App + Display info
 * @props click_name (function) Clicking on a user name
 * @props GMT (string)          GMT of user for timestamp
 */

export default function Message ( props )
{
    /*================================================
        ANCHOR: RENDER FUNCTIONS - Interactions
    ==================================================*/

    const on_click_name = e =>
    {
        console.log('===> on_click_name');
        props.click_name( e );
        console.log('===> END - on_click_name');
    }

    /*================================================
        ANCHOR: RENDER FUNCTIONS - Displaying
    ==================================================*/

    // > Regular expression for image extensions
    // TODO: Switch to checking in ChatBar and storing URL to message object
    const imageExtensionRegex = ( /\.( gif|jp?g|png|svg|bmp|tiff|bat )$/i );

    const display_timestamp = () =>
    {
        if ( props.preferences.showTimeStamps )
        {
            // Mon, 01 Aug 2022 02:38:32 GMT
            let timeStamp_hrs = parseInt( props.message.time.slice(17,19) );
            let timeStamp_min = parseInt( props.message.time.slice(20,22) );
            let timeStamp_sec = parseInt( props.message.time.slice(23,25) );

            // console.log('=======================================================');
            // console.log('BEFORE > hours: ', timeStamp_hrs);
            // console.log('BEFORE > minutes: ', timeStamp_min);
            // console.log('BEFORE > seconds: ', timeStamp_sec);

            // > Initial addition/subtraction
            if ( C.onst.GMT_direction === '-' )
            {
                timeStamp_hrs -= C.onst.GMT_hrs;
                timeStamp_min -= C.onst.GMT_min;
            }
            if ( C.onst.GMT_direction === '+' )
            {
                timeStamp_hrs += C.onst.GMT_hrs;
                timeStamp_min += C.onst.GMT_min;
            }

            // console.log('ADD/SUB > hours: ', timeStamp_hrs);
            // console.log('ADD/SUB > minutes: ', timeStamp_min);
            // console.log('ADD/SUB > seconds: ', timeStamp_sec);

            // > Deal with negative times
            if ( timeStamp_hrs < 0 )
            { timeStamp_hrs = 24 - Math.abs(timeStamp_hrs); }
            if ( timeStamp_min < 0 )
            { timeStamp_min = 60 - Math.abs(timeStamp_min); }

            // console.log('NEGATIVES > hours: ', timeStamp_hrs);
            // console.log('NEGATIVES > minutes: ', timeStamp_min);
            // console.log('NEGATIVES > seconds: ', timeStamp_sec);

            // > Convert to 12-hours time
            if ( !props.preferences.show24HourTime && ( timeStamp_hrs > 12 ) )
            { timeStamp_hrs -= 12 }

            // console.log('24HOUR > hours: ', timeStamp_hrs);
            // console.log('24HOUR > minutes: ', timeStamp_min);
            // console.log('24HOUR > seconds: ', timeStamp_sec);

            // > String conversion
            timeStamp_hrs = timeStamp_hrs.toString();
            timeStamp_min = timeStamp_min.toString();
            timeStamp_sec = timeStamp_sec.toString();

            // > Add leading '0'
            if ( timeStamp_hrs.length === 1 )
            { timeStamp_hrs = '0' + timeStamp_hrs }
            if ( timeStamp_min.length === 1 )
            { timeStamp_min = '0' + timeStamp_min }
            if ( timeStamp_sec.length === 1 )
            { timeStamp_sec = '0' + timeStamp_sec }

            // console.log('LEADING-0 > hours: ', timeStamp_hrs);
            // console.log('LEADING-0 > minutes: ', timeStamp_min);
            // console.log('LEADING-0 > seconds: ', timeStamp_sec);

            // > Remove leading '0'
            // if ( timeStamp_hrs.slice(0,1) === '0' )
            // { timeStamp_hrs = timeStamp_hrs.slice(1,2) }

            // console.log('=======================================================');

            return (
                <span className='message-time'>
                    {'['+timeStamp_hrs+':'+timeStamp_min+':'+timeStamp_sec+']'}
                </span>
            );
        }
    }

    /*================================================
        ANCHOR: COMPONENTS
    ==================================================*/

    switch ( props.message.type )
    {
        case 'message':
            {
                if( !( imageExtensionRegex.test( props.message.content ) ) )
                {
                    /*================================================
                        ANCHOR: MESSAGE - Regular
                    ==================================================*/

                    return (
                        <main className='container-message'>
                            <div className='message'>
                                {display_timestamp()}
                                <span
                                    className={'message-name'}
                                    style={{color: props.message.color}}
                                    onClick={on_click_name}
                                >
                                    {props.message.name}:
                                </span>
                                <span className='message-content'>
                                    {props.message.content}
                                </span>
                            </div>
                        </main>
                    );
                }
                else
                {
                    /*================================================
                        ANCHOR: MESSAGE - Image
                    ==================================================*/

                    return (
                        <main className='container-message'>
                            <div className='message'>
                                {display_timestamp()}
                                <span
                                    className={'message-name'}
                                    style={{color: props.message.color}}
                                    onClick={on_click_name}
                                >
                                    {props.message.name}
                                </span>
                                <div className='message-image-container'>
                                    <img className='message-image' src={props.message.content} alt='Image'/>
                                    <span className='message-content image-caption'>
                                        {props.message.content}
                                    </span>
                                </div>
                            </div>
                        </main>
                    );
                }
            }

        /*================================================
            ANCHOR: NOTIFICATION - Connection
        ==================================================*/

        case 'notification-connect':
            {
                if ( props.preferences.showUserJoins )
                {
                    return (
                        <main className='container-message'>
                            <div className='message notification'>
                                {display_timestamp()}
                                <span
                                    className={'message-name'}
                                    style={{color: props.message.color}}
                                    onClick={on_click_name}
                                >
                                    {props.message.name}
                                </span>
                                <span className='message-content'> connected</span>
                            </div>
                        </main>
                    );
                }
                else
                {
                    return null;
                }
            }

        /*================================================
            ANCHOR: NOTIFICATION - Disconnection
        ==================================================*/

         case 'notification-disconnect':
            {
                if ( props.preferences.showUserJoins )
                {
                    return (
                        <main className='container-message'>
                            <div className='message notification'>
                                {display_timestamp()}
                                <span
                                    className={'message-name'}
                                    style={{color: props.message.color}}
                                    onClick={on_click_name}
                                >
                                    {props.message.name}
                                </span>
                                <span className='message-content'> disconnected</span>
                            </div>
                        </main>
                    );
                }
                else
                {
                    return null;
                }
            }

        /*================================================
            ANCHOR: NOTIFICATION - Name change
        ==================================================*/

         case 'notification-name':
            {
                if ( props.preferences.showNameChanges )
                {
                    return (
                        <main className='container-message'>
                            <div className='message notification'>
                                {display_timestamp()}
                                <span
                                    className={'message-name'}
                                    style={{color: props.message.color}}
                                    onClick={on_click_name}
                                >
                                    {props.message.namePrev}
                                </span>
                                <span className='message-content'> changed their name to </span>
                                <span
                                    className={'message-name'}
                                    style={{color: props.message.color}}
                                    onClick={on_click_name}
                                >
                                    {props.message.name}
                                </span>
                            </div>
                        </main>
                    );
                }
                else
                {
                    return null;
                }
            }

        /*================================================
            ANCHOR: NOTIFICATION - Color change
        ==================================================*/

         case 'notification-color':
            {
                if ( props.preferences.showColorChanges )
                {
                    return (
                        <main className='container-message'>
                            <div className='message notification'>
                                {display_timestamp()}
                                <span
                                    className={'message-name'}
                                    style={{color: props.message.color}}
                                    onClick={on_click_name}
                                >
                                    {props.message.name}
                                </span>
                                <span className='message-content'> changed their color from </span>
                                <span className={'message-color'} style={{color: props.message.colorPrev}}>
                                    {props.message.colorPrev}
                                </span>
                                <span className='message-content'> to </span>
                                <span className={'message-color'}  style={{color: props.message.color}}>
                                    {props.message.color}
                                </span>
                            </div>
                        </main>
                    );
                }
                else
                {
                    return null;
                }
            }

        /*======================================*/
        /*======================================*/

        default:
        {  
            console.log('Message.jsx - Error: Unrecognized message type');
            return null;
        }
    }
}