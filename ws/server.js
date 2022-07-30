/*======================================
    SERVER CONFIGURATION
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
    FUNCTIONAL METHODS
========================================*/


/*======================================
    CLASS
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
        STATE METHODS - Users
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
        STATE METHODS - User Info
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
        STATE METHODS - Messages
    ========================================*/

    message_add ( message )
    {
        this.state.messages.push( message );
    }
}

/*======================================
    CLASS INITIATION
========================================*/

let chat = new Chat();

/*======================================
    WS SERVER FUNCTIONS
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
    WS SERVER
========================================*/

wss.on('connection', ( wsClient ) =>
{

    /*======================================
        INITIAL CONNECTION TO CLIENT
    ========================================*/

    console.log('======= Client Connected =======');
 
    // Set initial client data
    let clientData = {
        id:       uuidv4(), // message id
        userID:   uuidv4(), // id for disconnecting user removal
        type:     'clientConnected',
        users:    chat.state.users,
        messages: chat.state.messages,
    };
    
    // Send id, users, and message to connecting client
    wss.broadcast_client( JSON.stringify( clientData ), wsClient );
    console.log('>>>>>>>>> Message Sent - Client Data >>>>>>>>>');
    console.log('======= END - Client Connected =======');



    /*======================================
        HANDLERS
    ========================================*/

    wsClient.on('message', function incoming( data )
    {
        console.log('>>>>>>>>> Message Recieved >>>>>>>>>');
        let updateData = JSON.parse( data );
        console.log('type: ', updateData.type);

        switch ( updateData.type )
        {

            /*======================================
                HANDLER - CLIENT CONNECTION
            ========================================*/

            case 'newUser':
            {
                // > Send new user data to all other users
                console.log('======= HANDLER - newUser =======');
                updateData.id = uuidv4();
                clientData.clientID = updateData.user.id // set id for disconnecting user removal
                chat.user_add( updateData.user );
                wss.broadcast( JSON.stringify( updateData ), wsClient );
                console.log('>>>>>>>>> Message Sent - newUser >>>>>>>>>');
                console.log('======= END HANDLER - newUser =======');
                break;
            }  
            
            /*======================================
                HANDLER - CLIENT INFO
            ========================================*/

            case 'updateUserName':
            {
                console.log('======= HANDLER - updateUserName =======');
                updateData.id = uuidv4();
                chat.set_user_name( updateData.user, updateData.newName );
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
                wss.broadcast( JSON.stringify( updateData ), wsClient );
                console.log('>>>>>>>>> Message Sent - updateUserColor >>>>>>>>>');
                console.log('======= END HANDLER - updateUserColor =======');
                break;
            }

            /*======================================
                HANDLER - MESSAGES/NOTIFICATIONS
            ========================================*/

            case "postMessage":
            {
                updateData.id = uuidv4();
                updateData.type = "incomingMessage"
                wss.broadcast( JSON.stringify( updateData ), wsClient );
                break;
            }

            /*======================================*/
            /*======================================*/

            case "postNotification":
            {
                updateData.id = uuidv4();
                updateData.type = "incomingNotification"
                wss.broadcast( JSON.stringify( updateData ), wsClient );
                break;
            }

            default:
        }
    });

    /*======================================
        CLOSING CONNECTION
    ========================================*/
    
    wsClient.on('close', ( wsClient ) =>
    {
        console.log('======= Client Disonnected =======');
        chat.client_remove( clientData.id );  

        // Set data for disconnect message
        let updateData = {
            id: uuidv4(), // message id
            clientID: clientData.id, // client removal id
            time: Date.now(),
            type: 'clientDisconnected'
        };
        wss.broadcast( JSON.stringify( updateData ), wsClient );
        console.log('>>>>>>>>> Message Sent - clientDisconnected >>>>>>>>>');
        console.log('======= END - Client Disonnected =======');
    });
});
