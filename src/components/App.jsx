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

const isTooDark = (hexStr) =>
{
    let c = hexStr.substring(1); // strip #
    let rgb = parseInt(c, 16);   // convert rrggbb to decimal
    let r = (rgb >> 16) & 0xff;  // extract red
    let g = (rgb >>  8) & 0xff;  // extract green
    let b = (rgb >>  0) & 0xff;  // extract blue
    let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    if(luma < 50)
    {return true;} // is too dark
    else
    {return false;} // is light enough
}

/*======================================*/
/*======================================*/

const generateRandomColor = () =>
{
    let randomColor = '#';
    let hexCharacters = '0123456789ABCDEF';
    for(let i = 0; i < 6; i++)
    {randomColor += hexCharacters.charAt(Math.floor(Math.random() * hexCharacters.length));}
    if(isTooDark(randomColor))
    {return generateRandomColor();}
    else
    {return randomColor;}
}

/*======================================*/
/*======================================*/

const generateRandomName = () =>
{
    let randomName = ''
    let randomNumber = '';
    let numbers = '0123456789';
    for (let i = 0; i < 7; i++)
    {randomNumber += numbers.charAt(Math.floor(Math.random() * numbers.length));}
    let names = C.onst.lotrNames;
    randomName += names[(Math.floor(Math.random() * names.length))];
    return (randomName + '-' + randomNumber);
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
                show24HourTime: false,
            },
        };

    /*======================================
        ANCHOR: METHOD BINDING
    ========================================*/

        // State methods - Connection
        this.socket = new WebSocket('ws://localhost:3001');

        // State methods - Users
        this.set_users   = this.set_users.bind(this);
        this.user_add    = this.user_add.bind(this);
        this.user_remove = this.user_remove.bind(this);

        // State methods - User Info
        this.set_user_ID    = this.set_user_ID.bind(this);
        this.set_user_name  = this.set_user_name.bind(this);
        this.set_user_color = this.set_user_color.bind(this);

        // State methods - Messages
        this.set_messages = this.set_messages.bind(this);
        this.message_add  = this.message_add.bind(this);

        // State methods - Preferences
        this.toggle_pref_timeStamps  = this.toggle_pref_timeStamps.bind(this);
        this.toggle_pref_nameChanges = this.toggle_pref_nameChanges.bind(this);
        this.toggle_pref_userJoins   = this.toggle_pref_userJoins.bind(this);
        this.toggle_pref_24HourTime  = this.toggle_pref_24HourTime.bind(this);

        // WS Methods
        this.send_message    = this.send_message.bind(this);
        this.send_user_name  = this.send_user_name.bind(this);
        this.send_user_color = this.send_user_color.bind(this);

        // Functional methonds - User Interactions
        this.click_name = this.click_name.bind(this);

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
        ANCHOR: STATE METHODS - Preference Toggling
    ==================================================*/

    toggle_pref_nameChanges ()
    {
        console.log('===> toggle_pref_nameChanges');
        this.setState(prevState => {
            let preferences = { ...prevState.preferences };
            preferences.showNameChanges = !preferences.showNameChanges;
            return { preferences };
        });
        console.log('===> END - toggle_pref_nameChanges');
    }

    /*======================================*/
    /*======================================*/

    toggle_pref_timeStamps ()
    {
        console.log('===> toggle_pref_timeStamps');
        this.setState(prevState => {
            let preferences = { ...prevState.preferences };
            preferences.showTimeStamps = !preferences.showTimeStamps;
            return { preferences };
        });
        console.log('===> END - toggle_pref_timeStamps');
    }

    /*======================================*/
    /*======================================*/

    toggle_pref_userJoins ()
    {
        console.log('===> toggle_pref_userJoins');
        this.setState(prevState => {
            let preferences = { ...prevState.preferences };
            preferences.showUserJoins = !preferences.showUserJoins;
            return { preferences };
        });
        console.log('===> END - toggle_pref_userJoins');
    }

    /*======================================*/
    /*======================================*/

    toggle_pref_24HourTime ()
    {
        console.log('===> toggle_pref_24HourTime');
        this.setState(prevState => {
            let preferences = { ...prevState.preferences };
            preferences.show24HourTime = !preferences.show24HourTime;
            return { preferences };
        });
        console.log('===> END - toggle_pref_24HourTime');
    }

    /*================================================
        ANCHOR: WS METHODS
    ==================================================*/

    send_message ( newMessage )
    {
        // console.log('===> send_message');
        let newUpdate = {
            type: 'newMessage',
            message: newMessage,
        };
        this.socket.send( JSON.stringify( newUpdate ));
        console.log('>>>>>>>>> Message Sent - newMessage >>>>>>>>>');
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
                time:     new Date().toGMTString(),
                color:    user.color,
            },
        };
        this.socket.send( JSON.stringify( newUpdate ));
        console.log('>>>>>>>>> Message Sent - updateUserName >>>>>>>>>');
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
                time:      new Date().toGMTString(),
                color:     newColor,
                colorPrev: user.color,
            },
        };
        this.socket.send( JSON.stringify( newUpdate ));
        console.log('>>>>>>>>> Message Sent - updateUserColor >>>>>>>>>');
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
                                time:    new Date().toGMTString(),
                                color:   this.state.user.color,
                            },
                        };
                        ws.send( JSON.stringify( newUpdate ) );
                        console.log('>>>>>>>>> Message Sent - userConnected >>>>>>>>>');
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
                        <div>
                            <input type='checkbox' id='dev-name' onClick={this.toggle_pref_nameChanges}/>
                            <label htmlFor='dev-name'>Name changes</label>
                        </div>
                        <div>
                        <input type='checkbox' id='dev-time' onClick={this.toggle_pref_timeStamps}/>
                            <label htmlFor='dev-time'>Timestamps</label>
                        </div>
                        <div>
                        <input type='checkbox' id='dev-user' onClick={this.toggle_pref_userJoins}/>
                            <label htmlFor='dev-user'>User joins</label>
                        </div>
                        <div>
                            <input type='checkbox' id='dev-hour' onClick={this.toggle_pref_24HourTime}/>
                            <label htmlFor='dev-hour'>24 hour time</label>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}