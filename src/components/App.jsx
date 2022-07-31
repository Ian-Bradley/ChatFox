import React, { Component } from 'react';
import Nav from './Nav/Nav.jsx';
import Title from './Title/Title.jsx';
import ChatBar from './ChatBar/ChatBar.jsx';
import UserList from './UserList/UserList.jsx';
import MessageList from './MessageList/MessageList.jsx';
import './App.scss';

/* TODO:
> settings menu
    - show name change notifications
    - show user join notifications
    - show timestamps
    - change user color
    - change user name
    - 12/24 hours time
    - alternate line shading

> auto-shorten links
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

function generateAnonymous ()
{
    let name = 'RandomName';
    let numbers = '0123456789';
    let randomNumberString = '';
    for (let i = 0; i < 6; i++)
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
            appTitle: 'ChatFox',
            user: {
                id: 1,
                name: generateAnonymous(),
                color: generateRandomColor(),
            },
            users: [],
            messages: [],
            usersTotal: 0,
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
        this.message_send         = this.message_send.bind(this);

        // State methods - Preferences
        this.set_pref_timeStamps  = this.set_pref_timeStamps.bind(this);
        this.set_pref_nameChanges = this.set_pref_nameChanges.bind(this);
        this.set_pref_userJoins   = this.set_pref_userJoins.bind(this);
    }

    /*================================================
        ANCHOR: STATE METHODS - Game States
    ==================================================*/

    set_users ( usersArray )
    {
        console.log('===> set_users');
        this.setState({ users: usersArray });
        this.setState({ usersTotal: this.state.users.length + 1 });
        console.log('===> END - set_users');
    }

    /*======================================*/
    /*======================================*/

    user_add ( user )
    {
        console.log('===> user_add');
        // this.state.users.push( user );
        this.setState( prevState => ({
            users: [ ...prevState.users, user ]
        }));
        this.setState({ usersTotal: this.state.usersTotal + 1 });
        console.log('===> END - user_add');
    }

    /*======================================*/
    /*======================================*/

    user_remove ( userID )
    {
        console.log('===> user_remove');
        // this.state.users = this.state.users.filter( user => ( user.id !== userID ) );
        this.setState( prevState => {
            let users = prevState.users.filter( user => user.id !== userID );
            return { users };
        });
        this.setState({ usersTotal: this.state.usersTotal - 1 });
        console.log('===> END - user_remove');
    }

    /*================================================
        ANCHOR: STATE METHODS - User Info
    ==================================================*/

    set_user_ID ( ID )
    {
        console.log('===> set_user_ID');
        this.setState(prevState => {
            let user = { ...prevState.user };
            user.id = ID;
            return { user };
        });
        console.log('===> END - set_user_ID');
    }

    /*======================================*/
    /*======================================*/

    set_user_name ( user, name )
    {
        console.log('===> set_user_name');
        if ( user.id === this.state.user.id )
        {
            // > Current user
            console.log('> Current user');
            // const previousName = this.state.user.name;
            const newMessage = {
                type:     'notification-name',
                name:     name,
                namePrev: this.state.user.name,
                time:     new Date(),
                color:    this.state.user.color,
            };
            // > States
            this.message_add( newMessage );
            this.setState(prevState => {
                let user = { ...prevState.user };
                user.name = name;
                return { user };
            });
            // > WS
            let newUpdate = {
                type: 'updateUserName',
                user: this.state.user,
                newName: name,
                message: newMessage,
            };
            this.socket.send( JSON.stringify( newUpdate ));
            console.log('>>>>>>>>> Message Sent - updateUserName >>>>>>>>>');
        }
        else
        {
            // > Other user
            console.log('> Other user');
            this.setState( prevState => {
                let users = prevState.users;
                for ( let i = 0; i < users.length; i++ )
                {
                    if ( users[i].id === user.id )
                    {
                        users[i].name = name;
                    }
                }
                return { users };
            });
        }
        console.log('===> END - set_user_name');
    }

    /*======================================*/
    /*======================================*/

    set_user_color ( user, color )
    {
        console.log('===> set_user_color');
        if ( user.id === this.state.user.id )
        {
            // > Current user
            console.log('> Current user');
            // const previousColor = this.state.user.color;
            const newMessage = {
                type:      'notification-color',
                name:      this.state.user.name,
                time:      new Date(),
                color:     color,
                colorPrev: this.state.user.color,
            };
            // > States
            this.message_add( newMessage );
            this.setState(prevState => {
                let user = { ...prevState.user };
                user.color = color;
                return { user };
            });
            // > WS
            let newUpdate = {
                type: 'updateUserColor',
                user: this.state.user,
                newColor: color,
                message: newMessage,
            };
            this.socket.send( JSON.stringify( newUpdate ));
            console.log('>>>>>>>>> Message Sent - updateUserColor >>>>>>>>>');
        }
        else
        {
            // > Other user
            console.log('> Other user');
            this.setState( prevState => {
                let users = prevState.users;
                for ( let i = 0; i < users.length; i++ )
                {
                    if ( users[i].id === user.id )
                    {
                        users[i].color = color;
                    }
                }
                return { users };
            });
        }
        console.log('===> END - set_user_color');
    }

    /*================================================
        ANCHOR: STATE METHODS - Messages
    ==================================================*/

    set_messages( messagesArray )
    {
        console.log('===> set_messages');
        this.setState({ messages: messagesArray });
        console.log('===> END - lset_messages');
    }

    /*======================================*/
    /*======================================*/

    message_add ( message )
    {
        console.log('===> message_add');

        this.setState( prevState => ({
            messages: [ ...prevState.messages, message]
        }));

        console.log('===> END - message_add');
    }

    /*======================================*/
    /*======================================*/

    message_send ( newMessage )
    {
        console.log('===> message_send');
        // > WS
        let newUpdate = {
            type: 'newMessage',
            message: newMessage,
        };
        this.socket.send( JSON.stringify( newUpdate ));
        console.log('>>>>>>>>> Message Sent - newMessage >>>>>>>>>');
        console.log('===> END - message_send');
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
            console.log('> ', updateData.type);

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
                        console.log('======= HANDLER - clientConnected =======');

                        // > Set current user ID
                        console.log('> Setting ID');
                        if ( updateData.userID )
                        { this.set_user_ID( updateData.userID ); }

                        // > Set previous messages
                        console.log('> Setting messages');
                        if ( !( updateData.messages === undefined ) && ( updateData.messages.length ) )
                        { this.set_messages( updateData.messages ); }

                        // > Set users
                        console.log('> Setting users');
                        if ( !( updateData.users === undefined ) && ( updateData.users.length ) )
                        { this.set_users( updateData.users ); }

                        // > Send current user (with new user message) information to server
                        console.log('> Send userConnected');
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
                        console.log('>>>>>>>>> Message Sent - userConnected >>>>>>>>>');
                        console.log('======= END - HANDLER - clientConnected =======');
                        break;
                    }

                /*======================================*/
                /*======================================*/

                case 'userConnected':
                    {
                        // > This handler is only fired when OTHER users join
                        console.log('======= HANDLER - userConnected =======');
                        this.user_add( updateData.user );
                        this.message_add( updateData.message );
                        console.log('======= END - HANDLER - userConnected =======');
                        break;
                    }

                /*======================================*/
                /*======================================*/  

                case 'userDisconnected':
                    {
                        // This handler is only fired when OTHER users leave
                        console.log('======= HANDLER - userDisconnected =======');
                        this.user_remove( updateData.userID );
                        this.message_add( updateData.message );
                        console.log('======= END - HANDLER - userDisconnected =======');
                        break;
                    }

                /*================================================
                    ANCHOR: HANDLER - USER INFO
                ==================================================*/

                case 'updateUserName':
                    {
                        console.log('======= HANDLER - updateUserName =======');
                        this.set_user_name( updateData.user, updateData.name );
                        this.message_add( updateData.message );
                        console.log('======= END - HANDLER - updateUserName =======');
                        break;
                    }
                
                /*======================================*/  
                /*======================================*/  

                case 'updateUserColor':
                    {
                        console.log('======= HANDLER - updateUserColor =======');
                        this.set_user_color( updateData.user, updateData.color );
                        this.message_add( updateData.message );
                        console.log('======= END - HANDLER - updateUserColor =======');
                        break;
                    }

                /*================================================
                    ANCHOR: HANDLER - MESSAGES
                ==================================================*/

                case 'newMessage':
                    {
                        console.log('======= HANDLER - newMessage =======');
                        this.message_add( updateData.message );
                        console.log('======= END - HANDLER - newMessage =======');
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

        const on_dev_user = () => {
            // const fakeLog = [
            //     { player: {team: 'red', name: 'Chilled'}, itemType: 'clue', clue: 'Food' },
            // ];
        }
        const on_dev_color = () => { this.set_user_color( this.state.user, generateRandomColor() ); }
        const on_dev_name = e => { if (e.keyCode === 13) { this.set_user_name( this.state.user, e.target.value ); e.target.value = ''; } }

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
                        />
                        <ChatBar
                            user={this.state.user}
                            message_send={this.message_send}
                        />
                    </div>
                    <div className='container-users'>
                        <UserList
                            totalUsers={this.state.totalUsers}
                            users={this.state.users}
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
                            placeholder='Name'
                            defaultValue=''
                            onKeyDown={on_dev_name}
                        />
                        <button onClick={on_dev_color}>Color</button>
                    </div>
                </div>
            </main>
        );
    }
}