/*================================================
    BLOCK: CONFIGURATION
==================================================*/
// NOTE: for api
// get    = get    || read
// post   = insert || create
// put    = update
// delete = delete

// ==> Packages
const path = require('path');
const cors = require('cors');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const config = require('./config.env.js');

// ==> API
const login = require('./lib/api/auth/login.js');
const register = require('./lib/api/auth/register.js');
const usersAPI = require('./lib/api/users.api.js');
const channelsAPI = require('./lib/api/channels.api.js');
const messagesAPI = require('./lib/api/messages.api.js');

// ==> Routes
// const routes = require('./lib/routes/routes.js');

// ==> Initiating
const server = express()
    .use(cors())
    .use(express.json())
    .use(express.static(path.join(__dirname, '..', 'dist')))
    .use('/api/login', login)
    .use('/api/register', register)
    .use('/api/users', usersAPI)
    .use('/api/users', channelsAPI)
    .use('/api/users', messagesAPI)
    // .use('/', routes)
    .listen(config.server.port, config.server.ip, config.server.domain, () => {
        console.log(`Listening on ${config.server.domain}:${config.server.port}`);
    });

const SocketServer = require('ws');
const WSS = new SocketServer.Server({ server });

const StateTracker = require('./lib/tracking/StateTracker.js');
const wsState = new StateTracker();

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
        users: wsState.state.users,
        userID: uuidv4(), // id for disconnecting user removal - TODO: supply id on auth page
        messages: wsState.state.messages,
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
                wsState.addUser(messageData.user);
                wsState.addLogItem(messageData.message);
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
                wsState.setUserName(messageData.user, messageData.newName);
                wsState.addLogItem(messageData.message);
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
                wsState.setUserNickname(messageData.user, messageData.newNickname);
                wsState.addLogItem(messageData.message);
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
                wsState.setUserColor(messageData.user, messageData.newColor);
                wsState.addLogItem(messageData.message);
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
                wsState.addChannel(messageData.channel);
                wsState.addLogItem(messageData.message);
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
                wsState.deleteChannel(messageData.channelID);
                wsState.addLogItem(messageData.message);
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
                wsState.setChannelName(messageData.channel, messageData.newName);
                wsState.addLogItem(messageData.message);
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
                wsState.setChannelPublic(messageData.channel);
                wsState.addLogItem(messageData.message);
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
                wsState.setChannelPrivate(messageData.channel);
                wsState.setChannelPassword(messageData.channel, messageData.password);
                wsState.addLogItem(messageData.message);
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
                wsState.setChannelPassword(messageData.channel, messageData.password);
                wsState.addLogItem(messageData.message);
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
                wsState.addMessage(messageData.message);
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

        // console.log(
        //     'find user: ',
        //     wsState.state.users.find((user) => (user.id = wsClientData.userID))
        // );

        // Disconnect message
        // TODO: error when refreshing?
        // let disconnectMessage = {
        //     type: 'notification-disconnect',
        //     name: wsState.state.users.find((user) => (user.id = wsClientData.userID)).name,
        //     time: new Date().toGMTString(),
        //     color: wsState.state.users.find((user) => (user.id = wsClientData.userID)).color,
        // };
        // console.log('disconnectMessage: ', disconnectMessage);
        // wsState.addMessage(disconnectMessage);

        // Disconnect data for other users
        // const messageData = {
        //     id: uuidv4(), // message id
        //     type: 'userDisconnected',
        //     userID: wsClientData.userID, // user removal id
        //     message: disconnectMessage,
        // };
        // console.log('messageData: ', messageData);
        // WSS.broadcast(JSON.stringify(messageData), wsClient);
        console.log('>>>>>>>>> MESSAGE SENT - userDisconnected >>>>>>>>>');

        // Remove user
        // wsState.removeUser(wsClientData.userID);

        console.log('======= END - Client Disonnected =======');
    });
});
