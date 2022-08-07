import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// COMPONENETS
import Nav from './Nav/Nav.jsx'
import ChatBar from './ChatBar/ChatBar.jsx'
import UserList from './UserList/UserList.jsx'
import ChannelList from './ChannelList/ChannelList.jsx'
import MessageList from './MessageList/MessageList.jsx'

// CSS + GLOBAL CONSTANTS + HELPER FUNCTIONS
import * as C from '../helpers/constants.js'
import * as H from '../helpers/functions.js'
import './App.scss'

/*================================================
    ANCHOR: REDUX ACTIONS
==================================================*/

import {
    setUserTotal,
    incrementUserTotal,
    decrementUserTotal
} from '../redux/features/userTotal.feature.js'
/*======================================*/
import {
    setID,
    setName,
    setNickname,
    setColor
} from '../redux/features/user.feature.js'
/*======================================*/
import {
    addUser,
    removeUser,
    setUsers,
    setUserName,
    setUserNickname,
    setUserColor,
} from '../redux/features/users.feature.js'
/*======================================*/
import {
    toggleTimestamps,
    toggle24HourTime
} from '../redux/features/preferences.feature.js'
/*======================================*/
import {
    setChannel,
    setName,
    setPublic,
    setPrivate,
    setPassword,
} from '../redux/features/channel.feature.js'
/*======================================*/
import {
    addChannel,
    deleteChannel,
    deleteAllChannels,
    setChannels,
    setChannelActive,
    setChannelInctive,
    setChannelPrivate,
    setChannelPublic,
    setChannelPassword,
} from '../redux/features/channels.feature.js'
/*======================================*/
import {
    addMessage,
    deleteMessage,
    deleteAllMessages,
    setMessages,
} from '../redux/features/messages.feature.js'
/*======================================*/
import {
    addLogItem,
    deleteLogItem,
    deleteAllLogItems,
} from '../redux/features/log.feature.js'
/*======================================*/

export default function App ()
{
    /*================================================
        ANCHOR: STATE
    ==================================================*/

    // Redux
    const user  = useSelector( ( state ) => { return state['user'].user } )
    const prefs = useSelector( ( state ) => { return state['preferences'].preferences } )
    const dispatch = useDispatch()
    // Hooks
    const [WSReady, setWSReady] = useState(false)
    const [WS, setWS] = useState(new WebSocket( C.onst.wsURL ))

    /*================================================
        ANCHOR: HOOKS - USER INFO
    ==================================================*/

    useEffect( () =>
    {
        // TODO: Cookies
        // Get current userID (and maybe name/team/color) from cookies
        // If ID is not present, auth page has failed to store cookie
        // let userID = this.getCookie('user-id')
        // this.set_user_ID( userID )
    })

    /*================================================
        ANCHOR: HOOKS - WEBSOCKET COMMUNICATION
    ==================================================*/

    useEffect( () => {

        /*================================================
            ANCHOR: WS - ON OPEN
        ==================================================*/

        WS.onopen = ( e ) =>
        {
            setWSReady(true)
            console.log('>>>>>>>>> WebSocket Client Connected >>>>>>>>>')
        }

        /*================================================
            ANCHOR: WS - ON MESSAGE
        ==================================================*/
    
        WS.onmessage = ( messageData ) =>
        {
            const updateData = JSON.parse( messageData.data )
            console.log('>>>>>>>>> Message Recieved - ' + updateData.type + ' >>>>>>>>>')
    
            switch ( updateData.type )
            {
    
                /*================================================
                    ANCHOR: HANDLER - USER CONNECTIONS
                ==================================================*/
    
                case 'clientConnected':
                    {
                        // This handler is only fired ONCE when the CURRENT user joins
                        console.log('======= HANDLER - clientConnected =======')
    
                        // Set current user ID
                        console.log('> Setting ID')
                        if ( updateData.userID )
                        { dispatch( setID( updateData.userID ) ) }
    
                        // Set previous messages
                        console.log('> Setting messages')
                        if ( !( updateData.messages === undefined ) && ( updateData.messages.length ) )
                        { dispatch( setMessages( updateData.messages ) ) }
    
                        // Set users
                        console.log('> Setting users')
                        if ( !( updateData.users === undefined ) && ( updateData.users.length ) )
                        { dispatch( setUsers( updateData.users ) )
                          dispatch( setUserTotal( updateData.users.length + 1 ) ) } // + 1 for current user
    
                        // Send current user (with new user message) information to server
                        console.log('> Send userConnected')
                        let newUpdate = {
                            type: 'userConnected',
                            user: user,
                            message: {
                                type:    'notification-connect',
                                name:    user.name,
                                time:    new Date().toGMTString(),
                                color:   user.color,
                            },
                        }
                        WS.send( JSON.stringify( newUpdate ) )
                        console.log('>>>>>>>>> Message Sent - userConnected >>>>>>>>>')
                        console.log('======= END - HANDLER - clientConnected =======')
                        break
                    }
    
                /*======================================*/
                /*======================================*/
    
                case 'userConnected':
                    {
                        // This handler is only fired when OTHER users join
                        console.log('======= HANDLER - userConnected =======')
                        dispatch( addUser( updateData.user ) )
                        dispatch( addLogItem( updateData.message ) )
                        dispatch( incrementUserTotal() )
                        console.log('======= END - HANDLER - userConnected =======')
                        break
                    }
    
                /*======================================*/
                /*======================================*/  
    
                case 'userDisconnected':
                    {
                        // This handler is only fired when OTHER users leave
                        console.log('======= HANDLER - userDisconnected =======')
                        dispatch( removeUser( updateData.userID ) )
                        dispatch( addLogItem( updateData.message ) )
                        dispatch( decrementUserTotal() )
                        console.log('======= END - HANDLER - userDisconnected =======')
                        // break
                    }
    
                /*================================================
                    ANCHOR: HANDLER - USER INFO
                ==================================================*/
    
                case 'updateUserName':
                    {
                        console.log('======= HANDLER - updateUserName =======')
                        if ( updateData.user.id === user.id )
                        { dispatch( setName( updateData.newName ) ) }
                        else
                        { dispatch( setUserName( { id: updateData.user, name: updateData.newName } ) ) }
                        dispatch( addLogItem( updateData.message ) )
                        console.log('======= END - HANDLER - updateUserName =======')
                        break
                    }

                /*======================================*/  
                /*======================================*/  

                case 'updateUserNickame':
                    {
                        console.log('======= HANDLER - updateUserNickname =======')
                        if ( updateData.user.id === user.id )
                        { dispatch( setNickname( updateData.newNickname ) ) }
                        else
                        { dispatch( setUserNickname( { id: updateData.user, nickname: updateData.newNickname } ) ) }
                        dispatch( addLogItem( updateData.message ) )
                        console.log('======= END - HANDLER - updateUserNickname =======')
                        break
                    }
                
                /*======================================*/  
                /*======================================*/  
    
                case 'updateUserColor':
                    {
                        console.log('======= HANDLER - updateUserColor =======')
                        if ( updateData.user.id === user.id )
                        { dispatch( setColor( updateData.newColor ) ) }
                        else
                        { dispatch( setUserColor( { id: updateData.user, color: updateData.newColor } ) ) }
                        dispatch( addLogItem( updateData.message ) )
                        console.log('======= END - HANDLER - updateUserColor =======')
                        break
                    }
    
                /*================================================
                    ANCHOR: HANDLER - CHANNELS
                ==================================================*/

                case 'updateAddChannel':
                    {
                        console.log('======= HANDLER - updateAddChannel =======')
                        updateData.id = uuidv4()
                        // dispatch(  )
                        // serverData.addChannel( updateData.channel )
                        dispatch( addLogItem( updateData.message ) )
                        console.log('>>>>>>>>> Message Sent - updateAddChannel >>>>>>>>>')
                        console.log('======= END HANDLER - updateAddChannel =======')
                        break
                    }

                /*======================================*/
                /*======================================*/

                case 'updateDeleteChannel':
                    {
                        console.log('======= HANDLER - updateDeleteChannel =======')
                        updateData.id = uuidv4()
                        // serverData.deleteChannel( updateData.channelID )
                        dispatch( addLogItem( updateData.message ) )
                        console.log('>>>>>>>>> Message Sent - updateDeleteChannel >>>>>>>>>')
                        console.log('======= END HANDLER - updateDeleteChannel =======')
                        break
                    }

                /*======================================*/
                /*======================================*/

                case 'updateChannelName':
                    {
                        console.log('======= HANDLER - updateChannelName =======')
                        updateData.id = uuidv4()
                        // serverData.setChannelName( updateData.channel, updateData.newName )
                        dispatch( addLogItem( updateData.message ) )
                        console.log('>>>>>>>>> Message Sent - updateChannelName >>>>>>>>>')
                        console.log('======= END HANDLER - updateChannelName =======')
                        break
                    }

                /*======================================*/
                /*======================================*/

                case 'updateChannelPublic':
                    {
                        console.log('======= HANDLER - updateChannelPublic =======')
                        updateData.id = uuidv4()
                        // serverData.setChannelPublic( updateData.channel )
                        dispatch( addLogItem( updateData.message ) )
                        console.log('>>>>>>>>> Message Sent - updateChannelPublic >>>>>>>>>')
                        console.log('======= END HANDLER - updateChannelPublic =======')
                        break
                    }

                /*======================================*/
                /*======================================*/

                case 'updateChannelPrivate':
                    {
                        console.log('======= HANDLER - updateChannelPrivate =======')
                        updateData.id = uuidv4()
                        // serverData.setChannelPrivate( updateData.channel )
                        // serverData.setChannelPassword( updateData.channel, updateData.password )
                        dispatch( addLogItem( updateData.message ) )
                        console.log('>>>>>>>>> Message Sent - updateChannelPrivate >>>>>>>>>')
                        console.log('======= END HANDLER - updateChannelPrivate =======')
                        break
                    }

                /*======================================*/
                /*======================================*/

                case 'updateChannelPassword':
                    {
                        console.log('======= HANDLER - updateChannelPassword =======')
                        updateData.id = uuidv4()
                        // serverData.setChannelPassword( updateData.channel, updateData.password )
                        dispatch( addLogItem( updateData.message ) )
                        console.log('>>>>>>>>> Message Sent - updateChannelPassword >>>>>>>>>')
                        console.log('======= END HANDLER - updateChannelPassword =======')
                        break
                    }

                /*================================================
                    ANCHOR: HANDLER - MESSAGES
                ==================================================*/
    
                case 'newMessage':
                    {
                        console.log('======= HANDLER - newMessage =======')
                        dispatch( addMessage( updateData.message ) )
                        console.log('======= END - HANDLER - newMessage =======')
                        break
                    }
    
                /*======================================*/
                /*======================================*/
    
                default:
            }
        }

        /*================================================
            ANCHOR: WS - ON CLOSE
        ==================================================*/
    
        WS.onclose = ( e ) =>
        {
            setWSReady(false)
            // TODO: check if neeeded
            setTimeout(() => {
                setWS(new WebSocket( C.onst.wsURL ))
            }, 1000)
        }

        /*================================================
            ANCHOR: WS - ON ERROR
        ==================================================*/
    
        WS.onerror = ( err ) =>
        {
            console.log('WebSocket encountered error: ', err.message, ' --> Closing socket')
            setWSReady(false)
            WS.close()
        }

        /*================================================
            ANCHOR: WS - COMPONENT UNMOUNTING
        ==================================================*/
    
        return () =>
        {
            WS.close()
        }
    }, [WS])

    /*================================================
        ANCHOR: WS SENDERS - USER INFO
    ==================================================*/

    const sendUserName = ( newName ) =>
    {
        console.log('===> sendUserName')
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
        }
        WS.send( JSON.stringify( newUpdate ))
        console.log('>>>>>>>>> Message Sent - updateUserName >>>>>>>>>')
        console.log('===> END - sendUserName')
    }

    /*======================================*/
    /*======================================*/

    const sendUserNickname = ( newNickname ) =>
    {
        console.log('===> sendUserNickname')
        let newUpdate = {
            type: 'updateUserNickname',
            user: user,
            newNickname: newNickname,
            message: {
                type:        'notification-nickname',
                nickname:     newNickname,
                nicknamePrev: user.nickname,
                time:         new Date().toGMTString(),
                color:        user.color,
            },
        }
        WS.send( JSON.stringify( newUpdate ))
        console.log('>>>>>>>>> Message Sent - updateUserNickname >>>>>>>>>')
        console.log('===> END - sendUserNickname')
    }

    /*======================================*/
    /*======================================*/

    const sendUserColor = ( newColor ) =>
    {
        console.log('===> sendUserColor')
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
        }
        WS.send( JSON.stringify( newUpdate ))
        console.log('>>>>>>>>> Message Sent - updateUserColor >>>>>>>>>')
        console.log('===> END - sendUserColor')
    }

    /*================================================
        ANCHOR: WS SENDERS - INTERACTIONS
    ==================================================*/

    const sendMessage = ( newMessage ) =>
    {
        console.log('===> sendMessage')
        let newUpdate = {
            type: 'newMessage',
            message: newMessage,
        }
        WS.send( JSON.stringify( newUpdate ))
        console.log('>>>>>>>>> Message Sent - newMessage >>>>>>>>>')
        console.log('===> END - sendMessage')
    }

    /*======================================*/
    /*======================================*/

    const clickName = ( data ) =>
    {
        console.log('===> clickName')
        console.log('data: ', data)
        // TODO: name clicking
        // --> open DM + Info sidebar (OVER player list)
        // --> this sidebar will have a button to swap to DM Chat (new window, don't overwrite MessageList, just make a new one on top)
        // --> 'return to main chat' button
        // --> maybe have a 'close chat' option to reduce open windows
        console.log('===> END - clickName')
    }

    /*======================================*/
    /*======================================*/

    const clickChannel = ( data ) =>
    {
        console.log('===> clickChannel')
        console.log('data: ', data)
        // TODO: channel clicking
        console.log('===> END - clickChannel')
    }

    /*================================================
        ANCHOR: DEV TOOLS
    ==================================================*/

    const onDevuser = () => { dispatch( addUser( {
        id: H.elper.generateRandomName(),
        name: H.elper.generateRandomName(true),
        nickname: H.elper.generateRandomName(false),
        color: H.elper.generateRandomColor()
    } ) ) }
    
    const onDevcolor = () => { sendUserColor( H.elper.generateRandomColor() ) }
    const onDevname  = e  => { if (e.keyCode === 13) { sendUserNickname( e.target.value ); e.target.value = '' } }
    const onDevname3 = e  => { if (e.keyCode === 13) { sendUserName( e.target.value ); e.target.value = '' } }
    const onDevname2 = () => { sendUserNickname( H.elper.generateRandomName() ) }

    const onDevpref4 = () => { dispatch( toggleTimestamps() ) }
    const onDevpref5 = () => { dispatch( toggle24HourTime() ) }

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
                            clickChannel={clickChannel}
                        />
                    </div>
                    <div className='container-chat'>
                        <MessageList
                            clickName={clickName}
                        />
                        <ChatBar
                            sendMessage={sendMessage}
                        />
                    </div>
                    <div className='container-users'>
                        <UserList
                            clickName={clickName}
                        />
                    </div>
                </div>
            </div>

            <div id='dev-tools'>
                <div>
                    <ul>
                        <li><span>Current User: </span></li>
                        <li>{user.id+' '}<span>ID</span></li>
                        <li>{user.name+' '}<span>Name</span></li>
                        <li>{user.nickname+' '}<span>Nickname</span></li>
                        <li>{user.color+' '}<span>Color</span></li>
                        <li>{prefs.showTimestamps+' '}<span>Timestamps</span></li>
                        <li>{prefs.show24HourTime+' '}<span>24HourTime</span></li>
                    </ul>
                </div>
                <div>
                    <input type='text' className='name-input' placeholder='Specific name'     defaultValue='' onKeyDown={onDevname3} />
                    <input type='text' className='name-input' placeholder='Specific nickname' defaultValue='' onKeyDown={onDevname}  />
                    <button onClick={onDevname2}>Name</button>
                    <button onClick={onDevcolor}>Color</button>
                    <button onClick={onDevuser}>Fake User</button>
                    <div><input type='checkbox' id='dev-name'  onClick={onDevpref1}/><label htmlFor='dev-name' >Name changes</label></div>
                    <div><input type='checkbox' id='dev-color' onClick={onDevpref2}/><label htmlFor='dev-color'>ColorChanges</label></div>
                    <div><input type='checkbox' id='dev-user'  onClick={onDevpref3}/><label htmlFor='dev-user' >User joins</label></div>
                    <div><input type='checkbox' id='dev-time'  onClick={onDevpref4}/><label htmlFor='dev-time' >Timestamps</label></div>
                    <div><input type='checkbox' id='dev-hour'  onClick={onDevpref5}/><label htmlFor='dev-hour' >24 hour time</label></div>
                </div>
            </div>
        </main>
    )
}