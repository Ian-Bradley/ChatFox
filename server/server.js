/*================================================
    BLOCK: CONFIGURATION
==================================================*/

// Packages
const path = require('path');
const cors = require('cors');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const config = require('./config.env.js');

// Settings
const server = express();
server.use(cors());
server.use(express.static(path.join(__dirname, '..', 'dist')));

// API
const userAPI = require('./lib/api/users/user.api.js');
const usersAPI = require('./lib/api/users/users.api.js');
const roomAPI = require('./lib/api/rooms/room.api.js');
const roomsAPI = require('./lib/api/rooms/rooms.api.js');

server.use('/api/user', userAPI);
server.use('/api/users', usersAPI);
server.use('/api/room', roomAPI);
server.use('/api/rooms', roomsAPI);

// Routes
const auth = require('./lib/routes/auth.js');
const routes = require('./lib/routes/routes.js');

server.use('/auth', auth);
// server.use('/', routes);

// Initiating
server.listen(config.server.port, config.server.ip, config.server.domain, () => {
    console.log(`Listening on ${config.server.domain}:${config.server.port}`);
});

const SocketServer = require('ws');
const WSS = new SocketServer.Server({ server });

const StateTracker = require('./lib/tracking/StateTracker.js');
const ServerState = new StateTracker();

// NOTE: for api
// server.get()
// server.post() // add data
// server.put() // change data
// server.delete()

/*================================================
    BLOCK: WEBSOCKET FUNCTIONS
==================================================*/

WSS.broadcast = (data, wsClient) => {
    WSS.clients.forEach((client) => {
        if (client.readyState === SocketServer.OPEN && wsClient !== client) {
            client.send(data);
        }
    });
};

/*================================================*/
/*================================================*/

WSS.broadcastClient = (data, wsClient) => {
    if (wsClient.readyState === SocketServer.OPEN) {
        wsClient.send(data);
    }
};

/*================================================*/
/*================================================*/

WSS.broadcastAll = (data) => {
    WSS.clients.forEach((client) => {
        if (client.readyState === SocketServer.OPEN) {
            client.send(data);
        }
    });
};

/*================================================
    BLOCK: WEBSOCKET SERVER
==================================================*/

WSS.on('connection', (wsClient) => {
    /*================================================
        INNER: > INITIAL CONNECTION
    ==================================================*/

    console.log('======= START - Client Connected =======');

    // Set initial client data
    const wsClientData = {
        id: uuidv4(), // message id
        type: 'clientConnected',
        users: ServerState.state.users,
        userID: uuidv4(), // id for disconnecting user removal - TODO: supply id on auth page
        messages: ServerState.state.messages,
    };

    // Send id, users, and message to connecting client
    WSS.broadcastClient(JSON.stringify(wsClientData), wsClient);
    console.log('>>>>>>>>> MESSAGE SENT - Client Data >>>>>>>>>');
    console.log('======= END - Client Connected =======');

    /*================================================
        INNER: > HANDLERS
    ==================================================*/

    wsClient.on('message', function incoming(data) {
        console.log('>>>>>>>>> MESSAGE RECIEVED >>>>>>>>>');
        const messageData = JSON.parse(data);
        console.log('type: ', messageData.type);

        switch (messageData.type) {
            /*================================================*/
            /*================================================*/

            // HANDLER: => userConnected
            case 'userConnected': {
                // Send new user data to all other users
                console.log('======= START - MESSAGE - userConnected =======');
                messageData.id = uuidv4();
                wsClientData.userID = messageData.user.id; // set id for disconnecting user removal
                ServerState.addUser(messageData.user);
                ServerState.addLogItem(messageData.message);
                WSS.broadcast(JSON.stringify(messageData), wsClient);
                console.log('>>>>>>>>> MESSAGE SENT - userConnected >>>>>>>>>');
                console.log('======= END MESSAGE - userConnected =======');
                break;
            }

            /*================================================*/
            /*================================================*/

            // HANDLER: => updateUserName
            case 'updateUserName': {
                console.log('======= START - MESSAGE - updateUserName =======');
                messageData.id = uuidv4();
                ServerState.setUserName(messageData.user, messageData.newName);
                ServerState.addLogItem(messageData.message);
                WSS.broadcastAll(JSON.stringify(messageData));
                console.log('>>>>>>>>> MESSAGE SENT - updateUserName >>>>>>>>>');
                console.log('======= END MESSAGE - updateUserName =======');
                break;
            }

            /*================================================*/
            /*================================================*/

            // HANDLER: => updateUserNickname
            case 'updateUserNickname': {
                console.log('======= START - MESSAGE - updateUserNickname =======');
                messageData.id = uuidv4();
                ServerState.setUserNickname(messageData.user, messageData.newNickname);
                ServerState.addLogItem(messageData.message);
                WSS.broadcastAll(JSON.stringify(messageData));
                console.log('>>>>>>>>> MESSAGE SENT - updateUserNickname >>>>>>>>>');
                console.log('======= END MESSAGE - updateUserNickname =======');
                break;
            }

            /*================================================*/
            /*================================================*/

            // HANDLER: => updateUserColor
            case 'updateUserColor': {
                console.log('======= START - MESSAGE - updateUserColor =======');
                messageData.id = uuidv4();
                ServerState.setUserColor(messageData.user, messageData.newColor);
                ServerState.addLogItem(messageData.message);
                WSS.broadcastAll(JSON.stringify(messageData));
                console.log('>>>>>>>>> MESSAGE SENT - updateUserColor >>>>>>>>>');
                console.log('======= END MESSAGE - updateUserColor =======');
                break;
            }

            /*================================================*/
            /*================================================*/

            // HANDLER: => updateAddChannel
            case 'updateAddChannel': {
                console.log('======= START - MESSAGE - updateAddChannel =======');
                messageData.id = uuidv4();
                ServerState.addChannel(messageData.channel);
                ServerState.addLogItem(messageData.message);
                WSS.broadcastAll(JSON.stringify(messageData));
                console.log('>>>>>>>>> MESSAGE SENT - updateAddChannel >>>>>>>>>');
                console.log('======= END MESSAGE - updateAddChannel =======');
                break;
            }

            /*================================================*/
            /*================================================*/

            // HANDLER: => updateDeleteChannel
            case 'updateDeleteChannel': {
                console.log('======= START - MESSAGE - updateDeleteChannel =======');
                messageData.id = uuidv4();
                ServerState.deleteChannel(messageData.channelID);
                ServerState.addLogItem(messageData.message);
                WSS.broadcastAll(JSON.stringify(messageData));
                console.log('>>>>>>>>> MESSAGE SENT - updateDeleteChannel >>>>>>>>>');
                console.log('======= END MESSAGE - updateDeleteChannel =======');
                break;
            }

            /*================================================*/
            /*================================================*/

            // HANDLER: => updateChannelName
            case 'updateChannelName': {
                console.log('======= START - MESSAGE - updateChannelName =======');
                messageData.id = uuidv4();
                ServerState.setChannelName(messageData.channel, messageData.newName);
                ServerState.addLogItem(messageData.message);
                WSS.broadcastAll(JSON.stringify(messageData));
                console.log('>>>>>>>>> MESSAGE SENT - updateChannelName >>>>>>>>>');
                console.log('======= END MESSAGE - updateChannelName =======');
                break;
            }

            /*================================================*/
            /*================================================*/

            // HANDLER: => updateChannelPublic
            case 'updateChannelPublic': {
                console.log('======= START - MESSAGE - updateChannelPublic =======');
                messageData.id = uuidv4();
                ServerState.setChannelPublic(messageData.channel);
                ServerState.addLogItem(messageData.message);
                WSS.broadcastAll(JSON.stringify(messageData));
                console.log('>>>>>>>>> MESSAGE SENT - updateChannelPublic >>>>>>>>>');
                console.log('======= END MESSAGE - updateChannelPublic =======');
                break;
            }

            /*================================================*/
            /*================================================*/

            // HANDLER: => updateChannelPrivate
            case 'updateChannelPrivate': {
                console.log('======= START - MESSAGE - updateChannelPrivate =======');
                messageData.id = uuidv4();
                ServerState.setChannelPrivate(messageData.channel);
                ServerState.setChannelPassword(messageData.channel, messageData.password);
                ServerState.addLogItem(messageData.message);
                WSS.broadcastAll(JSON.stringify(messageData));
                console.log('>>>>>>>>> MESSAGE SENT - updateChannelPrivate >>>>>>>>>');
                console.log('======= END MESSAGE - updateChannelPrivate =======');
                break;
            }

            /*================================================*/
            /*================================================*/

            // HANDLER: => updateChannelPassword
            case 'updateChannelPassword': {
                console.log('======= START - MESSAGE - updateChannelPassword =======');
                messageData.id = uuidv4();
                ServerState.setChannelPassword(messageData.channel, messageData.password);
                ServerState.addLogItem(messageData.message);
                WSS.broadcastAll(JSON.stringify(messageData));
                console.log('>>>>>>>>> MESSAGE SENT - updateChannelPassword >>>>>>>>>');
                console.log('======= END MESSAGE - updateChannelPassword =======');
                break;
            }

            /*================================================*/
            /*================================================*/

            // HANDLER: => newMessage
            case 'newMessage': {
                console.log('======= START - MESSAGE - newMessage =======');
                messageData.id = uuidv4();
                ServerState.addMessage(messageData.message);
                WSS.broadcastAll(JSON.stringify(messageData));
                console.log('>>>>>>>>> MESSAGE SENT - newMessage >>>>>>>>>');
                console.log('======= END - MESSAGE - newMessage =======');
                break;
            }

            /*================================================*/
            /*================================================*/

            default:
        }
    });

    /*================================================
        INNER: > CLOSING CONNECTION
    ==================================================*/

    wsClient.on('close', (wsClient) => {
        console.log('======= START - Client Disonnected =======');

        console.log(
            'find user: ',
            ServerState.state.users.find((user) => (user.id = wsClientData.userID))
        );

        // Disconnect message
        // TODO: error when refreshing?
        let disconnectMessage = {
            type: 'notification-disconnect',
            name: ServerState.state.users.find((user) => (user.id = wsClientData.userID)).name,
            time: new Date().toGMTString(),
            color: ServerState.state.users.find((user) => (user.id = wsClientData.userID)).color,
        };
        console.log('disconnectMessage: ', disconnectMessage);
        ServerState.addMessage(disconnectMessage);

        // Disconnect data for other users
        const messageData = {
            id: uuidv4(), // message id
            type: 'userDisconnected',
            userID: wsClientData.userID, // user removal id
            message: disconnectMessage,
        };
        console.log('messageData: ', messageData);
        WSS.broadcast(JSON.stringify(messageData), wsClient);
        console.log('>>>>>>>>> MESSAGE SENT - userDisconnected >>>>>>>>>');

        // Remove user
        ServerState.removeUser(wsClientData.userID);

        console.log('======= END - Client Disonnected =======');
    });
});
