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
    GAME CLASS - CHAT
========================================*/

class Chat
{
    constructor()
    {
        this.state = {
            clients: [],
            chatLog: [],
        };

        /*======================================*/
        /*======================================*/

        // State methods - Clients
        this.client_add               = this.client_add.bind(this);
        this.client_remove            = this.client_remove.bind(this);

        // State methods - Client Info
        this.set_client_name          = this.set_client_name.bind(this);

        // State methods - Chat Log
        this.log_add_item             = this.log_add_item.bind(this);
        this.log_clear                = this.log_clear.bind(this);
    }

    /*======================================
        STATE METHODS - Clients
    ========================================*/

    client_add ( client )
    {
        this.state.clients.push( client );
    }

    /*======================================*/
    /*======================================*/

    client_remove ( clientID )
    {
        this.state.clients = this.state.clients.filter( client => ( client.id !== clientID ) );
    }

    /*======================================
        STATE METHODS - Client Info
    ========================================*/

    set_client_name ( client, newName )
    {
        for ( let i = 0; i < this.state.clients.length; i++ )
        {
            if ( this.state.clients[i].id === client.id )
            {
                this.state.clients[i].name = newName;
            }
        }
    }

    /*======================================
        STATE METHODS - Chat Log
    ========================================*/

    log_add_item ( logItem )
    {
        console.log('===> log_add_item: ', logItem);
        console.log('> BEFORE: ', this.state.chatLog);
        this.state.chatLog.push( logItem );
        console.log('> AFTER: ', this.state.chatLog);
        console.log('===> END - log_add_item');
    }

    /*======================================*/
    /*======================================*/

    log_clear ()
    {
        console.log('===> log_clear');
        this.state.chatLog = [];
        console.log('===> END - log_clear');
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
        clientID: uuidv4(), // id for disconnecting player removal and determining host
        type:     'clientConnected',
        clients:  chat.state.clients,
        chatLog:  chat.state.chatLog,
    };
    
    // Send id, clients, and chat log to connecting client
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

            case 'newPlayer':
            {
                // > Send new player data to all other players
                console.log('======= HANDLER - newPlayer =======');
                updateData.id = uuidv4();
                clientData.clientID = updateData.player.id // set id for disconnecting player removal
                game.player_add( updateData.player );
                wss.broadcast( JSON.stringify( updateData ), wsClient );
                console.log('>>>>>>>>> Message Sent - newPlayer >>>>>>>>>');
                console.log('======= END HANDLER - newPlayer =======');
                break;
            }  
            
            /*======================================
                HANDLER - CLIENT INFO
            ========================================*/

            case 'updatePlayerName':
            {
                console.log('======= HANDLER - updatePlayerName =======');
                updateData.id = uuidv4();
                game.set_client_name( updateData.player, updateData.newName );
                wss.broadcast( JSON.stringify( updateData ), wsClient );
                console.log('>>>>>>>>> Message Sent - updatePlayerName >>>>>>>>>');
                console.log('======= END HANDLER - updatePlayerName =======');
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
