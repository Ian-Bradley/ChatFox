import React, { Component } from 'react';
// import ChatBar from './ChatBar/ChatBar.jsx';
// import MessageList from '../MessageList.jsx';
import './App.scss';

// HELPER FUNCTIONS
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

function generateAnonymous () {
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

export default class App extends Component {

    /*======================================
        ANCHOR: STATE
    ========================================*/

    constructor(props) 
    {
        super(props);
        this.state = {
            currentUser: {name: ''},
            display: 'none',
            preferencesDisplay: 'none',
            timestampDisplay: 'none',
            messages: [],
            totalUsers: 0,
            menuOpen: false,
            anonymousName: generateAnonymous(),
            color: generateRandomColor()
        };

    /*======================================
        ANCHOR: METHOD BINDING
    ========================================*/

        // State methods
        this.socket = new WebSocket('ws://localhost:3001');
        this.addMessage = this.addMessage.bind(this);
        this.changeUserName = this.changeUserName.bind(this);
        this.userAmount = this.userAmount.bind(this);
        this.colorMenu = this.colorMenu.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.preferencesMenu = this.preferencesMenu.bind(this);
        this.calculateTimeSince = this.calculateTimeSince.bind(this);
        this.showTimestamps = this.showTimestamps.bind(this);


        // Functional methods

    }



    /*================================================
        ANCHOR: STATE METHODS - Game States
    ==================================================*/

    //COMPONENT METHODS
    changeUserName ( username )
    {
        this.setState({currentUser: {name: username}});
    }

    /*======================================*/
    /*======================================*/

    addMessage ( message )
    {
        const messages = this.state.messages.concat(message);
        this.setState({messages: messages});
    }

    /*======================================*/
    /*======================================*/

    userAmount ( total )
    {
        this.setState({totalUsers: total});
    }

    /*======================================*/
    /*======================================*/

    changeColor ( color )
    {
        this.setState({color: color});
    }

    /*======================================*/
    /*======================================*/

    colorMenu()
    {
        if ( this.state.menuOpen )
        {
            this.setState({preferencesDisplay: 'none'});
            this.setState({display: 'none'});
            this.setState({menuOpen: false});
        }
        else
        {
            this.setState({display: 'flex'});
            this.setState({menuOpen: true});
        }
    }

    /*======================================*/
    /*======================================*/

    preferencesMenu()
    {
        if ( this.state.menuOpen )
        {
            this.setState({preferencesDisplay: 'none'});
            this.setState({display: 'none'});
            this.setState({menuOpen: false});
        }
        else
        {
            this.setState({preferencesDisplay: 'flex'});
            this.setState({menuOpen: true});
        }
    }

    /*======================================*/
    /*======================================*/

    showTimestamps()
    {
        if ( this.state.timestampDisplay === 'none' )
        {
            this.setState({timestampDisplay: 'flex'});
        }
        else
        {
            this.setState({timestampDisplay: 'none'});
        }
    }

    /*======================================*/
    /*======================================*/

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

                /*======================================*/
                /*======================================*/  

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

                case 'incomingClientConnected':
                {
                    this.userAmount( updateData.total );
                    const userConnected = {
                        type: 'incomingClientConnected',
                        content: 'A user has connected',
                        messageTime: updateData.messageTime,
                        id: updateData.id
                    };
                    this.addMessage( userConnected );
                    window.scrollTo( 0, document.body.scrollHeight );
                    break;
                }

                /*======================================*/
                /*======================================*/

                case 'incomingClientDisconnected':
                {
                    this.userAmount( updateData.total );
                    const userDisconnected = {
                        type: 'incomingClientDisconnected',
                        content: 'A user has disconnected',
                        messageTime: updateData.messageTime,
                        id: message.id
                    };
                    this.addMessage( userDisconnected );
                    window.scrollTo( 0, document.body.scrollHeight );
                    break;
                }

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
                {/* <nav className="navbar">
                    <a href="/" className="navbar-brand">Chattr</a>
                    <span className="navbar-users">{this.state.totalUsers} users online</span>
                </nav> */}

                {/* <MessageList
                    messages={this.state.messages}
                    display={this.state.display}
                    preferencesDisplay={this.state.preferencesDisplay}
                    timestampDisplay={this.state.timestampDisplay}
                    colorMenu={this.colorMenu}
                    changeColor={this.changeColor}
                    calculateTimeSince={this.calculateTimeSince}
                    showTimestamps={this.showTimestamps}
                />

                <ChatBar
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