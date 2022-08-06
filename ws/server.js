/*======================================
    ANCHOR: SERVER CONFIGURATION
========================================*/

const express = require('express')
const SocketServer = require('ws')
const { v4: uuidv4 } = require('uuid')

const PORT = 3001
const server = express()
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`))
const wss = new SocketServer.Server({ server })

/*======================================
    ANCHOR: CLASS
========================================*/

class DataTracker
{
    constructor()
    {
        this.state = {
            // TODO: convert to MongoDB
            users: [],
            messages: [],
            log: [],
            channels: [],
        }

        /*======================================*/
        /*======================================*/

        // State methods - Users
        this.addUser    = this.addUser.bind(this)
        this.removeUser = this.removeUser.bind(this)

        // State methods - User Info
        this.setUserName     = this.setUserName.bind(this)
        this.setUserNickname = this.setUserNickname.bind(this)
        this.setUserColor    = this.setUserColor.bind(this)

        // State methods - Channels
        this.addChannel         = this.addChannel.bind(this)
        this.deleteChannel      = this.deleteChannel.bind(this)
        this.setChannelName     = this.setChannelName.bind(this)
        this.setChannelPublic   = this.setChannelPublic.bind(this)
        this.setChannelPrivate  = this.setChannelPrivate.bind(this)
        this.setChannelPassword = this.setChannelPassword.bind(this)

        // State methods - Messages
        this.addMessage = this.addMessage.bind(this)

        // State methods - Dev Log
        this.addLogItem = this.addLogItem.bind(this)
    }

    /*================================================
        ANCHOR: STATE METHODS - Users
    ==================================================*/

    addUser ( user )
    {
        this.state.users.push( user )
    }

    /*======================================*/
    /*======================================*/

    removeUser ( userID )
    {
        console.log('userID: ', userID)
        console.log('typeof userID: ', typeof userID)
        console.log('FIND USER: ', this.state.users.find( user => ( user.id === userID ) ))
        if ( this.state.users.find( user => ( user.id === userID ) ) )
        {
            // User exists in array
            console.log('User exists in array')
            console.log('this.state.users: ', this.state.users)
            this.state.users = this.state.users.filter( user => ( user.id !== userID ) )
            console.log('this.state.users: ', this.state.users)
        }
        else
        {
            // No user!!
            console.log('No user!!')
        }
    }

    /*================================================
        ANCHOR: STATE METHODS - User Info
    ==================================================*/

    setUserName ( user, newName )
    {
        for ( let i = 0; i < this.state.users.length; i++ )
        {
            if ( this.state.users[i].id === user.id )
            {
                this.state.users[i].name = newName
            }
        }
    }

    /*======================================*/
    /*======================================*/

    setUserNickname ( user, newNickname )
    {
        for ( let i = 0; i < this.state.users.length; i++ )
        {
            if ( this.state.users[i].id === user.id )
            {
                this.state.users[i].nickname = newNickname
            }
        }
    }

    /*======================================*/
    /*======================================*/

    setUserColor ( user, newColor )
    {
        for ( let i = 0 ;i < this.state.users.length; i++ )
        {
            if ( this.state.users[i].id === user.id )
            {
                this.state.users[i].color = newColor
            }
        }
    }

    /*================================================
        ANCHOR: STATE METHODS - Channels
    ==================================================*/

    addChannel ( channel )
    {
        this.state.channels.push( channel )
    }

    /*======================================*/
    /*======================================*/

    deleteChannel ( channelID )
    {
        console.log('channelID: ', channelID)
        console.log('typeof channelID: ', typeof channelID)
        console.log('FIND CHANNEL: ', this.state.channels.find( channel => ( channel.id === channelID ) ))
        if ( this.state.channels.find( user => ( user.id === channelID ) ) )
        {
            console.log('Channel exists in array')
            console.log('this.state.channels: ', this.state.channels)
            this.state.channels = this.state.channels.filter( channel => ( channel.id !== channelID ) )
            console.log('this.state.channels: ', this.state.channels)
        }
        else
        {
            console.log('No channel!!')
        }
    }

    /*======================================*/
    /*======================================*/

    setChannelName ( channel, name )
    {
        for ( let i = 0; i < this.state.channels.length; i++ )
        {
            if ( this.state.channels[i].id === channel.id )
            {
                this.state.channels[i].nickname = name
            }
        }
    }
    
    /*======================================*/
    /*======================================*/

    setChannelPublic ( channel )
    {
        for ( let i = 0; i < this.state.channels.length; i++ )
        {
            if ( this.state.channels[i].id === channel.id )
            {
                this.state.channels[i].locked = false
            }
        }
    }

    /*======================================*/
    /*======================================*/

    setChannelPrivate ( channel )
    {
        for ( let i = 0; i < this.state.channels.length; i++ )
        {
            if ( this.state.channels[i].id === channel.id )
            {
                this.state.channels[i].locked = true
            }
        }
    }

    /*======================================*/
    /*======================================*/

    setChannelPassword ( channel, password )
    {
        for ( let i = 0; i < this.state.channels.length; i++ )
        {
            if ( this.state.channels[i].id === channel.id )
            {
                this.state.channels[i].password = password
            }
        }
    }

    /*================================================
        ANCHOR: STATE METHODS - Messages
    ==================================================*/

    addMessage ( message )
    {
        this.state.messages.push( message )
    }

    /*================================================
        ANCHOR: STATE METHODS - Dev Log
    ==================================================*/

    addLogItem ( logItem )
    {
        this.state.log.push( logItem )
    }
}

/*================================================
    ANCHOR: CLASS INITIATION
==================================================*/

const serverData = new DataTracker()

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
        userID:   uuidv4(), // id for disconnecting user removal (TODO: supply id on auth page)
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
        // TODO: error - color being send instead of name?
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
