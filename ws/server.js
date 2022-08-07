/*================================================
    ANCHOR: CONFIGURATION
==================================================*/

const express = require('express')
const SocketServer = require('ws')
const { v4: uuidv4 } = require('uuid')

const PORT = 3001
const server = express()
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`))
const wss = new SocketServer.Server({ server })

/*================================================
    ANCHOR: CLASS INITIATION
==================================================*/

import DataTracker from './DataTracker.js'
let serverData = new DataTracker()

/*================================================
    ANCHOR: WS SERVER FUNCTIONS
==================================================*/

wss.broadcast = ( data, wsClient ) =>
{
    wss.clients.forEach( client =>
    {
        if ( ( client.readyState === SocketServer.OPEN ) && ( wsClient !== client ) )
        {
            client.send( data )
        }
    })
}

wss.broadcastClient = ( data, wsClient ) =>
{
    if ( wsClient.readyState === SocketServer.OPEN )
    {
        wsClient.send( data )
    }
    
}

wss.broadcastAll = ( data ) =>
{
    wss.clients.forEach( client =>
    {
        if ( client.readyState === SocketServer.OPEN )
        {
            client.send( data )
        }
    })
}

/*================================================
    ANCHOR: WS SERVER
==================================================*/

wss.on('connection', ( wsClient ) =>
{

    /*================================================
        ANCHOR: INITIAL CONNECTION TO CLIENT
    ==================================================*/

    console.log('======= Client Connected =======')
 
    // Set initial client data
    let userData = {
        id:       uuidv4(), // message id
        type:     'clientConnected',
        users:    serverData.state.users,
        userID:   uuidv4(), // id for disconnecting user removal - TODO: supply id on auth page
        messages: serverData.state.messages,
    }
    
    // Send id, users, and message to connecting client
    wss.broadcastClient( JSON.stringify( userData ), wsClient )
    console.log('>>>>>>>>> Message Sent - Client Data >>>>>>>>>')
    console.log('======= END - Client Connected =======')

    /*================================================
        ANCHOR: HANDLERS
    ==================================================*/

    wsClient.on('message', function incoming( data )
    {
        console.log('>>>>>>>>> Message Recieved >>>>>>>>>')
        let updateData = JSON.parse( data )
        console.log('type: ', updateData.type)

        switch ( updateData.type )
        {

            /*================================================
                ANCHOR: HANDLER - USER CONNECTION
            ==================================================*/

            case 'userConnected':
                {
                    // Send new user data to all other users
                    console.log('======= HANDLER - userConnected =======')
                    updateData.id = uuidv4()
                    userData.userID = updateData.user.id // set id for disconnecting user removal
                    serverData.addUser( updateData.user )
                    serverData.addLogItem( updateData.message )
                    wss.broadcast( JSON.stringify( updateData ), wsClient )
                    console.log('>>>>>>>>> Message Sent - userConnected >>>>>>>>>')
                    console.log('======= END HANDLER - userConnected =======')
                    break
                }  
            
            /*================================================
                ANCHOR: HANDLER - USER INFO
            ==================================================*/

            case 'updateUserName':
                {
                    console.log('======= HANDLER - updateUserName =======')
                    updateData.id = uuidv4()
                    serverData.setUserName( updateData.user, updateData.newName )
                    serverData.addLogItem( updateData.message )
                    wss.broadcastAll( JSON.stringify( updateData ) )
                    console.log('>>>>>>>>> Message Sent - updateUserName >>>>>>>>>')
                    console.log('======= END HANDLER - updateUserName =======')
                    break
                }

            /*======================================*/
            /*======================================*/

            case 'updateUserNickname':
                {
                    console.log('======= HANDLER - updateUserNickname =======')
                    updateData.id = uuidv4()
                    serverData.setUserNickname( updateData.user, updateData.newNickname )
                    serverData.addLogItem( updateData.message )
                    wss.broadcastAll( JSON.stringify( updateData ) )
                    console.log('>>>>>>>>> Message Sent - updateUserNickname >>>>>>>>>')
                    console.log('======= END HANDLER - updateUserNickname =======')
                    break
                }

            /*======================================*/
            /*======================================*/

            case 'updateUserColor':
                {
                    console.log('======= HANDLER - updateUserColor =======')
                    updateData.id = uuidv4()
                    serverData.setUserColor( updateData.user, updateData.newColor )
                    serverData.addLogItem( updateData.message )
                    wss.broadcastAll( JSON.stringify( updateData ) )
                    console.log('>>>>>>>>> Message Sent - updateUserColor >>>>>>>>>')
                    console.log('======= END HANDLER - updateUserColor =======')
                    break
                }

            /*================================================
                ANCHOR: HANDLER - CHANNELS
            ==================================================*/

            case 'updateAddChannel':
                {
                    console.log('======= HANDLER - updateAddChannel =======')
                    updateData.id = uuidv4()
                    serverData.addChannel( updateData.channel )
                    serverData.addLogItem( updateData.message )
                    wss.broadcastAll( JSON.stringify( updateData ) )
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
                    serverData.deleteChannel( updateData.channelID )
                    serverData.addLogItem( updateData.message )
                    wss.broadcastAll( JSON.stringify( updateData ) )
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
                    serverData.setChannelName( updateData.channel, updateData.newName )
                    serverData.addLogItem( updateData.message )
                    wss.broadcastAll( JSON.stringify( updateData ) )
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
                    serverData.setChannelPublic( updateData.channel )
                    serverData.addLogItem( updateData.message )
                    wss.broadcastAll( JSON.stringify( updateData ) )
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
                    serverData.setChannelPrivate( updateData.channel )
                    serverData.setChannelPassword( updateData.channel, updateData.password )
                    serverData.addLogItem( updateData.message )
                    wss.broadcastAll( JSON.stringify( updateData ) )
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
                    serverData.setChannelPassword( updateData.channel, updateData.password )
                    serverData.addLogItem( updateData.message )
                    wss.broadcastAll( JSON.stringify( updateData ) )
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
                    updateData.id = uuidv4()
                    serverData.addMessage( updateData.message )
                    wss.broadcastAll( JSON.stringify( updateData ) )
                    console.log('>>>>>>>>> Message Sent - newMessage >>>>>>>>>')
                    console.log('======= END - HANDLER - newMessage =======')
                    break
                }

            /*======================================*/
            /*======================================*/

            default:
        }
    })

    /*================================================
        ANCHOR: CLOSING CONNECTION
    ==================================================*/
    
    wsClient.on('close', ( wsClient ) =>
    {
        console.log('======= Client Disonnected =======')

        console.log('find user: ', serverData.state.users.find(user => user.id = userData.userID ))

        // Disconnect message
        // TODO: error when refreshing?
        let disconnectMessage = {
            type:    'notification-disconnect',
            name:    serverData.state.users.find(user => user.id = userData.userID ).name,
            time:    new Date().toGMTString(),
            color:   serverData.state.users.find(user => user.id = userData.userID ).color,
        }
        console.log('disconnectMessage: ', disconnectMessage)
        serverData.addMessage( disconnectMessage )

        // Disconnect data for other users
        let updateData = {
            id:      uuidv4(), // message id
            type:    'userDisconnected',
            userID:  userData.userID, // user removal id
            message: disconnectMessage,
        }
        console.log('updateData: ', updateData)
        wss.broadcast( JSON.stringify( updateData ), wsClient )
        console.log('>>>>>>>>> Message Sent - userDisconnected >>>>>>>>>')

        // Remove user
        serverData.removeUser( userData.userID )  

        console.log('======= END - Client Disonnected =======')
    })
})