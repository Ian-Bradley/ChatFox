/*======================================
    ANCHOR: SERVER CONFIGURATION
========================================*/

const express = require('express');
const SocketServer = require('ws');
const { v4: uuidv4 } = require('uuid');

const PORT = 3001;
const server = express()
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));
const wss = new SocketServer.Server({ server });

/*======================================
    ANCHOR: FUNCTIONAL METHODS
========================================*/


/*======================================
    ANCHOR: CLASS
========================================*/

class Chat
{
    constructor()
    {
        this.state = {
            users: [],
            messages: [],
        };

        /*======================================*/
        /*======================================*/

        // State methods - Users
        this.user_add       = this.user_add.bind(this);
        this.user_remove    = this.user_remove.bind(this);

        // State methods - User Info
        this.set_user_name  = this.set_user_name.bind(this);
        this.set_user_color = this.set_user_color.bind(this);

        // State methods - Messages
        this.message_add    = this.message_add.bind(this);
    }

    /*======================================
        ANCHOR: STATE METHODS - Users
    ========================================*/

    user_add ( user )
    {
        this.state.users.push( user );
    }

    /*======================================*/
    /*======================================*/

    user_remove ( userID )
    {
        this.state.users = this.state.users.filter( user => ( user.id !== userID ) );
    }

    /*======================================
        ANCHOR: STATE METHODS - User Info
    ========================================*/

    set_user_name ( user, newName )
    {
        for ( let i = 0; i < this.state.users.length; i++ )
        {
            if ( this.state.users[i].id === user.id )
            {
                this.state.users[i].name = newName;
            }
        }
    }

    /*======================================*/
    /*======================================*/

    set_user_color ( user, newColor )
    {
        for ( let i = 0; i < this.state.users.length; i++ )
        {
            if ( this.state.users[i].id === user.id )
            {
                this.state.users[i].name = newColor;
            }
        }
    }

    /*======================================
        ANCHOR: STATE METHODS - Messages
    ========================================*/

    message_add ( message )
    {
        this.state.messages.push( message );
    }
}

/*======================================
    ANCHOR: CLASS INITIATION
========================================*/

let chat = new Chat();

/*======================================
    ANCHOR: WS SERVER FUNCTIONS
========================================*/

wss.broadcast = ( data, wsClient ) =>
{
    wss.clients.forEach( client =>
    {
        if ( ( client.readyState === SocketServer.OPEN ) && ( wsClient !== client ) )
        {
            client.send( data );
        }
    });
};

wss.broadcast_client = ( data, wsClient ) =>
{
    if ( wsClient.readyState === SocketServer.OPEN )
    {
        wsClient.send( data );
    }
    
};

wss.broadcast_all = ( data ) =>
{
    wss.clients.forEach( client =>
    {
        if ( client.readyState === SocketServer.OPEN )
        {
            client.send( data );
        }
    });
};

/*======================================
    ANCHOR: WS SERVER
========================================*/

wss.on('connection', ( wsClient ) =>
{

    /*======================================
        ANCHOR: INITIAL CONNECTION TO CLIENT
    ========================================*/

    console.log('======= Client Connected =======');
 
    // Set initial client data
    let userData = {
        id:       uuidv4(), // message id
        type:     'clientConnected',
        users:    chat.state.users,
        userID:   uuidv4(), // id for disconnecting user removal (maybe: supply id on auth page)
        messages: chat.state.messages,
    };
    
    // Send id, users, and message to connecting client
    wss.broadcast_client( JSON.stringify( userData ), wsClient );
    console.log('>>>>>>>>> Message Sent - Client Data >>>>>>>>>');
    console.log('======= END - Client Connected =======');



    /*======================================
        ANCHOR: HANDLERS
    ========================================*/

    wsClient.on('message', function incoming( data )
    {
        console.log('>>>>>>>>> Message Recieved >>>>>>>>>');
        let updateData = JSON.parse( data );
        console.log('type: ', updateData.type);

        switch ( updateData.type )
        {

            /*======================================
                ANCHOR: HANDLER - USER CONNECTION
            ========================================*/

            case 'userConnected':
            {
                // > Send new user data to all other users
                console.log('======= HANDLER - userConnected =======');
                updateData.id = uuidv4();
                userData.userID = updateData.user.id // set id for disconnecting user removal
                chat.user_add( updateData.user );
                chat.message_add( updateData.message );
                wss.broadcast( JSON.stringify( updateData ), wsClient );
                console.log('>>>>>>>>> Message Sent - userConnected >>>>>>>>>');
                console.log('======= END HANDLER - userConnected =======');
                break;
            }  
            
            /*======================================
                ANCHOR: HANDLER - USER INFO
            ========================================*/

            case 'updateUserName':
            {
                console.log('======= HANDLER - updateUserName =======');
                updateData.id = uuidv4();
                chat.set_user_name( updateData.user, updateData.newName );
                chat.message_add( updateData.message );
                wss.broadcast( JSON.stringify( updateData ), wsClient );
                console.log('>>>>>>>>> Message Sent - updateUserName >>>>>>>>>');
                console.log('======= END HANDLER - updateUserName =======');
                break;
            }

            /*======================================*/
            /*======================================*/

            case 'updateUserColor':
            {
                console.log('======= HANDLER - updateUserColor =======');
                updateData.id = uuidv4();
                chat.set_user_color( updateData.user, updateData.newColor );
                chat.message_add( updateData.message );
                wss.broadcast( JSON.stringify( updateData ), wsClient );
                console.log('>>>>>>>>> Message Sent - updateUserColor >>>>>>>>>');
                console.log('======= END HANDLER - updateUserColor =======');
                break;
            }

            /*======================================
                ANCHOR: HANDLER - MESSAGES
            ========================================*/

            case "newMessage":
            {
                console.log('======= HANDLER - newMessage =======');
                updateData.id = uuidv4();
                chat.message_add( updateData.message );
                wss.broadcast_all( JSON.stringify( updateData ) );
                console.log('======= END - HANDLER - newMessage =======');
                break;
            }

            /*======================================*/
            /*======================================*/

            default:
        }
    });

    /*======================================
        ANCHOR: CLOSING CONNECTION
    ========================================*/
    
    wsClient.on('close', ( wsClient ) =>
    {
        console.log('======= Client Disonnected =======');

        console.log('find user: ', chat.state.users.find(user => user.id = userData.userID ));

        // > Disconnect message
        let disconnectMessage = {
            type:    'notification',
            name:    chat.state.users.find(user => user.id = userData.userID ).name,
            time:    Date.now(),
            color:   chat.state.users.find(user => user.id = userData.userID ).color,
            content: 'has disconnected',
        };
        chat.message_add( disconnectMessage );

        // > Disconnect data for other users
        let updateData = {
            id:      uuidv4(), // message id
            type:    'userDisconnected',
            userID:  userData.userID, // user removal id
            message: disconnectMessage,
        };
        wss.broadcast( JSON.stringify( updateData ), wsClient );
        console.log('>>>>>>>>> Message Sent - userDisconnected >>>>>>>>>');

        // > Remove user
        chat.user_remove( userData.userID );  

        console.log('======= END - Client Disonnected =======');
    });
});
