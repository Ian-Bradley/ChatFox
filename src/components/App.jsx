import React, { Component } from 'react';
import ChatNav from './ChatNav/ChatNav.jsx';
// import ChatBar from './ChatBar/ChatBar.jsx';
// import MessageList from '../MessageList.jsx';
import './App.scss';

/* TODO:
> settings menu
    - show name change notifications
    - show user join notifications
    - show timestamps
    - change user color
    - change user name
*/

/*======================================
    ANCHOR: HELPER FUNCTIONS
========================================*/

function generateRandomColor()
{
    let randomColor = '';
    let colors = [
        'rebeccapurple',
        'orange',
        'maroon',
        'orangered',
        'royalblue',
        'lightseagreen',
        'darkgoldenrod',
        'gold',
        'lawngreen',
        'darkgreen',
        'saddlebrown',
    ];
    randomColor += colors[Math.floor(Math.random() * colors.length)];
    return randomColor;
}

/*======================================*/
/*======================================*/

function generateAnonymous ()
{
    let name = 'Anonymous';
    let numbers = '0123456789';
    let randomNumberString = '';
    for (let i = 0; i < 4; i++)
    {
        randomNumberString += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    name += randomNumberString;
    return name;
}

/*======================================*/
/*======================================*/

export default class App extends Component {

    /*======================================
        ANCHOR: STATE
    ========================================*/

    constructor(props) 
    {
        super(props);
        this.state = {
            user: {
                id: 0,
                name: generateAnonymous(),
                color: generateRandomColor(),
            },
            users: [],
            messages: [],
            totalUsers: 0,
        };

    /*======================================
        ANCHOR: METHOD BINDING
    ========================================*/

        // State methods - Connection
        this.socket                 = new WebSocket('ws://localhost:3001');

        // State methods - Users
        this.set_users              = this.set_users.bind(this);
        this.user_add               = this.user_add.bind(this);
        this.user_remove            = this.user_remove.bind(this);

        // State methods - User Info
        this.set_current_user_ID    = this.set_current_player_ID.bind(this);
        this.set_current_user_name  = this.set_current_player_name.bind(this);
        this.set_current_user_color = this.set_current_player_color.bind(this);

        // State methods - Users Info
        this.set_user_name          = this.set_player_name.bind(this);
        this.set_user_color         = this.set_player_color.bind(this);

        // State methods - Messages
        this.message_add            = this.message_add.bind(this);
        this.set_messages           = this.set_messages.bind(this);

        // Functional methods - Time / Date
        this.calculateTimeSince     = this.calculateTimeSince.bind(this);
    }

    /*================================================
        ANCHOR: STATE METHODS - Game States
    ==================================================*/



    /*================================================
        ANCHOR: FUNCTIONAL METHODS
    ==================================================*/

    calculateTimeSince ( messageTime )
    {
        let currentTime = Date.now();
        let timeSince = currentTime - messageTime;
        let seconds = timeSince / 1000;
        let minutes = timeSince / 1000 / 60;

        if ( seconds < 60 )
        {
            return Math.round( seconds ) + 's';
        }

        if( minutes < 60 )
        {
            return Math.round( minutes ) + 'm';
        }

        if( hours < 24 )
        {
            return Math.round( hours ) + 'h';
        }

        return Math.round( days ) + 'd';
    }

    /*================================================
        ANCHOR: COMPONENT ACTIONS
    ==================================================*/

    componentDidMount()
    {

        /*================================================
            ANCHOR: WEBSOCKET COMMUNICATION
        ==================================================*/

        const ws = this.socket;

        ws.onopen = function ( e )
        {
            console.log('>>>>>>>>> WebSocket Client Connected >>>>>>>>>');
            // ws.send(JSON.stringify( e ));
        };

        ws.onmessage = ( messageData ) =>
        {
            console.log('>>>>>>>>> Message Recieved >>>>>>>>>');
            let updateData = JSON.parse( messageData.data );
            console.log('> ', updateData.messageType);

            /*================================================
                HANDLERS
            ==================================================*/

            switch ( updateData.messageType )
            {

                /*================================================
                    ANCHOR: HANDLER - PLAYER CONNECTIONS
                ==================================================*/

                case 'clientConnected':
                {
                    // > This handler is only fired ONCE when the CURRENT player joins
                    console.log('======= HANDLER - clientConnected =======');

                    // > Set current user ID
                    console.log('> Setting ID');
                    if ( updateData.userID )
                    { this.set_current_user_ID( updateData.userID ); }

                    // > Set previous messages
                    console.log('> Setting messages');
                    if ( !( updateData.messages === undefined ) && ( updateData.messages.length ) )
                    { this.set_messages( updateData.messages ); }

                    // > Set users
                    console.log('> Setting users');
                    if ( !( updateData.users === undefined ) && ( updateData.users.length ) )
                    { this.set_users( updateData.users ); }

                    // > Send current player information to server
                    console.log('> Send newUser');
                    let newUpdate = {
                        type: 'newUser',
                        user: this.state.user,
                    };
                    ws.send( JSON.stringify( newUpdate ) );
                    console.log('>>>>>>>>> Message Sent - newUser >>>>>>>>>');
                    console.log('======= END - HANDLER - clientConnected =======');
                    break;
                }

                /*======================================*/
                /*======================================*/

                case 'newUser':
                {
                    // > This handler is only fired when OTHER players join
                    console.log('======= HANDLER - newUser =======');
                    this.user_add( updateData.player );
                    this.message_add( userDisconnected, 'conncted' );
                    console.log('======= END - HANDLER - newUser =======');
                    break;
                }

                /*======================================*/
                /*======================================*/  

                case 'clientDisconnected':
                {
                    this.userAmount( updateData.total );
                    const userDisconnected = {
                        type: 'incomingClientDisconnected',
                        content: 'A user has disconnected',
                        messageTime: updateData.messageTime,
                        id: message.id
                    };
                    this.message_add( userDisconnected, 'disconncted' );
                    window.scrollTo( 0, document.body.scrollHeight );
                    break;
                }

                case 'clientDisconnected':
                {
                    // This handler is only fired when OTHER players leave
                    // console.log('======= HANDLER - clientDisconnected =======');
                    this.player_remove( updateData.playerID );
                    // console.log('======= END - HANDLER - clientDisconnected =======');
                    break;
                }



                /*======================================*/
                /*======================================*/



                /*================================================
                    ANCHOR: HANDLER - PLAYERS INFO
                ==================================================*/




                /*================================================
                    ANCHOR: HANDLER - MESSAGES
                ==================================================*/

                case 'incomingMessage':
                {
                    this.addMessage( updateData );
                    window.scrollTo( 0, document.body.scrollHeight );
                    break;
                }

                /*======================================*/
                /*======================================*/

                case 'incomingNotification':
                {
                    this.addMessage( updateData );
                    window.scrollTo( 0, document.body.scrollHeight );
                    break;
                }

                /*======================================*/
                /*======================================*/

                default:
            }
        };
    }

    /*================================================
        ANCHOR: COMPONENT ACTIONS - continued
    ==================================================*/

    // componentWillUnmount()
    // {
        
    // }

    /*======================================*/
    /*======================================*/
    
    render()
    {

        /*================================================
            ANCHOR: COMPONENTS
        ==================================================*/
        
        return (
            <div>

                <ChatNav
                    totalUsers={this.state.totalUsers}
                />

                <div className='container-title'>
                    <span href='/' className='nav-title'>ChatFox</span>
                </div>


                {/* <MessageList
                    messages={this.state.messages}
                    display={this.state.display}
                    preferencesDisplay={this.state.preferencesDisplay}
                    timestampDisplay={this.state.timestampDisplay}
                    colorMenu={this.colorMenu}
                    changeColor={this.changeColor}
                    calculateTimeSince={this.calculateTimeSince}
                    showTimestamps={this.showTimestamps}
                /> */}

                {/* <ChatBar
                    currentUser={this.state.currentUser.name}
                    changeUserName={this.changeUserName}
                    color={this.state.color}
                    message={this.socket}
                    colorMenu={this.colorMenu}
                    preferencesMenu={this.preferencesMenu}
                    anonymous={this.state.anonymousName}
                /> */}
            </div>
        );
    }
}