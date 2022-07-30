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

        // State methods - Preferences
        this.set_pref_timeStamps  = this.set_pref_timeStamps.bind(this);
        this.set_pref_nameChanges = this.set_pref_nameChanges.bind(this);
        this.set_pref_userJoins   = this.set_pref_userJoins.bind(this);

        // Functional methods - Time / Date
        this.calculateTimeSince   = this.calculateTimeSince.bind(this);
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
            this.setState(prevState => {
                let user = { ...prevState.user };
                user.name = name;
                return { user };
            });
            // > WS
            let newUpdate = {
                type: 'updateUserName',
                player: this.state.user,
                newName: name,
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
            this.setState(prevState => {
                let user = { ...prevState.user };
                user.color = color;
                return { user };
            });
            // > WS
            let newUpdate = {
                type: 'updateUserColor',
                player: this.state.user,
                newColor: color,
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
        ANCHOR: FUNCTIONAL METHODS - Time / Date
    ==================================================*/

    calculateTimeSince ( time )
    {
        let currentTime = Date.now();
        let timeSince = currentTime - time;
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

                    // > Send current user information to server
                    console.log('> Send userConnected');
                    let newUpdate = {
                        type: 'userConnected',
                        user: this.state.user,
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
            ANCHOR: COMPONENTS
        ==================================================*/
        
        return (
            <div>

                <ChatNav
                    totalUsers={this.state.totalUsers}
                    userName={this.state.user.name}
                />

                <div className='container-title'>
                    <span href='/' className='nav-title'>ChatFox</span>
                </div>

                <MessageList
                    messages={this.state.messages}
                />

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