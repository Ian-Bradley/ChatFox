/*================================================
    BLOCK: CONFIGURATION
==================================================*/

const db = require('../db/db.js');
const config = require('./config');
const { v4: uuidv4 } = require('uuid');

const cors = require('cors');
const express = require('express');
const server = express()
    .use(cors())
    .use(express.static('public'))
    .listen(config.server.port, config.server.ip, config.server.domain, () =>
        console.log(`Listening on ${config.server.domain}:${config.server.port}`)
    );
const SocketServer = require('ws');
const WSS = new SocketServer.Server({ server });

const DataTracker = require('./lib/DataTracker.js');
const ServerData = new DataTracker();

/*================================================
    BLOCK: ROUTES
==================================================*/

// app.get('/room', function (req, res, next) {
// 	const room = {
// 		name: req.query.name,
// 		id: uuidv4()
// 	};
// 	rooms[room.id] = room;
// 	chatLogs[room.id] = [];
// 	res.json(room);
// });

// app.get('/room/:roomId', function (req, res, next) {
// 	const roomId = req.params.roomId;
// 	const response = {
// 		...rooms[roomId],
// 		chats: chatLogs[roomId]
// 	};
// 	res.json(response);
// });

/*================================================
    BLOCK: WS FUNCTIONS
==================================================*/

WSS.broadcast = (data, wsClient) => {
    WSS.clients.forEach((client) => {
        if (client.readyState === SocketServer.OPEN && wsClient !== client) {
            client.send(data);
        }
    });
};

WSS.broadcastClient = (data, wsClient) => {
    if (wsClient.readyState === SocketServer.OPEN) {
        wsClient.send(data);
    }
};

WSS.broadcastAll = (data) => {
    WSS.clients.forEach((client) => {
        if (client.readyState === SocketServer.OPEN) {
            client.send(data);
        }
    });
};

/*================================================
    BLOCK: WS SERVER
==================================================*/

WSS.on('connection', (wsClient) => {
    /*================================================
        INNERBLOCK: > INITIAL CONNECTION
    ==================================================*/

    console.log('======= START - Client Connected =======');

    // Set initial client data
    const clientData = {
        id: uuidv4(), // message id
        type: 'clientConnected',
        users: ServerData.state.users,
        userID: uuidv4(), // id for disconnecting user removal - TODO: supply id on auth page
        messages: ServerData.state.messages,
    };

    // Send id, users, and message to connecting client
    WSS.broadcastClient(JSON.stringify(clientData), wsClient);
    console.log('>>>>>>>>> MESSAGE SENT - Client Data >>>>>>>>>');
    console.log('======= END - Client Connected =======');

    /*================================================
        INNERBLOCK: > HANDLERS
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
                clientData.userID = messageData.user.id; // set id for disconnecting user removal
                ServerData.addUser(messageData.user);
                ServerData.addLogItem(messageData.message);
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
                ServerData.setUserName(messageData.user, messageData.newName);
                ServerData.addLogItem(messageData.message);
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
                ServerData.setUserNickname(messageData.user, messageData.newNickname);
                ServerData.addLogItem(messageData.message);
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
                ServerData.setUserColor(messageData.user, messageData.newColor);
                ServerData.addLogItem(messageData.message);
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
                ServerData.addChannel(messageData.channel);
                ServerData.addLogItem(messageData.message);
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
                ServerData.deleteChannel(messageData.channelID);
                ServerData.addLogItem(messageData.message);
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
                ServerData.setChannelName(messageData.channel, messageData.newName);
                ServerData.addLogItem(messageData.message);
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
                ServerData.setChannelPublic(messageData.channel);
                ServerData.addLogItem(messageData.message);
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
                ServerData.setChannelPrivate(messageData.channel);
                ServerData.setChannelPassword(messageData.channel, messageData.password);
                ServerData.addLogItem(messageData.message);
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
                ServerData.setChannelPassword(messageData.channel, messageData.password);
                ServerData.addLogItem(messageData.message);
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
                ServerData.addMessage(messageData.message);
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
        INNERBLOCK: > CLOSING CONNECTION
    ==================================================*/

    wsClient.on('close', (wsClient) => {
        console.log('======= START - Client Disonnected =======');

        console.log(
            'find user: ',
            ServerData.state.users.find((user) => (user.id = clientData.userID))
        );

        // Disconnect message
        // TODO: error when refreshing?
        let disconnectMessage = {
            type: 'notification-disconnect',
            name: ServerData.state.users.find((user) => (user.id = clientData.userID)).name,
            time: new Date().toGMTString(),
            color: ServerData.state.users.find((user) => (user.id = clientData.userID)).color,
        };
        console.log('disconnectMessage: ', disconnectMessage);
        ServerData.addMessage(disconnectMessage);

        // Disconnect data for other users
        const messageData = {
            id: uuidv4(), // message id
            type: 'userDisconnected',
            userID: clientData.userID, // user removal id
            message: disconnectMessage,
        };
        console.log('messageData: ', messageData);
        WSS.broadcast(JSON.stringify(messageData), wsClient);
        console.log('>>>>>>>>> MESSAGE SENT - userDisconnected >>>>>>>>>');

        // Remove user
        ServerData.removeUser(clientData.userID);

        console.log('======= END - Client Disonnected =======');
    });
});
