import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// REDUX ACTIONS
// import { set, increment, decrement } from '../redux/features/userTotal.feature.js';
import { setID, setName, setColor } from '../redux/features/user.feature.js';
import { toggle24HourTime, toggleColorChanges, toggleNameChanges, toggleTimestamps, toggleUserJoins } from '../redux/features/preferences.feature.js';

// COMPONENETS
import Nav from './Nav/Nav.jsx';
import ChatBar from './ChatBar/ChatBar.jsx';
import UserList from './UserList/UserList.jsx';
import ChannelList from './ChannelList/ChannelList.jsx';
import MessageList from './MessageList/MessageList.jsx';

// CSS + GLOBAL CONSTANTS + HELPER FUNCTIONS
// import * as C from '../helpers/constants.js'
import * as H from '../helpers/helpers.js'
import './App.scss';

/*======================================*/
/*======================================*/

export default function App ()
{
    /*======================================
        ANCHOR: STATES
    ========================================*/

    const user = useSelector( ( state ) => { return state['user'].user; } );
    const prefs = useSelector( ( state ) => { return state['preferences'].preferences; } );
    const dispatch = useDispatch();

    // TODO: WS useEffect
    // // WS Methods
    // this.send_message    = this.send_message.bind(this);
    // this.send_user_name  = this.send_user_name.bind(this);
    // this.send_user_color = this.send_user_color.bind(this);

    // // Functional methonds - User Interactions
    // this.click_name  = this.click_name.bind(this);


    /*================================================
        ANCHOR: WS METHODS
    ==================================================*/

    const send_message = ( newMessage ) =>
    {
        console.log('===> send_message');
        // let newUpdate = {
        //     type: 'newMessage',
        //     message: newMessage,
        // };
        // this.socket.send( JSON.stringify( newUpdate ));
        // console.log('>>>>>>>>> Message Sent - newMessage >>>>>>>>>');
        console.log('===> END - send_message');
    }

    /*======================================*/
    /*======================================*/

    const send_user_name = ( user, newName ) =>
    {
        console.log('===> send_user_name');
    //     let newUpdate = {
    //         type: 'updateUserName',
    //         user: user,
    //         newName: newName,
    //         message: {
    //             type:     'notification-name',
    //             name:     newName,
    //             namePrev: user.name,
    //             time:     new Date().toGMTString(),
    //             color:    user.color,
    //         },
    //     };
    //     this.socket.send( JSON.stringify( newUpdate ));
    //     // console.log('>>>>>>>>> Message Sent - updateUserName >>>>>>>>>');
        console.log('===> END - send_user_name');
    }

    /*======================================*/
    /*======================================*/

    const send_user_color = ( user, newColor ) =>
    {
        console.log('===> send_user_color');
    //     let newUpdate = {
    //         type: 'updateUserColor',
    //         user: user,
    //         newColor: newColor,
    //         message: {
    //             type:      'notification-color',
    //             name:      user.name,
    //             time:      new Date().toGMTString(),
    //             color:     newColor,
    //             colorPrev: user.color,
    //         },
    //     };
    //     this.socket.send( JSON.stringify( newUpdate ));
    //     // console.log('>>>>>>>>> Message Sent - updateUserColor >>>>>>>>>');
        console.log('===> END - send_user_color');
    }

    /*================================================
        ANCHOR: INTERACTIONS
    ==================================================*/

    const click_name = ( data ) =>
    {
        console.log('===> click_name');
        console.log('data: ', data);
        // TODO: name clicking
        // --> open DM + Info sidebar (OVER player list)
        // --> this sidebar will have a button to swap to DM Chat (new window, don't overwrite MessageList, just make a new one on top)
        // --> 'return to main chat' button
        // --> maybe have a 'close chat' option to reduce open windows
        console.log('===> END - click_name');
    }

    /*======================================*/
    /*======================================*/

    const click_channel = ( data ) =>
    {
        console.log('===> click_channel');
        console.log('===> END - click_channel');
    }

    /*================================================
        ANCHOR: DEV TOOLS
    ==================================================*/

    // const on_dev_user  = () => { this.user_add( { id: H.elper.generateRandomName(), name: H.elper.generateRandomName(), color: H.elper.generateRandomColor() } ) }
    const on_dev_color = () => { dispatch( setColor( H.elper.generateRandomColor() ) ); }
    const on_dev_name  = e  => { if (e.keyCode === 13) { dispatch( setName( e.target.value ) ); e.target.value = ''; } }
    const on_dev_name2 = () => { dispatch( setName( H.elper.generateRandomName() ) ); }
    const on_dev_pref1 = () => { dispatch( toggleNameChanges() ); }
    const on_dev_pref2 = () => { dispatch( toggleColorChanges() ); }
    const on_dev_pref3 = () => { dispatch( toggleUserJoins() ); }
    const on_dev_pref4 = () => { dispatch( toggleTimestamps() ); }
    const on_dev_pref5 = () => { dispatch( toggle24HourTime() ); }

    /*================================================
        ANCHOR: COMPONENTS
    ==================================================*/
    
    return (
        <main className='app'>
            {/* <span className='close' onClick={onClose}>+</span> */}


            <div className='container-app'>
                <Nav />
                <div className='container-body'>
                    <div className='container-channels'>
                        <ChannelList
                            click_channel={click_channel}
                        />
                    </div>
                    <div className='container-chat'>
                        <MessageList
                            // messages={this.state.messages}
                            click_name={click_name}
                        />
                        <ChatBar
                            send_message={send_message}
                        />
                    </div>
                    <div className='container-users'>
                        <UserList
                            // users={this.state.users}
                            click_name={click_name}
                        />
                    </div>
                </div>
            </div>

            <div id='dev-tools'>
                <div>
                    <ul>
                        <li><span>Current Player: </span></li>
                        <li>{user.id+' '}<span>ID</span></li>
                        <li>{user.name+' '}<span>Name</span></li>
                        <li>{user.color+' '}<span>Color</span></li>
                        <li>{prefs.showNameChanges+' '}<span>NameChanges</span></li>
                        <li>{prefs.showColorChanges+' '}<span>ColorChanges</span></li>
                        <li>{prefs.showUserJoins+' '}<span>UserJoins</span></li>
                        <li>{prefs.showTimestamps+' '}<span>Timestamps</span></li>
                        <li>{prefs.show24HourTime+' '}<span>24HourTime</span></li>
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
                    {/* <button onClick={on_dev_user}>Fake User</button> */}
                    <div><input type='checkbox' id='dev-name' onClick={on_dev_pref1}/><label htmlFor='dev-name'>Name changes</label></div>
                    <div><input type='checkbox' id='dev-color' onClick={on_dev_pref2}/><label htmlFor='dev-color'>ColorChanges</label></div>
                    <div><input type='checkbox' id='dev-user' onClick={on_dev_pref3}/><label htmlFor='dev-user'>User joins</label></div>
                    <div><input type='checkbox' id='dev-time' onClick={on_dev_pref4}/><label htmlFor='dev-time'>Timestamps</label></div>
                    <div><input type='checkbox' id='dev-hour' onClick={on_dev_pref5}/><label htmlFor='dev-hour'>24 hour time</label></div>
                </div>
            </div>
        </main>
    );
}














// export default class App extends Component {


//     /*================================================
//         ANCHOR: COMPONENT ACTIONS
//     ==================================================*/

//     componentDidMount()
//     {

//         /*================================================
//             ANCHOR: WEBSOCKET COMMUNICATION
//         ==================================================*/

//         const ws = this.socket;

//         ws.onopen = function ( e )
//         {
//             console.log('>>>>>>>>> WebSocket Client Connected >>>>>>>>>');
//             // ws.send(JSON.stringify( e ));
//         };

//         ws.onmessage = ( messageData ) =>
//         {
//             let updateData = JSON.parse( messageData.data );
//             console.log('>>>>>>>>> Message Recieved - ' + updateData.type + ' >>>>>>>>>');

//             /*================================================
//                 HANDLERS
//             ==================================================*/

//             switch ( updateData.type )
//             {

//                 /*================================================
//                     ANCHOR: HANDLER - USER CONNECTIONS
//                 ==================================================*/

//                 case 'clientConnected':
//                     {
//                         // > This handler is only fired ONCE when the CURRENT user joins
//                         // console.log('======= HANDLER - clientConnected =======');

//                         // > Set current user ID
//                         // console.log('> Setting ID');
//                         if ( updateData.userID )
//                         { this.set_user_ID( updateData.userID ); }

//                         // > Set previous messages
//                         // console.log('> Setting messages');
//                         if ( !( updateData.messages === undefined ) && ( updateData.messages.length ) )
//                         { this.set_messages( updateData.messages ); }

//                         // > Set users
//                         // console.log('> Setting users');
//                         if ( !( updateData.users === undefined ) && ( updateData.users.length ) )
//                         { this.set_users( updateData.users ); }

//                         // > Send current user (with new user message) information to server
//                         // console.log('> Send userConnected');
//                         let newUpdate = {
//                             type: 'userConnected',
//                             user: this.state.user,
//                             message: {
//                                 type:    'notification-connect',
//                                 name:    this.state.user.name,
//                                 time:    new Date().toGMTString(),
//                                 color:   this.state.user.color,
//                             },
//                         };
//                         ws.send( JSON.stringify( newUpdate ) );
//                         // console.log('>>>>>>>>> Message Sent - userConnected >>>>>>>>>');
//                         // console.log('======= END - HANDLER - clientConnected =======');
//                         break;
//                     }

//                 /*======================================*/
//                 /*======================================*/

//                 case 'userConnected':
//                     {
//                         // > This handler is only fired when OTHER users join
//                         // console.log('======= HANDLER - userConnected =======');
//                         this.user_add( updateData.user );
//                         this.message_add( updateData.message );
//                         // console.log('======= END - HANDLER - userConnected =======');
//                         break;
//                     }

//                 /*======================================*/
//                 /*======================================*/  

//                 case 'userDisconnected':
//                     {
//                         // This handler is only fired when OTHER users leave
//                         // console.log('======= HANDLER - userDisconnected =======');
//                         this.user_remove( updateData.userID );
//                         this.message_add( updateData.message );
//                         // console.log('======= END - HANDLER - userDisconnected =======');
//                         break;
//                     }

//                 /*================================================
//                     ANCHOR: HANDLER - USER INFO
//                 ==================================================*/

//                 case 'updateUserName':
//                     {
//                         // console.log('======= HANDLER - updateUserName =======');
//                         this.set_user_name( updateData.user, updateData.newName );
//                         this.message_add( updateData.message );
//                         // console.log('======= END - HANDLER - updateUserName =======');
//                         break;
//                     }
                
//                 /*======================================*/  
//                 /*======================================*/  

//                 case 'updateUserColor':
//                     {
//                         // console.log('======= HANDLER - updateUserColor =======');
//                         this.set_user_color( updateData.user, updateData.newColor );
//                         this.message_add( updateData.message );
//                         // console.log('======= END - HANDLER - updateUserColor =======');
//                         break;
//                     }

//                 /*================================================
//                     ANCHOR: HANDLER - MESSAGES
//                 ==================================================*/

//                 case 'newMessage':
//                     {
//                         // console.log('======= HANDLER - newMessage =======');
//                         this.message_add( updateData.message );
//                         // console.log('======= END - HANDLER - newMessage =======');
//                         break;
//                     }

//                 /*======================================*/
//                 /*======================================*/

//                 default:
//             }
//         };
//     }
// }