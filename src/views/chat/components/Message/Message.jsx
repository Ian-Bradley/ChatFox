import React from 'react';
import { useSelector } from 'react-redux';

// GLOBAL CONSTANTS
import { GMT_MINUTES, GMT_HOURS, GMT_DIRECTION } from '../../../../util/constants.js';

// CSS COMPONENTS
import { Container, Div, Time, Name, Content } from './styles.js';

/**
 * @props message (object)
    id: (Number)
    data: (Object)
    content: (String)
 * @props clickName (function) Clicking on a user name
 */

export default function Message(props) {
    /*================================================
        BLOCK: STATES
    ==================================================*/

    const prefs = useSelector((state) => {
        return state['prefs'].prefs;
    });

    /*================================================
        BLOCK: EVENTS
    ==================================================*/

    const onclickName = (e) => {
        console.log('===> onclickName');
        props.clickName(e);
        console.log('===> END - onclickName');
    };

    /*================================================
        BLOCK: RENDERING
    ==================================================*/

    // Regular expression for image extensions
    // TODO: Switch to checking in ChatBar and storing URL to message object
    const imageExtensionRegex = /\.( gif|jp?g|png|svg|bmp|tiff|bat )$/i;

    // TODO: add as util function, will be needed in log
    const renderTimestamp = () => {
        if (prefs.showTimeStamps) {
            // Mon, 01 Aug 2022 02:38:32 GMT
            let hours = parseInt(props.message.time.slice(17, 19));
            let minutes = parseInt(props.message.time.slice(20, 22));
            let seconds = parseInt(props.message.time.slice(23, 25));

            // Initial addition/subtraction
            if (GMT_DIRECTION === '-') {
                hours -= GMT_HOURS;
                minutes -= GMT_MINUTES;
            }
            if (GMT_DIRECTION === '+') {
                hours += GMT_HOURS;
                minutes += GMT_MINUTES;
            }

            // Deal with negative times
            if (hours < 0) {
                hours = 24 - Math.abs(hours);
            }
            if (minutes < 0) {
                minutes = 60 - Math.abs(minutes);
            }

            // Convert to 12-hours time
            if (!prefs.show24HourTime && hours > 12) {
                hours -= 12;
            }

            // String conversion
            hours = hours.toString();
            minutes = minutes.toString();
            seconds = seconds.toString();

            // Add leading '0'
            if (hours.length === 1) {
                hours = '0' + hours;
            }
            if (minutes.length === 1) {
                minutes = '0' + minutes;
            }
            if (seconds.length === 1) {
                seconds = '0' + seconds;
            }

            // Remove leading '0'
            // if (hours.slice(0, 1) === '0') {
            //     hours = hours.slice(1, 2);
            // }

            return (
                <Time className='message-time'>
                    {'[' + hours + ':' + minutes + ':' + seconds + ']'}
                </Time>
            );
        }
    };

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    if (!imageExtensionRegex.test(props.message.content)) {
        // NOTE: MESSAGE - Regular
        return (
            <Container>
                <Div>
                    {renderTimestamp()}
                    <Name style={{ color: props.message.color }} onClick={onclickName}>
                        {props.message.name}:
                    </Name>
                    <Content className='message-content'>{props.message.content}</Content>
                </Div>
            </Container>
        );
    } else {
        // NOTE: MESSAGE - Image
        return (
            <Container>
                <Div>
                    {renderTimestamp()}
                    <Name
                        className={'message-name'}
                        style={{ color: props.message.color }}
                        onClick={onclickName}
                    >
                        {props.message.name}
                    </Name>
                    {/* <div className='message-image-container'>
                        <img
                            className='message-image'
                            src={props.message.content}
                            alt='Image'
                        />
                        <span className='message-content image-caption'>
                            {props.message.content}
                        </span>
                    </div> */}
                </Div>
            </Container>
        );
    }
}
