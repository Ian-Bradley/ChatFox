import React, { Component } from 'react';
import Nav from './Nav/Nav.jsx';
import Title from './Title/Title.jsx';
import ChatBar from './ChatBar/ChatBar.jsx';
import UserList from './UserList/UserList.jsx';
import MessageList from './MessageList/MessageList.jsx';
import * as C from '../constants.js'
import './App.scss';

/* TODO:
NOW:
> settings menu
    - show name change notifications
    - show user join notifications
    - show timestamps
    - change user color
    - change user name
    - 12/24 hours time
    - alternate line shading
    - messages come from top


> searchbar for UserList
> limit message to ~100 || ~50 then add "load more" button (only visible at top of list)
> auto-shorten links
> @user highlighting
> Prevent dropping to bottom of message list while user is scrolling on it (or not at bottom, like twitch.tv chat)

LATER:
> whisper/dm system
> tagging system
> nickname system
    - nicknames given to other users and only show up to by the current user
    - nicknames show in the message list and user list, but not in the user panel (slide-out sidebar)
*/

/*======================================
    ANCHOR: HELPER FUNCTIONS
========================================*/

function generateRandomColor()
{
    let randomColor = '#';
    let hexCharacters = '0123456789ABCDEF';
    for (let i = 0; i < 6; i++)
    {
        randomColor += hexCharacters.charAt(Math.floor(Math.random() * hexCharacters.length));
    }
    return randomColor;
}

/*======================================*/
/*======================================*/

function generateRandomName ()
{
    let randomNameString = ''
    let randomNumberString = '';

    let numbers = '0123456789';
    for (let i = 0; i < 7; i++)
    {
        randomNumberString += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    
    let names = C.onst.lotrNames;
    randomNameString += names[(Math.floor(Math.random() * names.length))];

    return (randomNameString + '-' + randomNumberString);
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
            appTitle: 'ChatFox',
            user: {
                id: 1,
                name: generateRandomName(),
                color: generateRandomColor(),
            },
            users: [],
            messages: [],
            usersTotal: 1,
            preferences: {
                showTimeStamps: false,
                showNameChanges: false,
                showUserJoins: false,
            },
        };

    /*======================================
        ANCHOR: METHOD BINDING
    ========================================*/

        // State methods - Connection
        this.socket               = new WebSocket('ws://localhost:3001');

        // State methods - Users
        this.set_users            = this.set_users.bind(this);
        this.user_add             = this.user_add.bind(this);
        this.user_remove          = this.user_remove.bind(this);

        // State methods - User Info
        this.set_user_ID          = this.set_user_ID.bind(this);
        this.set_user_name        = this.set_user_name.bind(this);
        this.set_user_color       = this.set_user_color.bind(this);

        // State methods - Messages
        this.set_messages         = this.set_messages.bind(this);
        this.message_add          = this.message_add.bind(this);

        // State methods - Preferences
        this.set_pref_timeStamps  = this.set_pref_timeStamps.bind(this);
        this.set_pref_nameChanges = this.set_pref_nameChanges.bind(this);
        this.set_pref_userJoins   = this.set_pref_userJoins.bind(this);

        // WS - User Interactions
        this.send_message         = this.send_message.bind(this);
        this.send_user_name       = this.send_user_name.bind(this);
        this.send_user_color      = this.send_user_color.bind(this);

        // Functional methonds - User Interactions
        this.click_name           = this.click_name.bind(this);

    }

    /*================================================
        ANCHOR: STATE METHODS - Game States
    ==================================================*/

    set_users ( usersArray )
    {
        // console.log('===> set_users');
        this.setState({ users: usersArray });
        this.setState({ usersTotal: this.state.users.length + 1 });
        // console.log('===> END - set_users');
    }

    /*======================================*/
    /*======================================*/

    user_add ( user )
    {
        // console.log('===> user_add');
        this.setState( prevState => ({
            users: [ ...prevState.users, user ]
        }));
        this.setState({ usersTotal: this.state.usersTotal + 1 });
        // console.log('===> END - user_add');
    }

    /*======================================*/
    /*======================================*/

    user_remove ( userID )
    {
        // console.log('===> user_remove');
        this.setState( prevState => {
            let users = prevState.users.filter( user => user.id !== userID );
            return { users };
        });
        this.setState({ usersTotal: this.state.usersTotal - 1 });
        // console.log('===> END - user_remove');
    }

    /*================================================
        ANCHOR: STATE METHODS - User Info
    ==================================================*/

    set_user_ID ( ID )
    {
        // console.log('===> set_user_ID');
        this.setState(prevState => {
            let user = { ...prevState.user };
            user.id = ID;
            return { user };
        });
        // console.log('===> END - set_user_ID');
    }

    /*======================================*/
    /*======================================*/

    set_user_name ( user, newName )
    {
        // console.log('===> set_user_name');
        if ( user.id === this.state.user.id )
        {
            // > Current user
            this.setState(prevState => {
                let user = { ...prevState.user };
                user.name = newName;
                return { user };
            });
        }
        else
        {
            // > Other user
            this.setState( prevState => {
                let users = prevState.users;
                for ( let i = 0; i < users.length; i++ )
                {
                    if ( users[i].id === user.id )
                    {
                        users[i].name = newName;
                    }
                }
                return { users };
            });
        }
        // console.log('===> END - set_user_name');
    }

    /*======================================*/
    /*======================================*/

    set_user_color ( user, newColor )
    {
        // console.log('===> set_user_color');
        if ( user.id === this.state.user.id )
        {
            // > Current user
            this.setState(prevState => {
                let user = { ...prevState.user };
                user.color = newColor;
                return { user };
            });
        }
        else
        {
            // > Other user
            this.setState( prevState => {
                let users = prevState.users;
                for ( let i = 0; i < users.length; i++ )
                {
                    if ( users[i].id === user.id )
                    {
                        users[i].color = newColor;
                    }
                }
                return { users };
            });
        }
        // console.log('===> END - set_user_color');
    }

    /*================================================
        ANCHOR: STATE METHODS - Messages
    ==================================================*/

    set_messages( messagesArray )
    {
        // console.log('===> set_messages');
        this.setState({ messages: messagesArray });
        // console.log('===> END - set_messages');
    }

    /*======================================*/
    /*======================================*/

    message_add ( message )
    {
        // console.log('===> message_add');
        this.setState( prevState => ({
            messages: [ ...prevState.messages, message]
        }));
        // console.log('===> END - message_add');
    }

    /*================================================
        ANCHOR: STATE METHODS - Preferences
    ==================================================*/

    set_pref_nameChanges ( state )
    {
        console.log('===> set_pref_nameChanges');
        this.setState(prevState => {
            let preferences = { ...prevState.preferences };
            preferences.nameChanges = state;
            return { preferences };
        });
        console.log('===> END - set_pref_nameChanges');
    }

    /*======================================*/
    /*======================================*/

    set_pref_timeStamps ( state )
    {
        console.log('===> set_pref_timeStamps');
        this.setState(prevState => {
            let preferences = { ...prevState.preferences };
            preferences.timeStamps = state;
            return { preferences };
        });
        console.log('===> END - set_pref_timeStamps');
    }

    /*======================================*/
    /*======================================*/

    set_pref_userJoins ( state )
    {
        console.log('===> set_pref_userJoins');
        this.setState(prevState => {
            let preferences = { ...prevState.preferences };
            preferences.userJoins = state;
            return { preferences };
        });
        console.log('===> END - set_pref_userJoins');
    }

    /*================================================
        ANCHOR: WS METHODS - User Interactions
    ==================================================*/

    send_message ( newMessage )
    {
        // console.log('===> send_message');
        let newUpdate = {
            type: 'newMessage',
            message: newMessage,
        };
        this.socket.send( JSON.stringify( newUpdate ));
        // console.log('>>>>>>>>> Message Sent - newMessage >>>>>>>>>');
        // console.log('===> END - send_message');
    }

    /*======================================*/
    /*======================================*/

    send_user_name ( user, newName )
    {
        // console.log('===> send_user_name');
        let newUpdate = {
            type: 'updateUserName',
            user: user,
            newName: newName,
            message: {
                type:     'notification-name',
                name:     newName,
                namePrev: user.name,
                time:     new Date(),
                color:    user.color,
            },
        };
        this.socket.send( JSON.stringify( newUpdate ));
        // console.log('>>>>>>>>> Message Sent - updateUserName >>>>>>>>>');
        // console.log('===> END - send_user_name');
    }

    /*======================================*/
    /*======================================*/

    send_user_color ( user, newColor )
    {
        // console.log('===> send_user_color');
        let newUpdate = {
            type: 'updateUserColor',
            user: user,
            newColor: newColor,
            message: {
                type:      'notification-color',
                name:      user.name,
                time:      new Date(),
                color:     newColor,
                colorPrev: user.color,
            },
        };
        this.socket.send( JSON.stringify( newUpdate ));
        // console.log('>>>>>>>>> Message Sent - updateUserColor >>>>>>>>>');
        // console.log('===> END - send_user_color');
    }

    /*================================================
        ANCHOR: FUNCTIONAL METHODS - User Interactions
    ==================================================*/

    click_name ( data )
    {
        console.log('===> click_name');
        console.log('data: ', data);
        // TODO: name clicking
        // --> open DM + Info sidebar (OVER player list)
        // --> this sidebar will have a button to swap to DM Chat (new window, don't overwrite MessageList, just make a new one on top)
        // --> "return to main chat" button
        // --> maybe have a "close chat" option to reduce open windows

        console.log('===> END - click_name');
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
            let updateData = JSON.parse( messageData.data );
            console.log('>>>>>>>>> Message Recieved - ' + updateData.type + ' >>>>>>>>>');

            /*================================================
                HANDLERS
            ==================================================*/

            switch ( updateData.type )
            {

                /*================================================
                    ANCHOR: HANDLER - USER CONNECTIONS
                ==================================================*/

                case 'clientConnected':
                    {
                        // > This handler is only fired ONCE when the CURRENT user joins
                        // console.log('======= HANDLER - clientConnected =======');

                        // > Set current user ID
                        // console.log('> Setting ID');
                        if ( updateData.userID )
                        { this.set_user_ID( updateData.userID ); }

                        // > Set previous messages
                        // console.log('> Setting messages');
                        if ( !( updateData.messages === undefined ) && ( updateData.messages.length ) )
                        { this.set_messages( updateData.messages ); }

                        // > Set users
                        // console.log('> Setting users');
                        if ( !( updateData.users === undefined ) && ( updateData.users.length ) )
                        { this.set_users( updateData.users ); }

                        // > Send current user (with new user message) information to server
                        // console.log('> Send userConnected');
                        let newUpdate = {
                            type: 'userConnected',
                            user: this.state.user,
                            message: {
                                type:    'notification-connect',
                                name:    this.state.user.name,
                                time:    new Date(),
                                color:   this.state.user.color,
                            },
                        };
                        ws.send( JSON.stringify( newUpdate ) );
                        // console.log('>>>>>>>>> Message Sent - userConnected >>>>>>>>>');
                        // console.log('======= END - HANDLER - clientConnected =======');
                        break;
                    }

                /*======================================*/
                /*======================================*/

                case 'userConnected':
                    {
                        // > This handler is only fired when OTHER users join
                        // console.log('======= HANDLER - userConnected =======');
                        this.user_add( updateData.user );
                        this.message_add( updateData.message );
                        // console.log('======= END - HANDLER - userConnected =======');
                        break;
                    }

                /*======================================*/
                /*======================================*/  

                case 'userDisconnected':
                    {
                        // This handler is only fired when OTHER users leave
                        // console.log('======= HANDLER - userDisconnected =======');
                        this.user_remove( updateData.userID );
                        this.message_add( updateData.message );
                        // console.log('======= END - HANDLER - userDisconnected =======');
                        break;
                    }

                /*================================================
                    ANCHOR: HANDLER - USER INFO
                ==================================================*/

                case 'updateUserName':
                    {
                        // console.log('======= HANDLER - updateUserName =======');
                        this.set_user_name( updateData.user, updateData.newName );
                        this.message_add( updateData.message );
                        // console.log('======= END - HANDLER - updateUserName =======');
                        break;
                    }
                
                /*======================================*/  
                /*======================================*/  

                case 'updateUserColor':
                    {
                        // console.log('======= HANDLER - updateUserColor =======');
                        this.set_user_color( updateData.user, updateData.newColor );
                        this.message_add( updateData.message );
                        // console.log('======= END - HANDLER - updateUserColor =======');
                        break;
                    }

                /*================================================
                    ANCHOR: HANDLER - MESSAGES
                ==================================================*/

                case 'newMessage':
                    {
                        // console.log('======= HANDLER - newMessage =======');
                        this.message_add( updateData.message );
                        // console.log('======= END - HANDLER - newMessage =======');
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
            ANCHOR: RENDER FUNCTIONS - Dev Tools
        ==================================================*/

        const on_dev_user = () => { this.user_add( { id: generateRandomName(), name: generateRandomName(), color: generateRandomColor() } ) }
        const on_dev_color = () => { this.send_user_color( this.state.user, generateRandomColor() ); }
        const on_dev_name = e => { if (e.keyCode === 13) { this.send_user_name( this.state.user, e.target.value ); e.target.value = ''; } }
        const on_dev_name2 = e => { this.send_user_name( this.state.user, generateRandomName() ); }

        /*================================================
            ANCHOR: COMPONENTS
        ==================================================*/
        
        return (
            <main className='app'>
                {/* <span className='close' onClick={onClose}>+</span> */}
                <Nav
                    user={this.state.user}
                />
                <Title
                    appTitle={this.state.appTitle}
                />

                <div className='container-app'>
                    <div className='container-chat'>
                        <MessageList
                            messages={this.state.messages}
                            preferences={this.state.preferences}
                            click_name={this.click_name}
                        />
                        <ChatBar
                            user={this.state.user}
                            send_message={this.send_message}
                        />
                    </div>
                    <div className='container-users'>
                        <UserList
                            usersTotal={this.state.usersTotal}
                            users={this.state.users}
                            click_name={this.click_name}
                        />
                    </div>

                </div>

                <div id='dev-tools'>
                    <div>
                        <ul>
                            <li><span>Current Player: </span></li>
                            <li>{this.state.user.id + ' '}<span>ID</span></li>
                            <li>{this.state.user.name + ' '}<span>Name</span></li>
                            <li>{this.state.user.color + ' '}<span>Color</span></li>
                        </ul>
                    </div>
                    <div>
                        <input
                            type='text'
                            className='name-input'
                            placeholder='Specific name'
                            defaultValue=''
                            onKeyDown={on_dev_name}
                        />
                        <button onClick={on_dev_name2}>Name</button>
                        <button onClick={on_dev_color}>Color</button>
                        <button onClick={on_dev_user}>Fake User</button>
                    </div>
                </div>
            </main>
        );
    }
}